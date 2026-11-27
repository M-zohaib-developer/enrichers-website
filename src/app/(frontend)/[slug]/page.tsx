import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { RenderHomeBlocks } from '@/blocks/HomeBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCachedPageBySlug } from '@/utilities/getCachedDocument'

/**
 * Pre-render published top-level pages at build so public visitors get a cached
 * (prerendered / ISR) response instead of a per-request dynamic render.
 *
 * Draft requests still work: a request carrying the `__prerender_bypass` cookie
 * is excluded by Next.js from every cache layer — the prerender, ISR, and the
 * `unstable_cache` below — and re-renders live. Reading `draftMode()` does not
 * force dynamic rendering for normal visitors.
 * See node_modules/next/dist/docs/01-app/02-guides/draft-mode.md (lines 12-25).
 *
 * `home` is served by `app/(frontend)/page.tsx`, and nested `blogs/*` slugs by
 * `app/(frontend)/blogs/[articleSlug]/page.tsx`, so both are excluded here.
 * `dynamicParams` stays at its default (true): a page published after the build
 * is rendered on demand and then cached, so nothing 404s.
 */
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      draft: false,
      overrideAccess: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
    })

    return result.docs
      .map((doc) => doc.slug)
      .filter(
        (slug): slug is string =>
          typeof slug === 'string' && slug !== 'home' && !slug.includes('/'),
      )
      .map((slug) => ({ slug }))
  } catch {
    // No database reachable at build time → fall back to on-demand ISR.
    return []
  }
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()

  // Draft (admin preview): fetch the live draft version with access overridden,
  // uncached, so unsaved/unpublished changes are visible. Published (public):
  // the cached, published-only fetch — the fast path that gets prerendered/ISR.
  const page = draft
    ? (
        await (
          await getPayload({ config })
        ).find({
          collection: 'pages',
          draft: true,
          depth: 1,
          limit: 1,
          pagination: false,
          overrideAccess: true,
          where: { slug: { equals: slug } },
        })
      ).docs[0]
    : await getCachedPageBySlug(slug)

  if (!page) notFound()

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderHomeBlocks blocks={(page.layout ?? []) as any} preview={draft} />
    </>
  )
}
