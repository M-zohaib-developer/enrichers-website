import type { CollectionAfterChangeHook } from 'payload'

import { sendReviewNotification } from '@/utilities/sendReviewNotification'

/**
 * Detects a review-status transition and fires the matching notification.
 *
 * Runs in `afterChange` so a write failure in the guard never leaves us with
 * a confusing "we told you it was approved — but actually we rolled back"
 * email. Send failures are retried once inside the notification utility and,
 * if both attempts fail, logged with full structured context — the write
 * itself is never reverted.
 */
export const pagesReviewAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
}) => {
  if (operation !== 'update') return doc

  // Scripts that explicitly bypass the guard (backfills, mass fixes)
  // shouldn't blast notifications — honour the same flag.
  if ((req as any)?.context?.skipReviewGuard === true) return doc

  const prev = previousDoc?.reviewStatus
  const next = doc?.reviewStatus
  if (!next || prev === next) return doc

  const payload = req.payload

  // Resolve the editor / admin email addresses. The relationship fields can
  // come back as an id or an expanded object depending on depth; cover both.
  const resolveEmail = async (ref: unknown): Promise<string | null> => {
    if (!ref) return null
    if (typeof ref === 'object') return (ref as any).email ?? null
    try {
      const u = (await payload.findByID({
        collection: 'users' as any,
        id: ref as any,
        depth: 0,
        overrideAccess: true,
      })) as any
      return u?.email ?? null
    } catch {
      return null
    }
  }

  const submittedByEmail = await resolveEmail(doc.submittedBy)
  const reviewedByEmail = await resolveEmail(doc.reviewedBy)
  const submittedByObj = submittedByEmail
    ? { id: doc.submittedBy as any, email: submittedByEmail }
    : null
  const reviewedByObj = reviewedByEmail ? { email: reviewedByEmail } : null

  const page = { id: doc.id, title: doc.title, slug: doc.slug }

  // Fire-and-forget: never block the HTTP response on SMTP, and never throw
  // from here — the notification utility already logs its own failures.
  const kick = (event: 'submitted' | 'approved' | 'changes_requested' | 'rejected') => {
    void sendReviewNotification({
      payload,
      event,
      page,
      submittedBy: submittedByObj,
      reviewedBy: reviewedByObj,
      reviewNote: doc.reviewNote ?? null,
    })
  }

  if (next === 'pending' && prev !== 'pending') kick('submitted')
  else if (next === 'approved' && prev !== 'approved') kick('approved')
  else if (next === 'changes_requested' && prev !== 'changes_requested') kick('changes_requested')
  else if (next === 'draft' && prev === 'pending') kick('rejected')

  return doc
}
