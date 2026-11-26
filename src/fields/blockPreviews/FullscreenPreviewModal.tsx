'use client'

import type { BlockInstance } from '@/utilities/getBlockPreviewContent'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  instances: BlockInstance[]
  label: string
  onClose: () => void
  type: string
}

/**
 * Fullscreen modal that iframes the /block-preview page for a given block.
 *
 * Rendered via a React portal into document.body so it sits above Payload's
 * own drawer/modal stacking context — without this the panel is clipped behind
 * the drawer overlay and the fixed positioning resolves to the wrong ancestor.
 *
 * Centering is done with flex on the wrapper (not transform on the panel) so
 * it works regardless of which ancestor owns the stacking context.
 */
export const FullscreenPreviewModal: React.FC<Props> = ({ instances, label, onClose, type }) => {
  const [idx, setIdx] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [loaded, setLoaded] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Portal needs the DOM to be available
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const current = instances[idx]
  const hasInstances = instances.length > 0
  const hasMultiple = instances.length > 1

  const src = current
    ? `/block-preview?type=${encodeURIComponent(type)}&page=${encodeURIComponent(current.pageSlug)}&index=${current.index}`
    : `/block-preview?type=${encodeURIComponent(type)}`

  // Reset loaded state whenever src changes
  useEffect(() => {
    setLoaded(false)
  }, [src])

  const prev = useCallback(() => {
    setIdx((i) => (i - 1 + instances.length) % instances.length)
  }, [instances.length])

  const next = useCallback(() => {
    setIdx((i) => (i + 1) % instances.length)
  }, [instances.length])

  // Close on Escape / arrow nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && hasMultiple) prev()
      if (e.key === 'ArrowRight' && hasMultiple) next()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose, prev, next, hasMultiple])

  const modal = (
    <div
      aria-label={`Preview: ${label}`}
      aria-modal="true"
      className="bp-fullscreen"
      role="dialog"
    >
      {/* Backdrop — click to close */}
      <div className="bp-fullscreen__backdrop" onClick={onClose} />

      {/* Panel — centred by flex on the wrapper */}
      <div className="bp-fullscreen__panel">
        {/* Header bar */}
        <div className="bp-fullscreen__header">
          <div className="bp-fullscreen__meta">
            <span className="bp-fullscreen__label">{label}</span>
            {hasInstances ? (
              <span className="bp-fullscreen__source">
                {current.pageTitle}&nbsp;&middot;&nbsp;
                <code className="bp-fullscreen__slug">{current.pageSlug}</code>
                {hasMultiple && (
                  <span className="bp-fullscreen__count">
                    &nbsp;({idx + 1}/{instances.length})
                  </span>
                )}
              </span>
            ) : (
              <span className="bp-fullscreen__source bp-fullscreen__source--sample">
                Sample preview &mdash; no saved content yet
              </span>
            )}
          </div>

          <div className="bp-fullscreen__actions">
            {hasMultiple && (
              <>
                <button
                  aria-label="Previous instance"
                  className="bp-fullscreen__nav"
                  onClick={prev}
                  title="Previous instance (left arrow)"
                  type="button"
                >
                  <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  aria-label="Next instance"
                  className="bp-fullscreen__nav"
                  onClick={next}
                  title="Next instance (right arrow)"
                  type="button"
                >
                  <svg aria-hidden="true" fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}

            <button
              aria-label="Close preview"
              className="bp-fullscreen__close"
              onClick={onClose}
              title="Close (Esc)"
              type="button"
            >
              <svg aria-hidden="true" fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="18">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* iframe viewport */}
        <div className="bp-fullscreen__viewport">
          {!loaded && (
            <div className="bp-fullscreen__loading">
              <div className="bp-fullscreen__spinner" />
            </div>
          )}
          <iframe
            key={src}
            ref={iframeRef}
            className={`bp-fullscreen__iframe${loaded ? '' : ' bp-fullscreen__iframe--hidden'}`}
            onLoad={() => setLoaded(true)}
            sandbox="allow-same-origin allow-scripts"
            src={src}
            title={`Preview of ${label}`}
          />
        </div>

        {/* Read-only footer */}
        <div className="bp-fullscreen__footer">
          <span className="bp-fullscreen__readonly">Read-only preview</span>
        </div>
      </div>
    </div>
  )

  if (!mounted) return null
  return createPortal(modal, document.body)
}
