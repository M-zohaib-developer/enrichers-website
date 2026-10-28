import NextLink from 'next/link'
import { Eyebrow, type BlockData } from './shared'
export function InvestmentPathCards({ data }: { data: BlockData }) {
  return (
    <section className="py-(--section-y)">
      <div className="container-x">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>
        <p className="text-body-lg mt-3 max-w-measure text-text-secondary">{data.body}</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {(data.cards ?? []).map((card: any, i: number) => (
            <article
              key={i}
              className="border border-border bg-surface p-7 transition-colors hover:border-action"
            >
              <span className="text-overline font-semibold tracking-overline text-text-muted">
                {card.eyebrow}
              </span>
              <h3 className="font-display text-h3 mt-8 font-semibold text-text">{card.title}</h3>
              <p className="text-body-sm mt-4 text-text-secondary">{card.body}</p>
              <p className="text-body-sm mt-6 text-text-muted">{card.supportingLabel}</p>
              <NextLink
                href={card.url || '#'}
                className="text-button mt-5 inline-flex min-h-10 items-center rounded-sm bg-action px-4 font-semibold text-on-action"
              >
                {card.actionLabel || data.cardActionLabel}
              </NextLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
