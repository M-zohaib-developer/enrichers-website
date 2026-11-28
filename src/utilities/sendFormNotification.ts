import nodemailer from 'nodemailer'
import type { BasePayload } from 'payload'

import { wrapEmail } from './emailTemplate'

type Submission = {
  form?: number | string | { id: number | string }
  submissionData?: { field: string; value: unknown }[] | null
}

type FormDoc = {
  title?: string | null
  confirmationType?: 'message' | 'redirect' | null
  confirmationMessage?: unknown
  emails?: Array<{
    emailTo?: string | null
    emailFrom?: string | null
    cc?: string | null
    bcc?: string | null
    replyTo?: string | null
    subject?: string | null
    message?: unknown
  }> | null
}

const prettify = (name: string) => name.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())

const looksLikeEmail = (v: unknown): v is string =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

/**
 * Strip HTML down to a plain-text alternative.
 *
 * Gmail's spam classifier flags HTML-only MIME messages hard — adding a
 * text/plain part dropped our enquiry mail out of Spam in testing. This is
 * deliberately simple: tables become line pairs, links keep their URL, block
 * elements become line breaks, everything else is stripped.
 */
function htmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi, '$1: $2\n')
    .replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '$2 ($1)')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|li|tr|table)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** Convert Payload Lexical rich text (or a plain string) to HTML. */
function richToHtml(node: unknown): string {
  if (!node) return ''
  if (typeof node === 'string') return `<p>${node.replace(/\n/g, '<br>')}</p>`
  const root = (node as any)?.root
  if (!root?.children) return ''
  const renderChildren = (children: any[]): string =>
    children
      .map((c) => {
        if (c?.type === 'text') {
          let t = String(c.text ?? '')
          if (c.format & 1) t = `<strong>${t}</strong>`
          if (c.format & 2) t = `<em>${t}</em>`
          if (c.format & 8) t = `<u>${t}</u>`
          return t
        }
        if (c?.type === 'linebreak') return '<br>'
        if (c?.type === 'link') {
          const url = c?.fields?.url || '#'
          return `<a href="${url}" style="color:#1c95d0">${renderChildren(c.children || [])}</a>`
        }
        if (c?.type === 'paragraph') return `<p>${renderChildren(c.children || [])}</p>`
        if (c?.type === 'heading') {
          const tag = c.tag || 'h3'
          return `<${tag}>${renderChildren(c.children || [])}</${tag}>`
        }
        if (c?.type === 'list') {
          const tag = c.tag || 'ul'
          return `<${tag}>${renderChildren(c.children || [])}</${tag}>`
        }
        if (c?.type === 'listitem') return `<li>${renderChildren(c.children || [])}</li>`
        if (c?.children) return renderChildren(c.children)
        return ''
      })
      .join('')
  return renderChildren(root.children)
}

/** Replace {{field_name}} and {{*:table}} placeholders using the submission rows. */
function applyPlaceholders(html: string, rows: Array<{ field: string; value: unknown }>): string {
  const map = new Map<string, string>()
  for (const r of rows) {
    const v = Array.isArray(r.value) ? r.value.join(', ') : String(r.value ?? '')
    map.set(r.field, v)
  }
  // Build the table used by {{*:table}}
  const tableRows = rows
    .filter((r) => r.field !== 'formSubmissionID')
    .map((r) => `<tr><td>${prettify(r.field)}</td><td>${Array.isArray(r.value) ? r.value.join(', ') : String(r.value ?? '')}</td></tr>`)
    .join('')
  const table = `<table>${tableRows}</table>`
  let out = html.replace(/\{\{\*:table\}\}/g, table)
  out = out.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_m, key) => map.get(key) ?? '')
  return out
}

