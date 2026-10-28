import Image from 'next/image'
import { imageAlt, imageSrc, type BlockData } from './shared'

export function FocusAreasGrid({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items : []

  return (
    <section id={data.sectionId || undefined} className="theme-surface py-(--section-y)">
      <div className="container-x">
        <div className="max-w-[760px]">
          {data.eyebrow && <p className="text-overline mb-4 font-semibold tracking-overline text-text-muted uppercase">{data.eyebrow}</p>}
          <h2 className="font-display text-h2 text-text">{data.heading}</h2>
          {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((item: any, index: number) => {
            const image = imageSrc(item.image)
            return (
              <li
                key={`${item.title || 'focus-area'}-${index}`}
                tabIndex={0}
                className="group flex h-full flex-col overflow-hidden rounded-sm border border-border bg-surface opacity-[0.98] shadow-sm outline-none transition-[border-color,box-shadow,opacity,transform] duration-[400ms] ease-in-out hover:-translate-y-0.5 hover:border-border-strong hover:opacity-100 hover:shadow-md focus-visible:-translate-y-0.5 focus-visible:border-border-strong focus-visible:opacity-100 focus-visible:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action motion-reduce:transform-none motion-reduce:transition-none"
              >
                {image && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-surface-sunken">
                    <Image
                      src={image}
                      alt={imageAlt(item.image, item.imageAlt || item.title)}
                      fill
                      className="object-cover opacity-[0.98] transition-[opacity,transform] duration-[400ms] ease-in-out group-hover:scale-[1.03] group-hover:opacity-100 group-focus-visible:scale-[1.03] group-focus-visible:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <h3 className="font-display text-h5 font-semibold text-text">{item.title}</h3>
                  <p className="text-body-sm mt-3 text-text-secondary">{item.body}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
