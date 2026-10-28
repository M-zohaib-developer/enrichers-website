import NextLink from 'next/link'
import Image from 'next/image'
import { ArrowRightIcon, ChevronRightIcon, JunctionMark, ShieldIcon } from '@/components/Icon'
import { imageAlt, imageSrc, linkOk, type BlockData } from './shared'

type ButtonData = {
  label?: string | null
  url?: string | null
  variant?: 'primary' | 'secondary' | null
}

type BreadcrumbItem = {
  label?: string | null
  url?: string | null
}

function HeroButton({ data, isLight }: { data?: ButtonData | null; isLight?: boolean }) {
  const variant = data?.variant ?? 'primary'
  if (!linkOk(data)) return null
  const isPrimary = variant !== 'secondary'
  const base =
    'group inline-flex h-13 items-center justify-center gap-2 rounded-sm px-7 text-[16px] font-semibold whitespace-nowrap transition-colors'
  const cls = isLight
    ? isPrimary
      ? `${base} bg-action text-on-action hover:bg-action-hover`
      : `${base} border border-border-strong text-action hover:bg-surface-sunken`
    : isPrimary
      ? `${base} bg-chrome-cta text-chrome-on-cta hover:bg-chrome-cta-hover`
      : `${base} border border-border-strong text-text hover:border-text bg-transparent`
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

export function ServiceHero({ data }: { data: BlockData }) {
  const breadcrumbs = (data.breadcrumbs ?? []) as BreadcrumbItem[]
  const isLight = data.theme === 'light'
  const breadcrumbPosition = data.breadcrumbPosition === 'bottom' ? 'bottom' : 'top'

  const breadcrumbNav = breadcrumbs.length > 0 ? (
    <nav aria-label="Breadcrumb" className="mb-6 text-caption">
      <ol className="flex flex-wrap items-center gap-1.5 text-text-muted">
        {breadcrumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRightIcon size={14} />}
            {crumb.url ? <NextLink href={crumb.url} className="hover:text-text hover:underline underline-offset-4">{crumb.label}</NextLink> : <span>{crumb.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  ) : null

  if (isLight) {
    return (
      <section className="theme-surface border-b border-border">
        <div className="container-x py-12 md:py-16">
          <div className={data.heroImage ? 'grid gap-10 lg:grid-cols-2 lg:items-center' : undefined}>
            <div>
              {breadcrumbPosition === 'top' && breadcrumbNav}
              {data.eyebrow && <p className="mb-4 inline-flex items-center gap-2 text-overline font-semibold uppercase tracking-overline text-text-muted"><JunctionMark size={12} className="text-accent" />{data.eyebrow}</p>}
              <h1 className="font-display text-h1 tracking-[-0.02em] text-text">{data.heading}</h1>
              {breadcrumbPosition === 'bottom' && breadcrumbNav}
              {data.body && <p className="mt-5 max-w-[62ch] text-body-lg text-text-secondary">{data.body}</p>}
              {(linkOk(data.primary) || linkOk(data.secondary)) && <div className="mt-8 flex flex-wrap gap-3"><HeroButton data={data.primary} isLight /><HeroButton data={data.secondary} isLight /></div>}
            </div>
            {data.heroImage && imageSrc(data.heroImage) && <div className="relative mx-auto aspect-square w-full max-w-[520px]"><Image src={imageSrc(data.heroImage)} alt={imageAlt(data.heroImage, data.heading)} fill className="object-contain" sizes="(min-width: 1024px) 42vw, 90vw" priority /></div>}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="theme-inverse relative overflow-hidden">
      <svg
        viewBox="0 0 300 180"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[48%] opacity-90 lg:block"
        aria-hidden="true"
      >
        <polygon points="-20,60 110,-15 240,60 110,135" fill="var(--e-midnight-700)" />
        <polygon points="-20,60 110,135 110,260 -20,190" fill="var(--e-midnight-800)" />
        <polygon points="110,135 240,60 240,190 110,260" fill="var(--e-cube-500)" fillOpacity=".25" />
        <polygon points="150,110 230,64 310,110 230,156" fill="var(--e-cube-300)" fillOpacity=".35" />
      </svg>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="none">
        <defs>
          <pattern id="page-hero-lat" width="34.64" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 0L34.64 20M0 20L34.64 0M0 0V20M17.32 0V20" stroke="var(--e-neutral-0)" strokeOpacity="0.06" strokeWidth=".8" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#page-hero-lat)" />
      </svg>

      <div className="container-wide relative py-14 md:py-20 lg:py-24">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 text-caption">
            <ol className="flex flex-wrap items-center gap-1.5 text-chrome-soft">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRightIcon size={14} />}
                  {crumb.url ? (
                    <NextLink href={crumb.url} className="hover:text-chrome-strong hover:underline underline-offset-4">
                      {crumb.label}
                    </NextLink>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-[720px]">
          {data.eyebrow && (
            <p className="text-overline mb-5 inline-flex items-center gap-2 font-semibold tracking-overline text-chrome-soft uppercase">
              <JunctionMark size={12} className="text-accent" />
              {data.eyebrow}
            </p>
          )}
          <h1 className="font-display text-display font-light tracking-[-0.025em] text-text">{data.heading}</h1>
          {data.body && (
            <p className="mt-6 max-w-[58ch] text-body-lg text-text-secondary">{data.body}</p>
          )}
          <div className="mt-9 flex flex-wrap gap-3">
            <HeroButton data={data.primary} />
            <HeroButton data={data.secondary} />
          </div>
          {(data.badges ?? []).length > 0 && (
            <ul className="mt-9 flex flex-wrap gap-2">
              {(data.badges ?? []).map((badge: any, i: number) => (
                <li key={i} className="inline-flex items-center gap-2 rounded-xs border border-chrome-rule px-3 py-1.5 text-label font-semibold text-chrome">
                  <ShieldIcon size={14} />
                  {badge?.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
