import type { Access } from 'payload'

/**
 * Update access for the Pages collection with the review workflow on.
 *
 * - Admin: full write access always.
 * - Editor: can only update pages currently in `draft` or `changes_requested`.
 *   Pages in `pending` or `approved` are locked server-side — the editor cannot
 *   edit a page that's awaiting review, nor one that an admin has approved.
 *   Payload translates the returned where-clause into a SQL filter and returns
 *   403 on any row outside it.
 */
export const pagesUpdateAccess: Access = ({ req }) => {
  const role = req?.user?.role
  if (role === 'admin') return true
  if (role === 'editor') {
    return {
      reviewStatus: { in: ['draft', 'changes_requested'] },
    }
  }
  return false
}
