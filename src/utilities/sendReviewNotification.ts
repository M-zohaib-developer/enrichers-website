import nodemailer from 'nodemailer'
import type { BasePayload } from 'payload'

import { wrapEmail } from './emailTemplate'

type Event = 'submitted' | 'approved' | 'changes_requested' | 'rejected'

type Args = {
  payload: BasePayload
  event: Event
  page: { id: number | string; title?: string | null; slug?: string | null }
  submittedBy?: { id?: number | string; email?: string | null } | null
  reviewedBy?: { email?: string | null } | null
  reviewNote?: string | null
}

const SUBJECTS: Record<Event, (title: string) => string> = {
  submitted: (t) => `Page submitted for approval — ${t}`,
  approved: (t) => `Your page has been published — ${t}`,
  changes_requested: (t) => `Changes requested on ${t}`,
  rejected: (t) => `Your submission for ${t} needs more work`,
}

function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '$2 ($1)')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|li)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/**
 * Lightweight retry wrapper. `payload.sendEmail` is not wired here because
 * the form hook already demonstrated that reading SMTP from SiteSettings and
 * building nodemailer directly is the more reliable path on this stack —
 * same approach here.
 *
 * Failures are logged with full structured context (never silently
 * swallowed), tried once more after a short delay, and if both attempts fail
 * the error is emitted at `error` level so an operator can retry manually
 * from the log. The review state change is never blocked by a send failure.
 */
export async function sendReviewNotification({
  payload,
  event,
  page,
  submittedBy,
  reviewedBy,
  reviewNote,
}: Args): Promise<void> {
  try {
    const settings = (await payload.findGlobal({
      slug: 'site-settings',
      depth: 0,
      overrideAccess: true,
    })) as any

    if (!settings?.smtpEnabled || !settings?.smtpHost) {
      payload.logger.info(
        `Review notification skipped — SMTP disabled. event=${event} page=${page.id}`,
      )
      return
    }

    // Recipient resolution:
    //   submitted → all admins (or override) — editor is notifying admins
    //   approved / changes_requested / rejected → the original submitter
    let recipients: string[] = []
    if (event === 'submitted') {
      const override = settings?.reviewNotifyOverrideTo?.trim()
      if (override) {
        recipients = [override]
      } else {
        const admins = await payload.find({
          collection: 'users',
          where: { role: { equals: 'admin' } },
          depth: 0,
          limit: 100,
          overrideAccess: true,
        })
        recipients = admins.docs
          .map((a: any) => a.email)
          .filter((e: string | undefined): e is string => Boolean(e))
      }
    } else if (submittedBy?.email) {
      recipients = [submittedBy.email]
    }

    if (recipients.length === 0) {
      payload.logger.warn(
        `Review notification: no recipients resolved. event=${event} page=${page.id}`,
      )
      return
    }

    const port = Number(settings.smtpPort ?? 587)
    const authUser = settings.smtpUser || settings.fromAddress
    const fromName = settings.fromName || 'Enrichers Investment Group'
    const fromHeader = `"${fromName}" <${authUser}>`

    const transport = nodemailer.createTransport({
      host: settings.smtpHost,
      port,
      secure: settings.smtpSecure ?? port === 465,
      auth: authUser ? { user: authUser, pass: settings.smtpPass } : undefined,
    })

    const pageTitle = page.title?.trim() || `Page #${page.id}`
    const adminUrl =
      (process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '') +
      `/admin/collections/pages/${page.id}`

    const bodyByEvent: Record<Event, string> = {
      submitted:
        `<p><strong>${pageTitle}</strong> has been submitted for approval` +
        (submittedBy?.email ? ` by ${submittedBy.email}` : '') +
        `.</p><p><a href="${adminUrl}" style="color:#1c95d0">Review in admin →</a></p>`,
      approved:
        `<p>Good news — <strong>${pageTitle}</strong> has been approved and published.</p>` +
        `<p><a href="${adminUrl}" style="color:#1c95d0">Open page →</a></p>`,
      changes_requested:
        `<p><strong>${pageTitle}</strong> needs edits before it can go live.</p>` +
        (reviewNote
          ? `<p><strong>Note from ${reviewedBy?.email || 'the admin'}:</strong></p><blockquote style="border-left:3px solid #1c95d0;padding-left:12px;margin:12px 0">${reviewNote.replace(/\n/g, '<br>')}</blockquote>`
          : '') +
        `<p><a href="${adminUrl}" style="color:#1c95d0">Open page →</a></p>`,
      rejected:
        `<p><strong>${pageTitle}</strong> has been sent back to draft and needs more work before it can be re-submitted.</p>` +
        `<p><a href="${adminUrl}" style="color:#1c95d0">Open page →</a></p>`,
    }

    const html = wrapEmail({ html: bodyByEvent[event], title: SUBJECTS[event](pageTitle) })
    const text = htmlToText(html)
    const subject = SUBJECTS[event](pageTitle)
    const headers = { 'List-Unsubscribe': `<mailto:${authUser}?subject=unsubscribe>` }

    const sendOnce = () =>
      transport.sendMail({
        from: fromHeader,
        to: recipients.join(', '),
        subject,
        html,
        text,
        headers,
      })

    try {
      const info = await sendOnce()
      payload.logger.info(
        `Review notification sent. event=${event} page=${page.id} to=${recipients.join(',')} messageId=${info.messageId}`,
      )
      return
    } catch (firstErr) {
      payload.logger.warn(
        `Review notification attempt 1 failed — retrying. event=${event} page=${page.id} err=${String((firstErr as Error).message)}`,
      )
    }

    // Retry once after a short delay. SMTP hiccups (connection reset, 421
    // from greylisting) usually clear within a second or two.
    await new Promise((r) => setTimeout(r, 2500))

    try {
      const info = await sendOnce()
      payload.logger.info(
        `Review notification sent on retry. event=${event} page=${page.id} to=${recipients.join(',')} messageId=${info.messageId}`,
      )
    } catch (secondErr) {
      // Structured failure log — captures every field an operator needs to
      // retry manually. We do NOT rethrow; the review state transition must
      // not be reverted because an email is temporarily undeliverable.
      payload.logger.error(
        JSON.stringify({
          kind: 'review_notification_failed',
          event,
          pageId: page.id,
          pageTitle,
          recipients,
          subject,
          error: (secondErr as Error).message,
          retryHint:
            'Resend by re-triggering the workflow transition, or send directly via SMTP using the same recipients/subject above.',
        }),
      )
    }
  } catch (outerErr) {
    payload.logger.error(
      `Review notification unexpected failure: ${(outerErr as Error).message}`,
    )
  }
}
