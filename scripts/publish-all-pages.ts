/**
 * Marks every page as published.
 *
 * Enabling `versions.drafts` adds a `_status` column, and Payload defaults
 * existing rows to `draft`. Public queries then filter them out, so the whole
 * site 404s until the back-catalogue is published once. This does that.
 *
 * Idempotent — already-published pages are skipped, so it is safe to re-run
 * (for example after restoring a database dump taken before drafts existed).
 *
 *   npx tsx scripts/publish-all-pages.ts
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const run = async () => {
  const payload = await getPayload({ config })

  // Deliberately NOT `draft: true`: that reads the `_pages_v` version tables,
  // and documents created before drafts were enabled have no version rows yet
  // — the query comes back empty. `overrideAccess` alone reads the live
  // `pages` table, which is where these rows actually are.
  const { docs } = await payload.find({
    collection: 'pages',
    limit: 1000,
    depth: 0,
    overrideAccess: true,
    pagination: false,
  })

  let published = 0
  let skipped = 0

  for (const doc of docs) {
    const status = (doc as unknown as { _status?: string })._status
    if (status === 'published') {
      skipped++
      continue
    }

    await payload.update({
      collection: 'pages',
      id: doc.id,
      data: { _status: 'published' } as never,
      overrideAccess: true,
      // Skip revalidation chatter; the pages are re-rendered on next request.
      context: { skipRevalidate: true },
    })
    published++
  }

  console.log(`pages total     : ${docs.length}`)
  console.log(`newly published : ${published}`)
  console.log(`already live    : ${skipped}`)

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
