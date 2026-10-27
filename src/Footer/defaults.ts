/**
 * Footer content fallbacks.
 *
 * Same reasoning as Header/defaults.ts: the global predates the contact,
 * regulation and legal fields, so these keep an un-seeded install looking
 * right. `scripts/seed-globals.ts` writes the same values into the database
 * so they become editable in admin.
 */

export type LinkField = {
  label?: string | null
  url?: string | null
  newTab?: boolean | null
}

export const FALLBACK_DESCRIPTION = 'Enrichers, your trusted partner in financial success.'

export const FALLBACK_CONTACT = {
  phone: '(042) 111 111 333',
  phoneHref: 'tel:+9242111111333',
  email: 'info@enrichers.com.pk',
  whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
}

export const FALLBACK_GROUPS = {
  tradeInvest: {
    label: 'Trade & invest',
    links: [
      { link: { label: 'Stock Broking', url: '/stock-broking/' } },
      { link: { label: 'Commodity Brokerage', url: '/commodity-brokerage/' } },
      { link: { label: 'Open an account', url: '/open-account/' } },
      { link: { label: 'MT5 platform', url: '/download-metatrader-5-for-your-device/' } },
    ],
  },
  theGroup: {
    label: 'The group',
    links: [
      { link: { label: 'Business Brokerage', url: '/business-brokerage/' } },
      { link: { label: 'Arid Land Development', url: '/arid-land-development/' } },
      { link: { label: 'Agriculture', url: '/agriculture/' } },
      {
        link: {
          label: 'Agriculture Research Centre',
          url: '/school-of-agriculture-research-centre/',
        },
      },
      { link: { label: 'Tourism & Hospitality', url: '/tourism-hospitality/' } },
      { link: { label: 'Skardu Riverside Hotel', url: '/skardu-riverside-hotel/' } },
    ],
  },
  insightsLearning: {
    label: 'Insights & learning',
    links: [
      { link: { label: 'Research notes', url: '/latest-insight/' } },
      { link: { label: 'Articles', url: '/blogs/' } },
      { link: { label: 'Financial glossary', url: '/financial-glossary/' } },
      { link: { label: 'FAQs', url: '/faqs/' } },
    ],
  },
  company: {
    label: 'Company',
    links: [
      { link: { label: 'About Enrichers', url: '/about-us/' } },
      { link: { label: 'Leadership', url: '/enrichers-team/' } },
      { link: { label: 'Careers', url: '/careers/' } },
      { link: { label: 'Strategic partners', url: '/strategicpartner/' } },
      { link: { label: 'Contact us', url: '/contact-us/' } },
    ],
  },
}

export const FALLBACK_REGULATION_TITLE = 'Regulation & disclosures'

export const FALLBACK_REGULATION: { link: LinkField }[] = [
  {
    link: {
      label: 'SECP License',
      url: 'https://enrichers.com.pk/wp-content/uploads/2025/07/SECP-License-1.pdf',
      newTab: true,
    },
  },
  {
    link: {
      label: 'PMEX Membership Certificate',
      url: 'https://enrichers.com.pk/wp-content/uploads/2025/07/PMEX-Membership-Certificate-1.pdf',
      newTab: true,
    },
  },
  {
    link: {
      label: 'Automated Direct Funds Model (ADFM)',
      url: 'https://enrichers.com.pk/wp-content/uploads/2025/07/Automated-Direct-Funds-Model-ADFM-1.pdf',
      newTab: true,
    },
  },
  {
    link: {
      label: "Do's & Don'ts by PMEX",
      url: 'https://enrichers.com.pk/wp-content/uploads/2025/07/Dos-Donts-by-PMEX.pdf',
      newTab: true,
    },
  },
  {
    link: {
      label: 'Investor Complaint Registration Form (PMEX)',
      url: '/complaints/',
    },
  },
]

export const FALLBACK_LEGAL = [
  {
    lead: 'Enrichers Securities (Pvt.) Ltd.',
    body: '— TREC holder, Pakistan Stock Exchange (PSX); regulated by the Securities & Exchange Commission of Pakistan (SECP).',
  },
  {
    lead: 'Enrichers (Pvt.) Ltd.',
    body: '— Corporate Member, Pakistan Mercantile Exchange (PMEX); regulated by the Securities & Exchange Commission of Pakistan (SECP).',
  },
  {
    lead: 'Disclaimer.',
    body: 'Enrichers Investment Group operates as a licensed brokerage house under SECP regulatory oversight. Trading in futures and financial markets carries inherent risks and may not be appropriate for every trader. We do not offer guaranteed returns or manage funds. The content on this site is intended solely for informational and educational purposes and should not be taken as personalized investment advice.',
  },
]

export const FALLBACK_OFFICES_LINE = 'Head Office: Lahore · Islamabad Office · UAE Office'

export const FALLBACK_BOTTOM: { link: LinkField }[] = [
  { link: { label: 'Privacy policy', url: '/privacy-policy/' } },
  { link: { label: 'Complaints', url: '/complaints/' } },
  { link: { label: 'Regulation', url: '/regulation/' } },
]

export const fallbackCopyright = () =>
  `© ${new Date().getFullYear()} Enrichers Investment Group. All rights reserved.`
