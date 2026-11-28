'use client'

import { useAuth, useDocumentInfo } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type Status = 'draft' | 'pending' | 'changes_requested' | 'approved'

/**
 * Edit-view action bar rendered via `admin.components.beforeDocumentControls`.
 *
 * Buttons are role- and status-aware. They are a UI shortcut only — every
 * action calls PATCH /api/pages/:id and the `pagesReviewGuard` hook is what
 * actually enforces the workflow.
 */
export default function ReviewControls() {
  const { user } = useAuth()
  const docInfo = useDocumentInfo() as any
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [note, setNote] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const role = (user as any)?.role as 'admin' | 'editor' | undefined
  const doc = docInfo?.initialData || docInfo?.data
  const status: Status | undefined = doc?.reviewStatus
  const docId = docInfo?.id

  if (!role || !docId || !status) return null

  const patch = async (payload: Record<string, unknown>) => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch(`/api/pages/${docId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}) as any)
        throw new Error(body?.errors?.[0]?.message || body?.message || `HTTP ${res.status}`)
      }
      router.refresh()
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setBusy(false)
      setModalOpen(false)
      setNote('')
    }
  }

  const btn = {
    padding: '0.4rem 0.9rem',
    borderRadius: 4,
    border: '1px solid var(--theme-elevation-150)',
    background: 'var(--theme-elevation-50)',
    cursor: 'pointer',
    fontSize: '.875rem',
  } as const

  const primary = { ...btn, background: 'var(--theme-success-500, #16a34a)', color: '#fff', borderColor: 'transparent' }
  const warn = { ...btn, background: 'var(--theme-warning-500, #d97706)', color: '#fff', borderColor: 'transparent' }
  const danger = { ...btn, background: 'var(--theme-error-500, #dc2626)', color: '#fff', borderColor: 'transparent' }

  const badgeFor = (s: Status) => {
    const label =
      s === 'pending'
        ? 'Pending Approval'
        : s === 'changes_requested'
          ? 'Changes Requested'
          : s === 'approved'
            ? 'Approved · Live'
            : 'Draft'
    const bg =
      s === 'approved'
        ? '#16a34a'
        : s === 'pending'
          ? '#d97706'
          : s === 'changes_requested'
            ? '#dc2626'
            : '#6b7280'
    return (
      <span
        style={{
          display: 'inline-block',
          padding: '.2rem .55rem',
          borderRadius: 999,
          background: bg,
          color: '#fff',
          fontSize: '.75rem',
          fontWeight: 600,
          marginRight: '.75rem',
        }}
      >
        {label}
      </span>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '.5rem', margin: '.75rem 0' }}>
      {badgeFor(status)}

      {/* EDITOR actions */}
      {role === 'editor' && (status === 'draft' || status === 'changes_requested') && (
        <button
          type="button"
          style={primary}
          disabled={busy}
          onClick={() => patch({ reviewStatus: 'pending' })}
        >
          {busy ? 'Submitting…' : 'Submit for Approval'}
        </button>
      )}

      {/* ADMIN actions on a pending page */}
      {role === 'admin' && status === 'pending' && (
        <>
          <button
            type="button"
            style={primary}
            disabled={busy}
            onClick={() => patch({ reviewStatus: 'approved' })}
          >
            {busy ? 'Working…' : 'Approve & Publish'}
          </button>
          <button
            type="button"
            style={warn}
            disabled={busy}
            onClick={() => setModalOpen(true)}
          >
            Request Changes
          </button>
          <button
            type="button"
            style={danger}
            disabled={busy}
            onClick={() => patch({ reviewStatus: 'draft', reviewNote: null })}
          >
            Reject back to Draft
          </button>
        </>
      )}

      {/* Changes-requested banner (both roles) */}
      {status === 'changes_requested' && doc?.reviewNote && (
        <div
          style={{
            flexBasis: '100%',
            marginTop: '.5rem',
            padding: '.75rem 1rem',
            background: 'var(--theme-warning-100, #fef3c7)',
            borderLeft: '3px solid #d97706',
            borderRadius: 4,
          }}
        >
          <strong>Changes requested:</strong>
          <div style={{ marginTop: '.25rem', whiteSpace: 'pre-wrap' }}>{doc.reviewNote}</div>
        </div>
      )}

      {error && (
        <div style={{ flexBasis: '100%', color: '#dc2626', marginTop: '.5rem' }}>{error}</div>
      )}

      {/* Request Changes modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--theme-bg)',
              padding: '1.25rem 1.5rem',
              borderRadius: 6,
              width: 'min(480px, 90vw)',
            }}
          >
            <h3 style={{ marginTop: 0 }}>Request changes</h3>
            <p style={{ opacity: 0.8, marginTop: '-.3rem' }}>
              This note is emailed to the editor.
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What needs changing before this can be published?"
              rows={5}
              style={{
                width: '100%',
                padding: '.5rem',
                border: '1px solid var(--theme-elevation-150)',
                borderRadius: 4,
                fontFamily: 'inherit',
              }}
            />
            <div style={{ display: 'flex', gap: '.5rem', justifyContent: 'flex-end', marginTop: '.75rem' }}>
              <button type="button" style={btn} onClick={() => setModalOpen(false)} disabled={busy}>
                Cancel
              </button>
              <button
                type="button"
                style={warn}
                disabled={busy || !note.trim()}
                onClick={() => patch({ reviewStatus: 'changes_requested', reviewNote: note.trim() })}
              >
                {busy ? 'Sending…' : 'Send to editor'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
