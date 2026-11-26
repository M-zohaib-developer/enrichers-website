import React from 'react'

/**
 * Mini building blocks for the Add Layout previews.
 * All styling is inline — Tailwind is scoped to the (frontend) layout and
 * does nothing in the Payload admin bundle. Inline styles are the one approach
 * guaranteed to render correctly here.
 *
 * Colours are taken from the Candidate A token sheet (globals.css):
 *   navy    #0a1f3d  --e-midnight-900
 *   blue    #1c95d0  --e-cube-500
 *   pale    #dceffa  --e-cube-100
 *   faint   #f0f8fd  --e-cube-50
 *   text    #0c1522  --e-neutral-900
 *   muted   #5e6b7d  --e-neutral-500
 *   border  #c9d2dc  --e-neutral-200
 *   surface #f5f7fa  --e-neutral-25
 */

export const C = {
  navy: '#0a1f3d',
  navySoft: '#13294a',
  blue: '#1c95d0',
  blueLight: '#8acfef',
  bluePale: '#dceffa',
  blueFaint: '#f0f8fd',
  text: '#0c1522',
  muted: '#5e6b7d',
  border: '#c9d2dc',
  borderSubtle: '#e3e8ee',
  surface: '#f5f7fa',
  white: '#ffffff',
  line: 'rgba(10,31,61,0.12)',
} as const

export const skyGradient = `linear-gradient(to bottom, ${C.bluePale} 0%, ${C.blueFaint} 55%, ${C.white} 100%)`
export const navyGradient = `linear-gradient(135deg, #0a1f3d 0%, #0f2445 60%, #1c3a62 100%)`

/** 3:2 preview frame — every preview is the same size so the grid stays even. */
export const Frame: React.FC<{
  background?: string
  children: React.ReactNode
  padding?: number
}> = ({ background = C.white, children, padding = 8 }) => (
  <div
    className="bp-shimmer"
    style={{
      aspectRatio: '3 / 2',
      width: '100%',
      background,
      padding,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      borderRadius: 4,
      lineHeight: 0,
    }}
  >
    {children}
  </div>
)

/** A placeholder text bar. Width is a percentage so it scales with the card. */
export const Bar: React.FC<{
  color?: string
  height?: number
  radius?: number
  width?: number | string
}> = ({ color = C.muted, height = 3, radius = 2, width = '100%' }) => (
  <div
    style={{
      width: typeof width === 'number' ? `${width}%` : width,
      height,
      background: color,
      borderRadius: radius,
      flexShrink: 0,
      opacity: color === C.muted ? 0.3 : 1,
    }}
  />
)

/** Heading bar — heavier so the eye lands on it first. */
export const Heading: React.FC<{ width?: number; height?: number }> = ({
  width = 68,
  height = 6,
}) => <Bar color={C.navy} height={height} width={width} radius={2} />

