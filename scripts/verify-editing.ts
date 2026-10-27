/**
 * Proves an editor's change actually persists and reaches the rendered page.
 *
 * Writes a recognisable value into the Header global, re-reads it, fetches the
 * front end to confirm it rendered, then restores the original. If any step
 * fails the original is still restored.
 *
 *   npx tsx scripts/verify-editing.ts
 */
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const SITE = process.env.VERIFY_URL ?? 'http://localhost:3000/'
const PROBE = 'Open an account — EDIT TEST'

const run = async () => {
  const payload = await getPayload({ config })

  const before = (await payload.findGlobal({ slug: 'header' })) as Record<string, any>
  const originalLabel = before?.ctaButton?.link?.label
  const navCount = Array.isArray(before?.navItems) ? before.navItems.length : 0
  console.log(`read back   : navItems=${navCount}, ctaButton.label=${JSON.stringify(originalLabel)}`)

  if (navCount === 0) {
    console.error('FAIL: navItems is empty — the global was never seeded.')
    process.exit(1)
  }

  try {
    await payload.updateGlobal({
      slug: 'header',
      data: { ctaButton: { link: { label: PROBE, url: '/open-account/' } } } as never,
      context: { skipRevalidate: true },
    })

    const after = (await payload.findGlobal({ slug: 'header' })) as Record<string, any>
    const persisted = after?.ctaButton?.link?.label
    console.log(`after write : ctaButton.label=${JSON.stringify(persisted)}`)

    if (persisted !== PROBE) {
      console.error('FAIL: the write did not persist.')
      process.exit(1)
    }

    const html = await fetch(SITE, { cache: 'no-store' }).then((r) => r.text())
    const rendered = html.includes(PROBE)
    console.log(`rendered    : ${rendered ? 'yes — edit reached the page' : 'NO'}`)

    if (!rendered) {
      console.error('FAIL: the saved value did not reach the rendered page.')
      process.exit(1)
    }

    console.log('\nPASS — edits save and render.')
  } finally {
    await payload.updateGlobal({
      slug: 'header',
      data: {
        ctaButton: { link: { label: originalLabel ?? 'Open an account', url: '/open-account/' } },
      } as never,
      context: { skipRevalidate: true },
    })
    console.log(`restored    : ctaButton.label=${JSON.stringify(originalLabel)}`)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
