import type { Block } from 'payload'

export const benefitsGrid: Block = {
  slug: 'benefitsGrid',
  labels: { singular: 'Benefits Grid', plural: 'Benefits Grids' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Benefits of Working with Enrichers' },
    { name: 'showHeader', type: 'checkbox', defaultValue: true, label: 'Show section heading' },
    { name: 'body', type: 'textarea' },
    { name: 'background', type: 'select', defaultValue: 'sunken', options: [{ label: 'Sunken', value: 'sunken' }, { label: 'Blue gradient', value: 'gradient' }] },
    {
      name: 'items', type: 'array', required: true, minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Benefit title' },
        { name: 'body', type: 'textarea', required: true, label: 'Benefit description' },
      ],
    },
  ],
}
