import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const fields = [
  { blockType: 'text', name: 'name', label: 'Name', required: true },
  { blockType: 'text', name: 'phone', label: 'Phone', required: true },
  { blockType: 'email', name: 'email', label: 'Email (optional)' },
  {
    blockType: 'select', name: 'topic', label: "I'm interested in", required: true,
    options: [
      { label: 'Strategic partnership', value: 'strategic-partnership' },
      { label: 'Stock broking (PSX)', value: 'stock-broking' },
      { label: 'Commodity brokerage (PMEX)', value: 'commodity-brokerage' },
      { label: 'Business brokerage', value: 'business-brokerage' },
      { label: 'Arid land & agriculture', value: 'arid-land-agriculture' },
      { label: 'Tourism & hospitality', value: 'tourism-hospitality' },
      { label: 'Something else', value: 'something-else' },
    ],
  },
  { blockType: 'textarea', name: 'message', label: 'Message' },
  { blockType: 'checkbox', name: 'consent', label: 'I agree to the Strategic Partner Terms & Conditions.', required: true },
]

const run = async () => {
  const payload = await getPayload({ config })
  const existing = await payload.find({ collection: 'forms', where: { title: { equals: 'Strategic partner enquiries' } }, limit: 1 })
  const formData = { title: 'Strategic partner enquiries', fields, submitButtonLabel: 'Send message', confirmationType: 'message', confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', version: 1, text: 'Thank you. Our partnerships team will be in touch shortly.' }] }] } }, emails: [] }
  const form = existing.docs[0]
    ? await payload.update({ collection: 'forms', id: existing.docs[0].id, data: formData as any })
    : await payload.create({ collection: 'forms', data: formData as any })
  const pages = await payload.find({ collection: 'pages', where: { slug: { equals: 'strategicpartner' } }, limit: 1 })
  const page = pages.docs[0]
  if (!page) throw new Error('Strategic Partner page was not found. Run npm run seed:missing-pages first.')
  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[3] = {
    blockType: 'consultationQualifier', eyebrow: 'Become a partner', heading: 'Explore the partner opportunity',
    subheading: 'Leave your details and our partnerships team will explain how the programme works.', phone: '(042) 111 111 333', phoneHref: 'tel:+9242111111333', whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333', whatsappLabel: 'WhatsApp our client support', hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed', formMode: 'singlePage', termsUrl: 'https://enrichers.com.pk/wp-content/uploads/2026/04/SP-Terms-Conditions.pdf', termsLabel: 'Strategic Partner Terms & Conditions', form: form.id,
  }
  await payload.update({ collection: 'pages', id: page.id, data: { layout } as never, context: { skipRevalidate: true } })
  payload.logger.info('Updated the Strategic Partner consultation section')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
