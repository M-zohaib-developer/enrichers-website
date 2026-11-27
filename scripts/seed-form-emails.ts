/**
 * Populate every form's "Emails" array (admin → Collections → Forms → <form>
 * → Emails) with the two standard messages — admin notification + user
 * confirmation — matching the reference project pattern.
 *
 * Supports {{field_name}} and {{*:table}} placeholders at runtime via the
 * sendFormNotification hook.
 *
 * Run: npx tsx scripts/seed-form-emails.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/** Build a Lexical rich-text doc from paragraph strings (also supports raw HTML lines via `[html]`). */
function lexical(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        children: [{ type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 }],
      })),
    },
  }
}

const NOTIFY_TO = 'mzohaibbhatti604@gmail.com'

/** The admin-notification email (goes to you) — used by every form. */
function adminEmail(formTitle: string) {
  return {
    emailTo: NOTIFY_TO,
    replyTo: '{{email}}',
    emailFrom: '',
    subject: `New enquiry — ${formTitle}`,
    message: lexical([
      `A new ${formTitle} has come in from the Enrichers website.`,
      '{{*:table}}',
      'Reply directly to this email to reach them.',
    ]),
  }
}

/** The user-confirmation email (goes to the submitter). */
function userEmail(formTitle: string, thankLine: string) {
  return {
    emailTo: '{{email}}',
    replyTo: NOTIFY_TO,
    emailFrom: '',
    subject: `Thank you — ${formTitle}`,
    message: lexical([
      'Hi {{name}},',
      thankLine,
      'Here is a copy of what you submitted:',
      '{{*:table}}',
      'If you need us sooner, call (042) 111 111 333 or email connect@enrichers.com.pk.',
      'Best regards,',
      'Enrichers Investment Group',
    ]),
  }
}

// Form id → the one-line thank-you specific to that form.
const THANKS: Record<number, string> = {
  1: '', // Investor enquiries has no email field — admin-only
  2: 'Thank you for your interest in Skardu Riverside Hotel. Our hospitality team will contact you within one business day.',
  3: 'Thank you for your interest in the Enrichers Strategic Partner Programme. Our partnership team will respond within two business days.',
  4: 'Thank you for applying to Enrichers Investment Group. Our people team will review your application and contact you if your profile matches a current opening.',
  5: 'Thank you for your interest in Enrichers Arid Land Development. Our land development team will contact you within one business day.',
  6: 'Thank you for reaching out to the Enrichers Agriculture Research Centre. A member of our research team will respond within one business day.',
  7: 'Thank you for your enquiry about Enrichers Business Brokerage. Our advisory team will contact you confidentially within one business day.',
  8: 'Thank you for getting in touch with Enrichers Investment Group. A team member will respond to your message within one business day.',
  9: 'Thank you for your interest in Enrichers Agriculture. Our agriculture team will call you within one business day.',
}

async function run() {
  const cfg = await config
  const payload = await getPayload({ config: cfg })

  const { docs } = await payload.find({ collection: 'forms' as any, limit: 100, overrideAccess: true })
  let touched = 0
  for (const f of docs as any[]) {
    const emails = [adminEmail(f.title)]
    const thank = THANKS[f.id as number]
    if (thank) emails.push(userEmail(f.title, thank))
    await payload.update({
      collection: 'forms' as any,
      id: f.id,
      data: { emails } as any,
      overrideAccess: true,
    })
    console.log(`✓ ${f.title} — ${emails.length} email(s)`)
    touched++
  }
  console.log(`\nSet emails on ${touched}/${docs.length} forms.`)
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
