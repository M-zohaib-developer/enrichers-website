import type { Block } from 'payload'

export const productRange: Block = {
  slug: 'productRange',
  labels: { singular: 'Product Range', plural: 'Product Ranges' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'products', label: 'Section ID (for anchor nav)' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Product range' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea', label: 'Intro text' },
    {
      name: 'tabs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Tab label' },
        {
          name: 'features',
          type: 'array',
          label: 'Feature cards',
          fields: [
            { name: 'term', type: 'text', required: true, label: 'Title' },
            { name: 'description', type: 'text', required: true, label: 'Body' },
          ],
        },
        { name: 'quote', type: 'text', label: 'Dark panel quote' },
      ],
    },
    { name: 'disclosureText', type: 'textarea', label: 'Disclosure text' },
    { name: 'disclosureLabel', type: 'text', defaultValue: 'Read the disclosures' },
    { name: 'disclosureUrl', type: 'text', defaultValue: '/regulation' },
  ],
}
