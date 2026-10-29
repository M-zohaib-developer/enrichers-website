import Image from 'next/image'
import { Eyebrow, imageAlt, imageSrc, type BlockData } from './shared'

export function HospitalityExperienceGrid({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items : []

  return (
    <section id={data.sectionId || undefined} className="theme-surface pt-8 pb-(--section-y) md:pt-12 lg:pt-16">
      <div className="container-x">
        <div className="max-w-[860px]">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>
          {data.body && <p className="text-body-lg mt-5 max-w-[90ch] text-text-secondary">{data.body}</p>}
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item: any, index: number) => {
            const image = imageSrc(item.image)
            return (
              <li key={`${item.title || 'experience'}-${index}`} className="group overflow-hidden rounded-sm bg-surface shadow-sm transition-[box-shadow,transform] duration-[400ms] ease-in-out hover:-translate-y-1 hover:shadow-md focus-within:-translate-y-1 focus-within:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
                {image && (
                  <div className="relative aspect-[1.75/1] overflow-hidden bg-surface-sunken">
                    <Image
                      src={image}
                      alt={imageAlt(item.image, item.imageAlt || item.title)}
                      fill
                      className="object-cover transition-transform duration-[450ms] ease-in-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-display text-h5 font-semibold text-text">{item.title}</h3>
                  <p className="text-body-sm mt-2 text-text-secondary">{item.body}</p>
                </div>
              </li>
            )
          })}
        </ul>

        {data.closingLine && <p className="text-body-lg mt-6 text-text-secondary">{data.closingLine}</p>}
      </div>
    </section>
  )
}
