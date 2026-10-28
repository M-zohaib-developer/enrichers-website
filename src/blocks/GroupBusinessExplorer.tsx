'use client'

import { useId, useState } from 'react'
import { Buttons, Eyebrow, type BlockData } from './shared'

function PanelIcon({ kind }: { kind?: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'square' as const, strokeLinejoin: 'miter' as const }
  if (kind === 'development') return <svg viewBox="0 0 24 24" width="88" height="88" {...common} aria-hidden="true"><polygon points="12,6 21,11 12,16 3,11" /><path d="M7.5 8.5L16.5 13.5M16.5 8.5L7.5 13.5M3 11V14L12 19L21 14V11" /></svg>
  if (kind === 'agriculture') return <svg viewBox="0 0 24 24" width="88" height="88" {...common} aria-hidden="true"><path d="M5 19C5 10 11 5 20 4C19 13 14 19 5 19Z" /><path d="M5 19L13 11" /></svg>
  if (kind === 'research') return <svg viewBox="0 0 24 24" width="88" height="88" {...common} aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r=".8" /></svg>
  if (kind === 'hospitality') return <svg viewBox="0 0 24 24" width="88" height="88" {...common} aria-hidden="true"><path d="M12 21C12 21 6 15 6 10A6 6 0 0 1 18 10C18 15 12 21 12 21Z" /><circle cx="12" cy="10" r="2" /></svg>
  return <svg viewBox="0 0 24 24" width="88" height="88" {...common} aria-hidden="true"><path d="M6 3H15L19 7V21H6Z" /><path d="M15 3V7H19M9 12H16M9 16H14" /></svg>
}

export function GroupBusinessExplorer({ data }: { data: BlockData }) {
  const [active, setActive] = useState(0)
  const items = data.items ?? []
  const item = items[active] ?? {}
  const uid = useId()
  const tabId = (i: number) => `${uid}-group-tab-${i}`
  const panelId = (i: number) => `${uid}-group-panel-${i}`
  const buttons = (data.buttons ?? []).map((button: any) => button.blockType === 'primaryButton' ? { ...button, label: button.label || `Explore ${item.title}`, url: item.url } : button)

  return <section aria-labelledby="businessExplorer-h" className="relative theme-surface py-(--section-y)">
    <div className="container-x">
      <div className="max-w-[760px]">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 id="businessExplorer-h" className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
        <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
        <div role="tablist" aria-label="Group businesses" aria-orientation="vertical" className="flex gap-1 overflow-x-auto border-border max-lg:border-b lg:flex-col lg:border-l">
          {items.map((entry: any, i: number) => <button key={i} type="button" role="tab" id={tabId(i)} aria-selected={active === i} aria-controls={panelId(i)} tabIndex={active === i ? 0 : -1} onClick={() => setActive(i)} className={`relative shrink-0 whitespace-nowrap px-5 py-3 text-left text-[15px] font-semibold transition-colors max-lg:h-12 max-lg:py-0 ${active === i ? 'text-text lg:bg-surface-sunken after:absolute after:bg-accent max-lg:after:inset-x-0 max-lg:after:-bottom-px max-lg:after:h-0.5 lg:after:inset-y-0 lg:after:-left-px lg:after:w-0.5' : 'text-text-muted hover:text-text'}`}>{entry.label}</button>)}
        </div>
        <div role="tabpanel" id={panelId(active)} aria-labelledby={tabId(active)} tabIndex={0} className="focus-visible:outline-offset-4">
          <div className="grid gap-8 md:grid-cols-[1fr_220px]">
            <div>
              <p className="text-overline font-semibold tracking-overline text-text-muted uppercase">{item.eyebrow}</p>
              <h3 className="font-display text-h2 mt-3 text-text">{item.title}</h3>
              {item.quote && <p className="font-display text-h5 mt-2 text-text-secondary">“{item.quote}”</p>}
              <p className="text-body-lg mt-5 max-w-[60ch] text-text-secondary">{item.body}</p>
              <Buttons buttons={buttons} fallback={[{ label: `Explore ${item.title}`, url: item.url }, { label: 'Book a consultation', url: '/contact-us/', secondary: true }]} />
            </div>
            <div className="theme-inverse relative hidden aspect-square place-items-center overflow-hidden rounded-sm md:grid">
              <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none"><defs><pattern id={`${uid}-lattice`} width="34.64" height="20" patternUnits="userSpaceOnUse"><path d="M0 0L34.64 20M0 20L34.64 0M0 0V20M17.32 0V20" stroke="var(--ds-chrome-strong)" strokeOpacity="0.08" strokeWidth=".8" fill="none" /></pattern></defs><rect width="100%" height="100%" fill={`url(#${uid}-lattice)`} /></svg>
              <span className="relative text-[var(--ds-chrome-mark)]"><PanelIcon kind={item.icon} /></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}
