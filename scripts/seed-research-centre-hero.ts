import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })
  const mediaResult = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Agriculture Research Center' } },
    limit: 1,
  })
  const image = mediaResult.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'Agriculture Research Center' },
    filePath: path.resolve(dirname, '../public/brand/research-centre.webp'),
  })

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'school-of-agriculture-research-centre' } },
    limit: 1,
  })
  const page = existing.docs[0]
  if (!page) throw new Error('Research Centre page was not found. Run npm run seed:missing-pages first.')

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[0] = {
    blockType: 'marketHero',
    eyebrow: '',
    heading: 'Agriculture Research Center',
    headingLineOne: '',
    headingLineTwo: '',
    headingLineThree: '',
    body: '',
    showButtons: false,
    buttons: [],
    heroImage: image.id,
    badges: [],
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { layout } as never,
    context: { skipRevalidate: true },
  })
  payload.logger.info('Updated the Agriculture Research Centre hero')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
