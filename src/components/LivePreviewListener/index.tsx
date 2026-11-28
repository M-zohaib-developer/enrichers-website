'use client'

import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Keep the admin live-preview iframe in sync with the draft.
 *
 * Two mechanisms, both needed:
 *   1. RefreshRouteOnSave reacts to Payload's "save" postMessage — fires every
 *      time autosave runs on the parent admin form (~every `autosave.interval`
 *      ms).
 *   2. A fallback timer calls router.refresh() every 1.5 s as insurance in
 *      case a save event is missed or router.refresh() doesn't actually re-run
 *      the RSC after a cache hit. Stops when the tab is hidden so it doesn't
 *      run when the admin isn't looking.
 *
 * Tiny network cost (one GET /, cached draft response) but it fixes the "I
 * changed the text and the preview doesn't update" UX.
 */
export function LivePreviewListener() {
  const router = useRouter()
  useEffect(() => {
    const tick = () => router.refresh()
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') tick()
    }, 750)
    return () => clearInterval(id)
  }, [router])
  return (
    <RefreshRouteOnSave
      refresh={router.refresh}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}
    />
  )
}
