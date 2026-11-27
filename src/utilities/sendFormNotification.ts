import nodemailer from 'nodemailer'
import type { BasePayload } from 'payload'

import { wrapEmail } from './emailTemplate'

type Submission = {
  submissionData?: { field: string; value: unknown }[] | null
}

const prettify = (name: string) => name.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())

const looksLikeEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Send a form enquiry by email, using the SMTP credentials an admin has entered
 * in Settings → Email (read from the `site-settings` global at send time — not
 * from .env, and not from Payload's boot-time adapter). Silently skips when
 * email is disabled or the host is blank, so submissions are still saved.
 */
export async function sendFormNotification({
  payload,
  submission,
}: {
  payload: BasePayload
  submission: Submission
}): Promise<void> {
  try {
    const settings = (await payload.findGlobal({ slug: 'site-settings', depth: 0 })) as any

    if (!settings?.smtpEnabled || !settings?.smtpHost) {
      payload.logger.info('Form enquiry saved — email skipped (SMTP not enabled in Settings → Email).')
      return
    }

    const to = settings.notificationsTo || settings.fromAddress
    if (!to) {
      payload.logger.warn('Form enquiry saved, but no recipient is set in Settings → Email.')
      return
    }

    const port = Number(settings.smtpPort ?? 587)
    const transport = nodemailer.createTransport({
      host: settings.smtpHost,
      port,
      secure: settings.smtpSecure ?? port === 465,
      auth: settings.smtpUser ? { user: settings.smtpUser, pass: settings.smtpPass } : undefined,
    })

    const rows = (submission.submissionData ?? [])
      .filter((entry) => entry.field !== 'formSubmissionID')
      .map((entry) => {
        const value = Array.isArray(entry.value) ? entry.value.join(', ') : String(entry.value ?? '')
        return `<tr><td>${prettify(entry.field)}</td><td>${value}</td></tr>`
      })
      .join('')

    const replyTo = (submission.submissionData ?? []).map((e) => e.value).find(looksLikeEmail)

    const html = wrapEmail({
      html: `<p>A new enquiry has come in from the Enrichers website.</p><table>${rows}</table><p>Reply directly to this email to reach them.</p>`,
      title: 'New website enquiry',
    })

    const fromName = settings.fromName || 'Enrichers Investment Group'
    const fromAddress = settings.fromAddress || settings.smtpUser || 'noreply@enrichers.com.pk'

    await transport.sendMail({
      from: `"${fromName}" <${fromAddress}>`,
      to,
      replyTo: replyTo || undefined,
      subject: 'New website enquiry',
      html,
    })

    payload.logger.info(`Form enquiry emailed to ${to}.`)
  } catch (error) {
    // Never let a mail failure break the submission — it is already saved.
    payload.logger.error(`Failed to email form enquiry: ${error instanceof Error ? error.message : String(error)}`)
  }
}
