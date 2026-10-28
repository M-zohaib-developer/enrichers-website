import Image from 'next/image'
import NextLink from 'next/link'
import { ChevronRightIcon, JunctionMark } from '@/components/Icon'
import { imageAlt, imageSrc, type BlockData } from './shared'

export function KnowledgeHero({ data }: { data: BlockData }) {
  const breadcrumbs = Array.isArray(data.breadcrumbs) ? data.breadcrumbs : []
  const image = imageSrc(data.image)

  return (
    <section className="theme-inverse relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 520">
          <defs><pattern id="knowledge-hero-lattice" width="34.64" height="20" patternUnits="userSpaceOnUse"><path d="M0 0L34.64 20M0 20L34.64 0M0 0V20M17.32 0V20" stroke="var(--e-neutral-0)" strokeOpacity=".07" strokeWidth=".8" fill="none" /></pattern></defs>
          <rect width="1200" height="520" fill="url(#knowledge-hero-lattice)" />
          <circle cx="1030" cy="250" r="260" fill="var(--e-cube-500)" fillOpacity=".1" />
        </svg>
      </div>
      <div className="container-x relative grid gap-8 py-14 md:py-20 lg:min-h-[430px] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 lg:py-16">
        <div>
          {breadcrumbs.length > 0 && <nav aria-label="Breadcrumb" className="mb-8 text-caption"><ol className="flex flex-wrap items-center gap-1.5 text-chrome-soft">{breadcrumbs.map((crumb: any, index: number) => <li key={index} className="flex items-center gap-1.5">{index > 0 && <ChevronRightIcon size={14} />}{crumb.url ? <NextLink href={crumb.url} className="hover:text-chrome-strong hover:underline underline-offset-4">{crumb.label}</NextLink> : <span>{crumb.label}</span>}</li>)}</ol></nav>}
          {data.eyebrow && <p className="mb-5 inline-flex items-center gap-2 text-overline font-semibold uppercase tracking-overline text-chrome-soft"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
          <h1 className="max-w-[12ch] font-display text-display font-light tracking-[-0.025em] text-chrome-strong">{data.heading}</h1>
          {data.body && <p className="mt-6 max-w-[52ch] text-body-lg text-chrome-soft">{data.body}</p>}
        </div>
        {image && <div className="relative mx-auto aspect-square w-full max-w-[560px]"><Image src={image} alt={imageAlt(data.image, data.imageAlt || data.heading)} fill className="object-contain" sizes="(min-width: 1024px) 48vw, 94vw" priority /></div>}
      </div>
    </section>
  )
}
