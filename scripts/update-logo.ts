/**
 * Force-replaces the Media logo document with enrichers-logo-enhanced.webp
 * then re-links header and footer.
 *
 *   npx tsx scripts/update-logo.ts
 */
import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const LOGO_PATH = path.resolve(dirname, '../public/brand/enrichers-logo-enhanced.webp')
const ALT = 'Enrichers Investment Group — Converting To Real-Wealth'

const run = async () => {
  const payload = await getPayload({ config })
  const ctx = { context: { skipRevalidate: true } }

  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: ALT } },
    limit: 1,
  })

  let logoId: number | string

  if (existing.docs.length > 0) {
    logoId = existing.docs[0].id
    const updated = await payload.update({
      collection: 'media',
      id: logoId,
      data: { alt: ALT },
      filePath: LOGO_PATH,
    })
    payload.logger.info(`Re-uploaded logo -> ${updated.filename} (id ${logoId})`)
  } else {
    const created = await payload.create({
      collection: 'media',
      data: { alt: ALT },
      filePath: LOGO_PATH,
    })
    logoId = created.id
    payload.logger.info(`Created logo media id ${logoId} (${created.filename})`)
  }

  await payload.updateGlobal({ slug: 'header', data: { logo: logoId } as never, ...ctx })
  await payload.updateGlobal({ slug: 'footer', data: { logo: logoId } as never, ...ctx })
  payload.logger.info('Header and footer updated.')

  const header = (await payload.findGlobal({ slug: 'header', depth: 1 })) as Record<string, any>
  payload.logger.info(`header.logo.url = ${header?.logo?.url ?? '(not set)'}`)

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
