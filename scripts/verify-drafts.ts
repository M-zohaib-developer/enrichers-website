/**
 * Proves drafts behave correctly end to end:
 *
 *   1. saves a draft-only change to a page
 *   2. the PUBLIC api still returns the old, published title
 *   3. a draft read returns the new title
 *   4. the published document is left untouched
 *
 * Step 2 is the one that matters — it is what stops unpublished work leaking
 * to visitors. Restores the draft state on the way out either way.
 *
 *   npx tsx scripts/verify-drafts.ts
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const SITE = process.env.VERIFY_URL ?? 'http://localhost:3000'
const PROBE = 'DRAFT ONLY — should not be public'

const run = async () => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'about-us' } },
    limit: 1,
    overrideAccess: true,
    pagination: false,
  })
  const page = docs[0]
  if (!page) {
    console.error('FAIL: no about-us page to test with.')
    process.exit(1)
  }

  const originalTitle = page.title
  console.log(`published title : ${JSON.stringify(originalTitle)}`)

  let failed = false
  try {
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { title: PROBE } as never,
      draft: true,
      overrideAccess: true,
      context: { skipRevalidate: true },
    })

    const publicJson = await fetch(
      `${SITE}/api/pages?where[slug][equals]=about-us&depth=0`,
      { cache: 'no-store' },
    ).then((r) => r.json())
    const publicTitle = publicJson?.docs?.[0]?.title
    console.log(`public api sees : ${JSON.stringify(publicTitle)}`)

    const draftRead = await payload.findByID({
      collection: 'pages',
      id: page.id,
      draft: true,
      overrideAccess: true,
    })
    console.log(`draft read sees : ${JSON.stringify(draftRead.title)}`)

    if (publicTitle === PROBE) {
      console.error('\nFAIL: the draft leaked to the public API.')
      failed = true
    } else if (publicTitle !== originalTitle) {
      console.error(`\nFAIL: public title changed unexpectedly.`)
      failed = true
    } else if (draftRead.title !== PROBE) {
      console.error('\nFAIL: the draft did not save.')
      failed = true
    } else {
      console.log('\nPASS — drafts are private, and readable in preview.')
    }
  } finally {
    await payload.update({
      collection: 'pages',
      id: page.id,
      data: { title: originalTitle } as never,
      draft: true,
      overrideAccess: true,
      context: { skipRevalidate: true },
    })
    console.log(`restored        : ${JSON.stringify(originalTitle)}`)
  }

  process.exit(failed ? 1 : 0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
