import Image from 'next/image'
import NextLink from 'next/link'
import { ArrowRightIcon, CheckIcon, JunctionMark } from '@/components/Icon'
import { imageAlt, imageSrc, linkOk, type BlockData } from './shared'

type HeroButton = {
  label?: string | null
  url?: string | null
  variant?: 'primary' | 'secondary' | null
}

/**
 * One button component for both CTAs. The variant comes from the CMS, so an
 * editor flips Primary/Secondary per button without touching code. The arrow
 * appears on primary buttons only, matching the reference.
 */
function HeroButton({ data }: { data?: HeroButton | null }) {
  // Pull the variant off BEFORE narrowing — linkOk's type guard projects to
  // { label, url } and strips every other property.
  const variant = data?.variant ?? 'primary'
  if (!linkOk(data)) return null
  const isPrimary = variant !== 'secondary'
  const base =
    'group inline-flex h-13 items-center justify-center gap-2 rounded-sm px-7 text-[16px] font-semibold whitespace-nowrap transition-colors'
  const cls = isPrimary
    ? `${base} bg-action text-on-action hover:bg-action-hover`
    : `${base} border border-border-strong text-action hover:bg-surface-sunken`
  return (
    <NextLink href={data.url} className={cls}>
      <span>{data.label}</span>
      {isPrimary ? (
        <ArrowRightIcon
          size={18}
          className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-[3px]"
        />
      ) : null}
    </NextLink>
  )
}

export function MarketHero({ data }: { data: BlockData }) {
  const heading = data.headingLineOne ? (
    <>
      <span className="block text-text">{data.headingLineOne}</span>
      <span className="block text-text-link">{data.headingLineTwo}</span>
      <span className="block text-text-link">{data.headingLineThree}</span>
    </>
  ) : (
    data.heading
  )

  return (
    <section className="relative overflow-hidden theme-surface">
      {/* Lattice SVG — right half only, desktop only. Matches the reference exactly.
          Uses the midnight token via CSS var so no hex is hardcoded here. */}
      <svg
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 lg:block"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="hero-lat" width="34.64" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M0 0L34.64 20M0 20L34.64 0M0 0V20M17.32 0V20"
              stroke="var(--e-midnight-900)"
              strokeOpacity="0.07"
              strokeWidth=".8"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-lat)" />
      </svg>
      <div className="container-x relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:py-24">
        <div className="relative z-10 lg:col-span-7">
          {/* Junction mark + eyebrow label, inside one inline-flex row so the
              mark sits on the baseline the way the reference draws it. */}
          <p className="text-overline mb-5 inline-flex items-center gap-2 font-semibold tracking-overline text-text-muted uppercase">
            <JunctionMark size={12} className="text-accent" />
            {data.eyebrow}
          </p>
          <h1 className="font-display text-display max-w-[22ch] font-light tracking-[-0.025em] text-text">
            {heading}
          </h1>
          <p className="text-body-lg mt-6 max-w-[60ch] text-text-secondary">{data.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            {(data.buttons?.length ? data.buttons : [data.primary, data.secondary]).map((button: any, index: number) => (
              <HeroButton key={index} data={button.blockType ? { label: button.label, url: button.url, variant: button.blockType === 'secondaryButton' ? 'secondary' : 'primary' } : button} />
            ))}
          </div>
          {/* Trust badges — each row carries a tick in the brand accent. */}
          <ul className="text-body-sm mt-8 flex flex-wrap gap-x-6 gap-y-2 text-text-secondary">
            {(data.badges ?? []).map((badge: any, i: number) => (
              <li key={i} className="inline-flex items-center gap-2">
                <CheckIcon size={16} className="text-accent" />
                {badge?.label}
              </li>
            ))}
          </ul>
        </div>
        {/* 4:5 figure, matching the reference exactly. Fixed aspect ratio keeps
            the image taller than our previous `fill`-based panel on desktop. */}
        <div className="lg:col-span-5">
          <figure className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-sunken">
            <Image
              src={imageSrc(data.heroImage, '/brand/trading-floor.webp')}
              alt={imageAlt(data.heroImage, 'Hero image')}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
