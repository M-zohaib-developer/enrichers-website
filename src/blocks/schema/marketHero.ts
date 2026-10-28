import type { Block } from 'payload'
import { linkFields } from './shared'

const buttonFields = [
  ...linkFields,
  {
    name: 'variant',
    type: 'select' as const,
    defaultValue: 'primary',
    options: [
      { label: 'Primary (solid)', value: 'primary' },
      { label: 'Secondary (outline)', value: 'secondary' },
    ],
    admin: { description: 'Choose how the button looks on the page.' },
  },
]

export const marketHero: Block = {
  slug: 'marketHero',
  labels: { singular: 'Market Hero', plural: 'Market Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'SECP-regulated broker · Lahore, since 2011' },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: "Trade Pakistan's markets with a licensed broker beside you.",
    },
    { name: 'headingAccent', type: 'text', defaultValue: 'with a licensed broker beside you.' },
    { name: 'headingLineOne', type: 'text', defaultValue: "Trade Pakistan's" },
    { name: 'headingLineTwo', type: 'text', defaultValue: 'markets with a licensed' },
    { name: 'headingLineThree', type: 'text', defaultValue: 'broker beside you.' },
    {
      name: 'body',
      type: 'textarea',
      defaultValue:
        'Invest in PSX equities, or trade gold, oil, currencies and US index futures on PMEX — with research, risk management and client support 24/5.',
    },
    {
      name: 'primary',
      type: 'group',
      fields: buttonFields,
      defaultValue: {
        label: 'Open an account',
        url: '/open-account/',
        variant: 'primary',
      },
    },
    {
      name: 'secondary',
      type: 'group',
      fields: buttonFields,
      defaultValue: {
        label: 'Talk to our experts',
        url: '/contact-us/#consultation',
        variant: 'secondary',
      },
    },
    {
      name: 'heroImage',
      label: 'Hero image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Trading-floor image shown beside the hero content.' },
    },
    {
      name: 'badges',
      type: 'array',
      fields: [{ name: 'label', type: 'text' }],
      defaultValue: [
        { label: 'PSX TREC holder' },
        { label: 'PMEX corporate member' },
        { label: 'Regulated by the SECP' },
      ],
    },
  ],
}