/**
 * Sends email on form submission using admin-entered SMTP credentials
 * (Settings → Email (SMTP) tab — never from .env).
 *
 * Two emails per submission:
 *   1. Internal notification → the address in `notificationsTo`
 *   2. Confirmation → the submitter (first email field in the submission),
 *      using the form's `confirmationMessage` as the body.
 *
 * Plus any custom emails defined in the form's own "Emails" array
 * (Forms → <form> → Emails in admin) are honoured — Email To / From /
 * Subject / Message with {{field_name}} and {{*:table}} placeholders.
 *
 * Silently skips every send when SMTP is disabled or host is blank.
 */
export async function sendFormNotification({
  payload,
  submission,
}: {
  payload: BasePayload
  submission: Submission
}): Promise<void> {
  try {
    // overrideAccess: true is required here. Every SMTP field on
    // SiteSettings has access.read restricted to logged-in admins (to keep
    // the password out of the public API). A form submission is anonymous —
    // req.user is null — so without overrideAccess the fields come back
    // stripped and smtpHost looks undefined, making the hook silently skip.
    const settings = (await payload.findGlobal({
      slug: 'site-settings',
      depth: 0,
      overrideAccess: true,
    })) as any

    if (!settings?.smtpEnabled || !settings?.smtpHost) {
      payload.logger.info('Form enquiry saved — email skipped (SMTP not enabled in Settings → Email).')
      return
    }

    const notifyTo = settings.notificationsTo || settings.fromAddress
    const port = Number(settings.smtpPort ?? 587)
    const fromName = settings.fromName || 'Enrichers Investment Group'
    // Gmail only signs (DKIM) outbound mail when the From address matches the
    // authenticated SMTP user — a mismatch here strips DKIM and almost
    // guarantees the message lands in Spam. When the admin set a different
    // fromAddress, we keep it as replyTo but send as the SMTP user.
    const authUser = settings.smtpUser || settings.fromAddress || 'noreply@enrichers.com.pk'
    const fromAddress = authUser
    const fromHeader = `"${fromName}" <${fromAddress}>`
    const replyToDefault =
      settings.fromAddress && settings.fromAddress !== authUser ? settings.fromAddress : undefined
    // One standard header that noticeably improves Gmail deliverability.
    const listUnsubscribeHeader = { 'List-Unsubscribe': `<mailto:${authUser}?subject=unsubscribe>` }

    const transport = nodemailer.createTransport({
      host: settings.smtpHost,
      port,
      secure: settings.smtpSecure ?? port === 465,
      auth: settings.smtpUser ? { user: settings.smtpUser, pass: settings.smtpPass } : undefined,
    })

    const rows = submission.submissionData ?? []
    const submitterEmail = rows.map((e) => e.value).find(looksLikeEmail)

    // Look up the parent form for its custom emails and confirmation message
    let form: FormDoc | null = null
    const formRef = submission.form
    const formId = typeof formRef === 'object' && formRef ? (formRef as any).id : formRef
    if (formId) {
      try {
        form = (await payload.findByID({ collection: 'forms' as any, id: formId as any, depth: 1 })) as any
      } catch {
        form = null
      }
    }

    const sends: Promise<unknown>[] = []
    // If the form has admin-configured Emails, use ONLY those (same model as
    // the reference project). The automatic admin/confirmation pair below
    // becomes a fallback for forms that have nothing configured.
    const hasCustomEmails = Array.isArray(form?.emails) && form!.emails!.length > 0

    // ── (1) Internal notification to admin ───────────────────────────────
    if (!hasCustomEmails && notifyTo) {
      const tableRows = rows
        .filter((r) => r.field !== 'formSubmissionID')
        .map((r) => `<tr><td>${prettify(r.field)}</td><td>${Array.isArray(r.value) ? r.value.join(', ') : String(r.value ?? '')}</td></tr>`)
        .join('')
      const notificationHtml = wrapEmail({
        html: `<p>A new enquiry has come in from the Enrichers website${form?.title ? ` via the <strong>${form.title}</strong> form` : ''}.</p><table>${tableRows}</table><p>Reply directly to this email to reach them.</p>`,
        title: 'New website enquiry',
      })
      sends.push(
        transport.sendMail({
          from: fromHeader,
          to: notifyTo,
          replyTo: submitterEmail || replyToDefault,
          subject: form?.title ? `New enquiry — ${form.title}` : 'New website enquiry',
          html: notificationHtml,
          text: htmlToText(notificationHtml),
          headers: listUnsubscribeHeader,
        }),
      )
    }

    // ── (2) Confirmation to the submitter ─────────────────────────────────
    if (!hasCustomEmails && submitterEmail) {
      const confirmationBody = form?.confirmationMessage
        ? richToHtml(form.confirmationMessage)
        : '<p>Thank you — we have received your message and will be in touch shortly.</p>'
      const detailsTable = rows
        .filter((r) => r.field !== 'formSubmissionID' && !/password/i.test(r.field))
        .map((r) => `<tr><td>${prettify(r.field)}</td><td>${Array.isArray(r.value) ? r.value.join(', ') : String(r.value ?? '')}</td></tr>`)
        .join('')
      const confirmationHtml = wrapEmail({
        html:
          `${confirmationBody}` +
          `<p style="margin-top:22px;font-weight:600">Here is a copy of what you submitted:</p>` +
          `<table>${detailsTable}</table>` +
          `<p style="color:#64748b;font-size:13px;margin-top:20px">If you need us sooner, call us on (042) 111 111 333 or email <a href="mailto:${fromAddress}" style="color:#1c95d0">${fromAddress}</a>.</p>`,
        title: 'Thank you for your enquiry',
      })
      sends.push(
        transport.sendMail({
          from: fromHeader,
          to: submitterEmail,
          replyTo: notifyTo || replyToDefault,
          subject: `Thank you — ${fromName}`,
          html: confirmationHtml,
          text: htmlToText(confirmationHtml),
          headers: listUnsubscribeHeader,
        }),
      )
    }

    // ── (3) Any custom emails configured on the form itself ───────────────
    const sub = (v?: string | null) => applyPlaceholders((v || '').trim(), rows)
    for (const e of form?.emails ?? []) {
      const to = sub(e.emailTo)
      if (!to) continue
      const subject = applyPlaceholders((e.subject || `Message from ${fromName}`) as string, rows)
      const messageHtml = applyPlaceholders(richToHtml(e.message), rows)
      // Ignore any admin-entered "Email From" that doesn't match the SMTP
      // auth user — Gmail strips DKIM on mismatched From, dropping us into
      // Spam. Stash the intended sender as replyTo instead.
      const requestedFrom = sub(e.emailFrom)
      const useFrom =
        requestedFrom && requestedFrom.toLowerCase().includes(`<${authUser.toLowerCase()}>`)
          ? requestedFrom
          : requestedFrom && requestedFrom.toLowerCase() === authUser.toLowerCase()
            ? requestedFrom
            : fromHeader
      const fallbackReply =
        requestedFrom && requestedFrom !== fromHeader && requestedFrom !== authUser
          ? requestedFrom
          : undefined
      const wrappedHtml = wrapEmail({ html: messageHtml, title: form?.title || 'Website message' })
      sends.push(
        transport.sendMail({
          from: useFrom,
          to,
          cc: sub(e.cc) || undefined,
          bcc: sub(e.bcc) || undefined,
          replyTo: sub(e.replyTo) || submitterEmail || fallbackReply || replyToDefault,
          subject,
          html: wrappedHtml,
          text: htmlToText(wrappedHtml),
          headers: listUnsubscribeHeader,
        }),
      )
    }

    const results = await Promise.allSettled(sends)
    const sent = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.length - sent
    payload.logger.info(
      `Form enquiry: ${sent} email(s) sent${failed ? `, ${failed} failed` : ''}` +
        (notifyTo ? ` · notify=${notifyTo}` : '') +
        (submitterEmail ? ` · confirm=${submitterEmail}` : ''),
    )
  } catch (error) {
    payload.logger.error(`Failed to email form enquiry: ${error instanceof Error ? error.message : String(error)}`)
  }
}
