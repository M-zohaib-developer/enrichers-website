'use client'

import { useId, useState } from 'react'
import { MinusIcon, PlusIcon } from '@/components/Icon'
import { Eyebrow, type BlockData } from './shared'

export function AccountFaq({ data }: { data: BlockData }) {
  const [active, setActive] = useState(0)
  const categories = data.categories ?? []
  const category = categories[active] ?? {}

  // Tabs must point at their panel and back again, or a screen reader reads a
  // row of buttons with no idea which region they control. useId keeps the ids
  // unique if the block is ever placed on a page twice.
  const uid = useId()
  const tabId = (i: number) => `${uid}-faq-tab-${i}`
  const panelId = `${uid}-faq-panel`

  return (
    <section className="py-(--section-y)">
      <div className="container-x max-w-[960px]">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>
        <div className="mt-8">
          <div
            className="flex flex-wrap gap-2 border-b border-border pb-3"
            role="tablist"
            aria-label="FAQ topics"
          >
            {categories.map((entry: any, index: number) => (
              <button
                key={index}
                type="button"
                role="tab"
                id={tabId(index)}
                aria-selected={active === index}
                aria-controls={panelId}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
                className={`min-h-10 rounded-sm px-4 text-button font-semibold ${active === index ? 'bg-action text-on-action' : 'text-action hover:bg-surface-sunken'}`}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <div
            className="mt-6 space-y-4"
            role="tabpanel"
            id={panelId}
            aria-labelledby={tabId(active)}
          >
            {(category.items ?? []).map((item: any, index: number) => (
              <details key={index} className="group border-t border-border py-4">
                <summary className="text-body flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-text">
                  {item.question}
                  {/* The marker has to flip with the panel — a static "+" on an
                      open row reads as "still closed". */}
                  <PlusIcon size={16} className="shrink-0 group-open:hidden" />
                  <MinusIcon size={16} className="hidden shrink-0 group-open:block" />
                </summary>
                <p className="text-body-sm mt-3 max-w-measure text-text-secondary">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
