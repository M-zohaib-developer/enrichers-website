import NextLink from 'next/link'
import type React from 'react'
export type MediaValue = number | { url?: string | null; alt?: string | null } | null | undefined
export type LinkValue = { label?: string | null; url?: string | null } | null | undefined
export type BlockData = { blockType: string; [key: string]: any }
export const imageSrc = (media: MediaValue, fallback = '') =>
  media && typeof media === 'object' && media.url ? media.url : fallback
export const imageAlt = (media: MediaValue, fallback = '') =>
  media && typeof media === 'object' && media.alt ? media.alt : fallback
export const linkOk = (link: LinkValue): link is { label: string; url: string } =>
  Boolean(link?.label && link?.url)
export function Eyebrow({ children }: { children?: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-overline font-semibold tracking-overline text-text-muted uppercase">
      <svg viewBox="-10 -10 20 20" width="12" height="12" className="text-accent" aria-hidden="true">
        <path d="M0 0L-6.062177826491071 -3.5M0 0L6.062177826491071 -3.5M0 0V7" stroke="currentColor" strokeWidth="2.2" fill="none" />
        <circle r="2.1" fill="currentColor" />
      </svg>
      {children}
    </p>
  )
}
const BTN_BASE =
  'inline-flex min-h-11 items-center justify-center rounded-sm px-5 text-button font-semibold transition-colors'

/**
 * `inverse` is required on dark panels. The default variants resolve
 * `bg-action` / `text-action`, which inside .theme-inverse are the brand blue —
 * so a primary button on navy came out blue-on-dark instead of the reference's
 * white-on-navy, and the secondary's label turned blue instead of white. The
 * chrome tokens carry the correct pair for a dark surface.
 */
export function Button({
  link,
  secondary = false,
  inverse = false,
}: {
  link: LinkValue
  secondary?: boolean
  inverse?: boolean
}) {
  if (!linkOk(link)) return null

  const cls = inverse
    ? secondary
      ? `${BTN_BASE} border border-chrome-rule text-chrome-strong hover:bg-chrome-ghost`
      : `${BTN_BASE} bg-chrome-cta text-chrome-on-cta hover:bg-chrome-cta-hover`
    : secondary
      ? `${BTN_BASE} border border-border-strong text-action hover:bg-surface-sunken`
      : `${BTN_BASE} bg-action text-on-action hover:bg-action-hover`

  return (
    <NextLink href={link.url} className={cls}>
      {link.label}
    </NextLink>
  )
}
