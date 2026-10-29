import type { Block } from 'payload'

export const imageTextFeature: Block = {
  slug: 'imageTextFeature',
  labels: { singular: 'Image and Text Feature', plural: 'Image and Text Features' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Turning barren landscapes into flourishing fields' },
    { name: 'body', type: 'textarea', required: true },
    {
      name: 'highlights',
      type: 'array',
      label: 'Highlights (optional)',
      admin: { description: 'Short check-mark points shown below the body copy.' },
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'imageAlt', type: 'text', label: 'Image alt text' },
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'Image on the right', value: 'right' },
        { label: 'Image on the left', value: 'left' },
      ],
    },
    {
      name: 'attributionName',
      type: 'text',
      label: 'Signed by — name (optional)',
      admin: {
        description:
          'Set this to turn the section into a signed message, e.g. a note from the Chairman.',
      },
    },
    {
      name: 'attributionRole',
      type: 'text',
      label: 'Signed by — role (optional)',
      admin: { condition: (_data, siblingData) => Boolean(siblingData?.attributionName) },
    },
    {
      name: 'portrait',
      type: 'checkbox',
      label: 'Portrait image (taller crop)',
      defaultValue: false,
      admin: {
        description:
          'Uses a 4:5 crop instead of 16:9 — right for a person, wrong for a landscape photo.',
      },
    },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'surface',
      options: [
        { label: 'White', value: 'surface' },
        { label: 'Light grey', value: 'sunken' },
      ],
    },
  ],
}
