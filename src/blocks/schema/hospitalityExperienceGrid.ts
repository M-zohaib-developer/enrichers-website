import type { Block } from 'payload'

/** A reusable image-led feature grid for hospitality and destination projects. */
export const hospitalityExperienceGrid: Block = {
  slug: 'hospitalityExperienceGrid',
  labels: { singular: 'Hospitality Experience Grid', plural: 'Hospitality Experience Grids' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Designed around the destination experience' },
    { name: 'body', type: 'textarea', label: 'Intro (optional)' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'imageAlt', type: 'text', label: 'Image alt text' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    { name: 'closingLine', type: 'text', label: 'Closing line (optional)' },
  ],
}
