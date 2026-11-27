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
    label: 'Markets',
    href: '',
    groups: [
      {
        heading: 'Brokerage',
        items: [
          {
            label: 'PSX Stocks',
            href: '/stock-broking/',
            description: 'Equities, IPOs, portfolio management',
          },
          {
            label: 'PMEX Markets',
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
    label: 'Business Verticals',
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
  {
    label: 'Knowledge Hub',
    href: '',
    groups: [
      {
        heading: 'Research & insights',
        items: [
          {
            label: 'Market research & insights',
            href: '/latest-insight/',
            description: 'Weekly notes on PSX, commodities and global macro',
          },
          {
            label: 'Financial glossary',
            href: '/financial-glossary/',
            description: 'Key investing terms, explained simply',
          },
        ],
      },
      {
        heading: 'Learn',
        items: [
          {
            label: 'Educational videos',
            href: '/video-gallery/',
            description: 'Market updates, explainers and the Enrichers story',
          },
          {
            label: 'Articles',
            href: '/blogs/',
            description: 'Long-reads from our research team',
          },
        ],
      },
    ],
    feature: {
      enabled: true,
      eyebrow: 'Watch',
      title: 'Market updates and educational videos, all in one place',
      href: '/video-gallery/',
      linkLabel: 'Open the video gallery',
    },
  },
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
  { label: 'Open Account', href: '/open-account/', groups: [] },
  { label: 'Book a Consultation', href: '/contact-us/#consultation', groups: [] },
  { label: 'Careers', href: '/careers/', groups: [] },
]

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
