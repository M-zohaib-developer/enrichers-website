import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { RenderHomeBlocks } from '@/blocks/HomeBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCachedPageBySlug } from '@/utilities/getCachedDocument'

/**
 * Pre-render published blog articles (`pages` with a `blogs/<articleSlug>` slug)
 * at build so public visitors get a cached response. Draft requests bypass every
 * cache layer automatically and re-render live — see the sibling `[slug]/page.tsx`
 * and node_modules/next/dist/docs/01-app/02-guides/draft-mode.md (lines 12-25).
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
      .filter((slug): slug is string => typeof slug === 'string' && slug.startsWith('blogs/'))
      .map((slug) => ({ articleSlug: slug.slice('blogs/'.length) }))
  } catch {
    return []
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleSlug: string }>
}) {
  const { articleSlug } = await params
  const { isEnabled: draft } = await draftMode()

  const slug = `blogs/${articleSlug}`

  // Draft: live, access-overridden fetch (preview). Published: cached fast path.
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
