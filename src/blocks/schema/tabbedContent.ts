import type { Block } from 'payload'

export const tabbedContent: Block = {
  slug: 'tabbedContent',
  labels: { singular: 'Tabbed Content', plural: 'Tabbed Content' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'products', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'What you can do' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea', label: 'Intro text' },
    { name: 'defaultTab', type: 'number', defaultValue: 0, label: 'Default tab index', admin: { description: 'Starts at 0. Use 3 to start on the fourth tab.' } },
    {
      name: 'tabs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Tab label' },
        { name: 'body', type: 'textarea', required: true, label: 'Tab content' },
        {
          name: 'featureCards',
          type: 'array',
          label: 'Feature cards (optional)',
          fields: [{ name: 'title', type: 'text', required: true }, { name: 'body', type: 'textarea', required: true }],
        },
        { name: 'quote', type: 'text', label: 'Dark panel quote (optional)', admin: { description: 'Used when no specification table is provided for this tab.' } },
        {
          name: 'table',
          type: 'group',
          label: 'Specification table (replaces dark quote)',
          fields: [
            { name: 'caption', type: 'text' },
            { name: 'columns', type: 'array', fields: [{ name: 'label', type: 'text', required: true }] },
            { name: 'rows', type: 'array', fields: [{ name: 'cells', type: 'array', fields: [{ name: 'value', type: 'text', required: true }] }] },
          ],
        },
      ],
    },
    { name: 'disclosureText', type: 'textarea', label: 'Disclosure text' },
    { name: 'disclosureLabel', type: 'text', defaultValue: 'Read the disclosures' },
    { name: 'disclosureUrl', type: 'text', defaultValue: '/regulation' },
  ],
}
