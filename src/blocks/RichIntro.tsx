import { RichText } from '@/components/RichText'
import { Buttons, type BlockData } from './shared'

export function RichIntro({ data }: { data: BlockData }) {
  return (
    <section className="theme-light py-(--section-y)">
      <div className="container-x">
        <div className="w-full max-w-[1280px]">
          <h2 className="font-display text-h2 text-text">{data.heading}</h2>
          <RichText data={data.body} className="mt-5 max-w-none text-body-lg text-text-secondary" />
          <Buttons buttons={data.buttons} fallback={[]} />
        </div>
      </div>
    </section>
  )
}
