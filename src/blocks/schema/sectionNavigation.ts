import type { Block } from 'payload'

export const sectionNavigation: Block = {
  slug: 'sectionNavigation',
  labels: { singular: 'Section Navigation', plural: 'Section Navigations' },
  fields: [
    {
      name: 'ariaLabel',
      type: 'text',
      defaultValue: 'On this page',
      label: 'Navigation label',
    },
    {
      name: 'links',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'anchor', type: 'text', required: true, admin: { description: 'Section ID without the #, for example documents.' } },
        { name: 'active', type: 'checkbox', defaultValue: false, label: 'Active link' },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'CTA button',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}
