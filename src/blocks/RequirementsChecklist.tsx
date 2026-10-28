import NextLink from 'next/link'
import { Eyebrow, type BlockData } from './shared'

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="mt-0.5 shrink-0 text-accent" aria-hidden="true">
      <path d="M5 12.5L10 17L19 7" />
    </svg>
  )
}

export function RequirementsChecklist({ data }: { data: BlockData }) {
  const groups = Array.isArray(data.groups) ? data.groups : []
  const sectionId = data.sectionId || 'documents'
  const headingId = `${sectionId}-h`

  return (
    <section id={sectionId} aria-labelledby={headingId} className="relative theme-surface py-(--section-y)">
      <div className="container-x">
        <div className="max-w-[760px]">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h2 id={headingId} className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">
            {data.heading}
          </h2>
        </div>

        <div className={`mt-10 grid gap-6 ${groups.length > 1 ? 'lg:grid-cols-2' : ''}`}>
          {groups.map((group: any, index: number) => (
            <div key={index} className="rounded-sm border border-border bg-surface p-6 md:p-8">
              <h3 className="font-display text-h4 font-semibold text-text">{group.title}</h3>
              <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {(group.items ?? []).map((item: any, itemIndex: number) => (
                  <li key={itemIndex} className="flex gap-3 text-body-sm text-text">
                    <CheckIcon />
                    <span>{typeof item === 'string' ? item : item.label}</span>
                  </li>
                ))}
              </ul>
              {group.button?.label && group.button?.url && (
                <NextLink href={group.button.url} className="mt-6 inline-flex h-11 items-center justify-center rounded-sm border border-border-strong bg-transparent px-5 text-button font-semibold text-text transition-colors hover:border-text">
                  <span>{group.button.label}</span>
                </NextLink>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
