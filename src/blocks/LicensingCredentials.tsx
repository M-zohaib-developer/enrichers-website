import NextLink from 'next/link'
import { ArrowRightIcon, DocumentIcon, ShieldIcon } from '@/components/Icon'
import { Eyebrow, type BlockData } from './shared'

type CredentialItem = {
  title?: string | null
  body?: string | null
  note?: string | null
  url?: string | null
  /** An uploaded PDF, which takes precedence over `url`. */
  file?: { url?: string | null } | number | string | null
  linkLabel?: string | null
  variant?: 'entity' | 'documents' | null
}

/**
 * Half-height band — the reference uses --section-y × 0.5 here, not a full one.
 *
 * Border and icon come from each item's own `variant`, not its index. Keying
 * them off `i === 2` meant reordering the cards in admin, or adding a fourth,
 * silently moved the dashed "documents" treatment onto the wrong card.
 */
export function LicensingCredentials({ data }: { data: BlockData }) {
  const items = (data.items ?? []) as CredentialItem[]

  if (data.layoutVariant === 'split') {
    const entities = items.filter((item) => item.variant !== 'documents')
    const documents = items.filter((item) => item.variant === 'documents')
    return (
      <section id={data.sectionId || undefined} className="relative theme-sunken py-(--section-y)">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            {data.heading && <h2 className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>}
            {data.body && <p className="text-body-lg mt-5 text-text-secondary">{data.body}</p>}
            <ul className="mt-8 space-y-3">
              {entities.map((item, index) => <li key={`${item.title || 'entity'}-${index}`} className="flex gap-3 rounded-sm border border-border bg-surface p-4"><ShieldIcon size={20} className="mt-0.5 shrink-0 text-action" /><span><span className="block font-semibold text-text">{item.title}</span><span className="text-body-sm text-text-secondary">{item.body}{item.note ? ` · ${item.note}` : ''}</span></span></li>)}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <p className="mb-4 font-semibold text-text">Published licences &amp; investor documents</p>
            <ul className="divide-y divide-border border-y border-border">
              {documents.map((item, index) => {
                const file = item.file && typeof item.file === 'object' ? item.file : null
                const href = file?.url || item.url || '#'
                return <li key={`${item.title || 'document'}-${index}`}><a href={href} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center gap-4 py-3"><DocumentIcon size={20} className="shrink-0 text-text-muted" /><span className="flex-1"><span className="block font-semibold text-text group-hover:underline underline-offset-4">{item.title}</span><span className="text-caption text-text-muted">{item.note || 'Document'}</span></span><ArrowRightIcon size={18} className="shrink-0 text-text-muted" /></a></li>
              })}
            </ul>
            {data.disclosureText && <p className="mt-6 rounded-sm border-l-2 border-text bg-surface p-4 text-body-sm text-text-secondary">{data.disclosureText}</p>}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id={data.sectionId || undefined} className="py-[calc(var(--section-y)*0.5)]">
      <div className="container-x">
        {(data.eyebrow || data.heading || data.body) && <div className="max-w-[760px]">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          {data.heading && <h2 className="font-display mt-4 text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>}
          {data.body && <p className="mt-4 text-body-lg leading-relaxed text-text-secondary">{data.body}</p>}
        </div>}
        <div className={`grid gap-4 ${data.eyebrow || data.heading || data.body ? 'mt-8' : 'mt-6'} ${items.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {items.map((item, i) => {
            const isDocuments = item.variant === 'documents'
            // An uploaded PDF wins over the typed URL, and needs a plain
            // anchor — next/link would try to client-route to a file.
            const file = item.file && typeof item.file === 'object' ? item.file : null
            const href = file?.url || item.url || '#'
            const Tag = file?.url ? 'a' : NextLink
            const fileProps = file?.url ? { target: '_blank', rel: 'noopener noreferrer' } : {}

            return (
              <Tag
                key={`${item.title ?? 'credential'}-${i}`}
                href={href}
                {...fileProps}
                className={`group rounded-sm border bg-surface p-5 transition-colors hover:border-action ${
                  isDocuments ? 'border-dashed border-border-strong' : 'border-border'
                }`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-sm bg-action text-on-action">
                  {isDocuments ? <DocumentIcon /> : <ShieldIcon />}
                </span>
                {/* A span, not a heading. The reference marks these card
                    titles up as spans, and an <h3> here also skipped a level
                    (it sits before the page's first <h2>). Matching the
                    reference fixes the outline at the same time. */}
                <span className="font-display text-h4 mt-5 block font-semibold text-text">
                  {item.title}
                </span>
                <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>
                {item.note ? (
                  <span className="text-caption mt-2 block font-semibold text-text-link">
                    {item.note}
                  </span>
                ) : null}
                {item.linkLabel ? (
                  <span className="text-button mt-4 inline-flex items-center gap-1.5 font-semibold text-text-link group-hover:underline">
                    {item.linkLabel}
                    <ArrowRightIcon />
                  </span>
                ) : null}
              </Tag>
            )
          })}
        </div>
      </div>
    </section>
  )
}
