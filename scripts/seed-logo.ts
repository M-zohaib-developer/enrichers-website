/**
 * Puts the brand logo into the Media collection and links it to both globals.
 *
 * Without this the logo still renders — `components/Logo` falls back to the
 * bundled `public/brand/enrichers-logo.webp` — but the Header and Footer
 * upload fields look empty in admin, so an editor has no way to see or change
 * it. This uploads the same artwork through Payload so it becomes a real Media
 * document with a row in the database, and points `header.logo` and
 * `footer.logo` at it.
 *
 * Idempotent: it reuses the existing Media document if one is already there.
 *
 *   npx tsx scripts/seed-logo.ts
 */
import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const LOGO_PATH = path.resolve(dirname, '../public/brand/enrichers-logo.webp')
const ALT = 'Enrichers Investment Group — Converting To Real-Wealth'

const run = async () => {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: ALT } },
    limit: 1,
  })

  let logoId: number | string

  if (existing.docs.length > 0) {
    logoId = existing.docs[0].id
    payload.logger.info(`Reusing existing media document (id ${logoId})`)
  } else {
    const created = await payload.create({
      collection: 'media',
      data: { alt: ALT },
      filePath: LOGO_PATH,
    })
    logoId = created.id
    payload.logger.info(`Uploaded logo as media id ${logoId} (${created.filename})`)
  }

  // skipRevalidate: revalidateTag() needs a Next request/render store, which a
  // standalone script has no access to — without this the afterChange hook
  // throws and aborts the write.
  const ctx = { context: { skipRevalidate: true } }
  await payload.updateGlobal({ slug: 'header', data: { logo: logoId } as never, ...ctx })
  await payload.updateGlobal({ slug: 'footer', data: { logo: logoId } as never, ...ctx })
  payload.logger.info('Linked logo to the header and footer globals')

  const header = (await payload.findGlobal({ slug: 'header', depth: 1 })) as Record<string, any>
  payload.logger.info(`header.logo.url = ${header?.logo?.url ?? '(not set)'}`)

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
