import type { Block } from 'payload'

export const statsBand: Block = {
  slug: 'statsBand',
  labels: { singular: 'Stats Band', plural: 'Stats Bands' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', label: 'Heading (optional)' },
    { name: 'body', type: 'textarea', label: 'Supporting text (optional)' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'inverse',
      options: [
        { label: 'Dark navy', value: 'inverse' },
        { label: 'White', value: 'surface' },
        { label: 'Light grey', value: 'sunken' },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      label: 'Figures',
      admin: { description: 'Two to four reads best. Keep the value short — "8,000+", "95%".' },
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Figure' },
        { name: 'label', type: 'text', required: true, label: 'What it measures' },
      ],
    },
    {
      name: 'footnote',
      type: 'text',
      label: 'Footnote (optional)',
      admin: { description: 'Small line under the figures, e.g. how they are measured.' },
    },
  ],
}
