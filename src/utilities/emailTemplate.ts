/**
 * Branded wrapper for every email the form builder sends.
 *
 * The form-builder plugin emits bare HTML — a paragraph, and for `{{*:table}}`
 * an unstyled table. In an inbox that reads like a system error, not a lead
 * from the company. This wraps it in the Enrichers shell.
 *
 * Everything is inline styles + table layout on purpose: Gmail strips <style>
 * blocks, Outlook renders with Word's engine, and no mail client supports
 * flexbox/grid reliably. Inline attributes on tables are what survive.
 */

const NAVY = '#0a1f3d'
const ACCENT = '#1c95d0'
const INK = '#334155'
const MUTED = '#64748b'
const LINE = '#e2e8f0'
const PALE = '#f1f5f9'

/** Style the plugin's generated markup (tables + paragraphs) in place. */
const styleBody = (html: string): string =>
  html
    // The plugin appends a formSubmissionID row that means nothing to a reader.
    .replace(/<tr><td>formSubmissionID<\/td><td>[^<]*<\/td><\/tr>/gi, '')
    // `{{*:table}}` labels rows with the stored field name (e.g. `full_name`).
    // Tidy to the label the person filling the form actually saw.
    .replace(
      /<tr><td>([a-zA-Z0-9_]+)<\/td>/g,
      (_m, key: string) => `<tr><td>${key.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase())}</td>`,
    )
    .replace(
      /<table>/g,
      `<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;width:100%;margin:16px 0;border:1px solid ${LINE};border-radius:8px;overflow:hidden">`,
    )
    .replace(
      /<td>/g,
      `<td style="padding:10px 14px;border-bottom:1px solid ${LINE};font-size:14px;color:${INK};vertical-align:top">`,
    )
    .replace(/<p>/g, `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:${INK}">`)

export const wrapEmail = ({ html, title }: { html: string; title: string }): string => `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${PALE};font-family:Arial,Helvetica,sans-serif">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PALE};padding:24px 0">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid ${LINE}">
        <tr><td style="background:${NAVY};padding:22px 28px">
          <span style="color:#ffffff;font-size:18px;font-weight:bold;letter-spacing:.2px">Enrichers Investment Group</span>
          <span style="display:block;color:${ACCENT};font-size:12px;letter-spacing:.14em;text-transform:uppercase;margin-top:4px">${title}</span>
        </td></tr>
        <tr><td style="padding:28px">${styleBody(html)}</td></tr>
        <tr><td style="padding:18px 28px;border-top:1px solid ${LINE};background:#ffffff">
          <span style="color:${MUTED};font-size:12px;line-height:1.6">Enrichers Investment Group · 3rd Floor, High Q Tower, Gulberg 5, Lahore · (042) 111 111 333<br>This is an automated notification from the Enrichers website.</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
