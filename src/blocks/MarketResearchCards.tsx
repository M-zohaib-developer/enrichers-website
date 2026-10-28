import Image from 'next/image'
import NextLink from 'next/link'
import { Buttons, Eyebrow, imageSrc, type BlockData } from './shared'
export function MarketResearchCards({ data }: { data: BlockData }) {
  return (
    <section className="py-(--section-y)">
      <div className="container-x">
        {/* Header splits 7/5 across 12 columns at lg and bottom-aligns, so the
            intro and "All research" link sit beside the heading rather than
            stacked under it. */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 className="font-display text-h2 mt-4 text-text">{data.heading}</h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-body-lg text-text-secondary">{data.body}</p>
            <Buttons buttons={data.buttons} fallback={[{ ...data.button, secondary: true }]} />
          </div>
        </div>
        {/* Two-up from the smallest width, matching the reference. Stacking to
            one column below sm made this band ~2.2× taller than the live page
            on a 375 viewport (2494px against 1153px). */}
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {(data.cards ?? []).map((card: any, i: number) => (
            <NextLink key={i} href={card.url || '#'} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-sunken">
                <Image
                  src={imageSrc(card.image, `/brand/research-${i + 1}.webp`)}
                  alt={card.title || 'Research note'}
                  fill
                  className="object-cover transition-transform duration-(--duration-deliberate) group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              {/* 13px / 0.1em here, not the 12px / 0.14em overline used for
                  section eyebrows — the reference treats card meta separately. */}
              <p className="text-caption mt-4 font-semibold tracking-[0.1em] text-text-muted uppercase">
                {card.category} · {card.date}
              </p>
              <h3 className="font-display text-h5 mt-2 font-semibold text-text underline-offset-4 group-hover:underline">
                {card.title}
              </h3>
            </NextLink>
          ))}
        </div>
      </div>
    </section>
  )
}
