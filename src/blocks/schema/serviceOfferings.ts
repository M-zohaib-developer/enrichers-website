import type { Block } from 'payload'

export const serviceOfferings: Block = {
  slug: 'serviceOfferings',
  labels: { singular: 'Service Offerings', plural: 'Service Offerings' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'EIG Offerings' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Services for every stage of a business journey' },
    { name: 'body', type: 'textarea' },
    { name: 'background', type: 'select', defaultValue: 'light', options: [{ label: 'Light', value: 'light' }, { label: 'Blue gradient', value: 'gradient' }] },
    { name: 'columns', type: 'select', defaultValue: '3', options: [{ label: 'Two columns', value: '2' }, { label: 'Three columns', value: '3' }] },
    {
      name: 'items', type: 'array', required: true, minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
        { name: 'details', type: 'array', fields: [{ name: 'label', type: 'text', required: true }], label: 'Detail lines' },
      ],
    },
  ],
}
