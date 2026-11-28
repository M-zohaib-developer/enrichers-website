/**
 * One-shot backfill for the review workflow rollout.
 *
 * What it does:
 *   1. Sets Users.role for the two existing accounts, per the approved mapping:
 *        - zohaib@postsiva.com → admin
 *        - dev@payloadcms.com  → editor
 *      Any other existing user is left untouched and reported, so nothing
 *      flips silently on a DB with unexpected rows.
 *   2. Sets Pages.reviewStatus for every page:
 *        - _status=published → reviewStatus=approved, reviewedAt=updated_at
 *        - _status=draft     → reviewStatus=draft
 *      The `context.skipReviewGuard` flag bypasses the workflow hook ONLY
 *      because this script runs without a `req.user` (trusted server-side).
 *
 * Does not touch page content. Does not change any users.role already set.
 * Re-running is safe — it is idempotent.
 *
 * Run (local): npx tsx scripts/backfill-roles-and-review.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const ROLE_MAP: Record<string, 'admin' | 'editor'> = {
  'zohaib@postsiva.com': 'admin',
  'dev@payloadcms.com': 'editor',
}

async function run() {
  const cfg = await config
  const payload = await getPayload({ config: cfg })

  // ─── Users ────────────────────────────────────────────────────────────
  const { docs: users } = await payload.find({
    collection: 'users',
    limit: 1000,
    overrideAccess: true,
    depth: 0,
  })

  console.log(`\n── Users (${users.length}) ──`)
  for (const u of users) {
    const email = (u as any).email as string | undefined
    const currentRole = (u as any).role as string | undefined
    const planned = email && ROLE_MAP[email]
    if (!planned) {
      console.log(`  ${email}: left as-is (role=${currentRole ?? 'unset'}) — not in approved mapping`)
      continue
    }
    if (currentRole === planned) {
      console.log(`  ${email}: already ${planned} — no change`)
      continue
    }
    await payload.update({
      collection: 'users',
      id: (u as any).id,
      data: { role: planned } as any,
      overrideAccess: true,
    })
    console.log(`  ${email}: set role=${planned}`)
  }

  // ─── Pages ────────────────────────────────────────────────────────────
  const { docs: pages } = await payload.find({
    collection: 'pages',
    limit: 1000,
    overrideAccess: true,
    depth: 0,
  })

  let approved = 0
  let draft = 0
  let skipped = 0
  console.log(`\n── Pages (${pages.length}) ──`)
  for (const p of pages) {
    const current = (p as any).reviewStatus as string | undefined
    const status = (p as any)._status as string | undefined
    const desired = status === 'published' ? 'approved' : 'draft'
    // Skip only when the page is already in a state that matches reality.
    // Pending / changes_requested are workflow states a human put it in —
    // never overwrite those from a backfill.
    if (current === desired || current === 'pending' || current === 'changes_requested') {
      skipped++
      continue
    }
    const nextReviewStatus = desired
    await payload.update({
      collection: 'pages',
      id: (p as any).id,
      data: {
        reviewStatus: nextReviewStatus,
        ...(nextReviewStatus === 'approved' ? { reviewedAt: (p as any).updatedAt } : {}),
      } as any,
      overrideAccess: true,
      context: { skipReviewGuard: true, skipRevalidate: true },
    })
    if (nextReviewStatus === 'approved') approved++
    else draft++
  }
  console.log(`  approved=${approved}  draft=${draft}  already-set=${skipped}`)

  console.log('\nBackfill complete.\n')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
