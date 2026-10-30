import Image from 'next/image'
import { Buttons, Eyebrow, imageAlt, imageSrc, type BlockData } from './shared'
import { RichText } from '@/components/RichText'

export function AgricultureFeature({ data }: { data: BlockData }) {
  const image = imageSrc(data.image)
  const imageFirst = data.imagePosition === 'left'
  if (data.sectionId === 'mudarabah') {
    return (
      <section id="mudarabah" aria-labelledby="mudarabah-h" className="relative theme-surface py-(--section-y)">
        <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6 lg:order-2">
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            <h2 id="mudarabah-h" className="font-display text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
            <RichText data={data.body} className="agriculture-rich-text mt-6 text-body-lg text-text-secondary" />
            <ul className="mt-6 space-y-2">
              {['Rabb-ul-mal: capital investors, the silent partners', 'Mudarib: the working partners who run the farm', 'Profits are shared between them'].map((item) => <li key={item} className="flex gap-3">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="mt-0.5 shrink-0 text-accent" aria-hidden="true"><path d="M5 12.5L10 17L19 7" /></svg>{item}
              </li>)}
            </ul>
            <div className="mt-8">
              <a className="font-semibold text-link underline-offset-4 hover:underline" href="/school-of-agriculture-research-centre">Our research centre, Baab-ul-Ilm</a>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1">
            {image ? <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-surface-sunken"><Image src={image} alt={imageAlt(data.image, data.imageAlt || data.heading)} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" /></div> : <div className="relative grid aspect-[3/2] place-items-center overflow-hidden rounded-sm border border-dashed border-line-strong bg-surface-sunken p-6 text-center text-text-muted">Photography to be supplied: Enri-Farms field operations</div>}
          </div>
        </div>
      </section>
    )
  }
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
