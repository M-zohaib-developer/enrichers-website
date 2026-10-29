import { Eyebrow, type BlockData } from './shared'

export function ProcessSteps({ data }: { data: BlockData }) {
  const steps = Array.isArray(data.steps) ? data.steps : []
  const sectionId = data.sectionId || 'process'
  const headingId = `${sectionId}-h`

  return (
    <section id={sectionId} aria-labelledby={headingId} className="relative theme-surface py-(--section-y)">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 id={headingId} className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">
              {data.heading}
            </h2>
          </div>
          <div className="lg:col-span-5">
            {data.intro && <p className="text-body-lg text-text-secondary">{data.intro}</p>}
          </div>
        </div>

        <ol className="relative mt-12 grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2">
          {steps.map((step: any, index: number) => (
            <li key={index} className="flex gap-5 bg-surface p-6 md:p-8">
              <span className="font-display text-h3 font-light tabular-nums text-text-muted">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-h5 font-semibold text-text">{step.title}</h3>
                {step.body && <p className="text-body-sm mt-2 text-text-secondary">{step.body}</p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
