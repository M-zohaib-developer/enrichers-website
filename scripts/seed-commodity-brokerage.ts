import 'dotenv/config'

import { getPayload } from 'payload'
import config from '../src/payload.config'

const run = async () => {
  const payload = await getPayload({ config })
  const layout = [
    {
      blockType: 'serviceHero',
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: 'Commodity Brokerage', url: '' },
      ],
      eyebrow: 'Enrichers (Pvt.) Ltd.',
      heading: 'Commodity brokerage on PMEX',
      body: 'A full-scale futures broker with a Centralized Trading Unit — so you\'re never left guessing about margin calls, rollovers or settlement.',
      primary: { label: 'Open a PMEX account', url: '/open-account', variant: 'primary' },
      secondary: { label: 'Talk to an advisor', url: '#consultation', variant: 'secondary' },
      badges: [{ label: 'PMEX corporate member' }, { label: 'SECP regulated' }],
    },
    {
      blockType: 'sectionNavigation',
      ariaLabel: 'On this page',
      links: [
        { label: 'Product range', anchor: 'products', active: true },
        { label: 'Documents', anchor: 'documents' },
        { label: 'Consultation', anchor: 'consultation' },
        { label: 'FAQ', anchor: 'faq' },
      ],
      cta: { label: 'Open a PMEX account', url: '/open-account' },
    },
    {
      blockType: 'productRange',
      sectionId: 'products',
      eyebrow: 'Product range',
      heading: 'Futures, currencies and US indices',
      body: 'EPL offers four categories — metal, energy, agriculture and financials — through PMEX.',
      tabs: [
        {
          label: 'Deliverable futures',
          quote: 'Profiting is managing your risk.',
          features: [
            { term: 'Hassle-free', description: "EPL's physical deliverable futures offer hassle-free trading." },
            { term: 'Authentic', description: 'Actual delivery of settlement ensures reliability and authenticity.' },
            { term: 'Flexible', description: 'Flexible liquidation options for effortless P&L management.' },
            { term: 'Versatile', description: 'Suitable for producers, processors, and consumers across industries.' },
          ],
        },
        {
          label: 'Cash-settled futures',
          quote: 'Profiting is managing your risk.',
          features: [
            { term: 'No delivery', description: 'Liberates traders from physical commodity delivery obligations.' },
            { term: 'Cash only', description: 'Settlement occurs solely in cash, eliminating physical transactions.' },
            { term: 'Flexible exit', description: "Liquidate positions at expiration or at the trader's discretion." },
            { term: '4 categories', description: 'Metal, energy, agriculture, and financials.' },
          ],
        },
        {
          label: 'Currencies',
          quote: 'Profiting is managing your risk.',
          features: [
            { term: 'Lot size', description: 'Traded in lots of 100,000 units of the base currency (e.g. 1 lot EUR/USD = 100,000 euros).' },
            { term: 'Margin', description: 'Minimum margin is set by PMEX and EPL, typically around 1% of total trade value.' },
            { term: 'Know your exposure', description: 'Understanding lot sizes and margin requirements is crucial for managing trades.' },
          ],
        },
        {
          label: 'US index futures',
          quote: 'Profiting is managing your risk.',
          features: [
            { term: 'Priced in US dollars', description: 'Trade the future direction of major US indices through PMEX.' },
          ],
        },
      ],
      disclosureText: 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Margin requirements are set by PMEX and EPL.',
      disclosureLabel: 'Read the disclosures',
      disclosureUrl: '/regulation',
    },
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'commodity-brokerage' } },
    limit: 1,
  })
  const data = { title: 'Commodity Brokerage', slug: 'commodity-brokerage', layout } as never
  const context = { context: { skipRevalidate: true } }

  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
    payload.logger.info('Updated the editable Commodity Brokerage page')
  } else {
    await payload.create({ collection: 'pages', data, ...context })
    payload.logger.info('Created the editable Commodity Brokerage page')
  }

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
