'use client'
import { useId, useState } from 'react'
import { Button, Eyebrow, type BlockData } from './shared'

export function GroupBusinessExplorer({ data }: { data: BlockData }) {
  const [active, setActive] = useState(0)
  const items = data.items ?? []
  const item = items[active] ?? {}

  // See AccountFaq — tabs need an id/aria-controls pair to be announced.
  const uid = useId()
  const tabId = (i: number) => `${uid}-group-tab-${i}`
  const panelId = `${uid}-group-panel`
  return (
    <section className="theme-surface py-(--section-y)">
      <div className="container-x">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>
        <p className="text-body-lg mt-3 max-w-measure text-text-secondary">{data.body}</p>
        <div
          className="mt-10 flex flex-wrap gap-2 border-b border-border pb-3"
          role="tablist"
          aria-label="Group businesses"
        >
          {items.map((entry: any, i: number) => (
            <button
              key={i}
              type="button"
              role="tab"
              id={tabId(i)}
              aria-selected={active === i}
              aria-controls={panelId}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`min-h-10 rounded-sm px-4 text-button font-semibold ${active === i ? 'bg-action text-on-action' : 'text-action hover:bg-surface-sunken'}`}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <div
          className="mt-10 max-w-3xl"
          role="tabpanel"
          id={panelId}
          aria-labelledby={tabId(active)}
        >
          <Eyebrow>{item.eyebrow}</Eyebrow>
          <h3 className="font-display text-h2 mt-3 text-text">{item.title}</h3>
          {item.quote && <p className="font-serif text-body-lg mt-6 text-text">“{item.quote}”</p>}
          <p className="text-body-lg mt-5 text-text-secondary">{item.body}</p>
          <Button link={{ label: data.itemButtonLabel, url: item.url }} />
          <Button link={data.itemSecondaryButton} secondary />
        </div>
      </div>
    </section>
  )
}
