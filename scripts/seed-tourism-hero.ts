import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })
  const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'Tourism Hospitality' } }, limit: 1 })
  const heroImage = existingMedia.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'Tourism Hospitality' },
    filePath: path.resolve(dirname, '../public/brand/tourism-hospitality.webp'),
  })

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'tourism-hospitality' } },
    limit: 1,
  })
  const page = existing.docs[0]
  if (!page) throw new Error('Tourism & Hospitality page was not found. Run npm run seed:missing-pages first.')

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[0] = {
    blockType: 'marketHero',
    eyebrow: '',
    heading: 'Tourism & Hospitality',
    headingLineOne: '',
    headingLineTwo: '',
    headingLineThree: '',
    body: '',
    showButtons: false,
    buttons: [],
    heroImage: heroImage.id,
    badges: [],
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { layout } as never,
    context: { skipRevalidate: true },
  })
  payload.logger.info('Seeded the Tourism & Hospitality MarketHero')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
