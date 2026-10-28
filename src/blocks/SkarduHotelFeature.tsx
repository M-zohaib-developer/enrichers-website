import Image from 'next/image'
import NextLink from 'next/link'
import { Eyebrow, imageAlt, imageSrc, type BlockData } from './shared'
export function SkarduHotelFeature({ data }: { data: BlockData }) {
  const button = data.buttons?.[0] ?? data.button
  return (
    <section className="py-(--section-y)">
      <div className="container-x">
        {/* One card, one link. The border and background belong to the card,
            not to container-x, and the two halves sit flush with no gap —
            padding lives on the text column so the image reaches the edge. */}
        <NextLink
          href={button?.url || '#'}
          className="group grid overflow-hidden rounded-sm border border-border bg-surface md:grid-cols-2"
        >
          <figure className="relative overflow-hidden bg-surface-sunken">
            <Image
              src={imageSrc(data.image, '/brand/skardu-hotel.webp')}
              alt={imageAlt(data.image, 'Skardu Riverside Hotel')}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            {data.imageCaption ? (
              <figcaption className="text-caption absolute right-0 bottom-0 left-0 z-[1] bg-surface-inverse/75 px-3 py-1.5 text-white">
                {data.imageCaption}
              </figcaption>
            ) : null}
          </figure>

          <div className="flex flex-col p-6 md:p-10">
            <Eyebrow>{data.eyebrow}</Eyebrow>
            <h2 className="font-display text-h2 mt-4 text-text underline-offset-4 group-hover:underline">
              {data.heading}
            </h2>
            <p className="mt-4 text-text-secondary">{data.body}</p>
            {/* mt-auto pins the stats to the bottom of the taller column. */}
            <dl className="mt-auto grid grid-cols-2 gap-4 pt-8">
              {(data.facts ?? []).map((fact: any, i: number) => (
                <div key={i}>
                  <dd className="font-display text-h3 font-light text-text">{fact.value}</dd>
                  <dt className="text-caption text-text-muted">{fact.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </NextLink>
      </div>
    </section>
  )
}
