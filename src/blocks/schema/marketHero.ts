import type { Block } from 'payload'
import { buttonsField } from './shared'

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
    { name: 'showButtons', type: 'checkbox', defaultValue: true, label: 'Show hero buttons' },
    { ...buttonsField, defaultValue: [
      { blockType: 'primaryButton', label: 'Open an account', url: '/open-account/' },
      { blockType: 'secondaryButton', label: 'Talk to our experts', url: '/contact-us/#consultation' },
    ] },
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
