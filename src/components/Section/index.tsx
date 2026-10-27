import React from 'react'

/**
 * Tones map 1:1 onto the theme classes in globals.css. Setting the class is
 * what re-points the semantic tokens for everything inside, so a child writes
 * `text-text-muted` and gets the right tone for whichever band it sits in —
 * no per-band colour classes, and no component needs to know it is on navy.
 */
export type SectionTone = 'surface' | 'sunken' | 'light' | 'inverse' | 'brand'

const toneClassName: Record<SectionTone, string> = {
  surface: 'theme-surface',
  sunken: 'theme-sunken',
  light: 'theme-light',
  inverse: 'theme-inverse',
  brand: 'theme-brand',
}

type SectionProps = {
  tone?: SectionTone
  /** First band on a page — 64px vertical padding instead of the default rhythm. */
  first?: boolean
  className?: string
  children: React.ReactNode
}

/**
 * Standard page-section wrapper: tone, container width, gutters and vertical
 * rhythm live here so no individual block reimplements its own spacing.
 */
export function Section({
  tone = 'surface',
  first = false,
  className = '',
  children,
}: SectionProps) {
  const paddingY = first ? 'py-(--section-y-first)' : 'py-(--section-y)'

  return (
    <section className={`${toneClassName[tone]} ${paddingY} ${className}`}>
      <div className="container-wide">{children}</div>
    </section>
  )
}
