import type { Access } from 'payload'

/**
 * Read access for a collection with drafts enabled.
 *
 * Without this, `read: () => true` would hand unpublished drafts to anyone who
 * asks — including the public REST API — the moment versions are turned on.
 * Logged-in users see everything; everyone else is constrained to published
 * documents by a query filter rather than a flat allow/deny.
 *
 * The frontend preview route still reaches drafts: `[slug]/page.tsx` passes
 * `overrideAccess: draft`, which bypasses this check only once draft mode has
 * been enabled, and that requires both the preview secret and a valid session.
 */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    _status: {
      equals: 'published',
    },
  }
}
