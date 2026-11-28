import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

type ReviewStatus = 'draft' | 'pending' | 'changes_requested' | 'approved'

const EDITOR_ALLOWED: Record<ReviewStatus, ReviewStatus[]> = {
  draft: ['draft', 'pending'],
  changes_requested: ['changes_requested', 'pending'],
  // Editors can never start FROM these states — collection access blocks them
  // before the hook — but we still enumerate so bugs can't silently permit.
  pending: [],
  approved: [],
}

/**
 * Enforces the review workflow on every write to the pages collection.
 *
 * This is the server-side truth; the admin-panel UI buttons only ever
 * trigger API calls that pass through here, so a crafted REST request
 * can't bypass the rules.
 *
 * - Editors may only transition draft→pending or changes_requested→pending.
 * - Editors may never set _status to 'published' or reviewStatus to 'approved'.
 * - Admins may do anything; approving also flips _status to 'published'.
 * - Submit/Approve/Request Changes auto-stamp submittedBy/At + reviewedBy/At.
 *
 * context.skipReviewGuard is honoured ONLY when the write has no user
 * (i.e. a trusted server-side script via overrideAccess) OR the user is
 * admin. An editor API request setting that flag is ignored, so the flag
 * can't be used to smuggle a publish through.
 */
export const pagesReviewGuard: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
  req,
}) => {
  const userRole = req?.user?.role as 'admin' | 'editor' | undefined
  const now = new Date().toISOString()

  const bypass = (req as any)?.context?.skipReviewGuard === true
  const bypassAllowed = bypass && (!req?.user || userRole === 'admin')
  if (bypassAllowed) return data

  // ─── CREATE ─────────────────────────────────────────────────────────────
  // Any newly-created page starts as a draft regardless of what the client
  // tried to post. Editors cannot post `approved` or `_status: published`.
  if (operation === 'create') {
    if (userRole === 'editor') {
      if (data?._status === 'published') {
        throw new APIError('Only administrators can publish pages.', 403)
      }
      if (data?.reviewStatus === 'approved') {
        throw new APIError('Only administrators can approve pages.', 403)
      }
      data.reviewStatus = data?.reviewStatus === 'pending' ? 'pending' : 'draft'
      data._status = 'draft'
      if (data.reviewStatus === 'pending') {
        data.submittedBy = req!.user!.id
        data.submittedAt = now
      }
    }
    return data
  }

  // ─── UPDATE ─────────────────────────────────────────────────────────────
  const prevStatus = (originalDoc?.reviewStatus ?? 'draft') as ReviewStatus
  const nextStatusRaw = (data?.reviewStatus ?? prevStatus) as ReviewStatus
  const incomingPayloadStatus = data?._status as 'draft' | 'published' | undefined

  if (userRole === 'editor') {
    // Hard rejects — these should never reach here because collection-level
    // update access blocks pending/approved rows, but defence in depth.
    if (incomingPayloadStatus === 'published') {
      throw new APIError('Only administrators can publish pages.', 403)
    }
    if (nextStatusRaw === 'approved') {
      throw new APIError('Only administrators can approve pages.', 403)
    }

    const allowed = EDITOR_ALLOWED[prevStatus] || []
    if (!allowed.includes(nextStatusRaw)) {
      throw new APIError(
        `Editors cannot change review status from "${prevStatus}" to "${nextStatusRaw}".`,
        403,
      )
    }

    // Guarded stamp on submit / resubmit.
    if (nextStatusRaw === 'pending' && prevStatus !== 'pending') {
      data.submittedBy = req!.user!.id
      data.submittedAt = now
      // Clear any previous review note so the admin sees a clean slate.
      data.reviewNote = null
    }

    // Editors must never touch admin-only fields.
    delete data.reviewedBy
    delete data.reviewedAt
    // `_status` stays as the DB had it. Editors can only save drafts.
    data._status = 'draft'
    return data
  }

  // ─── ADMIN UPDATE ───────────────────────────────────────────────────────
  if (userRole === 'admin') {
    // Approve & publish is the only state that auto-flips _status.
    if (nextStatusRaw === 'approved' && prevStatus !== 'approved') {
      data._status = 'published'
      data.reviewedBy = req!.user!.id
      data.reviewedAt = now
    }
    // Request changes / reject — stamp the reviewer.
    if (
      (nextStatusRaw === 'changes_requested' || (nextStatusRaw === 'draft' && prevStatus === 'pending')) &&
      nextStatusRaw !== prevStatus
    ) {
      data.reviewedBy = req!.user!.id
      data.reviewedAt = now
      if (nextStatusRaw === 'changes_requested' && !data.reviewNote?.trim()) {
        throw new APIError('A note is required when requesting changes.', 400)
      }
    }
    // Admin edits to an already-approved page: keep it published and keep the
    // approved status (per spec — admin changes go live immediately, no
    // re-approval needed).
    if (prevStatus === 'approved' && nextStatusRaw === 'approved') {
      if (incomingPayloadStatus === undefined) data._status = 'published'
    }

    // Admin moves a page OUT of approved (reject / request changes / send
    // back to draft / re-open pending) — unpublish the page so the public
    // site stops serving it. Otherwise approved→changes_requested would
    // still show the old version live until someone noticed.
    if (prevStatus === 'approved' && nextStatusRaw !== 'approved') {
      data._status = 'draft'
    }
    // Admin rejecting a pending page (pending→draft) also unpublishes if
    // the row was somehow still marked published.
    if (nextStatusRaw !== 'approved' && originalDoc?._status === 'published') {
      data._status = 'draft'
    }
  }

  return data
}
