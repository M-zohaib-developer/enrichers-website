import Image from 'next/image'
import { imageAlt, imageSrc, type BlockData } from './shared'

export function ImageTextFeature({ data }: { data: BlockData }) {
  const image = imageSrc(data.image)
  const imageOnLeft = data.imagePosition === 'left'
  return (
    <section className="theme-surface py-(--section-y)">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={imageOnLeft ? 'lg:order-2' : undefined}>
          <h2 className="font-display text-h3 font-semibold text-text">{data.heading}</h2>
          <p className="text-body-lg mt-5 max-w-[62ch] text-text-secondary">{data.body}</p>
        </div>
        {image && <div className={imageOnLeft ? 'relative aspect-[16/9] overflow-hidden rounded-sm bg-surface/70 lg:order-1' : 'relative aspect-[16/9] overflow-hidden rounded-sm bg-surface/70'}>
          <Image src={image} alt={imageAlt(data.image, data.imageAlt || data.heading)} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>}
      </div>
    </section>
  )
}
