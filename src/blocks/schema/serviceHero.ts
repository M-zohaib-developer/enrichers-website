import type { Block } from 'payload'
import { linkFields } from './shared'

const buttonFields = [
  ...linkFields,
  {
    name: 'variant',
    type: 'select' as const,
    defaultValue: 'primary',
    options: [
      { label: 'Primary (white solid)', value: 'primary' },
      { label: 'Secondary (outline)', value: 'secondary' },
    ],
    admin: { description: 'Primary renders white on dark; secondary renders outline.' },
  },
]

export const serviceHero: Block = {
  slug: 'serviceHero',
  labels: { singular: 'Service Hero', plural: 'Service Heroes' },
  fields: [
    {
      name: 'breadcrumbs',
      type: 'array',
      label: 'Breadcrumb trail',
      admin: { description: 'Items shown above the heading. First item is usually Home.' },
      defaultValue: [
        { label: 'Home', url: '/' },
      ],
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text' },
      ],
    },
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Small text above the heading with a junction-mark icon.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body text',
    },
    {
      name: 'primary',
      type: 'group',
      label: 'Primary button',
      fields: buttonFields,
      defaultValue: { variant: 'primary' },
    },
    {
      name: 'secondary',
      type: 'group',
      label: 'Secondary button',
      fields: buttonFields,
      defaultValue: { variant: 'secondary' },
    },
    {
      name: 'badges',
      type: 'array',
      label: 'Credential badges',
      admin: { description: 'Shield-icon pills shown below the buttons (e.g. PSX TREC holder).' },
      fields: [{ name: 'label', type: 'text', required: true }],
      defaultValue: [],
    },
  ],
}
