import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'pages', where: { slug: { equals: 'strategicpartner' } }, limit: 1 })
  const page = result.docs[0]
  if (!page) throw new Error('Strategic Partner page was not found. Run npm run seed:missing-pages first.')

  const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'The Enrichers client-services floor in Lahore' } }, limit: 1 })
  const image = existingMedia.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'The Enrichers client-services floor in Lahore' },
    filePath: path.resolve(dirname, '../public/brand/trading-floor.webp'),
  })

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[1] = {
    blockType: 'imageTextFeature',
    sectionId: 'programme',
    heading: 'Connect your network to Enrichers',
    body: "The programme is for professionals who move quickly in the market. You connect your network with Enrichers' investment services, giving your clients access to a regulated broker and a diversified group.\n\nIn return, a structured incentive rewards every referral, built to become a steady secondary income.",
    highlights: [
      { label: 'Refer clients' },
      { label: 'Create impact' },
      { label: 'Earn recurring side income' },
    ],
    image: image.id,
    imageAlt: 'The Enrichers client-services floor in Lahore',
    imagePosition: 'left',
    background: 'sunken',
  }

  await payload.update({ collection: 'pages', id: page.id, data: { layout } as never, context: { skipRevalidate: true } })
  payload.logger.info('Updated the Strategic Partner programme section')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
