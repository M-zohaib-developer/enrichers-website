import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@/payload.config'

async function getPublishedPage(slug: string) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'pages',
    // Published-only on purpose. `draft: false` reads the published version,
    // and `overrideAccess: false` runs `authenticatedOrPublished` with no user
    // (no request in this cached context), which further constrains the query
    // to `_status: 'published'`. Both together guarantee a draft can never
    // leak through this public path even if one guard changes later.
    draft: false,
    overrideAccess: false,
    depth: 1,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  return result.docs[0] ?? null
}

/**
 * Cached published-page fetch — the collection equivalent of `getCachedGlobal`.
 *
 * The published page body is cached across requests via `unstable_cache` and
 * only refetched when its tag is invalidated by `revalidatePage` (on publish,
 * update, delete, or slug change). Keyed and tagged per-slug so busting one
 * page never drops the others.
 *
 * IMPORTANT (Next.js 16): the cached callback does NOT read `draftMode()`,
 * `cookies()`, or `headers()` — those are request-scoped and are forbidden
 * inside `unstable_cache`. Draft detection stays in the route component, which
 * only calls this function on the published (non-draft) branch. A draft request
 * bypasses this entirely and fetches live with `overrideAccess: true`.
 */
export const getCachedPageBySlug = (slug: string) =>
  unstable_cache(() => getPublishedPage(slug), ['pages', slug], {
    tags: ['pages', `pages_${slug}`],
  })()
