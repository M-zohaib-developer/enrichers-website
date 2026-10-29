'use client'

import { useId, useRef, useState } from 'react'
import { Eyebrow, type BlockData } from './shared'

function Plus() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true"><path d="M12 5V19M5 12H19" /></svg>
}

/**
 * Tabbed FAQ.
 *
 * Every panel is rendered and the inactive ones carry `hidden`, rather than
 * mounting only the active category. Two reasons: the answers are the whole
 * point of the page and need to be in the HTML to be indexed — only the first
 * tab's questions were reaching crawlers — and `aria-controls` on an inactive
 * tab pointed at an id that did not exist, which is a dangling reference.
 */
export function AccountFaq({ data }: { data: BlockData }) {
  const [active, setActive] = useState(0)
  const categories = (data.categories ?? []) as { label?: string; items?: { question?: string; answer?: string }[] }[]
  const uid = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const tabId = (i: number) => `${uid}-faq-tab-${i}`
  const panelId = (i: number) => `${uid}-faq-panel-${i}`

  /** Arrow/Home/End movement, which the roving tabindex below implies. */
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const last = categories.length - 1
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return <section aria-labelledby="faq-h" className="relative py-(--section-y)">
    <div className="container-x max-w-[960px]">
      <div className="max-w-[760px]">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 id="faq-h" className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
      </div>
      <div className="mt-10">
        <div role="tablist" aria-label="FAQ topics" aria-orientation="horizontal" className="flex flex-wrap gap-2">
          {categories.map((entry, index) => <button key={index} type="button" role="tab" id={tabId(index)} ref={(node) => { tabRefs.current[index] = node }} aria-selected={active === index} aria-controls={panelId(index)} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => onKeyDown(event, index)} className={`h-10 shrink-0 whitespace-nowrap rounded-full border px-4 text-body-sm font-semibold transition-colors ${active === index ? 'border-action bg-action text-on-action' : 'border-border text-text-secondary hover:border-border-strong'}`}>{entry.label}</button>)}
        </div>
        {categories.map((entry, categoryIndex) => <div key={categoryIndex} role="tabpanel" id={panelId(categoryIndex)} aria-labelledby={tabId(categoryIndex)} hidden={active !== categoryIndex} tabIndex={0} className="pt-8 focus-visible:outline-offset-4">
          <div className="divide-y divide-border border-y border-border">
            {(entry.items ?? []).map((item, index) => <details key={index} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-h5 text-text [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-(--duration-normal) group-open:rotate-45"><Plus /></span>
              </summary>
              <div className="max-w-[72ch] pb-6 text-text-secondary">{item.answer}</div>
            </details>)}
          </div>
        </div>)}
      </div>
    </div>
  </section>
}
