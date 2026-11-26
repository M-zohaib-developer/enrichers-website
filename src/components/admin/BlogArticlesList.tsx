'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Custom List view for the blog-articles collection.
 *
 * This collection exists only to show a "Blog Articles" entry inside the
 * "Content" nav group, directly below Pages. There is no separate DB table —
 * this view immediately redirects to the Pages list pre-filtered to
 * slugs that start with "blogs/".
 *
 * The "New Blog Article" link in Payload's list toolbar goes to
 * /admin/collections/pages/create?blog=1 — the LayoutBlocksField picks up
 * ?blog=1 and auto-inserts the articleDetail block on a fresh document.
 */
export default function BlogArticlesList() {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      '/admin/collections/pages?where%5Bslug%5D%5Blike%5D=blogs%2F&limit=20',
    )
  }, [router])

  return (
    <div style={{ padding: '2rem', opacity: 0.5 }}>
      Redirecting to Blog Articles…
    </div>
  )
}
