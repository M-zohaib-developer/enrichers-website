/**
 * Seeds the Header and Footer globals.
 *
 * Why this exists: Payload `defaultValue`s only apply when a document is first
 * created. The globals in this database were created under the older field
 * shape, so the new navItems / contact / regulation fields come back empty and
 * the admin form opens blank — an editor would have to retype everything by
 * hand. This writes the same values the components fall back to, which makes
 * them visible and editable in admin.
 *
 * Safe to re-run; it overwrites the two globals and nothing else.
 *
 *   npx tsx scripts/seed-globals.ts
 */
// Next loads .env for us at runtime; a bare tsx process does not, so without
// this the script dies on "missing secret key" before it reaches the database.
import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'
import {
  FALLBACK_CONSULTATION,
  FALLBACK_CONTACT as HEADER_CONTACT,
  FALLBACK_CTA,
  FALLBACK_NAV,
} from '../src/Header/defaults'
import {
  FALLBACK_BOTTOM,
  FALLBACK_CONTACT as FOOTER_CONTACT,
  FALLBACK_DESCRIPTION,
  FALLBACK_GROUPS,
  FALLBACK_LEGAL,
  FALLBACK_OFFICES_LINE,
  FALLBACK_REGULATION,
  FALLBACK_REGULATION_TITLE,
  fallbackCopyright,
} from '../src/Footer/defaults'

const run = async () => {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: FALLBACK_NAV,
      consultationLink: { link: FALLBACK_CONSULTATION },
      ctaButton: { link: FALLBACK_CTA },
      contact: HEADER_CONTACT,
    } as never,
    context: { skipRevalidate: true },
  })
  payload.logger.info('Seeded header global')

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description: FALLBACK_DESCRIPTION,
      ...FOOTER_CONTACT,
      ...FALLBACK_GROUPS,
      regulationTitle: FALLBACK_REGULATION_TITLE,
      regulationLinks: FALLBACK_REGULATION,
      legalParagraphs: FALLBACK_LEGAL,
      officesLine: FALLBACK_OFFICES_LINE,
      copyrightText: fallbackCopyright(),
      bottomLinks: FALLBACK_BOTTOM,
    } as never,
    context: { skipRevalidate: true },
  })
  payload.logger.info('Seeded footer global')

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
