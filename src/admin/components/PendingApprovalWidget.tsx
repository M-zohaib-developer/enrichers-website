import { getPayload } from 'payload'
import config from '@payload-config'
import { headers as nextHeaders } from 'next/headers'
import Link from 'next/link'

/**
 * Dashboard widget — admin-only list of pages awaiting approval.
 *
 * Rendered via `admin.components.afterDashboard`. Reads the current user from
 * the admin's session cookie, returns nothing for editors / anonymous so the
 * widget simply doesn't appear outside the admin role.
 */
export default async function PendingApprovalWidget() {
  const payload = await getPayload({ config })
  const headers = await nextHeaders()
  const { user } = await payload.auth({ headers })
  if (!user || (user as any).role !== 'admin') return null

  const { docs, totalDocs } = await payload.find({
    collection: 'pages',
    where: { reviewStatus: { equals: 'pending' } },
    depth: 1,
    limit: 10,
    sort: '-submittedAt',
    overrideAccess: true,
  })

  return (
    <section
      style={{
        marginTop: '2rem',
        padding: '1.25rem 1.5rem',
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 6,
      }}
    >
      <h3 style={{ margin: 0, fontSize: '1rem' }}>
        Pending approval <span style={{ opacity: 0.6 }}>({totalDocs})</span>
      </h3>
      {totalDocs === 0 ? (
        <p style={{ marginTop: '.5rem', opacity: 0.7 }}>
          Nothing waiting for review.
        </p>
      ) : (
        <ul style={{ marginTop: '.75rem', paddingLeft: '1.25rem' }}>
          {docs.map((d: any) => {
            const by =
              typeof d.submittedBy === 'object' && d.submittedBy?.email
                ? d.submittedBy.email
                : 'unknown editor'
            const when = d.submittedAt ? new Date(d.submittedAt).toLocaleString() : ''
            return (
              <li key={d.id} style={{ marginTop: '.35rem' }}>
                <Link
                  href={`/admin/collections/pages/${d.id}`}
                  style={{ color: 'var(--theme-text)' }}
                >
                  <strong>{d.title}</strong>
                </Link>
                <span style={{ opacity: 0.7 }}> — by {by} · {when}</span>
              </li>
            )
          })}
        </ul>
      )}
      {totalDocs > docs.length && (
        <Link
          href="/admin/collections/pages?where[reviewStatus][equals]=pending"
          style={{ display: 'inline-block', marginTop: '.75rem' }}
        >
          See all {totalDocs} pending →
        </Link>
      )}
    </section>
  )
}
