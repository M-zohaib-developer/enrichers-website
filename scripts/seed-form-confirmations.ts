/**
 * Replace every form's confirmation message with proper Enrichers-branded copy.
 * The same text is shown on-page AND emailed to the submitter.
 *
 * Run: npx tsx scripts/seed-form-confirmations.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

/** Build a Lexical rich-text doc from an array of paragraph strings. */
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

const CONTACT = 'For anything urgent, call (042) 111 111 333 or email connect@enrichers.com.pk.'

const COPY: Record<string, string[]> = {
  'Investor enquiries': [
    'Thank you for reaching out to Enrichers Investment Group.',
    'An investment advisor will review your details and call you within one business day to discuss the right path for your goals.',
    CONTACT,
  ],
  'Tourism consultation': [
    'Thank you for your interest in Skardu Riverside Hotel.',
    'Our hospitality team will be in touch within one business day to discuss your plans and share partnership details.',
    CONTACT,
  ],
  'Strategic partner enquiries': [
    'Thank you for your interest in the Enrichers Strategic Partner Programme.',
    'Our partnership team will review your application and respond within two business days.',
    CONTACT,
  ],
  'Careers application': [
    'Thank you for applying to join Enrichers Investment Group.',
    'Our people team will review your application carefully. If your profile matches a current opening, we will be in touch to arrange a conversation.',
    CONTACT,
  ],
  'Arid land partnership enquiries': [
    'Thank you for your interest in Enrichers Arid Land Development.',
    'Our land development team will contact you within one business day to walk you through the partnership model and next steps.',
    CONTACT,
  ],
  'Agriculture Research Centre enquiries': [
    'Thank you for reaching out to the Enrichers Agriculture Research Centre.',
    'A member of our research team will respond within one business day with the information you asked for.',
    CONTACT,
  ],
  'Business brokerage enquiries': [
    'Thank you for your enquiry about Enrichers Business Brokerage.',
    'Our advisory team will contact you within one business day to discuss your requirement confidentially.',
    CONTACT,
  ],
  'About Enrichers enquiries': [
    'Thank you for getting in touch with Enrichers Investment Group.',
    'A member of our team will respond to your message within one business day.',
    CONTACT,
  ],
  'Agriculture investment enquiries': [
    'Thank you for your interest in Enrichers Agriculture.',
    'Our agriculture team will call you within one business day to discuss investment and partnership options.',
    CONTACT,
  ],
}

async function run() {
  const cfg = await config
  const payload = await getPayload({ config: cfg })

  const forms = await payload.find({ collection: 'forms' as any, limit: 100, overrideAccess: true })

  let updated = 0
  for (const f of forms.docs as any[]) {
    const paragraphs = COPY[f.title]
    if (!paragraphs) {
      console.log(`- skip "${f.title}" (no copy defined)`)
      continue
    }
    await payload.update({
      collection: 'forms' as any,
      id: f.id,
      data: { confirmationMessage: lexical(paragraphs), confirmationType: 'message' } as any,
      overrideAccess: true,
    })
    console.log(`✓ updated "${f.title}"`)
    updated++
  }
  console.log(`\nUpdated ${updated}/${forms.docs.length} forms.`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
