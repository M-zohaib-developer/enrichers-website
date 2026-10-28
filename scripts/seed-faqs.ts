import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })
  const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'Enrichers frequently asked questions' } }, limit: 1 })
  const image = existingMedia.docs[0] ?? await payload.create({ collection: 'media', data: { alt: 'Enrichers frequently asked questions' }, filePath: path.resolve(dirname, '../public/brand/faq-hero.webp') })
  const layout = [
    {
      blockType: 'knowledgeHero',
      breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'FAQs', url: '' }],
      eyebrow: 'Knowledge center',
      heading: 'Frequently Asked Questions',
      body: 'Find clear answers about opening an account, trading with Enrichers, regulation and getting started in the markets.',
      image: image.id,
      imageAlt: 'Frequently asked questions',
    },
    {
      blockType: 'accountFaq',
      eyebrow: 'Questions',
      heading: 'How can we help you?',
      categories: [
        {
          label: 'Getting started',
          items: [
            { question: 'I am new to trading. How can you help me?', answer: 'Our team can explain the available markets, account options and basic trading process so you can choose a path that fits your goals.' },
            { question: 'How do I start trading with Enrichers?', answer: 'Choose PMEX or PSX, complete the account opening process, submit the required documents and deposit funds before placing trades.' },
            { question: 'What is the minimum capital required?', answer: 'The amount depends on whether you open a PMEX or PSX account. Contact our team for guidance based on your goals.' },
          ],
        },
        {
          label: 'Regulation & security',
          items: [
            { question: 'Is Enrichers regulated?', answer: 'Enrichers is a licensed financial broker of PMEX and PSX and operates under the regulatory oversight of SECP.' },
            { question: 'What is the security of deposited funds?', answer: 'Client funds are deposited through designated and regulated market infrastructure. Ask our team for the account-specific process before depositing.' },
          ],
        },
        {
          label: 'About Enrichers',
          items: [
            { question: 'How is Enrichers different from other brokers?', answer: 'We focus on client education, clear guidance and service support alongside access to regulated markets.' },
            { question: 'What markets can I access?', answer: 'Depending on your account, Enrichers provides access to PSX equities and PMEX commodities, currencies and futures.' },
          ],
        },
      ],
    },
    {
      blockType: 'readyWhenYouAre',
      heading: 'Have your own questions?',
      body: 'Talk to our team and get practical guidance for your next step.',
      buttons: [
        { blockType: 'primaryButton', label: 'Book a consultation', url: '/contact-us/#consultation' },
        { blockType: 'secondaryButton', label: 'Contact us', url: '/contact-us/' },
      ],
      riskNotice: 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.',
    },
  ]
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'faqs' } }, limit: 1 })
  const data = { title: 'Frequently Asked Questions', slug: 'faqs', layout } as never
  const context = { context: { skipRevalidate: true } }
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
  else await payload.create({ collection: 'pages', data, ...context })
  payload.logger.info('Seeded the editable FAQs page')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
