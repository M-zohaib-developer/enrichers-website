import type { Block } from 'payload'

export const businessGroupCards: Block = {
  slug: 'businessGroupCards',
  labels: { singular: 'Business Group Cards', plural: 'Business Group Cards' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Enrichers Investment Group' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'The rest of the group' },
    { name: 'body', type: 'textarea', defaultValue: 'Brokerage, real assets, agriculture and hospitality under one group.' },
    {
      name: 'items', type: 'array', required: true, minRows: 1,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Category label' },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text', label: 'Subtitle (optional)' },
        { name: 'body', type: 'textarea', required: true },
        { name: 'url', type: 'text', required: true },
        { name: 'icon', type: 'select', defaultValue: 'document', options: [
          { label: 'Document', value: 'document' },
          { label: 'Development', value: 'development' },
          { label: 'Agriculture', value: 'agriculture' },
          { label: 'Hospitality', value: 'hospitality' },
        ] },
      ],
    },
  ],
}
