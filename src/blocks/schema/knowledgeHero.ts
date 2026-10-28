import type { Block } from 'payload'

export const knowledgeHero: Block = {
  slug: 'knowledgeHero',
  labels: { singular: 'Knowledge Hero', plural: 'Knowledge Heroes' },
  fields: [
    {
      name: 'breadcrumbs',
      type: 'array',
      label: 'Breadcrumb trail',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text' },
      ],
      defaultValue: [{ label: 'Home', url: '/' }, { label: 'FAQs', url: '' }],
    },
    { name: 'eyebrow', type: 'text', defaultValue: 'Knowledge center' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Frequently Asked Questions' },
    { name: 'body', type: 'textarea', label: 'Supporting text' },
    { name: 'image', type: 'upload', relationTo: 'media', label: 'Hero image' },
    { name: 'imageAlt', type: 'text', label: 'Image alt text' },
  ],
}
