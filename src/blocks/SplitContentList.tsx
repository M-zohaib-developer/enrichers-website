import type { BlockData } from './shared'

export function SplitContentList({ data }: { data: BlockData }) {
  const items = Array.isArray(data.rightItems) ? data.rightItems : []
  return (
    <section id={data.sectionId || undefined} className="theme-surface py-(--section-y)">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="font-display text-h3 font-semibold text-text">{data.leftHeading}</h2>
          <p className="text-body-lg mt-5 max-w-[62ch] text-text-secondary">{data.leftBody}</p>
        </div>
        <div>
          <h2 className="font-display text-h3 font-semibold text-text">{data.rightHeading}</h2>
          <p className="text-body-lg mt-5 max-w-[62ch] text-text-secondary">{data.rightBody}</p>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 text-body-lg font-semibold text-text-secondary">
            {items.map((item: any, index: number) => <li key={index}>{typeof item === 'string' ? item : item.label}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
