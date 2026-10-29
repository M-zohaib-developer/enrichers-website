import Image from 'next/image'
import { CheckCircle2, Map, MapPin, Plane } from 'lucide-react'
import { Buttons, imageAlt, imageSrc, type BlockData } from './shared'

export function DestinationLocationShowcase({ data }: { data: BlockData }) {
  const facts = Array.isArray(data.facts) ? data.facts : []
  const attractions = Array.isArray(data.attractions) ? data.attractions : []
  const image = imageSrc(data.image)
  const factIcons = [Map, MapPin, Plane]

  return (
    <section id={data.sectionId || undefined} className="theme-sunken pt-12 pb-(--section-y) md:pt-16 lg:pt-20">
      <div className="container-wide">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {data.eyebrow && <p className="inline-flex items-center gap-2 text-overline font-semibold tracking-overline text-text-muted uppercase"><span className="h-px w-6 bg-accent" aria-hidden="true" />{data.eyebrow}</p>}
            <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>
            <p className="text-body-lg mt-5 max-w-[62ch] text-text-secondary">{data.body}</p>

            {facts.length > 0 && (
              <dl className="mt-8 grid gap-3 sm:grid-cols-3">
                {facts.map((fact: any, index: number) => {
                  const Icon = factIcons[index] ?? MapPin
                  return <div key={`${fact.value}-${index}`} className="rounded-sm border border-border bg-surface p-5">
                    <Icon size={24} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                    <dd className="font-display text-h4 mt-4 font-semibold text-text">{fact.value}</dd>
                    <dt className="text-body-sm mt-1 text-text-secondary">{fact.label}</dt>
                  </div>
                })}
              </dl>
            )}

            {data.supportingText && <p className="text-body mt-6 flex max-w-[60ch] items-start gap-3 text-text-secondary"><CheckCircle2 size={20} strokeWidth={1.7} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />{data.supportingText}</p>}
            <Buttons buttons={data.buttons} showArrow={false} showExternalIcon={false} />
          </div>

          {image && <figure className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-sunken shadow-sm"><Image src={image} alt={imageAlt(data.image, data.imageAlt || data.heading)} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />{data.imageCaption && <figcaption className="absolute right-0 bottom-0 left-0 bg-surface-inverse/75 px-6 py-5 text-on-action"><span className="flex items-center gap-2 font-semibold"><MapPin size={18} strokeWidth={1.7} aria-hidden="true" />{data.imageCaption}</span>{data.imageCaptionDetail && <span className="mt-1 block text-body-sm text-chrome-muted">{data.imageCaptionDetail}</span>}</figcaption>}</figure>}
        </div>

        {attractions.length > 0 && (
          <div className="mt-14 border-t border-border pt-8">
            {data.attractionsIntro && <p className="flex items-center gap-3 font-display text-h4 font-semibold text-text"><span className="h-px w-7 bg-accent" aria-hidden="true" />{data.attractionsIntro}</p>}
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
              {attractions.map((attraction: any, index: number) => {
                const attractionImage = imageSrc(attraction.image)
                const content = <>
                  {attractionImage && <div className="relative aspect-[16/10] overflow-hidden bg-surface-sunken"><Image src={attractionImage} alt={imageAlt(attraction.image, attraction.imageAlt || attraction.title)} fill className="object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" /></div>}
                  <div className="p-5 md:p-6"><h3 className="font-display text-body font-semibold text-text"><span className="inline-flex items-center gap-2"><MapPin size={18} strokeWidth={1.7} className="text-accent" aria-hidden="true" />{attraction.title}</span></h3>{attraction.body && <p className="text-body-sm mt-2 text-text-secondary">{attraction.body}</p>}</div>
                </>
                return <li key={`${attraction.title || 'attraction'}-${index}`} className="group overflow-hidden rounded-sm border border-border bg-surface shadow-sm transition-[border-color,box-shadow,transform] duration-[400ms] ease-in-out hover:-translate-y-1 hover:border-border-strong hover:shadow-md focus-within:-translate-y-1 focus-within:border-border-strong focus-within:shadow-md motion-reduce:transform-none motion-reduce:transition-none">{attraction.url ? <a href={attraction.url} target="_blank" rel="noopener noreferrer" className="block outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action">{content}</a> : content}</li>
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
