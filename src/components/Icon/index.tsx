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

export function ExternalLinkIcon({ size = 16, className }: IconProps) {
  return (
    <Svg size={size} className={className}>
      <path d="M14 4H20V10M20 4L11 13M18 14V20H4V6H10" />
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

/* -----------------------------------------------------------------------------
 * Social marks.
 *
 * These use fill, not the 1.5 stroke above: a brand glyph is only recognisable
 * as a solid shape, and outlining Facebook's "f" or the YouTube play button
 * makes both unreadable at 18px. They are therefore kept apart from `Svg`
 * rather than bent to fit it.
 * -------------------------------------------------------------------------- */
function SocialSvg({ size = 18, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.92 3.77-3.92 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </SocialSvg>
  )
}

export function LinkedInIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.33 8.98h3.22V21H3.33V8.98Zm5.35 0h3.09v1.64h.04c.43-.81 1.48-1.67 3.05-1.67 3.26 0 3.86 2.14 3.86 4.93V21h-3.22v-5.52c0-1.32-.03-3.01-1.84-3.01-1.84 0-2.12 1.43-2.12 2.91V21H8.68V8.98Z" />
    </SocialSvg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.26.07 1.64.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.26.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.26-.07-1.64-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.26-.06 1.64-.07 4.85-.07Zm0 1.98c-3.15 0-3.52.01-4.76.07-1.15.05-1.77.24-2.19.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.42-.35 1.04-.4 2.19-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.15.24 1.77.4 2.19.22.55.47.94.88 1.35.41.41.8.66 1.35.88.42.16 1.04.35 2.19.4 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.15-.05 1.77-.24 2.19-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.42.35-1.04.4-2.19.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.15-.24-1.77-.4-2.19a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.42-.16-1.04-.35-2.19-.4-1.24-.06-1.61-.07-4.76-.07Zm0 3.37a5.49 5.49 0 1 1 0 10.98 5.49 5.49 0 0 1 0-10.98Zm0 9.05a3.56 3.56 0 1 0 0-7.12 3.56 3.56 0 0 0 0 7.12Zm6.99-9.27a1.28 1.28 0 1 1-2.56 0 1.28 1.28 0 0 1 2.56 0Z" />
    </SocialSvg>
  )
}

export function YouTubeIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path d="M23.5 6.9a3.02 3.02 0 0 0-2.12-2.14C19.5 4.25 12 4.25 12 4.25s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.9C0 8.79 0 12 0 12s0 3.21.5 5.1a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.21 24 12 24 12s0-3.21-.5-5.1ZM9.6 15.6V8.4l6.26 3.6L9.6 15.6Z" />
    </SocialSvg>
  )
}

export function ThreadsIcon(props: IconProps) {
  return (
    <SocialSvg {...props}>
      <path d="M16.9 11.2c-.1-.05-.2-.1-.3-.14-.18-3.3-1.98-5.19-5-5.21h-.04c-1.8 0-3.3.77-4.23 2.17l1.66 1.14c.69-1.05 1.78-1.27 2.57-1.27h.03c.98.01 1.72.3 2.2.85.35.4.58.96.7 1.66a12.6 12.6 0 0 0-2.83-.14c-2.85.17-4.68 1.83-4.56 4.14.06 1.17.64 2.18 1.64 2.84.85.56 1.94.83 3.07.77 1.5-.08 2.67-.65 3.49-1.69.62-.79 1.01-1.81 1.19-3.1.72.44 1.26 1.01 1.55 1.7.5 1.18.53 3.12-1.05 4.7-1.39 1.38-3.06 1.98-5.57 2-2.79-.02-4.9-.92-6.27-2.66C4.86 17.33 4.2 15.07 4.17 12c.03-3.07.69-5.33 1.97-6.93 1.37-1.74 3.48-2.64 6.27-2.66 2.81.02 4.96.92 6.39 2.68.7.86 1.23 1.95 1.58 3.21l1.95-.52c-.42-1.56-1.09-2.9-2-4.02C18.5 1.5 15.82.33 12.42.31h-.01C9.01.33 6.36 1.51 4.53 3.78 2.9 5.8 2.06 8.6 2.03 12v.01c.03 3.4.87 6.2 2.5 8.21 1.83 2.27 4.48 3.45 7.88 3.47h.01c3.02-.02 5.15-.81 6.9-2.56 2.3-2.29 2.23-5.16 1.47-6.92-.54-1.26-1.58-2.29-3-2.99Zm-5.28 4.95c-1.25.07-2.55-.49-2.61-1.67-.05-.87.62-1.85 2.69-1.97.24-.01.47-.02.7-.02.75 0 1.45.07 2.09.21-.24 2.97-1.63 3.4-2.87 3.46Z" />
    </SocialSvg>
  )
}
