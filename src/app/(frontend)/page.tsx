import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { RenderHomeBlocks } from '@/blocks/HomeBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { getCachedPageBySlug } from '@/utilities/getCachedDocument'

/**
 * Home page (/).
 *
 * Mirrors `/[slug]/page.tsx`: in draft mode (admin live preview) the page
 * fetches the unsaved draft version uncached so edits appear immediately, and
 * `LivePreviewListener` tells Payload's postMessage bridge to refresh the
 * route on every autosave. For public visitors the cached published fetch is
 * reused (same path as every other content page).
 */
export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()

  let blocks: any[] = []
  try {
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
            where: { slug: { equals: 'home' } },
          })
        ).docs[0]
      : await getCachedPageBySlug('home')
    if (page?.layout?.length) blocks = page.layout as any[]
  } catch {
    // The homepage stays empty until its CMS document is reachable.
  }

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderHomeBlocks blocks={blocks} preview={draft} />
    </>
  )
}
