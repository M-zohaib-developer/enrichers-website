import type { Block } from 'payload'
import { buttonsField } from './shared'

export const founderStatement: Block = {
  slug: 'founderStatement',
  labels: { singular: 'Founder Statement', plural: 'Founder Statements' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)' },
    { name: 'quote', type: 'textarea', required: true },
    { name: 'body', type: 'textarea', label: 'Supporting paragraphs (optional)' },
    { name: 'authorName', type: 'text', required: true },
    { name: 'authorRole', type: 'text', required: true },
    {
      name: 'portrait', type: 'upload', relationTo: 'media', required: true,
      admin: {
        components: {
          Description: {
            path: '@/fields/ImageGuide#ImageGuide',
            clientProps: { size: '800 × 1000', ratio: 0.8, hint: 'Portrait — keep face in the upper two-thirds' },
          },
        },
      },
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image position (split layout)',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      admin: { description: 'Selecting a position enables the full two-column founder message layout.' },
    },
    { ...buttonsField },
  ],
}
