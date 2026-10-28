import React from 'react'

/**
 * Icon set for the site chrome.
 *
 * Every glyph in the reference build is drawn with the same four attributes —
 * 1.5 stroke, no fill, and square/miter joins. The square caps are the whole
 * reason the chrome reads as "sharp" rather than generic; swapping them for
 * round ones is the single easiest way to make this stop matching. They live
 * here once instead of on ~12 inline <svg> elements.
 *
 * Paths are copied from the deployed markup, not redrawn.
 */

type IconProps = {
  size?: number
  className?: string
}

function Svg({ size = 24, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

export function ChevronDownIcon({ size = 16, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M6 9L12 15L18 9" />
    </Svg>
  )
}

export function ChevronRightIcon({ size = 16, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M9 6L15 12L9 18" />
    </Svg>
  )
}

export function MenuIcon({ size = 24, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 7H20M4 12H20M4 17H20" />
    </Svg>
  )
}

export function CloseIcon({ size = 24, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M6 6L18 18M18 6L6 18" />
    </Svg>
  )
}

export function CheckIcon({ size = 16, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M5 12.5L10 17L19 7" />
    </Svg>
  )
}

export function PhoneIcon({ size = 18, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M5 4H9L10.5 8.5L8 10C9 12.5 11.5 15 14 16L15.5 13.5L20 15V19C20 19.6 19.6 20 19 20C11 20 4 13 4 5C4 4.4 4.4 4 5 4Z" />
    </Svg>
  )
}

export function MailIcon({ size = 18, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="3" y="5" width="18" height="14" />
      <path d="M3 6L12 13L21 6" />
    </Svg>
  )
}

/** Speech bubble. The reference calls this `chat` and uses it for WhatsApp. */
export function ChatIcon({ size = 18, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 5H20V16H10L5 20V16H4Z" />
      <path d="M8 10H16M8 13H13" />
    </Svg>
  )
}

export const WhatsAppIcon = ChatIcon

/**
 * Brand "junction" glyph — three spokes meeting at a dot. Used on the mega-menu
 * promo card. The spoke length is 7 units at ±30°, so the horizontal reach is
 * 7·cos(30°); the literal below is that value, matching the reference exactly.
 */
const SPOKE_X = 6.062177826491071

export function JunctionMark({ size = 20, className }: IconProps) {
  return (
    <svg
      viewBox="-10 -10 20 20"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path
        d={`M0 0L${-SPOKE_X} -3.5M0 0L${SPOKE_X} -3.5M0 0V7`}
        stroke="currentColor"
        strokeWidth="2.2"
        fill="none"
      />
      <circle r="2.1" fill="currentColor" />
    </svg>
  )
}

export function ArrowRightIcon({ size = 16, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M4 12H19M13 6L19 12L13 18" />
    </Svg>
  )
}

export function PlusIcon({ size = 20, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 5V19M5 12H19" />
    </Svg>
  )
}

export function MinusIcon({ size = 20, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M5 12H19" />
    </Svg>
  )
}

export function DocumentIcon({ size = 16, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M6 3H14L19 8V21H6Z" />
      <path d="M14 3V8H19M9 13H16M9 17H16" />
    </Svg>
  )
}

export function ShieldIcon({ size = 16, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 3L19 6V11C19 15.5 16 19 12 21C8 19 5 15.5 5 11V6Z" />
      <path d="M9 12L11 14L15 10" />
    </Svg>
  )
}

export function PeopleIcon({ size = 32, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3 20C3.8 16 6 14 9 14S14.2 16 15 20M15.5 14.3C18 14.3 20 16 20.8 19.5" />
    </Svg>
  )
}

export function ChartIcon({ size = 32, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M3 20C9 19 14 14 18.5 5.5" />
      <circle cx="19" cy="5" r="1.8" />
      <path d="M3 21H21" />
    </Svg>
  )
}

export function ScaleIcon({ size = 32, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M12 4V20M7 20H17M4 7H20M4 7L1.5 13H6.5ZM20 7L17.5 13H22.5Z" />
    </Svg>
  )
}

export function GlobeIcon({ size = 32, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <ellipse cx="12" cy="12" rx="3.8" ry="8.5" />
      <path d="M3.5 12H20.5" />
    </Svg>
  )
}

export function CompassIcon({ size = 32, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <polygon points="15.5,8.5 13.4,13.4 8.5,15.5 10.6,10.6" />
    </Svg>
  )
}

export function LedgerIcon({ size = 32, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <rect x="5" y="3" width="14" height="18" />
      <path d="M9 3V21M12 8H16M12 12H16M12 16H16" />
    </Svg>
  )
}
