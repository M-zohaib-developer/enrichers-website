import NextLink from 'next/link'
import { JunctionMark } from '@/components/Icon'
import type { BlockData } from './shared'

function CardIcon({ kind }: { kind?: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const }
  if (kind === 'development') return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><polygon points="12,6 21,11 12,16 3,11" /><path d="M7.5 8.5L16.5 13.5M16.5 8.5L7.5 13.5M3 11V14L12 19L21 14V11" /></svg>
  if (kind === 'agriculture') return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><path d="M5 19C5 10 11 5 20 4C19 13 14 19 5 19Z" /><path d="M5 19L13 11" /></svg>
  if (kind === 'research') return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" /></svg>
  if (kind === 'hospitality') return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><path d="M12 21C12 21 6 15 6 10A6 6 0 0 1 18 10C18 15 12 21 12 21Z" /><circle cx="12" cy="10" r="2" /></svg>
  return <svg viewBox="0 0 24 24" width="32" height="32" {...common} aria-hidden="true"><path d="M6 3H15L19 7V21H6Z" /><path d="M15 3V7H19M9 12H16M9 16H14" /></svg>
}

export function BusinessGroupCards({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items : []
  return (
    <section aria-labelledby="businessExplorer-h" className="relative theme-surface py-(--section-y)">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {data.eyebrow && <p className="text-overline mb-4 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
            <h2 id="businessExplorer-h" className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          </div>
          <div className="lg:col-span-5">
            {data.body && <p className="text-body-lg text-text-secondary">{data.body}</p>}
          </div>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item: any, index: number) => (
            <li key={`${item.title || 'group'}-${index}`}>
              <NextLink href={item.url || '#'} className="group relative flex h-full flex-col rounded-sm border border-border-subtle bg-surface p-5 transition-[transform,box-shadow] duration-(--duration-normal) ease-(--ease-standard) hover:-translate-y-0.5 hover:shadow-md md:p-6">
                <div className="flex items-start justify-between gap-3">
                  <CardIcon kind={item.icon} />
                  {item.eyebrow && <span className="inline-flex items-center gap-1.5 rounded-xs border border-border px-2 py-0.5 text-label font-semibold tracking-[0.04em] text-text-secondary">{item.eyebrow}</span>}
                </div>
                <h3 className="font-display mt-8 text-h4 font-semibold text-text">{item.title}</h3>
                {item.subtitle && <p className="text-caption text-text-muted">{item.subtitle}</p>}
                <p className="text-body-sm mt-3 flex-1 text-text-secondary">{item.body}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-semibold text-text-link">Explore <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="transition-transform group-hover:translate-x-[3px]" aria-hidden="true"><path d="M4 12H19M13 6L19 12L13 18" /></svg></span>
              </NextLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
