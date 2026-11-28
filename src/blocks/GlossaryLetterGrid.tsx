import { Eyebrow, type BlockData } from './shared'

function Plus() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M12 5V19M5 12H19" />
    </svg>
  )
}

type Term = { question?: string; answer?: string }
type Group = { letter?: string; items?: Term[] }

export function GlossaryLetterGrid({ data }: { data: BlockData }) {
  const sectionId = (data.sectionId as string) || 'glossary'
  const groups: Group[] = Array.isArray(data.groups) ? (data.groups as Group[]) : []
  const headingId = `${sectionId}-h`
  const hasHeader = Boolean(data.eyebrow || data.heading || data.intro)

  return (
    <section id={sectionId} aria-labelledby={hasHeader ? headingId : undefined} className="relative py-(--section-y)">
      <div className="container-x">
        {hasHeader && (
          <header className="mb-12 max-w-3xl">
            {data.eyebrow && <Eyebrow>{data.eyebrow as string}</Eyebrow>}
            {data.heading && (
              <h2 id={headingId} className="font-display text-h3 mt-3 font-semibold text-text">
                {data.heading as string}
              </h2>
            )}
            {data.intro && <p className="mt-4 text-text-secondary">{data.intro as string}</p>}
          </header>
        )}

        <div className="grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
          {groups.map((group, gi) => {
            const letter = String(group.letter || '').trim()
            if (!letter) return null
            const anchor = `letter-${letter.toLowerCase()}`
            const items = Array.isArray(group.items) ? group.items : []
            return (
              <div key={`${anchor}-${gi}`} id={anchor} className="scroll-mt-(--header-h)">
                <h3 className="font-display text-h2 font-semibold text-accent">{letter}</h3>
                <div className="mt-4 border-y border-border">
                  {items.map((item, ii) => (
                    <details
                      key={ii}
                      className="group border-b border-border last:border-b-0"
                    >
                      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-h5 text-text [&::-webkit-details-marker]:hidden">
                        <span>{item.question}</span>
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border transition-transform duration-(--duration-normal) group-open:rotate-45">
                          <Plus />
                        </span>
                      </summary>
                      <div className="max-w-[72ch] pb-6 text-text-secondary">
                        <p>{item.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
