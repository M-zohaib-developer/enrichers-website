/**
 * Seeds /tourism-hospitality with the Candidate A reference layout.
 * Replaces whatever blocks the page currently has. Safe to re-run.
 *
 *   npx tsx scripts/seed-tourism-hospitality.ts
 */
import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ctx = { context: { skipRevalidate: true } }

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

  const [skarduHotelImg, consultImg1, consultImg2, consultImg3] = await Promise.all([
    getMedia('Architectural visualisation: aerial view of the Skardu Riverside Hotel above the river', 'skardu-hotel.webp'),
    getMedia('Tourism and hospitality consultation image 1', 'tourism-hospitality1.webp'),
    getMedia('Tourism and hospitality consultation image 2', 'tourism-hospitality2.webp'),
    getMedia('Tourism and hospitality consultation image 3', 'tourism-hospitality3.webp'),
  ])

  const existingForms = await payload.find({ collection: 'forms', where: { title: { equals: 'Tourism consultation' } }, limit: 1 })
  const formData = {
    title: 'Tourism consultation',
    fields: [
      { blockType: 'text', name: 'name', label: 'Name', required: true },
      { blockType: 'text', name: 'phone', label: 'Phone', required: true },
      { blockType: 'email', name: 'email', label: 'Email (optional)', required: false },
      {
        blockType: 'select', name: 'interest', label: 'Interest',
        options: [
          { label: 'Tourism & hospitality', value: 'tourism' },
          { label: 'Stock broking (PSX)', value: 'stock' },
          { label: 'Commodity brokerage (PMEX)', value: 'commodity' },
          { label: 'Business brokerage', value: 'business' },
          { label: 'Arid land & agriculture', value: 'agriculture' },
          { label: 'Strategic partnership', value: 'partnership' },
          { label: 'Something else', value: 'other' },
        ],
      },
      { blockType: 'textarea', name: 'message', label: 'Message' },
    ],
    submitButtonLabel: 'Send message',
    confirmationType: 'message',
    confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ text: 'Thank you. We will be in touch shortly.', type: 'text', version: 1 }] }] } },
  }
  const form = existingForms.docs[0]
    ? await payload.update({ collection: 'forms', id: existingForms.docs[0].id, data: formData as never })
    : await payload.create({ collection: 'forms', data: formData as never })

  const layout = [
    // 1. Hero
    {
      blockType: 'serviceHero',
      theme: 'dark',
      heroVariant: 'standard',
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: 'Tourism & Hospitality', url: '' },
      ],
      breadcrumbPosition: 'top',
      eyebrow: 'Hospitality',
      heading: "Tourism & hospitality Northern Pakistan's untapped potential.",
      headingAccent: "Northern Pakistan's untapped potential.",
      body: "Enrichers is unlocking Northern Pakistan's tourism potential with a bold vision and strategic investments — from developing a 5-star hotel in Skardu to crafting immersive cultural experiences.",
      primary: { label: 'Investor enquiries', url: '#consultation', variant: 'primary' },
      secondary: { label: 'Skardu Riverside Hotel', url: '/skardu-riverside-hotel/', variant: 'secondary' },
      badges: [],
    },

    // 2. Opportunity grid (4 items with icons)
    {
      blockType: 'clientServices',
      eyebrow: 'The opportunity',
      heading: 'Unveiling the untapped potential',
      body: '',
      items: [
        {
          icon: 'chart',
          title: 'Market insight',
          body: "Northern Pakistan's natural beauty, culture and rising popularity give its tourism strong potential.",
        },
        {
          icon: 'compass',
          title: 'Strategic vision',
          body: 'Five key locations across the region, each selected for its potential.',
        },
        {
          icon: 'globe',
          title: 'A luxurious escape',
          body: 'A 5-star hotel in Skardu, Gilgit-Baltistan, setting a new standard for luxury hospitality there.',
        },
        {
          icon: 'scale',
          title: 'Unforgettable experiences',
          body: 'Beyond accommodation: immersion in the area\'s culture, scenery and history.',
        },
      ],
      buttons: [],
    },

    // 3. Skardu Riverside Hotel feature
    {
      blockType: 'skarduHotelFeature',
      eyebrow: 'Flagship project',
      heading: 'Skardu Riverside Hotel',
      body: 'A purpose-built 5-star luxury hotel on 40 kanals of riverside land in Skardu, Gilgit-Baltistan.',
      image: skarduHotelImg.id,
      imageCaption: 'Architectural visualisation',
      facts: [
        { value: '40 kanal', label: 'Riverside land' },
        { value: '6 km', label: 'From Skardu city' },
        { value: '20 km', label: 'From Skardu International Airport' },
        { value: '100+ rooms', label: '5-star luxury hotel' },
      ],
      buttons: [{ blockType: 'primaryButton', label: 'Explore Skardu Riverside Hotel', url: '/skardu-riverside-hotel/' }],
    },

    // 4. Consultation / investor enquiries
    {
      blockType: 'consultationShowcase',
      sectionId: 'consultation',
      eyebrow: 'Investor enquiries',
      heading: "Invest in Northern Pakistan's hospitality",
      subheading: 'Equity partnerships, co-development and structured schemes. Tell us what interests you.',
      phone: '(042) 111 111 333',
      phoneHref: 'tel:+9242111111333',
      whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
      whatsappLabel: 'WhatsApp our client support',
      hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
      formStepLabel: 'Demo — nothing is submitted',
      formHeading: 'Tell us what interests you',
      formIntro: '',
      form: form.id,
      images: [
        { image: consultImg1.id, alt: 'Northern Pakistan mountain landscape' },
        { image: consultImg2.id, alt: 'Luxury hotel interior' },
        { image: consultImg3.id, alt: 'Skardu valley aerial view' },
      ],
    },

    // 5. Tourism guide accordion
    {
      blockType: 'guideAccordion',
      sectionId: 'tourism-guide',
      eyebrow: '',
      heading: "Investing in Northern Pakistan's tourism",
      intro: "Rising domestic tourism, international interest and a shortage of quality hotels. The guide from our current site.",
      items: [
        {
          question: 'Why Northern Pakistan',
          answer: "World-known landmarks, a gap between tourist demand and the supply of luxury accommodation, and growing support from government and the private sector.",
        },
        {
          question: 'Sustainable tourism',
          answer: "Sustainability is a practical necessity: it protects the long-term value of the destination and the assets built there.",
        },
        {
          question: 'What makes a strong tourism investment',
          answer: "Projects that respect local heritage, plan realistic timelines and connect visitors to authentic culture.",
        },
        {
          question: 'How investors get involved',
          answer: "Equity partnerships, co-development models and structured investment schemes, with financial modelling and risk assessment for each project.",
        },
      ],
    },

    // 6. FAQ accordion
    {
      blockType: 'faqAccordion',
      sectionId: 'tourism-faq',
      eyebrow: '',
      heading: 'Tourism & hospitality FAQs',
      items: [
        {
          question: "What is Enrichers' role in Northern Pakistan's tourism?",
          answer: 'We invest in key destinations to grow tourism, starting with a planned 5-star hotel in Skardu.',
        },
        {
          question: 'What sets these investments apart?',
          answer: 'A focus on luxury projects that balance comfort, local culture and sustainability.',
        },
        {
          question: 'Which regions do you focus on?',
          answer: 'Mountain, lake and desert destinations across Pakistan, beginning with Gilgit-Baltistan.',
        },
        {
          question: 'How can investors get involved?',
          answer: 'Through equity partnerships, co-development models and structured investment schemes, supported by project details, financial modelling and risk assessment.',
        },
      ],
    },

    // 7. Related services — the rest of the group
    {
      blockType: 'groupBusinessExplorer',
      eyebrow: '',
      heading: 'The rest of the group',
      body: 'Brokerage, real assets, agriculture and hospitality under one group.',
      buttons: [],
      items: [
        {
          eyebrow: 'Advisory',
          label: 'Advisory',
          title: 'Business Brokerage',
          quote: 'Enrichers Business Brokerage',
          body: 'Mergers & acquisitions, buying and selling businesses, franchise brokerage and valuation.',
          url: '/business-brokerage/',
          icon: 'document',
        },
        {
          eyebrow: 'Real assets',
          label: 'Real assets',
          title: 'Arid Land Development',
          quote: 'Enrichers Developers (Pvt.) Ltd.',
          body: 'Turning arid land into productive farmland through a sweat-equity partnership model.',
          url: '/arid-land-development/',
          icon: 'development',
        },
        {
          eyebrow: 'Agriculture',
          label: 'Agriculture',
          title: 'Agriculture',
          quote: 'Enri-Farms',
          body: 'Smart agriculture, seed banking, export cultivation, dairy and Mudarabah corporate farming.',
          url: '/agriculture/',
          icon: 'agriculture',
        },
        {
          eyebrow: 'Agriculture',
          label: 'Agriculture',
          title: 'Agriculture Research Centre',
          quote: 'Baab-ul-Ilm',
          body: 'An institute of agriculture sciences and research tackling challenges in the agri-food system.',
          url: '/school-of-agriculture-research-centre/',
          icon: 'research',
        },
      ],
    },
  ]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'tourism-hospitality' } }, limit: 1 })
  const data = { title: 'Tourism & Hospitality', slug: 'tourism-hospitality', layout } as never

  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...ctx })
  } else {
    await payload.create({ collection: 'pages', data, ...ctx })
  }

  payload.logger.info('Seeded /tourism-hospitality — 7 blocks matching Candidate A reference')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
