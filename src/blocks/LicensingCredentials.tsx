import NextLink from 'next/link'
import { ArrowRightIcon, DocumentIcon, ShieldIcon } from '@/components/Icon'
import { Eyebrow, type BlockData } from './shared'

type CredentialItem = {
  title?: string | null
  body?: string | null
  note?: string | null
  url?: string | null
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

  return (
    <section className="py-[calc(var(--section-y)*0.5)]">
      <div className="container-x">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((item, i) => {
            const isDocuments = item.variant === 'documents'

            return (
              <NextLink
                key={`${item.title ?? 'credential'}-${i}`}
                href={item.url || '#'}
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
              </NextLink>
            )
          })}
        </div>
      </div>
    </section>
  )
}
