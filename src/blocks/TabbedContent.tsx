'use client'

import NextLink from 'next/link'
import { useId, useState } from 'react'
import { ArrowRightIcon } from '@/components/Icon'
import { Eyebrow, type BlockData } from './shared'

export function TabbedContent({ data }: { data: BlockData }) {
  const tabs = Array.isArray(data.tabs) ? data.tabs : []
  const [active, setActive] = useState(0)
  const uid = useId()
  const sectionId = data.sectionId || 'tabbed-content'
  const headingId = `${sectionId}-h`

  return (
    <section id={sectionId} aria-labelledby={headingId} className="relative py-(--section-y)">
      <div className="container-x">
        <div className="max-w-[760px]">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 id={headingId} className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">
            {data.heading}
          </h2>
          {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
        </div>

        <div className="mt-10">
          <div role="tablist" aria-label={data.heading} aria-orientation="horizontal" className="flex gap-1 overflow-x-auto border-b border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((tab: any, index: number) => {
              const selected = active === index
              return (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel-${index}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`relative h-12 shrink-0 whitespace-nowrap px-4 text-[15px] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 ${selected ? 'text-text after:bg-accent' : 'text-text-muted hover:text-text after:bg-transparent'}`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {tabs.map((tab: any, index: number) => (
            <div
              key={index}
              role="tabpanel"
              id={`${uid}-panel-${index}`}
              aria-labelledby={`${uid}-tab-${index}`}
              tabIndex={0}
              hidden={active !== index}
              className="pt-8 focus-visible:outline-offset-4"
            >
              <p className="max-w-[60ch] text-body-lg text-text-secondary">{tab.body}</p>
            </div>
          ))}
        </div>

        {data.disclosureText && (
          <p className="text-caption mt-8 text-text-muted">
            {data.disclosureText}{' '}
            {data.disclosureUrl && data.disclosureLabel ? (
              <NextLink href={data.disclosureUrl} className="group inline-flex items-center gap-1.5 font-semibold text-text-link hover:underline underline-offset-4">
                {data.disclosureLabel}
                <ArrowRightIcon size={16} className="transition-transform duration-(--duration-fast) group-hover:translate-x-[3px]" />
              </NextLink>
            ) : null}
          </p>
        )}
      </div>
    </section>
  )
}
