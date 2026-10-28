import { Buttons, type BlockData } from './shared'

export function BusinessIntro({ data }: { data: BlockData }) {
  return (
    <section className="theme-light py-(--section-y)">
      <div className="container-x">
        <div className="max-w-[1100px]">
          <h2 className="font-display text-h2 text-text">{data.heading}</h2>
          <p className="text-body-lg mt-5 max-w-[90ch] text-text-secondary">{data.body}</p>
          <Buttons buttons={data.buttons} fallback={[]} />
        </div>
      </div>
    </section>
  )
}
