import Image from 'next/image'
import { Buttons, Eyebrow, imageSrc, type BlockData, type MediaValue } from './shared'

export function FounderStatement({ data }: { data: BlockData }) {
  const portrait = imageSrc(data.portrait as MediaValue)
  if (data.imagePosition && portrait) {
    const imageLeft = data.imagePosition === 'left'
    return (
      <section id={data.sectionId || undefined} className="relative py-(--section-y)">
        <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-5 ${imageLeft ? 'lg:order-1' : 'lg:order-2'}`}>
            <figure className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-sunken">
              <Image src={portrait} alt={data.authorName || 'Founder portrait'} fill className="object-cover object-top" sizes="(min-width: 1024px) 38vw, 100vw" />
            </figure>
          </div>
          <figure className={`lg:col-span-7 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`}>
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            <blockquote className="font-display text-h2 mt-6 font-light leading-snug text-text">“{data.quote}”</blockquote>
            {data.body && <div className="text-body-lg mt-6 space-y-4 text-text-secondary">{String(data.body).split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>}
            <figcaption className="mt-8 border-l-2 border-accent pl-4">
              <span className="block font-semibold text-text">{data.authorName}</span>
              <span className="text-body-sm text-text-muted">{data.authorRole}</span>
            </figcaption>
            <Buttons buttons={data.buttons} fallback={[]} showArrow={false} />
          </figure>
        </div>
      </section>
    )
  }
  return (
    <section id={data.sectionId || undefined} className="relative theme-surface py-(--section-y)">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <figure className="lg:col-span-9 lg:col-start-2">
          <div className="text-5xl leading-none text-accent" aria-hidden="true">“</div>
          <blockquote className="font-display text-h1 mt-4 font-light leading-tight tracking-[-0.02em] text-text">{data.quote}</blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            {portrait && <Image src={portrait} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />}
            <span><span className="block font-semibold text-text">{data.authorName}</span><span className="text-body-sm text-text-muted">{data.authorRole}</span></span>
          </figcaption>
          <Buttons buttons={data.buttons} fallback={[]} showArrow={false} />
        </figure>
      </div>
    </section>
  )
}
