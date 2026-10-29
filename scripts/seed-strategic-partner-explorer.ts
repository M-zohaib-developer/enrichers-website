import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const items = [
  {
    label: 'Stock Broking',
    eyebrow: 'Financial markets · Enrichers Securities (Pvt.) Ltd.',
    title: 'Stock Broking',
    body: 'Enrichers Securities Private Limited (ESPL) is a TREC holder of the Pakistan Stock Exchange (PSX), regulated by the SECP — your account, your trades and your money move through a properly licensed and monitored channel.',
    url: '/stock-broking/',
    icon: 'document',
  },
  {
    label: 'Commodity Brokerage',
    eyebrow: 'Commodities · Enrichers (Pvt.) Ltd.',
    title: 'Commodity Brokerage',
    body: 'Enrichers is a corporate member of the Pakistan Mercantile Exchange (PMEX), helping clients access regulated commodity markets with informed support and clear processes.',
    url: '/commodity-brokerage/',
    icon: 'document',
  },
  {
    label: 'Business Brokerage',
    eyebrow: 'Business advisory',
    title: 'Business Brokerage',
    body: 'Connect business owners and investors with confidential support across valuations, acquisitions, sales and deal execution.',
    url: '/business-brokerage/',
    icon: 'development',
  },
  {
    label: 'Arid Land Development',
    eyebrow: 'Real assets · Land development',
    title: 'Arid Land Development',
    body: 'Help clients explore productive land development opportunities built around sustainable agriculture, infrastructure and long-term local value.',
    url: '/arid-land-development/',
    icon: 'development',
  },
  {
    label: 'Agriculture',
    eyebrow: 'Real assets · Agriculture',
    title: 'Agriculture',
    body: 'Introduce clients to agriculture opportunities that combine disciplined farm management, smart technology and Pakistan’s long-term food economy.',
    url: '/agriculture/',
    icon: 'agriculture',
  },
  {
    label: 'Agriculture Research Centre',
    eyebrow: 'Research · Baab-ul-Ilm',
    title: 'Agriculture Research Centre',
    body: 'Connect organisations and learners with practical research, smart agriculture and updated technology for a more resilient food system.',
    url: '/school-of-agriculture-research-centre/',
    icon: 'research',
  },
  {
    label: 'Tourism & Hospitality',
    eyebrow: 'Real assets · Hospitality',
    title: 'Tourism & Hospitality',
    body: 'Share hospitality and destination development opportunities that bring together responsible investment, strong operations and lasting local value.',
    url: '/tourism-hospitality/',
    icon: 'hospitality',
  },
]

const run = async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'pages', where: { slug: { equals: 'strategicpartner' } }, limit: 1 })
  const page = result.docs[0]
  if (!page) throw new Error('Strategic Partner page was not found. Run npm run seed:missing-pages first.')

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[2] = {
    blockType: 'groupBusinessExplorer',
    eyebrow: 'What your clients can access',
    heading: 'Seven businesses to refer into',
    body: 'From PSX and PMEX brokerage to land, agriculture and hospitality.',
    buttons: [
      { blockType: 'primaryButton', label: 'Explore this business', url: '/stock-broking/' },
      { blockType: 'secondaryButton', label: 'Book a consultation', url: '/contact-us/#consultation' },
    ],
    items: items as never,
  }

  await payload.update({ collection: 'pages', id: page.id, data: { layout } as never, context: { skipRevalidate: true } })
  payload.logger.info('Updated the Strategic Partner business explorer')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
