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
    linkLabel?: string | null
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
      linkLabel: 'Read more',
    },
  },
  {
    label: 'The group',
    href: '',
    groups: [
      {
        heading: 'Land & agriculture',
        items: [
          {
            label: 'Arid Land Development',
            href: '/arid-land-development/',
            description: 'Barren land into productive farmland',
          },
          {
            label: 'Agriculture',
            href: '/agriculture/',
            description: 'Smart farming, seed banking, dairy',
          },
          {
            label: 'Agriculture Research Centre',
            href: '/school-of-agriculture-research-centre/',
            description: 'Baab-ul-Ilm, agri sciences & research',
          },
        ],
      },
      {
        heading: 'Advisory & hospitality',
        items: [
          {
            label: 'Business Brokerage',
            href: '/business-brokerage/',
            description: 'M&A, buying and selling businesses',
          },
          {
            label: 'Tourism & Hospitality',
            href: '/tourism-hospitality/',
            description: 'Northern Pakistan, starting in Skardu',
          },
        ],
      },
    ],
    feature: {
      enabled: true,
      eyebrow: 'Flagship project',
      title: 'Skardu Riverside Hotel, a 5-star stay in Gilgit-Baltistan',
      href: '/skardu-riverside-hotel/',
      linkLabel: 'Explore the project',
    },
  },
  { label: 'Research', href: '/latest-insight/', groups: [] },
  {
    label: 'About',
    href: '',
    groups: [
      {
        heading: 'Company',
        items: [
          {
            label: 'About Enrichers',
            href: '/about-us/',
            description: 'Our story, Lahore since 2011',
          },
          {
            label: 'Leadership',
            href: '/enrichers-team/',
            description: 'The people behind the group',
          },
          {
            label: 'Careers',
            href: '/careers/',
            description: 'Work with us',
          },
        ],
      },
      {
        heading: 'Trust',
        items: [
          {
            label: 'Regulation & disclosures',
            href: '/regulation/',
            description: 'Licences, investor guidance, complaints',
          },
          {
            label: 'Strategic partners',
            href: '/strategicpartner/',
            description: 'Who we work with',
          },
        ],
      },
    ],
    feature: {
      enabled: true,
      eyebrow: 'Talk to us',
      title: 'Speak with our Lahore team about your goals',
      href: '/contact-us/#consultation',
      linkLabel: 'Book a consultation',
    },
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

export const FALLBACK_RISK_NOTICE = {
  enabled: true,
  lead: 'Risk notice:',
  body: 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Enrichers operates under SECP regulatory oversight; content is for information and education, not personalised advice.',
}
