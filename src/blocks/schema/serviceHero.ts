import type { Block } from 'payload'
const buttonFields = [
  { name: 'label', type: 'text' as const },
  { name: 'url', type: 'text' as const },
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
      name: 'theme',
      type: 'select',
      defaultValue: 'dark',
      options: [
        { label: 'Dark (inverse navy — service pages)', value: 'dark' },
        { label: 'Light (white — open account, regulation etc.)', value: 'light' },
      ],
    },
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
      name: 'breadcrumbPosition',
      type: 'select',
      defaultValue: 'top',
      options: [
        { label: 'Above heading', value: 'top' },
        { label: 'Below heading', value: 'bottom' },
      ],
      admin: { description: 'Use below heading for split product/platform heroes.' },
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
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Right-side hero image (optional)',
      admin: { description: 'Adds a responsive image beside the light hero content.' },
    },
    {
      name: 'primary',
      type: 'group',
      label: 'Primary button',
      fields: buttonFields,
    },
    {
      name: 'secondary',
      type: 'group',
      label: 'Secondary button',
      fields: buttonFields,
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
