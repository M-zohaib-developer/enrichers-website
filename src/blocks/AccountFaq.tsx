'use client'

import { useId, useState } from 'react'
import { Eyebrow, type BlockData } from './shared'

function Plus() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true"><path d="M12 5V19M5 12H19" /></svg>
}

export function AccountFaq({ data }: { data: BlockData }) {
  const [active, setActive] = useState(0)
  const categories = data.categories ?? []
  const category = categories[active] ?? {}
  const uid = useId()
  const tabId = (i: number) => `${uid}-faq-tab-${i}`
  const panelId = (i: number) => `${uid}-faq-panel-${i}`

  return <section aria-labelledby="faq-h" className="relative py-(--section-y)">
    <div className="container-x max-w-[960px]">
      <div className="max-w-[760px]">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 id="faq-h" className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
      </div>
      <div className="mt-10">
        <div role="tablist" aria-label="FAQ topics" aria-orientation="horizontal" className="flex flex-wrap gap-2">
          {categories.map((entry: any, index: number) => <button key={index} type="button" role="tab" id={tabId(index)} aria-selected={active === index} aria-controls={panelId(index)} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} className={`h-10 shrink-0 whitespace-nowrap rounded-full border px-4 text-body-sm font-semibold transition-colors ${active === index ? 'border-action bg-action text-on-action' : 'border-border text-text-secondary hover:border-border-strong'}`}>{entry.label}</button>)}
        </div>
        <div role="tabpanel" id={panelId(active)} aria-labelledby={tabId(active)} tabIndex={0} className="pt-8 focus-visible:outline-offset-4">
          <div className="divide-y divide-border border-y border-border">
            {(category.items ?? []).map((item: any, index: number) => <details key={index} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-h5 text-text [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-(--duration-normal) group-open:rotate-45"><Plus /></span>
              </summary>
              <div className="max-w-[72ch] pb-6 text-text-secondary">{item.answer}</div>
            </details>)}
          </div>
        </div>
      </div>
    </div>
  </section>
}
