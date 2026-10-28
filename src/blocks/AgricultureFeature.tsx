import Image from 'next/image'
import { Buttons, Eyebrow, imageAlt, imageSrc, type BlockData } from './shared'
import { RichText } from '@/components/RichText'

export function AgricultureFeature({ data }: { data: BlockData }) {
  const image = imageSrc(data.image)
  const imageFirst = data.imagePosition === 'left'
  return (
    <section id={data.sectionId || undefined} className="theme-surface py-(--section-y)">
      <div className={`container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${imageFirst ? '' : ''}`}>
        {imageFirst && image && <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-surface-sunken lg:order-first"><Image src={image} alt={imageAlt(data.image, data.imageAlt || data.heading)} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" /></div>}
        <div className={imageFirst ? 'lg:order-last' : ''}>
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 className="font-display text-h3 mt-3 font-semibold text-text">{data.heading}</h2>
          <RichText data={data.body} className="agriculture-rich-text mt-5 text-body-lg text-text-secondary" />
          <Buttons buttons={data.buttons} />
        </div>
        {!imageFirst && image && <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-surface-sunken"><Image src={image} alt={imageAlt(data.image, data.imageAlt || data.heading)} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" /></div>}
      </div>
    </section>
  )
}
