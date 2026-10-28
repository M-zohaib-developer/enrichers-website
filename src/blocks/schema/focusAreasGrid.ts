import type { Block } from 'payload'

export const focusAreasGrid: Block = {
  slug: 'focusAreasGrid',
  labels: { singular: 'Focus Areas Grid', plural: 'Focus Areas Grids' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Key Focus Areas' },
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
  ],
}
