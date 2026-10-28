import React from 'react'
import Image from 'next/image'

/**
 * Brand mark.
 *
 * The bundled file is the artwork the reference build serves
 * (/brand/enrichers-logo-enhanced.webp, 1140×396 RGBA). It is the fallback so
 * the header and footer are never blank on a fresh database; uploading a logo
 * to the Header or Footer global overrides it.
 *
 * Width is passed as a Tailwind class rather than an inline style attribute —
 * the colour lint rejects inline styles outright, and a class also lets the
 * size change per breakpoint.
 */

const FALLBACK_SRC = '/brand/enrichers-logo-enhanced.webp'
const FALLBACK_W = 1140
const FALLBACK_H = 396

type LogoProps = {
  /** Tailwind width class, e.g. `w-40` (160px) in the header, `w-46` (184px) in the footer. */
  className?: string
  src?: string | null
  alt?: string | null
  /** Intrinsic size of an uploaded file, so next/image can pick a sensible srcset. */
  width?: number | null
  height?: number | null
  priority?: boolean
}

export function Logo({
  className = 'w-40',
  src,
  alt,
  width,
  height,
  priority = false,
}: LogoProps) {
  const usingUpload = Boolean(src)

  // The inline-flex wrapper matches the reference and stops the inline image
  // from picking up a descender gap inside the flex bar.
  return (
    <span className="inline-flex">
      <Image
        src={src || FALLBACK_SRC}
        alt={alt || 'Enrichers Investment Group — Converting To Real-Wealth'}
        width={(usingUpload ? width : FALLBACK_W) || FALLBACK_W}
        height={(usingUpload ? height : FALLBACK_H) || FALLBACK_H}
        priority={priority}
        className={`h-auto ${className}`}
      />
    </span>
  )
}
