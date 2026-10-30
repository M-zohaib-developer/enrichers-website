import { Eyebrow, type BlockData } from './shared'

type Stat = { value?: string | null; label?: string | null }

const THEMES: Record<string, string> = {
  inverse: 'theme-inverse',
  surface: 'theme-surface',
  sunken: 'theme-sunken',
}

/**
 * A band of headline figures.
 *
 * Dividers only appear at `lg`, where every figure sits on one row and
 * `first:` reliably identifies the left edge. Below that the grid wraps, and a
 * left border would land mid-row on the wrapped items.
 */
export function StatsBand({ data }: { data: BlockData }) {
  const stats = (Array.isArray(data.stats) ? data.stats : []) as Stat[]
  if (stats.length === 0) return null

  const theme = THEMES[data.background as string] || THEMES.inverse
  const columns = stats.length >= 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : stats.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'

  if (data.sectionId === 'facts') {
    return (
      <section className="relative theme-surface py-[calc(var(--section-y)*0.5)]">
        <div className="container-x">
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => <div key={`${stat.value || 'stat'}-${index}`} className="border-t-2 border-[var(--color-text)] pt-4">
              <dd className="font-display text-h1 font-light tabular-nums text-text">{stat.value}</dd>
              <dt className="text-body-sm mt-1 text-text-secondary">{stat.label}</dt>
            </div>)}
          </dl>
        </div>
      </section>
    )
  }

  return (
    <section id={data.sectionId || undefined} className={`${theme} py-(--section-y)`}>
      <div className="container-x">
        {(data.eyebrow || data.heading || data.body) && (
          <div className="max-w-measure">
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            {data.heading && <h2 className="font-display text-h2 mt-3 tracking-heading text-text">{data.heading}</h2>}
            {data.body && <p className="text-body-lg mt-4 text-text-secondary">{data.body}</p>}
          </div>
        )}

        <dl className={`mt-10 grid gap-x-8 gap-y-10 border-t border-border pt-10 ${columns}`}>
          {stats.map((stat, index) => (
            <div
              key={`${stat.value || 'stat'}-${index}`}
              className="flex flex-col-reverse lg:border-l lg:border-border lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              {/* Term below value visually, but `dt` stays before `dd` in the
                  DOM so the pairing is correct for assistive tech. */}
              <dt className="text-body-sm mt-2 max-w-[22ch] text-text-secondary">{stat.label}</dt>
              <dd className="font-display text-display font-light tracking-display text-text tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {data.footnote && <p className="text-caption mt-8 text-text-muted">{data.footnote}</p>}
      </div>
    </section>
  )
}
