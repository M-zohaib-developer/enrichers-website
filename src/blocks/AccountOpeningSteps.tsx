import { Button, Eyebrow, type BlockData } from './shared'
export function AccountOpeningSteps({ data }: { data: BlockData }) {
  return (
    <section className="py-(--section-y)">
      <div className="container-x">
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {(data.steps ?? []).map((step: any, i: number) => (
            <div
              key={i}
              className="relative lg:pr-6 lg:after:absolute lg:after:left-12 lg:after:right-0 lg:after:top-5 lg:after:h-px lg:after:bg-border last:lg:after:hidden"
            >
              <span className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-border-strong bg-surface font-display text-body font-semibold text-text">
                {i + 1}
              </span>
              <h3 className="font-display text-h4 mt-5 text-text">{step.title}</h3>
              <p className="text-body-sm mt-2 text-text-secondary">{step.body}</p>
            </div>
          ))}
        </div>
        {data.note && (
          <p className="text-body-sm mt-10 max-w-measure text-text-muted">{data.note}</p>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button link={data.button} />
          <Button link={data.secondaryButton} secondary />
        </div>
      </div>
    </section>
  )
}
