/**
 * Header content fallbacks.
 *
 * The Payload global predates the navItems / consultationLink / contact fields,
 * so a database still holding the older shape would render an empty bar. These
 * values are the reference site's own nav data, read out of its RSC payload, so
 * an un-seeded install still looks correct. Saving the Header global in admin
 * writes the real fields and these stop being used.
 *
 * Kept in their own module so the Payload config, the client component and the
 * seed script all read one copy instead of three drifting ones.
 */

export type LinkField = {
  label?: string | null
  url?: string | null
  newTab?: boolean | null
}

export type NavMegaItem = {
  label?: string | null
  href?: string | null
  description?: string | null
}

export type NavGroup = {
  heading?: string | null
  items?: (NavMegaItem | null)[] | null
}

export type NavItem = {
  label?: string | null
  href?: string | null
  groups?: (NavGroup | null)[] | null
  feature?: {
    enabled?: boolean | null
    eyebrow?: string | null
    title?: string | null
    href?: string | null
  } | null
}

export const FALLBACK_NAV: NavItem[] = [
  {
    label: 'Trade & invest',
    href: '',
    groups: [
      {
        heading: 'Brokerage',
        items: [
          {
            label: 'Stock Broking (PSX)',
            href: '/stock-broking/',
            description: 'Equities, IPOs, portfolio management',
          },
          {
            label: 'Commodity Brokerage (PMEX)',
            href: '/commodity-brokerage/',
            description: 'Gold, oil, currencies, US index futures',
          },
        ],
      },
      {
        heading: 'Get started',
        items: [
          {
            label: 'Open an account',
            href: '/open-account/',
            description: 'PSX or PMEX, step by step',
          },
          {
            label: 'MT5 platform',
            href: '/download-metatrader-5-for-your-device/',
            description: 'Android, Windows, macOS',
          },
          { label: 'FAQs', href: '/faqs/' },
        ],
      },
    ],
    feature: {
      enabled: true,
      eyebrow: 'Latest research',
      title: "Can Pakistan's bull market enter a fourth year?",
      href: '/latest-insight/',
    },
  },
  {
    label: 'The group',
    href: '',
    groups: [
      {
        heading: 'Businesses',
        items: [
          { label: 'Business Brokerage', href: '/business-brokerage/' },
          { label: 'Arid Land Development', href: '/arid-land-development/' },
          { label: 'Agriculture', href: '/agriculture/' },
        ],
      },
      {
        // Headless second column: the reference keeps the list flowing across
        // two columns without repeating a label.
        heading: '',
        items: [
          {
            label: 'Agriculture Research Centre',
            href: '/school-of-agriculture-research-centre/',
          },
          { label: 'Tourism & Hospitality', href: '/tourism-hospitality/' },
          { label: 'Skardu Riverside Hotel', href: '/skardu-riverside-hotel/' },
        ],
      },
    ],
  },
  { label: 'Research', href: '/latest-insight/', groups: [] },
  {
    label: 'About',
    href: '',
    groups: [
      {
        heading: '',
        items: [
          { label: 'About Enrichers', href: '/about-us/' },
          { label: 'Leadership', href: '/enrichers-team/' },
          { label: 'Regulation & disclosures', href: '/regulation/' },
          { label: 'Careers', href: '/careers/' },
          { label: 'Strategic partners', href: '/strategicpartner/' },
        ],
      },
    ],
  },
  { label: 'Contact', href: '/contact-us/', groups: [] },
]

export const FALLBACK_CONSULTATION: LinkField = {
  label: 'Book a consultation',
  url: '/contact-us/#consultation',
}

export const FALLBACK_CTA: LinkField = {
  label: 'Open an account',
  url: '/open-account/',
}

export const FALLBACK_CONTACT = {
  phone: '(042) 111 111 333',
  phoneHref: 'tel:+9242111111333',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
  whatsappLabel: 'WhatsApp our client support',
}
