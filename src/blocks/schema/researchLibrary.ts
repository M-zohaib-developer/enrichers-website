import type { Block } from 'payload'

export const researchLibrary: Block = {
  slug: 'researchLibrary',
  labels: { singular: 'Research Library', plural: 'Research Libraries' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'notes', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Research library' },
    { name: 'heading', type: 'text', defaultValue: 'All research notes' },
    {
      name: 'notes',
      type: 'array',
      label: 'Research notes',
      admin: { description: 'Each note can link to an uploaded PDF or a published PDF URL.' },
      fields: [
        { name: 'category', type: 'text', required: true },
        { name: 'date', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'summary', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Cover image (optional)' },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'Research PDF (optional)',
          admin: { description: 'Upload a PDF; it takes precedence over the URL below.' },
        },
        { name: 'url', type: 'text', label: 'PDF URL fallback' },
      ],
    },
  ],
}
