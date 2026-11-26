import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { RenderHomeBlocks } from '@/blocks/HomeBlocks'
import { HOME_BLOCKS } from '@/blocks/homeDefaults'

/**
 * Isolated block preview page — renders exactly one block with no header or
 * footer so it can be embedded in the fullscreen preview iframe.
 *
 * Query params:
 *   type  — block slug (required)
 *   page  — page slug to pull saved content from (optional; falls back to homeDefaults)
 *   index — 0-based position of the block within that page's layout (optional; defaults to first match)
 */
export default async function BlockPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; page?: string; index?: string }>
}) {
  const { type, page: pageSlug, index: indexStr } = await searchParams

  if (!type) notFound()

  let block: Record<string, unknown> | null = null

  // Try to load from a real published page first
  if (pageSlug) {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      depth: 2,
      limit: 1,
      pagination: false,
      overrideAccess: false,
      where: {
        slug: { equals: pageSlug },
        _status: { equals: 'published' },
      },
    })

    const page = result.docs[0]
    if (page?.layout) {
      const idx = indexStr !== undefined ? parseInt(indexStr, 10) : NaN
      const layout = page.layout as Array<Record<string, unknown>>

      if (!isNaN(idx) && layout[idx]?.blockType === type) {
        block = layout[idx]
      } else {
        // Fall back to first match of the requested type on this page
        block = layout.find((b) => b.blockType === type) ?? null
      }
    }
  }

  // Fall back to homeDefaults sample data
  if (!block) {
    block = (HOME_BLOCKS as Array<Record<string, unknown>>).find(
      (b) => b.blockType === type,
    ) ?? null
  }

  if (!block) notFound()

  return (
    <div className="block-preview-isolated">
      <RenderHomeBlocks blocks={[block as any]} />
    </div>
  )
}
