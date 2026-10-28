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
        {
          name: 'table',
          type: 'group',
          label: 'Specification table (replaces dark quote)',
          fields: [
            { name: 'caption', type: 'text', label: 'Table caption' },
            {
              name: 'columns',
              type: 'array',
              label: 'Column headings',
              fields: [{ name: 'label', type: 'text', required: true }],
            },
            {
              name: 'rows',
              type: 'array',
              label: 'Table rows',
              fields: [
                {
                  name: 'cells',
                  type: 'array',
                  label: 'Cell values (in column order)',
                  fields: [{ name: 'value', type: 'text', required: true }],
                },
              ],
            },
          ],
        },
      ],
    },
    { name: 'disclosureText', type: 'textarea', label: 'Disclosure text' },
    { name: 'disclosureLabel', type: 'text', defaultValue: 'Read the disclosures' },
    { name: 'disclosureUrl', type: 'text', defaultValue: '/regulation' },
  ],
}
