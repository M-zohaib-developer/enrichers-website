import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const run = async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'latest-insight' } },
    limit: 1,
  })
  const page = result.docs[0]
  if (!page) throw new Error('Latest Insight page was not found. Run npm run seed:missing-pages first.')

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[0] = {
    blockType: 'serviceHero',
    theme: 'light',
    heroVariant: 'standard',
    breadcrumbPosition: 'top',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'Research', url: '/latest-insight/' },
    ],
    eyebrow: 'Enrichers research',
    heading: 'Market insight from our research team',
    body: "Notes on Pakistan's equity market, commodities and the global economy. Filter by topic, or browse the articles below.",
    primary: { label: 'Talk to an analyst', url: '/contact-us/#consultation', variant: 'primary' },
    secondary: { label: 'Financial glossary', url: '/financial-glossary/', variant: 'secondary' },
    badges: [],
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { title: 'Latest Market Insights', layout } as never,
    context: { skipRevalidate: true },
  })
  payload.logger.info('Updated the Latest Insight hero')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
