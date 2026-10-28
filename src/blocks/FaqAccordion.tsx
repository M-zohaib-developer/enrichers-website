'use client'

import { useState } from 'react'
import { Eyebrow, type BlockData } from './shared'

function Plus() {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true"><path d="M12 5V19M5 12H19" /></svg>
}

export function FaqAccordion({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items : []
  const [expanded, setExpanded] = useState<number[]>([])
  const sectionId = data.sectionId || 'faq'
  const headingId = `${sectionId}-h`
  const allExpanded = items.length > 0 && expanded.length === items.length

  const toggle = (index: number) => {
    setExpanded((current) => current.includes(index) ? current.filter((item) => item !== index) : [...current, index])
  }

  return (
    <section id={sectionId} aria-labelledby={headingId} className="relative py-(--section-y)">
      <div className="container-x max-w-[960px]">
        <div className="max-w-[760px]">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 id={headingId} className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
        </div>
        <div className="mt-10">
          <div className="mb-3 flex justify-end">
            <button type="button" onClick={() => setExpanded(allExpanded ? [] : items.map((_: any, index: number) => index))} className="text-body-sm font-semibold text-text-link hover:underline underline-offset-4">
              {allExpanded ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {items.map((item: any, index: number) => {
              const open = expanded.includes(index)
              return (
                <details key={index} open={open} className="group">
                  <summary onClick={(event) => { event.preventDefault(); toggle(index) }} className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-h5 text-text [&::-webkit-details-marker]:hidden">
                    <span>{item.question}</span>
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-(--duration-normal) group-open:rotate-45"><Plus /></span>
                  </summary>
                  <div className="max-w-[72ch] pb-6 text-text-secondary">{item.answer}</div>
                </details>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
