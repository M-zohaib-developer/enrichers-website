import { Buttons, type BlockData } from './shared'
export function ReadyWhenYouAre({ data }: { data: BlockData }) {
  if (data.variant === 'compact') return (
    <section className="relative theme-sunken py-[calc(var(--section-y)*0.5)]">
      <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div><h2 className="font-display text-h3 font-semibold text-text">{data.heading}</h2><p className="text-body-lg mt-2 text-text-secondary">{data.body}</p></div>
        <Buttons buttons={data.buttons} fallback={[]} />
      </div>
    </section>
  )
  return (
    /* The dark treatment is a rounded card inside a normal light section, not
       a full-bleed band — that is how the reference closes the page. */
    <section className="py-(--section-y)">
      <div className="container-x">
        <div className="theme-inverse relative overflow-hidden rounded-sm p-8 md:p-14">
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              {/* text-h1, not text-h2 — the reference sizes this closing CTA
                  one step larger than a normal section heading (48px / 36px). */}
              {/* font-normal overrides the 300 baked into the text-h1 scale —
                  the reference renders this one at 400. */}
              <h2 className="font-display text-h1 font-normal text-chrome-strong">
                {data.heading}
              </h2>
              <p className="text-body-lg mt-5 text-chrome-soft">{data.body}</p>
            </div>
            <div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Buttons buttons={data.buttons} fallback={[{ ...data.openAccount, secondary: false }, { ...data.contact, secondary: true }]} inverse />
              </div>
              <p className="text-caption mt-8 text-chrome-legal">{data.riskNotice}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
