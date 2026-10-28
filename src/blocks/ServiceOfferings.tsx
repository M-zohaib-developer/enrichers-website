import { JunctionMark } from '@/components/Icon'
import type { BlockData } from './shared'

export function ServiceOfferings({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items : []
  return (
    <section id={data.sectionId || undefined} className={`${data.background === 'gradient' ? 'rich-text-gradient' : 'theme-light'} pt-8 pb-(--section-y) md:pt-12`}>
      <div className="container-x">
        <div className="max-w-[760px]">
          {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-action" />{data.eyebrow}</p>}
          <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>
          {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
        </div>
        <ul className={`mt-12 grid gap-6 sm:grid-cols-2 ${data.columns === '2' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
          {items.map((item: any, index: number) => {
            return <li key={`${item.title || 'offering'}-${index}`} className="theme-inverse rounded-sm p-6 md:p-8">
              <h3 className="font-display text-h5 font-semibold text-text">{item.title}</h3>
              {item.body && <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>}
              {Array.isArray(item.details) && item.details.length > 0 && <ul className="mt-3 grid gap-3 text-left text-body-sm text-text-secondary">
                {item.details.map((detail: any, detailIndex: number) => <li key={detailIndex}>{typeof detail === 'string' ? detail : detail.label}</li>)}
              </ul>}
            </li>
          })}
        </ul>
      </div>
    </section>
  )
}
