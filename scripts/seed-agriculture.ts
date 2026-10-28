import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })
  const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'Agriculture' } }, limit: 1 })
  const image = existingMedia.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'Agriculture' },
    filePath: path.resolve(dirname, '../public/brand/agriculture.webp'),
  })
  const localAssets = [
    ['Smart Agriculture', 'agriculture-smart.jpg'],
    ['Corporate Farming', 'agriculture-corporate-farming.webp'],
    ['Corporate Dairy Farming', 'agriculture-corporate-dairy-farming.jpg'],
    ['Export-Oriented Cultivation', 'agriculture-export-oriented-cultivation.jpg'],
    ['Grading in Produces', 'agriculture-grading-produces.jpg'],
    ['Livestock', 'agriculture-livestock.jpg'],
    ['Meat Export', 'agriculture-meat-export.jpg'],
    ['Meat Export (Future Plan)', 'agriculture-meat-export-1.jpg'],
  ] as const
  for (const [alt, filename] of localAssets) {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    if (!existing.docs[0]) await payload.create({ collection: 'media', data: { alt }, filePath: path.resolve(dirname, `../public/brand/${filename}`) })
  }
  const carouselImages = [
    { image: image.id, alt: 'Agriculture' },
    ...await Promise.all(localAssets.map(async ([alt]) => {
      const result = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
      return { image: result.docs[0].id, alt }
    })),
  ]
  const forms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const form = forms.docs[0]
  if (!form) throw new Error('Investor enquiries form was not found. Run npm run seed:home first.')

  const layout = [{
    blockType: 'marketHero',
    eyebrow: 'Agriculture',
    heading: 'Agriculture',
    headingLineOne: 'Agriculture',
    headingLineTwo: '',
    headingLineThree: '',
    body: 'Sustainable agriculture initiatives designed to strengthen productivity, food security and long-term growth in Pakistan.',
    showButtons: false,
    buttons: [],
    heroImage: image.id,
    badges: [],
  }, {
    blockType: 'consultationShowcase',
    sectionId: 'consultation',
    eyebrow: 'Free consultation',
    heading: 'Get free consultation today',
    subheading: 'Tell us what you want to build in agriculture and our team will call you.',
    phone: '(042) 111 111 333',
    phoneHref: 'tel:+9242111111333',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
    whatsappLabel: 'WhatsApp our client support',
    hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
    formStepLabel: 'Step 1 of 4 · Demo — nothing is submitted',
    formHeading: 'Let’s understand your agriculture goal',
    formIntro: 'A few quick questions help us prepare the right conversation.',
    form: form.id,
    images: carouselImages,
    intervalSeconds: 3,
  }, {
    blockType: 'businessIntro',
    heading: 'Sustainability in Pakistani Agriculture',
    body: 'EIG recognizes the crucial role of sustainable practices in ensuring the long-term viability of Pakistan’s agricultural sector. Our initiatives are designed to not only enhance productivity and economic gain but also to protect the environment and conserve precious resources for future generations.',
    buttons: [{ blockType: 'primaryButton', label: 'Get started', url: 'https://api.whatsapp.com/send?phone=9242111111333' }],
  }, {
    blockType: 'benefitsGrid',
    sectionId: 'sustainability-practices',
    heading: 'Sustainability practices',
    showHeader: false,
    background: 'sunken',
    items: [
      { title: 'Water Conservation', body: 'Smart irrigation techniques promoted through our smart agriculture initiatives like center pivot irrigation systems aim to optimize water usage, minimizing waste and ensuring long-term water security.' },
      { title: 'Soil Health', body: 'Encouraging practices like crop rotation and organic farming helps maintain soil fertility and reduce dependence on chemical fertilizers, leading to healthier crops and a more balanced ecosystem.' },
    ],
  }]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'agriculture' } }, limit: 1 })
  const data = { title: 'Agriculture', slug: 'agriculture', layout } as never
  const context = { context: { skipRevalidate: true } }
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
  else await payload.create({ collection: 'pages', data, ...context })
  payload.logger.info('Seeded the Agriculture MarketHero')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
