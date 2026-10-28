import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })
  const forms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const form = forms.docs[0]
  if (!form) throw new Error('Investor enquiries form was not found. Run npm run seed:home first.')

  const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'Arid land development' } }, limit: 1 })
  const image = existingMedia.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'Arid land development' },
    filePath: path.resolve(dirname, '../public/brand/arid-land.webp'),
  })
  const existingFieldsImage = await payload.find({ collection: 'media', where: { alt: { equals: 'Turning barren landscapes into flourishing fields' } }, limit: 1 })
  const fieldsImage = existingFieldsImage.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'Turning barren landscapes into flourishing fields' },
    filePath: path.resolve(dirname, '../public/brand/arid-fields.webp'),
  })

  const layout = [{
    blockType: 'marketHero',
    eyebrow: 'Arid land development',
    heading: 'Arid Land Development',
    body: 'Sustainable solutions for arid regions.',
    showButtons: false,
    buttons: [],
    heroImage: image.id,
    badges: [],
  }, {
    blockType: 'consultationShowcase',
    sectionId: 'consultation',
    eyebrow: 'Free consultation',
    heading: 'Get free consultation today',
    subheading: 'Tell us how you want to develop productive farmland and our team will call you.',
    phone: '(042) 111 111 333',
    phoneHref: 'tel:+9242111111333',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
    whatsappLabel: 'WhatsApp our client support',
    hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
    formStepLabel: 'Step 1 of 4 · Demo — nothing is submitted',
    formHeading: 'Let’s understand your land-development goal',
    formIntro: 'A few quick questions help us prepare the right conversation.',
    form: form.id,
    images: [
      { image: image.id, alt: 'Arid land development' },
      { image: fieldsImage.id, alt: 'Turning barren landscapes into flourishing fields' },
    ],
    intervalSeconds: 3,
  }, {
    blockType: 'serviceOfferings',
    sectionId: 'deliverables',
    eyebrow: '',
    heading: 'Our Deliverables',
    body: 'Against sweat equity partnership, EIG will be providing following services;',
    background: 'light',
    columns: '2',
    items: [
      {
        title: 'Land Acquisition',
        details: [
          { label: 'To facilitate in the selection of land after due diligence' },
          { label: 'To ensure legitimate transfer of ownership and smooth possession' },
          { label: 'To provide cover to our partners' },
        ],
      },
      {
        title: 'Land Development',
        details: [
          { label: 'Strategic research in Agricultural Engineering Contouring and balancing land through various techniques and methods' },
          { label: 'Deploying best-suited irrigation methods' },
          { label: 'Treating soil characteristics' },
          { label: 'Building agri-tourism sites and superstructures like Dams, Processing Units, Cold Storage etc.' },
        ],
      },
      {
        title: 'Supply Chain Management',
        details: [
          { label: 'Import of best seeds, machines or technology' },
          { label: 'Utilizing EIG exposure of exports' },
          { label: 'Conducting own researches for HYVs' },
          { label: 'Processing organic fertilizers on farm' },
          { label: 'Building rain water harvesting ponds' },
        ],
      },
      {
        title: 'Farm Management',
        details: [
          { label: 'Ensuring the proper management of land and yield' },
          { label: 'Research based value addition' },
          { label: 'Provision of labor, supplies, mechanization and equipment' },
          { label: 'Exploring prospects of agriculture allied industry' },
          { label: 'Keeping, updating, and sharing books in transparency with partners' },
        ],
      },
    ],
  }, {
    blockType: 'splitContentList',
    sectionId: 'crop-cultivation',
    leftHeading: 'Operational Efficiency and Precision',
    leftBody: 'EIG’s strategic presence across multiple regions in Pakistan allows for precise and efficient management of land parcels. We actively cultivate crops in various locations, including;',
    rightHeading: 'Diverse Crop Cultivation',
    rightBody: 'Our commitment to sustainable agriculture extends to cultivating a wide range of crops, including;',
    rightItems: [
      { label: 'Rice' },
      { label: 'Wheat' },
      { label: 'Mustard' },
      { label: 'Sugar Cane' },
      { label: 'Peanuts' },
      { label: 'Potatoes' },
    ],
  }, {
    blockType: 'benefitsGrid',
    sectionId: 'values',
    eyebrow: 'Sustainable Farming',
    heading: 'Our Values',
    body: 'Max Returns with Eco-care',
    background: 'sunken',
    items: [
      { title: 'Innovation', body: 'Advanced Efficiency Boosts Yield.' },
      { title: 'Collaboration', body: 'Shared Knowledge, Empowered Communities.' },
      { title: 'Empowerment', body: 'Fairness, Gender Equality in Rural.' },
    ],
  }, {
    blockType: 'imageTextFeature',
    heading: 'Turning barren landscapes into flourishing fields',
    body: 'Enrichers Investment Group’s Arid Land Development initiative breathes life into Pakistan’s untapped potential. We are committed to harnessing the power of innovation and collaboration to transform arid lands into thriving agricultural hubs, fostering economic growth, creating jobs, and enhancing food security for generations to come.',
    image: fieldsImage.id,
    imageAlt: 'Turning barren landscapes into flourishing fields',
  }, {
    blockType: 'businessIntro',
    heading: 'Arid Land Development',
    body: 'Enrichers’ Arid Land Development is all about turning arid land into productive farmland. Through smart innovation and sustainable practices, we help grow real value — boosting returns and uplifting local communities along the way.',
    buttons: [{ blockType: 'primaryButton', label: 'Get started', url: 'https://api.whatsapp.com/send?phone=9242111111333' }],
  }, {
    blockType: 'faqAccordion',
    sectionId: 'faq',
    heading: 'Frequently Asked Questions',
    items: [
      { question: 'What is the development of arid land in Pakistan?', answer: 'Arid Land Development in Pakistan is the process of turning dry or barren land into useful cropland. Enrichers helps farmers and investors cultivate profitable crops in Pakistan’s dry areas by offering expert services in land acquisition, soil management, and irrigation.' },
      { question: 'How does Enrichers help farmers in Pakistan\'s dry areas farm in a way that is good for the environment?', answer: 'Enrichers helps Pakistan’s farms stay sustainable by using innovative irrigation methods, collecting rainwater, treating the soil, and growing a variety of crops. These strategies protect Pakistan’s natural resources while keeping them productive over the long run.' },
      { question: 'What kinds of crops are planted in Pakistan\'s Arid Land Development projects?', answer: 'Enrichers has the expertise to cultivate a wide diversity of crops such as rice, wheat, sugarcane, mustard, peanuts, and potatoes. Many of these crops are farmed for both local use and export, which helps Pakistan’s agricultural economy.' },
      { question: 'Why is it vital for Pakistan\'s agriculture sector to develop arid land?', answer: 'Arid Land Development is very important for Pakistan since it boosts food security, provides jobs, and improves exports. Enrichers helps Pakistan’s economy flourish and its rural areas improve by turning unproductive land into productive farms.' },
      { question: 'Why is arid land development important for Pakistan’s economy?', answer: 'Because Pakistan has large areas of uncultivated, arid or semi-arid land, which — if developed properly — can boost food security, generate jobs and increase agricultural exports. Arid land development is a strategic way to transform unproductive land into value-creating assets.' },
    ],
  }]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'arid-land-development' } }, limit: 1 })
  const data = { title: 'Arid Land Development', slug: 'arid-land-development', layout } as never
  const context = { context: { skipRevalidate: true } }
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
  else await payload.create({ collection: 'pages', data, ...context })
  payload.logger.info('Seeded the Arid Land Development consultation showcase')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
