import { Buttons, Eyebrow, type BlockData } from './shared'
export function InvestmentPathCards({ data }: { data: BlockData }) {
  return (
    <section aria-labelledby="pathCards-h" className="relative theme-surface py-(--section-y)">
      <div className="container-x">
        <div className="max-w-[760px]">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 id="pathCards-h" className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
        </div>
        <ol className="mt-12 grid gap-4 lg:grid-cols-3">
          {(data.cards ?? []).map((card: any, i: number) => (
            <li
              key={i}
              className="flex flex-col rounded-sm border border-border bg-surface p-6 md:p-8"
            >
              <p className="flex items-center gap-3 text-overline font-semibold uppercase tracking-overline text-text-muted">
                <span className="font-display text-h4 font-light tracking-normal text-text tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <span>{String(card.eyebrow ?? '').replace(/^\d{2}\s*/, '')}</span>
              </p>
              <h3 className="font-display text-h3 mt-6 font-semibold text-text">{card.title}</h3>
              <p className="mt-3 flex-1 text-text-secondary">{card.body}</p>
              {card.supportingLabel && <p className="text-caption mt-4 font-semibold text-text-muted">{card.supportingLabel}</p>}
              <Buttons buttons={card.buttons} fallback={[{ label: card.actionLabel || data.cardActionLabel, url: card.url }]} showArrow={false} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
