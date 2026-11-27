'use client'

import { useState } from 'react'

export function YouTubeHelp() {
  const [open, setOpen] = useState(false)
  const [testing, setTesting] = useState(false)
  const [result, setResult] = useState<
    | { ok: true; channelTitle: string; videoCount: number; playlistCount: number }
    | { ok: false; error: string }
    | null
  >(null)

  const test = async () => {
    setTesting(true)
    setResult(null)
    try {
      const res = await fetch('/api/admin/youtube/test', { method: 'POST', credentials: 'include' })
      const body = await res.json()
      setResult(body)
    } catch (err: any) {
      setResult({ ok: false, error: String(err?.message || err) })
    } finally {
      setTesting(false)
    }
  }

  return (
    <div style={{ marginTop: 8, padding: 12, border: '1px solid #e2e8f0', borderRadius: 4, background: '#f8fafc', fontSize: 13 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{ background: 'none', border: 0, padding: 0, color: '#0f172a', fontWeight: 600, cursor: 'pointer' }}
      >
        {open ? '▾' : '▸'} How to create a YouTube API key
      </button>
      {open && (
        <ol style={{ marginTop: 8, paddingLeft: 20, lineHeight: 1.6 }}>
          <li>Open <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer">console.cloud.google.com</a>.</li>
          <li>Sign in with a Google account.</li>
          <li>Create a new Google Cloud project (or pick an existing one).</li>
          <li>Open <strong>APIs &amp; Services → Library</strong>.</li>
          <li>Search for <strong>YouTube Data API v3</strong>.</li>
          <li>Click <strong>Enable</strong>.</li>
          <li>Go to <strong>APIs &amp; Services → Credentials</strong>.</li>
          <li>Click <strong>Create Credentials → API Key</strong>.</li>
          <li>Copy the generated key.</li>
          <li>Click the key → <strong>Edit</strong> → <strong>Restrict key</strong> → pick <strong>YouTube Data API v3</strong>.</li>
          <li>Paste the key into the field above and save.</li>
        </ol>
      )}
      <p style={{ marginTop: 10, color: '#475569' }}>
        🔒 <strong>Keep the key private.</strong> It is stored encrypted in the database and never exposed on the public API or in frontend JavaScript.
      </p>
      <p style={{ marginTop: 6, color: '#475569' }}>
        📊 <strong>Free quota:</strong> 10,000 units/day. A full channel sync uses ~10–30 units. You will not hit the limit under normal use.
      </p>
      <div style={{ marginTop: 12 }}>
        <button
          type="button"
          onClick={test}
          disabled={testing}
          style={{
            padding: '8px 14px',
            borderRadius: 4,
            border: 0,
            background: testing ? '#94a3b8' : '#0ea5e9',
            color: 'white',
            fontWeight: 600,
            cursor: testing ? 'default' : 'pointer',
          }}
        >
          {testing ? 'Testing…' : '⚡ Test connection'}
        </button>
        {result && result.ok && (
          <div style={{ marginTop: 10, padding: 10, borderRadius: 4, background: '#dcfce7', color: '#166534' }}>
            ✅ Connected to <strong>{result.channelTitle}</strong> — {result.videoCount} videos, {result.playlistCount} playlists.
          </div>
        )}
        {result && !result.ok && (
          <div style={{ marginTop: 10, padding: 10, borderRadius: 4, background: '#fee2e2', color: '#991b1b' }}>
            ❌ {result.error}
          </div>
        )}
      </div>
    </div>
  )
}
