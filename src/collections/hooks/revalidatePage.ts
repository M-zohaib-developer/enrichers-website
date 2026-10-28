import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

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

export const revalidatePage: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  // Standalone scripts (the seeders) have no Next request store, so
  // revalidatePath() throws there and would abort the write.
  if (context?.skipRevalidate) return doc

  const path = pathFor(doc?.slug)
  if (path) {
    payload.logger.info(`Revalidating page ${path}`)
    revalidatePath(path)
  }

  // A renamed slug leaves the old URL cached, so clear that too.
  const previousPath = pathFor(previousDoc?.slug)
  if (previousPath && previousPath !== path) {
    payload.logger.info(`Revalidating old page path ${previousPath}`)
    revalidatePath(previousPath)
  }

  return doc
}

export const revalidatePageAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { context },
}) => {
  if (context?.skipRevalidate) return doc
  const path = pathFor(doc?.slug)
  if (path) revalidatePath(path)
  return doc
}
