import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

// String-path component reference — see Header/config.ts for why this isn't a direct import.
const RowLabel = '@/Footer/RowLabel#RowLabel'

const linkGroup = (
  name: string,
  defaultLabel: string,
  defaultLinks: { link: { label: string; url: string } }[],
) => ({
  name,
  type: 'group' as const,
  label: defaultLabel,
  fields: [
    { name: 'label', type: 'text' as const, required: true, defaultValue: defaultLabel },
    {
      name: 'links',
      type: 'array' as const,
      admin: { components: { RowLabel } },
      defaultValue: defaultLinks,
      fields: [link()],
    },
  ],
})

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand & contact',
          description: 'Narrow left column of the top band (1fr of the 1fr / 2.2fr grid).',
          fields: [
            { name: 'logo', type: 'upload', relationTo: 'media' },
            {
              name: 'description',
              type: 'textarea',
              label: 'Tagline',
              defaultValue: 'Enrichers, your trusted partner in financial success.',
            },
            { name: 'phone', type: 'text', defaultValue: '(042) 111 111 333' },
            {
              name: 'phoneHref',
              type: 'text',
              label: 'Phone link (tel:)',
              defaultValue: 'tel:+9242111111333',
            },
            { name: 'email', type: 'text', defaultValue: 'info@enrichers.com.pk' },
            {
              name: 'whatsappUrl',
              type: 'text',
              label: 'WhatsApp link',
              defaultValue: 'https://api.whatsapp.com/send?phone=9242111111333',
            },
          ],
        },
        {
          label: 'Link groups',
          description: 'Four groups — two columns below 768px, four at and above.',
          fields: [
            linkGroup('tradeInvest', 'Trade & invest', [
              { link: { label: 'Stock Broking', url: '/stock-broking' } },
              { link: { label: 'Commodity Brokerage', url: '/commodity-brokerage' } },
              { link: { label: 'Open an account', url: '/open-account' } },
              { link: { label: 'MT5 platform', url: '/download-metatrader-5-for-your-device' } },
            ]),
            linkGroup('theGroup', 'The group', [
              { link: { label: 'Business Brokerage', url: '/business-brokerage' } },
              { link: { label: 'Arid Land Development', url: '/arid-land-development' } },
              { link: { label: 'Agriculture', url: '/agriculture' } },
              {
                link: {
                  label: 'Agriculture Research Centre',
                  url: '/school-of-agriculture-research-centre',
                },
              },
              { link: { label: 'Tourism & Hospitality', url: '/tourism-hospitality' } },
              { link: { label: 'Skardu Riverside Hotel', url: '/skardu-riverside-hotel' } },
            ]),
            linkGroup('insightsLearning', 'Insights & learning', [
              { link: { label: 'Research notes', url: '/latest-insight' } },
              { link: { label: 'Articles', url: '/blogs' } },
              { link: { label: 'Financial glossary', url: '/financial-glossary' } },
              { link: { label: 'FAQs', url: '/faqs' } },
            ]),
            linkGroup('company', 'Company', [
              { link: { label: 'About Enrichers', url: '/about-us' } },
              { link: { label: 'Leadership', url: '/enrichers-team' } },
              { link: { label: 'Careers', url: '/careers' } },
              { link: { label: 'Strategic partners', url: '/strategicpartner' } },
              { link: { label: 'Contact us', url: '/contact-us' } },
            ]),
          ],
        },
        {
          label: 'Regulation & disclosures',
          description:
            'Middle band. Licence PDFs on the left, regulated-entity statements on the right.',
          fields: [
            {
              name: 'regulationTitle',
              type: 'text',
              defaultValue: 'Regulation & disclosures',
            },
            {
              name: 'regulationLinks',
              type: 'array',
              admin: { components: { RowLabel } },
              defaultValue: [
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
              ],
              fields: [link()],
            },
            {
              name: 'legalParagraphs',
              type: 'array',
              label: 'Legal statements',
              admin: {
                description:
                  'The lead renders bold and slightly brighter; the body follows in the same line.',
              },
              defaultValue: [
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
              ],
              fields: [
                { name: 'lead', type: 'text' },
                { name: 'body', type: 'textarea', required: true },
              ],
            },
            {
              name: 'officesLine',
              type: 'text',
              defaultValue: 'Head Office: Lahore · Islamabad Office · UAE Office',
            },
          ],
        },
        {
          label: 'Bottom bar',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              defaultValue: `© ${new Date().getFullYear()} Enrichers Investment Group. All rights reserved.`,
            },
            {
              name: 'bottomLinks',
              type: 'array',
              admin: { components: { RowLabel } },
              defaultValue: [
                { link: { label: 'Privacy policy', url: '/privacy-policy/' } },
                { link: { label: 'Complaints', url: '/complaints/' } },
                { link: { label: 'Regulation', url: '/regulation/' } },
              ],
              fields: [link()],
            },
          ],
        },
      ],
    },

    /* ---------------------------------------------------------------------
     * DEPRECATED — not rendered, hidden from editors. Columns of the previous
     * footer shape, kept so the dev schema push has nothing to delete. See the
     * matching block in Header/config.ts for the full reasoning; remove both
     * together with `npm run setup:globals`.
     * ------------------------------------------------------------------ */
    { name: 'entityNames', type: 'textarea', admin: { hidden: true } },
    { name: 'disclaimer', type: 'textarea', admin: { hidden: true } },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
