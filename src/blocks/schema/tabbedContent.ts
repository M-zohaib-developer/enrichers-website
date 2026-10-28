import type { Block } from 'payload'

export const tabbedContent: Block = {
  slug: 'tabbedContent',
  labels: { singular: 'Tabbed Content', plural: 'Tabbed Content' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'products', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'What you can do' },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea', label: 'Intro text' },
    {
      name: 'tabs',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Tab label' },
        { name: 'body', type: 'textarea', required: true, label: 'Tab content' },
      ],
    },
    { name: 'disclosureText', type: 'textarea', label: 'Disclosure text' },
    { name: 'disclosureLabel', type: 'text', defaultValue: 'Read the disclosures' },
    { name: 'disclosureUrl', type: 'text', defaultValue: '/regulation' },
  ],
}
