import { JunctionMark } from '@/components/Icon'
import type { BlockData } from './shared'

function ServiceIcon({ index }: { index: number }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const }
  if (index === 0) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><rect x="9" y="3" width="6" height="5" /><rect x="3" y="16" width="6" height="5" /><rect x="15" y="16" width="6" height="5" /><path d="M12 8V12M6 16V12H18V16" /></svg>
  if (index === 1) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><path d="M6 3H15L19 7V21H6Z" /><path d="M15 3V7H19M9 12H16M9 16H14" /></svg>
  if (index === 2) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="5.5" cy="6" r="2" /><circle cx="18.5" cy="6" r="2" /><circle cx="12" cy="18.5" r="2" /><circle cx="12" cy="11" r="1.5" /><path d="M7.2 7L10.7 10.2M16.8 7L13.3 10.2M12 12.5V16.5" /></svg>
  if (index === 3) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><rect x="5" y="3" width="14" height="18" /><path d="M9 3V21M12 8H16M12 12H16M12 16H16" /></svg>
  if (index === 4) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><polygon points="12,4 18.93,8 18.93,16 12,20 5.07,16 5.07,8" /><path d="M12 12L5.07 8M12 12L18.93 8M12 12V20" /></svg>
  return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="5" cy="19" r="2" /><circle cx="19" cy="5" r="2" /><path d="M7 19H13A3 3 0 0 0 13 13H11A3 3 0 0 1 11 7H17" /></svg>
}

function InitiativeIcon({ index }: { index: number }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const }
  if (index === 0) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><rect x="7" y="7" width="10" height="10" /><path d="M10 3V7M14 3V7M10 17V21M14 17V21M3 10H7M3 14H7M17 10H21M17 14H21" /></svg>
  if (index === 1) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><polygon points="12,4 18.93,8 18.93,16 12,20 5.07,16 5.07,8" /><path d="M12 12L5.07 8M12 12L18.93 8M12 12V20" /></svg>
  if (index === 2) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><path d="M4 18Q10 5 20 8" /><path d="M4 18Q13 16 19 18" strokeDasharray="2 2" /><circle cx="4" cy="18" r="1.6" /><circle cx="20" cy="8" r="1.6" /><circle cx="19" cy="18" r="1.6" /></svg>
  if (index === 3) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><path d="M12 4V20M7 20H17M4 7H20M4 7L1.5 13H6.5ZM20 7L17.5 13H22.5Z" /></svg>
  if (index === 4) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><rect x="3" y="8" width="18" height="12" /><path d="M9 8V5H15V8M3 13H21" /></svg>
  if (index === 5) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><path d="M3 21V16H8V11H13V6H18V3H21V21Z" /></svg>
  return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><ellipse cx="12" cy="12" rx="3.8" ry="8.5" /><path d="M3.5 12H20.5" /></svg>
}

export function ServiceOfferings({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items : []
  if (data.sectionId === 'initiatives') {
    return (
      <section id="initiatives" aria-labelledby="initiatives-h" className="relative theme-surface py-(--section-y)">
        <div className="container-x">
          <div className="max-w-[760px]">
            {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
            <h2 id="initiatives-h" className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
            {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item: any, index: number) => <li key={`${item.title || 'initiative'}-${index}`}>
              <InitiativeIcon index={index} />
              <h3 className="font-display mt-4 text-h5 font-semibold text-text">{item.title}</h3>
              <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>
            </li>)}
          </ul>
        </div>
      </section>
    )
  }
  if (data.sectionId === 'services') {
    return (
      <section id="services" aria-labelledby="services-h" className="relative theme-surface py-(--section-y)">
        <div className="container-x">
          <div className="max-w-[760px]">
            {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
            <h2 id="services-h" className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
            {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any, index: number) => <li key={`${item.title || 'service'}-${index}`}>
              <ServiceIcon index={index} />
              <h3 className="font-display mt-4 text-h5 font-semibold text-text">{item.title}</h3>
              <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>
            </li>)}
          </ul>
        </div>
      </section>
    )
  }
  if (data.sectionId === 'deliverables') {
    return (
      <section id="deliverables" aria-labelledby="deliverables-h" className="relative py-(--section-y)">
        <div className="container-x">
          <div className="max-w-[760px]">
            {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
            <h2 id="deliverables-h" className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
            {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {items.map((item: any, index: number) => (
              <div key={`${item.title || 'offering'}-${index}`} className="rounded-sm border border-border bg-surface p-6 md:p-8">
                <p className="font-mono text-caption font-semibold text-text-muted tabular-nums">{String(index + 1).padStart(2, '0')}</p>
                <h3 className="font-display text-h4 mt-2 font-semibold text-text">{item.title}</h3>
                {Array.isArray(item.details) && <ul className="mt-4 space-y-2">
                  {item.details.map((detail: any, detailIndex: number) => <li key={detailIndex} className="flex gap-3 text-body-sm text-text-secondary"><JunctionMark size={12} className="mt-1.5 shrink-0 text-accent" />{typeof detail === 'string' ? detail : detail.label}</li>)}
                </ul>}
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
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
