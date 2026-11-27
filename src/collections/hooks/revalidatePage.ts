import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Busts the cache for a page after it is edited.
 *
 * Without this the homepage is prerendered at build time and never changes
 * again: an editor saves in admin, the database updates, and the live page
 * keeps serving the build-time copy until the next deploy. It only looks
 * correct in `next dev`, which does not cache that way — which is exactly why
 * it is easy to miss. The Header and Footer globals have had their own
 * revalidate hooks all along; this is the collection equivalent.
 */
const pathFor = (slug?: string | null) => (slug === 'home' ? '/' : slug ? `/${slug}` : null)

/**
 * Bust BOTH cache layers for a page's slug:
 *  - `revalidatePath` clears the prerendered / ISR route (the full HTML).
 *  - `revalidateTag` clears the `unstable_cache` published-page data (see
 *    `getCachedPageBySlug` in `src/utilities/getCachedDocument.ts`).
 *
 * Both are required. Without the tag bust, `revalidatePath` would regenerate the
 * route but `getCachedPageBySlug` would still return the stale cached document,
 * so the live page would keep showing the old content. The home route does not
 * use the cached fetch, so only its path is revalidated (tag is harmless/no-op).
 */
const revalidateSlug = (slug?: string | null) => {
  const path = pathFor(slug)
  if (path) revalidatePath(path)
  if (slug) revalidateTag(`pages_${slug}`, 'max')
}

export const revalidatePage: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  // Standalone scripts (the seeders) have no Next request store, so
  // revalidatePath() throws there and would abort the write.
  if (context?.skipRevalidate) return doc

  payload.logger.info(`Revalidating page ${pathFor(doc?.slug) ?? '(no slug)'}`)
  revalidateSlug(doc?.slug)

  // A renamed slug leaves the old URL and old data tag cached, so clear those too.
  if (previousDoc?.slug && previousDoc.slug !== doc?.slug) {
    payload.logger.info(`Revalidating old page path ${pathFor(previousDoc.slug)}`)
    revalidateSlug(previousDoc.slug)
  }

  return doc
}

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (context?.skipRevalidate) return doc
  revalidateSlug(doc?.slug)
  return doc
}
