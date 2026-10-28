import type { BlockData } from './shared'

export function BenefitsGrid({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items : []
  return (
    <section id={data.sectionId || undefined} className={`${data.background === 'gradient' ? 'theme-surface' : 'theme-sunken'} py-(--section-y)`}>
      <div className="container-x">
        {data.showHeader !== false && <div className="max-w-[760px]">
          {data.eyebrow && <p className="text-overline mb-4 font-semibold tracking-overline text-text-muted uppercase">{data.eyebrow}</p>}
          <h2 className="font-display text-h2 text-text">{data.heading}</h2>
          {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
        </div>}
        <ul className={`mt-10 grid gap-4 ${items.length <= 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {items.map((item: any, index: number) => (
            <li key={`${item.title || 'benefit'}-${index}`} className="theme-inverse flex min-h-full flex-col rounded-sm p-6 md:p-8">
              <h3 className="font-display text-h5 font-semibold text-text">{item.title}</h3>
              {item.body && <p className="text-body-sm mt-3 text-text-secondary">{item.body}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
