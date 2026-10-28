import Image from 'next/image'
import { Buttons, Eyebrow, imageAlt, imageSrc, type BlockData } from './shared'

export function PlatformDownloads({ data }: { data: BlockData }) {
  const platforms = Array.isArray(data.platforms) ? data.platforms : []
  const sectionId = data.sectionId || 'downloads'
  const headingId = `${sectionId}-h`

  return (
    <section id={sectionId} aria-labelledby={headingId} className="relative theme-surface py-(--section-y)">
      <div className="container-x">
        <div className="max-w-[760px]">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 id={headingId} className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
        </div>
        <ul className="mt-12 grid gap-6 lg:grid-cols-3">
          {platforms.map((platform: any, index: number) => {
            const src = imageSrc(platform.image)
            return (
              <li key={index} className="flex flex-col rounded-sm border border-border bg-surface p-6 md:p-8">
                {src && <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-sm bg-surface-sunken"><Image src={src} alt={imageAlt(platform.image, `${platform.platform} MetaTrader 5 screenshot`)} fill className="object-contain" sizes="(min-width: 1024px) 30vw, 90vw" /></div>}
                <p className="text-overline font-semibold tracking-overline text-text-muted uppercase">{platform.platform}</p>
                <h3 className="font-display text-h4 mt-3 font-semibold text-text">{platform.title}</h3>
                <p className="mt-3 flex-1 text-text-secondary">{platform.description}</p>
                <Buttons buttons={platform.buttons} showArrow={false} />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
