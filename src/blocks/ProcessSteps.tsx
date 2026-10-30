import { Buttons, Eyebrow, type BlockData } from './shared'

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

        <ol className={data.layoutVariant === 'editorial' ? 'relative mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3' : data.layoutVariant === 'timeline' ? 'mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6' : 'relative mt-12 grid gap-px overflow-hidden rounded-sm bg-border md:grid-cols-2'}>
          {steps.map((step: any, index: number) => (
            <li key={index} className={data.layoutVariant === 'editorial' ? 'relative rounded-sm border border-border bg-surface p-6' : data.layoutVariant === 'timeline' ? 'relative' : 'flex gap-5 bg-surface p-6 md:p-8'}>
              {data.layoutVariant === 'editorial' ? <>
                <span className="absolute -top-3 left-6 inline-flex h-6 items-center rounded-full bg-surface-inverse px-2.5 text-caption font-semibold text-white tabular-nums">Step {index + 1}</span>
                <div className="mt-3"><h3 className="font-display text-h5 font-semibold text-text">{step.title}</h3>{step.body && <p className="text-body-sm mt-2 text-text-secondary">{step.body}</p>}</div>
              </> : data.layoutVariant === 'timeline' ? <>
                <div className="flex items-center gap-3">
                  <span className="border-2 border-text grid h-10 w-10 place-items-center rounded-full font-display font-semibold tabular-nums text-text">{index + 1}</span>
                  {index < steps.length - 1 && <span aria-hidden="true" className="hidden h-px flex-1 bg-border-strong lg:block" />}
                </div>
                <h3 className="font-display text-h5 mt-5 font-semibold text-text">{step.title}</h3>
                {step.body && <p className="text-body-sm mt-2 text-text-secondary">{step.body}</p>}
              </> : <>
                <span className="font-display text-h3 font-light tabular-nums text-text-muted">{String(index + 1).padStart(2, '0')}</span>
                <div><h3 className="font-display text-h5 font-semibold text-text">{step.title}</h3>{step.body && <p className="text-body-sm mt-2 text-text-secondary">{step.body}</p>}</div>
              </>}
            </li>
          ))}
        </ol>
        <Buttons buttons={data.buttons} />
      </div>
    </section>
  )
}
