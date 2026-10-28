import { Eyebrow, type BlockData } from './shared'

function Plus() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true"><path d="M12 5V19M5 12H19" /></svg>
}

export function GuideAccordion({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items : []
  const sectionId = data.sectionId || 'guide'
  const headingId = `${sectionId}-h`

  return (
    <section id={sectionId} aria-labelledby={headingId} className="relative py-(--section-y)">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 id={headingId} className="font-display text-h3 mt-3 font-semibold text-text">{data.heading}</h2>
          {data.intro && <p className="mt-4 text-text-secondary">{data.intro}</p>}
        </div>
        <div className="lg:col-span-8">
          <div className="divide-y divide-border border-y border-border">
            {items.map((item: any, index: number) => (
              <details key={index} className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-h5 text-text [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-(--duration-normal) group-open:rotate-45"><Plus /></span>
                </summary>
                <div className="max-w-[72ch] pb-6 text-text-secondary">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
