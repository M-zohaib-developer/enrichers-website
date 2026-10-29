import Image from 'next/image'
import { Eyebrow, imageAlt, imageSrc, type BlockData } from './shared'

/**
 * Two-column text and image. Also carries signed messages — set
 * `attributionName` and the body renders as a statement with a signature
 * block, which is why the paragraph keeps `whitespace-pre-line`: a long
 * message is authored with real paragraph breaks in the textarea.
 */
export function ImageTextFeature({ data }: { data: BlockData }) {
  const image = imageSrc(data.image)
  const imageOnLeft = data.imagePosition === 'left'
  const signed = Boolean(data.attributionName)
  const aspect = data.portrait ? 'aspect-[4/5]' : 'aspect-[16/9]'
  const background = data.background === 'sunken' ? 'theme-sunken' : 'theme-surface'

  return (
    <section id={data.sectionId || undefined} className={`${background} py-(--section-y)`}>
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className={imageOnLeft ? 'lg:order-2' : undefined}>
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 className="font-display text-h3 font-semibold tracking-heading text-text">{data.heading}</h2>
          <p className="text-body-lg mt-5 max-w-[62ch] whitespace-pre-line text-text-secondary">
            {data.body}
          </p>
          {Array.isArray(data.highlights) && data.highlights.length > 0 && (
            <ul className="mt-6 space-y-2 text-body-sm text-text">
              {data.highlights.map((highlight: any, index: number) => (
                <li key={`${highlight?.label || 'highlight'}-${index}`} className="flex gap-3">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className="mt-0.5 shrink-0 text-accent" aria-hidden="true"><path d="M5 12.5L10 17L19 7" /></svg>
                  <span>{highlight?.label}</span>
                </li>
              ))}
            </ul>
          )}
          {signed && (
            <div className="mt-7 border-t border-border pt-5">
              <p className="font-display text-h5 font-semibold text-text">{data.attributionName}</p>
              {data.attributionRole && (
                <p className="text-caption mt-0.5 tracking-label text-text-muted uppercase">
                  {data.attributionRole}
                </p>
              )}
            </div>
          )}
        </div>
        {image && (
          <div
            className={`relative ${aspect} overflow-hidden rounded-lg bg-surface-sunken ${imageOnLeft ? 'lg:order-1' : ''}`}
          >
            <Image
              src={image}
              alt={imageAlt(data.image, data.imageAlt || data.heading)}
              fill
              className={data.portrait ? 'object-cover object-top' : 'object-cover'}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        )}
      </div>
    </section>
  )
}
