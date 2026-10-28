import type { Block } from 'payload'

const buttonFields = [
  { name: 'label', type: 'text' as const },
  { name: 'url', type: 'text' as const },
  {
    name: 'variant',
    type: 'select' as const,
    defaultValue: 'primary',
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
    ],
  },
]

export const clientServices: Block = {
  slug: 'clientServices',
  labels: { singular: 'Client Services Grid', plural: 'Client Services Grids' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Client services' },
    { name: 'heading', type: 'text', defaultValue: 'What you get with Enrichers' },
    {
      name: 'body',
      type: 'textarea',
      defaultValue:
        'More than order execution — our team helps you understand why a trade makes sense.',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'people',
          options: [
            { label: 'People', value: 'people' },
            { label: 'Price graph', value: 'chart' },
            { label: 'Risk / balance', value: 'scale' },
            { label: 'Global / macro', value: 'globe' },
            { label: 'Geopolitics', value: 'compass' },
            { label: 'Money / ledger', value: 'ledger' },
          ],
        },
      ],
    },
    { name: 'primaryButton', type: 'group', fields: buttonFields },
    { name: 'secondaryButton', type: 'group', fields: buttonFields },
  ],
}
