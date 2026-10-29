import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })

  const getMedia = async (alt: string, filename: string) => {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return existing.docs[0] ?? payload.create({
      collection: 'media',
      data: { alt },
      filePath: path.resolve(dirname, `../public/brand/${filename}`),
    })
  }

  const images = await Promise.all([
    getMedia('Tourism and hospitality consultation image 1', 'tourism-hospitality1.webp'),
    getMedia('Tourism and hospitality consultation image 2', 'tourism-hospitality2.webp'),
    getMedia('Tourism and hospitality consultation image 3', 'tourism-hospitality3.webp'),
  ])

  const existingForms = await payload.find({
    collection: 'forms',
    where: { title: { equals: 'Tourism consultation' } },
    limit: 1,
  })
  const formData = {
    title: 'Tourism consultation',
    fields: [
      { blockType: 'text', name: 'firstName', label: 'First name', required: true },
      { blockType: 'text', name: 'lastName', label: 'Last name', required: true },
      { blockType: 'email', name: 'email', label: 'Email', required: true },
      { blockType: 'text', name: 'phone', label: 'Phone', required: true },
    ],
    submitButtonLabel: 'Send',
    confirmationType: 'message',
    confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ text: 'Thank you. We will be in touch shortly.', type: 'text', version: 1 }] }] } },
    emails: [],
    step1Heading: 'Get free consultation today!',
    step1Intro: '',
    step2Heading: 'Get free consultation today!',
    step2Intro: '',
    step3Heading: 'Get free consultation today!',
    step3Intro: '',
  }
  const form = existingForms.docs[0]
    ? await payload.update({ collection: 'forms', id: existingForms.docs[0].id, data: formData as never })
    : await payload.create({ collection: 'forms', data: formData as never })

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'tourism-hospitality' } },
    limit: 1,
  })
  const page = existing.docs[0]
  if (!page) throw new Error('Tourism & Hospitality page was not found. Run npm run seed:missing-pages first.')

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[1] = {
    blockType: 'consultationShowcase',
    sectionId: 'consultation',
    eyebrow: 'Free consultation',
    heading: 'Get free consultation today!',
    subheading: '',
    phone: '(042) 111 111 333',
    phoneHref: 'tel:+9242111111333',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
    whatsappLabel: 'WhatsApp our client support',
    hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
    formStepLabel: 'Step 1 of 3 · Demo — nothing is submitted',
    formHeading: 'Get free consultation today!',
    formIntro: '',
    form: form.id,
    images: images.map((image, index) => ({ image: image.id, alt: `Tourism and hospitality consultation image ${index + 1}` })),
    intervalSeconds: 5,
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { layout } as never,
    context: { skipRevalidate: true },
  })
  payload.logger.info('Seeded the Tourism & Hospitality consultation showcase with live carousel images')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
