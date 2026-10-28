import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

// String-path component reference, not a direct import: the Payload CLI
// (generate:types etc.) loads this config in plain Node, and a direct
// import of a '@payloadcms/ui' client component drags in CSS imports that
// crash outside Next's bundler. The admin UI resolves this path itself.
const RowLabel = '@/Header/RowLabel#RowLabel'

/**
 * Nav shape mirrors the reference build exactly:
 *
 *   navItems[]            one entry per top-level nav button
 *     .label              visible text
 *     .href               set => plain link; blank => mega-menu trigger
 *     .groups[]           columns inside the mega panel
 *       .heading          column heading (optional — "About" has none)
 *       .items[]          .label / .href / .description
 *     .feature            optional 300px promo card in the last column
 *
 * Defaults below are the live site's own nav data, read out of its RSC payload.
 */
export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Optional. Renders 160px wide in the header. Leave empty to use the bundled Enrichers mark.',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Primary navigation',
      admin: {
        components: { RowLabel },
        description:
          'Rendered left to right in this order. Add groups to turn an item into a mega menu.',
      },
      defaultValue: [
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
              // Intentionally blank: the reference uses a headless second column
              // so the list keeps flowing across two columns without a label.
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
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        {
          name: 'href',
          type: 'text',
          label: 'Link (leave blank to make this a mega-menu trigger)',
        },
        {
          name: 'groups',
          type: 'array',
          label: 'Mega-menu columns',
          admin: { components: { RowLabel } },
          fields: [
            {
              name: 'heading',
              type: 'text',
              admin: { description: 'Optional. Leave blank for an unlabelled column.' },
            },
            {
              name: 'items',
              type: 'array',
              admin: { components: { RowLabel } },
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'href', type: 'text', required: true, defaultValue: '/' },
                {
                  name: 'description',
                  type: 'text',
                  admin: { description: 'Optional second line under the label.' },
                },
              ],
            },
          ],
        },
        {
          name: 'feature',
          type: 'group',
          label: 'Promo card (last column, 300px)',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: false },
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'href', type: 'text', defaultValue: '/' },
          ],
        },
      ],
    },
    {
      name: 'consultationLink',
      type: 'group',
      label: 'Text CTA — appears at 1280px and above',
      fields: [link({ labelRequired: false })],
      defaultValue: {
        link: { label: 'Book a consultation', url: '/contact-us/#consultation' },
      },
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Solid CTA — appears at 640px and above',
      fields: [link({ labelRequired: false })],
      defaultValue: { link: { label: 'Open an account', url: '/open-account/' } },
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact block (shown in the mobile menu)',
      fields: [
        { name: 'phone', type: 'text', defaultValue: '(042) 111 111 333' },
        { name: 'phoneHref', type: 'text', defaultValue: 'tel:+9242111111333' },
        {
          name: 'whatsappUrl',
          type: 'text',
          defaultValue: 'https://api.whatsapp.com/send?phone=9242111111333',
        },
        {
          name: 'whatsappLabel',
          type: 'text',
          defaultValue: 'WhatsApp our client support',
        },
      ],
    },
    {
      name: 'riskNotice',
      type: 'group',
      label: 'Risk notice strip (above the header)',
      admin: { description: 'Regulatory line shown above the bar. Scrolls away with the page.' },
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'lead', type: 'text', defaultValue: 'Risk notice:' },
        {
          name: 'body',
          type: 'textarea',
          defaultValue:
            'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Enrichers operates under SECP regulatory oversight; content is for information and education, not personalised advice.',
        },
      ],
    },

    /* ---------------------------------------------------------------------
     * DEPRECATED — not rendered anywhere, hidden from editors.
     *
     * These are the columns of the previous nav shape (`tradeInvest`,
     * `theGroup`, `about`). They are declared only so the dev schema push has
     * no columns to delete: drizzle-kit cannot tell a dropped column from a
     * renamed one, so a delete alongside the new `navItems`/`consultationLink`
     * columns stops it on an interactive prompt. In a non-TTY that prompt is
     * never answered, init hangs, and /admin spins forever with nothing able
     * to save.
     *
     * Keeping them is reversible; dropping them is not. Remove this block
     * together with `npm run setup:globals`, which deletes the matching
     * tables and columns once you are happy to do so.
     * ------------------------------------------------------------------ */
    {
      name: 'tradeInvest',
      type: 'group',
      label: 'Deprecated — previous nav shape',
      admin: { hidden: true },
      fields: [
        { name: 'label', type: 'text' },
        {
          name: 'promoCard',
          type: 'group',
          fields: [
            { name: 'enabled', type: 'checkbox' },
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'link',
              type: 'group',
              fields: [
                { name: 'label', type: 'text' },
                { name: 'url', type: 'text' },
                { name: 'newTab', type: 'checkbox' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'theGroup',
      type: 'group',
      label: 'Deprecated — previous nav shape',
      admin: { hidden: true },
      fields: [{ name: 'label', type: 'text' }],
    },
    {
      name: 'about',
      type: 'group',
      label: 'Deprecated — previous nav shape',
      admin: { hidden: true },
      fields: [{ name: 'label', type: 'text' }],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
