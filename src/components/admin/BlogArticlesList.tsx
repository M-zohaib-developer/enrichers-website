import type { CSSProperties } from 'react'

import configPromise from '@payload-config'
import Link from 'next/link'
import { getPayload } from 'payload'

/**
 * Blog Articles admin screen (custom List view for the `blog-articles` collection).
 *
 * Blog articles are Pages whose slug starts with `blogs/`. This view lists them
 * and the "Create new blog article" button opens a fresh Pages document with
 * `?blog=1`, which `LayoutBlocksField` reads to auto-insert the `articleDetail`
 * block so the editor never starts from an empty page.
 *
 * Inline styles are used on purpose — Tailwind is not available in the Payload
 * admin bundle, and the whole `components/admin/` dir is excluded from the
 * colour lint. Colours come from Payload's own admin theme CSS variables so
 * this view matches the rest of the admin in both light and dark mode.
 */
export default async function BlogArticlesList() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { like: 'blogs/' } },
    sort: '-updatedAt',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })

  const muted = 'var(--theme-elevation-500)'
  const border = '1px solid var(--theme-elevation-150)'
  const cell: CSSProperties = { padding: '0.75rem 1rem', borderBottom: border, verticalAlign: 'middle' }

  return (
    <div style={{ padding: '2rem', maxWidth: '1100px' }}>
      <header
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Blog Articles</h1>
          <p style={{ margin: '0.35rem 0 0', color: muted }}>
            {docs.length} blog article{docs.length === 1 ? '' : 's'}. Each one is a Page with a{' '}
            <code>blogs/…</code> slug.
          </p>
        </div>
        <Link
          href="/admin/collections/pages/create?blog=1"
          className="btn btn--style-primary btn--size-medium"
          style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
        >
          Create new blog article
        </Link>
      </header>

      {docs.length === 0 ? (
        <div style={{ border, borderRadius: '4px', padding: '2.5rem', textAlign: 'center', color: muted }}>
          <p style={{ margin: '0 0 1rem' }}>No blog articles yet.</p>
          <Link
            href="/admin/collections/pages/create?blog=1"
            className="btn btn--style-primary btn--size-medium"
            style={{ textDecoration: 'none' }}
          >
            Create your first blog article
          </Link>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', border, borderRadius: '4px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left' }}>
                <th style={{ ...cell, color: muted, fontWeight: 600 }}>Title</th>
                <th style={{ ...cell, color: muted, fontWeight: 600 }}>Slug</th>
                <th style={{ ...cell, color: muted, fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc) => {
                const published = (doc as { _status?: string })._status === 'published'
                return (
                  <tr key={doc.id}>
                    <td style={cell}>
                      <Link href={`/admin/collections/pages/${doc.id}`} style={{ fontWeight: 600 }}>
                        {doc.title || '(untitled)'}
                      </Link>
                    </td>
                    <td style={{ ...cell, color: muted, fontFamily: 'monospace' }}>/{doc.slug}</td>
                    <td style={cell}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.15rem 0.6rem',
                          borderRadius: '999px',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          background: published ? 'var(--theme-success-100)' : 'var(--theme-elevation-100)',
                          color: published ? 'var(--theme-success-600)' : muted,
                        }}
                      >
                        {published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
