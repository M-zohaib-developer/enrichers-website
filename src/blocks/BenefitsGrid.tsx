import type { BlockData } from './shared'
import { JunctionMark } from '@/components/Icon'

function ValueIcon({ index }: { index: number }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const }
  if (index === 0) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2.5V5M12 19V21.5M2.5 12H5M19 12H21.5M5.3 5.3L7 7M17 17L18.7 18.7M5.3 18.7L7 17M17 7L18.7 5.3" /></svg>
  if (index === 1) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" /></svg>
  if (index === 2) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20C3.8 16 6 14 9 14S14.2 16 15 20M15.5 14.3C18 14.3 20 16 20.8 19.5" /></svg>
  return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21C5 16 8 14 12 14S19 16 20 21" /></svg>
}

function FocusIcon({ index }: { index: number }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const }
  if (index === 0) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><rect x="5" y="3" width="14" height="18" /><path d="M9 3V21M12 8H16M12 12H16M12 16H16" /></svg>
  if (index === 1) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><rect x="7" y="7" width="10" height="10" /><path d="M10 3V7M14 3V7M10 17V21M14 17V21M3 10H7M3 14H7M17 10H21M17 14H21" /></svg>
  if (index === 2) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="5" cy="19" r="2" /><circle cx="19" cy="5" r="2" /><path d="M7 19H13A3 3 0 0 0 13 13H11A3 3 0 0 1 11 7H17" /></svg>
  if (index === 3) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><path d="M5 19C5 10 11 5 20 4C19 13 14 19 5 19Z" /><path d="M5 19L13 11" /></svg>
  if (index === 4) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" /></svg>
  if (index === 5) return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><path d="M3 20C9 19 14 14 18.5 5.5" /><circle cx="19" cy="5" r="1.8" /><path d="M3 21H21" /></svg>
  return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="12" cy="6" r="3" /><path d="M7 21V15A5 5 0 0 1 17 15V21M4 21H20" /></svg>
}

function SustainabilityIcon({ index }: { index: number }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const }
  if (index === 0) return <svg viewBox="0 0 24 24" width="28" height="28" {...common} aria-hidden="true"><path d="M12 3C16 8 18 11 18 14.5A6 6 0 0 1 6 14.5C6 11 8 8 12 3Z" /></svg>
  return <svg viewBox="0 0 24 24" width="28" height="28" {...common} aria-hidden="true"><path d="M5 19C5 10 11 5 20 4C19 13 14 19 5 19Z" /><path d="M5 19L13 11" /></svg>
}

export function BenefitsGrid({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items : []
  if (data.sectionId === 'values') {
    return (
      <section id="values" className="relative theme-surface py-(--section-y)">
        <div className="container-x">
          <div className="max-w-[760px]">
            {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
            <h2 className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item: any, index: number) => (
              <li key={`${item.title || 'value'}-${index}`}>
                <ValueIcon index={index} />
                <h3 className="font-display text-h5 mt-4 font-semibold text-text">{item.title}</h3>
                {item.body && <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
  if (data.sectionId === 'focus') {
    return (
      <section id="focus" aria-labelledby="focus-h" className="relative theme-surface py-(--section-y)">
        <div className="container-x">
          <div className="max-w-[760px]">
            {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
            <h2 id="focus-h" className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          </div>
          <ul className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item: any, index: number) => (
              <li key={`${item.title || 'focus-area'}-${index}`}>
                <FocusIcon index={index} />
                <h3 className="font-display mt-4 text-h5 font-semibold text-text">{item.title}</h3>
                {item.body && <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
  if (data.sectionId === 'feature-grid') {
    return (
      <section className="relative theme-surface py-(--section-y)">
        <div className="container-x">
          <div className="max-w-[760px]">
            {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
            <h2 className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any, index: number) => <li key={`${item.title || 'feature'}-${index}`} className="rounded-sm border border-border bg-surface p-6">
              <h3 className="font-display mt-4 text-h5 font-semibold text-text">{item.title}</h3>
              <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>
            </li>)}
          </ul>
        </div>
      </section>
    )
  }
  if (data.sectionId === 'sustainability') {
    return (
      <section id="sustainability" aria-labelledby="sustainability-h" className="relative py-(--section-y)">
        <div className="container-x">
          <div className="max-w-[760px]">
            {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
            <h2 id="sustainability-h" className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
            {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {items.map((item: any, index: number) => <li key={`${item.title || 'sustainability'}-${index}`} className="rounded-sm border border-border bg-surface p-6">
              <SustainabilityIcon index={index} />
              <h3 className="font-display mt-4 text-h5 font-semibold text-text">{item.title}</h3>
              <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>
            </li>)}
          </ul>
        </div>
      </section>
    )
  }
  if (data.sectionId === 'core-values') {
    return (
      <section className="relative py-(--section-y)">
        <div className="container-x">
          <div className="max-w-[760px]">
            {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
            <h2 className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          </div>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item: any, index: number) => <li key={`${item.title || 'value'}-${index}`} className="rounded-sm border border-border bg-surface p-6">
              <h3 className="font-display mt-4 text-h5 font-semibold text-text">{item.title}</h3>
              <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>
            </li>)}
          </ul>
        </div>
      </section>
    )
  }
  return (
    <section id={data.sectionId || undefined} className={`${data.background === 'sunken' ? 'theme-sunken' : 'theme-surface'} py-(--section-y)`}>
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
