'use client'

import NextLink from 'next/link'
import { useId, useState } from 'react'
import { ArrowRightIcon } from '@/components/Icon'
import { Eyebrow, type BlockData } from './shared'

export function TabbedContent({ data }: { data: BlockData }) {
  const tabs = Array.isArray(data.tabs) ? data.tabs : []
  const [active, setActive] = useState(Math.min(Number(data.defaultTab) || 0, Math.max(tabs.length - 1, 0)))
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
              {(tab.featureCards?.length || tab.table?.rows?.length || tab.quote) ? (
                <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {(tab.featureCards ?? []).map((card: any, cardIndex: number) => (
                      <div key={cardIndex} className="rounded-sm border border-border bg-surface p-5">
                        <dt className="font-semibold text-text">{card.title}</dt>
                        <dd className="text-body-sm mt-1 text-text-secondary">{card.body}</dd>
                      </div>
                    ))}
                  </dl>
                  {tab.table?.rows?.length ? (
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[420px] text-left text-body-sm tabular-nums">
                        {tab.table.caption && <caption className="mb-3 text-left font-semibold text-text">{tab.table.caption}</caption>}
                        <thead>
                          <tr className="border-b-2 border-text text-caption uppercase tracking-[0.08em] text-text-muted">
                            {(tab.table.columns ?? []).map((column: any, columnIndex: number) => <th key={columnIndex} scope="col" className="py-2 pr-4">{column.label}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {(tab.table.rows ?? []).map((row: any, rowIndex: number) => <tr key={rowIndex} className="border-b border-border">
                            {(row.cells ?? []).map((cell: any, cellIndex: number) => cellIndex === 0 ? <th key={cellIndex} scope="row" className="py-3 pr-4 font-semibold text-text">{cell.value}</th> : <td key={cellIndex} className="py-3 pr-4 text-text">{cell.value}</td>)}
                          </tr>)}
                        </tbody>
                      </table>
                    </div>
                  ) : tab.quote ? (
                    <div className="theme-inverse relative grid min-h-[220px] place-items-center overflow-hidden rounded-sm p-8">
                      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
                        <defs><pattern id={`${uid}-quote-${index}`} width="34.64" height="20" patternUnits="userSpaceOnUse"><path d="M0 0L34.64 20M0 20L34.64 0M0 0V20M17.32 0V20" stroke="var(--e-neutral-0)" strokeOpacity=".08" strokeWidth=".8" fill="none" /></pattern></defs>
                        <rect width="100%" height="100%" fill={`url(#${uid}-quote-${index})`} />
                      </svg>
                      <p className="relative max-w-[32ch] text-center font-display text-h4 font-light text-text">“{tab.quote}”</p>
                    </div>
                  ) : null}
                </div>
              ) : <p className="max-w-[60ch] text-body-lg text-text-secondary">{tab.body}</p>}
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
