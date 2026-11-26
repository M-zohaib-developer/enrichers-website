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
    {
      name: 'image', type: 'upload', relationTo: 'media', label: 'Hero image',
      admin: {
        components: {
          Description: {
            path: '@/fields/ImageGuide#ImageGuide',
            clientProps: { size: '1000 × 1000', ratio: 1, hint: 'Square image — shown at half-width on desktop' },
          },
        },
      },
    },
    { name: 'imageAlt', type: 'text', label: 'Image alt text' },
  ],
}