/** Stand-in for an image with a mountain-and-sun glyph. */
export const ImageBox: React.FC<{
  flex?: number
  height?: number | string
  label?: string
  radius?: number
  width?: number | string
}> = ({ flex, height = '100%', label, radius = 3, width = '100%' }) => (
  <div
    style={{
      alignItems: 'center',
      background: `linear-gradient(135deg, ${C.bluePale} 0%, ${C.blueLight} 100%)`,
      borderRadius: radius,
      containerType: 'inline-size',
      display: 'flex',
      flex,
      flexDirection: 'column',
      flexShrink: 0,
      gap: 2,
      height,
      justifyContent: 'center',
      minHeight: 0,
      minWidth: 0,
      overflow: 'hidden',
      width,
    }}
  >
    {label ? (
      <div
        style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: 'clamp(5px, 12cqw, 10px)',
          fontWeight: 700,
          letterSpacing: '0.02em',
          lineHeight: 1,
          textShadow: '0 1px 2px rgba(10,31,61,0.4)',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    ) : (
      <svg
        aria-hidden="true"
        fill="none"
        style={{ display: 'block', height: '38%', maxHeight: 18, minHeight: 9, width: 'auto' }}
        viewBox="0 0 24 18"
      >
        <rect height="16" rx="2" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" width="22" x="1" y="1" />
        <circle cx="7.5" cy="6.5" fill="rgba(255,255,255,0.85)" r="2" />
        <path d="M2 15l6-5.5 4 3.5 3.5-3 6.5 5.5" stroke="rgba(255,255,255,0.85)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    )}
  </div>
)

/** Button pill — navy is the site's primary CTA, blue the accent. */
export const Btn: React.FC<{ color?: string; width?: number }> = ({
  color = C.navy,
  width = 26,
}) => (
  <div
    style={{
      width: `${width}%`,
      height: 7,
      borderRadius: 2,
      background: color,
      flexShrink: 0,
    }}
  />
)

/** Generic card surface. */
export const Card: React.FC<{
  background?: string
  children?: React.ReactNode
  flex?: number
  padding?: number
}> = ({ background = C.white, children, flex = 1, padding = 4 }) => (
  <div
    style={{
      flex,
      background,
      border: `1px solid ${C.border}`,
      borderRadius: 3,
      padding,
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      justifyContent: 'center',
      minWidth: 0,
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
)

/** Horizontal flex helper. */
export const Row: React.FC<{
  align?: React.CSSProperties['alignItems']
  children: React.ReactNode
  gap?: number
  grow?: boolean
}> = ({ align = 'center', children, gap = 4, grow }) => (
  <div
    style={{
      display: 'flex',
      gap,
      alignItems: align,
      flex: grow ? 1 : undefined,
      minHeight: 0,
      minWidth: 0,
    }}
  >
    {children}
  </div>
)

/** Vertical flex helper. */
export const Col: React.FC<{
  align?: React.CSSProperties['alignItems']
  children: React.ReactNode
  gap?: number
  grow?: boolean
}> = ({ align, children, gap = 3, grow }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap,
      alignItems: align,
      flex: grow ? 1 : undefined,
      minHeight: 0,
      minWidth: 0,
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
)

/**
 * A line that shows real text when available, falls back to a placeholder bar.
 * Truncated to one line so long headings don't push the grid rows apart.
 */
export const TextLine: React.FC<{
  color?: string
  size?: number
  width?: number
  text?: string
  weight?: number
}> = ({ color = C.navy, size = 7, text, weight = 600, width = 78 }) => {
  if (!text) return <Bar color={color} height={Math.max(2, Math.round(size * 0.45))} width={width} />
  return (
    <div
      style={{
        color,
        fontSize: size,
        fontWeight: weight,
        lineHeight: 1.25,
        maxWidth: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  )
}

/**
 * An image slot — shows the real upload when available, drawn box otherwise.
 */
export const ItemImage: React.FC<{
  filter?: string
  fit?: 'contain' | 'cover'
  height?: number | string
  label?: string
  radius?: number
  src?: string
  width?: number | string
}> = ({ filter, fit = 'cover', height = '100%', label, radius = 3, src, width = '100%' }) => {
  if (!src) return <ImageBox height={height} label={label} radius={radius} width={width} />
  return (
    <div style={{ borderRadius: radius, height, overflow: 'hidden', width }}>
      <img
        alt=""
        src={src}
        style={{ display: 'block', filter, height: '100%', objectFit: fit, width: '100%' }}
      />
    </div>
  )
}

/** Eyebrow overline pill — the small uppercase label above a heading. */
export const Eyebrow: React.FC<{ text?: string; color?: string }> = ({
  text,
  color = C.blue,
}) => (
  <div
    style={{
      color,
      fontSize: 5,
      fontWeight: 700,
      letterSpacing: '0.1em',
      lineHeight: 1,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      flexShrink: 0,
    }}
  >
    {text || '■ ■ ■ ■ ■'}
  </div>
)
