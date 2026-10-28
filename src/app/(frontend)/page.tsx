import React from 'react'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { RenderHomeBlocks } from '@/blocks/HomeBlocks'

/**
 * Candidate A token reference page — doc section 3.3 / Phase 2 exit gate.
 * Not a repaint of the real Home block (that is Phase 3). This page exists
 * only so a reviewer can compare typography, colour, container width, and
 * section rhythm against the live demo before bulk repainting begins:
 * https://enrichers-demo.innovidio.com/candidates/a
 */
export default async function HomePage() {
  let blocks: any[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      depth: 1,
      limit: 1,
      pagination: false,
      where: { slug: { equals: 'home' } },
    })
    if (result.docs[0]?.layout?.length) blocks = result.docs[0].layout as any[]
  } catch {
    // The homepage is intentionally empty until its CMS document is available.
  }

  return <RenderHomeBlocks blocks={blocks} />
}
