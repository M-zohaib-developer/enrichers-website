import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload, type GlobalSlug } from 'payload'

import config from '@/payload.config'

async function getGlobal(slug: GlobalSlug, depth = 0) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  return payload.findGlobal({ slug, depth })
}

/**
 * Caches a global per-slug per-request (react cache) and across requests
 * via a tag (unstable_cache) so the admin-edited Header/Footer content is
 * fetched once and revalidated only when its afterChange hook fires.
 */
export const getCachedGlobal = (slug: GlobalSlug, depth = 0) =>
  cache(async () =>
    unstable_cache(async () => getGlobal(slug, depth), [slug], {
      tags: [`global_${slug}`],
    })(),
  )
