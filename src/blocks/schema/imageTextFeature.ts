import type { Block } from 'payload'

export const imageTextFeature: Block = {
  slug: 'imageTextFeature',
  labels: { singular: 'Image and Text Feature', plural: 'Image and Text Features' },
  fields: [
    { name: 'heading', type: 'text', required: true, defaultValue: 'Turning barren landscapes into flourishing fields' },
    { name: 'body', type: 'textarea', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'imageAlt', type: 'text', label: 'Image alt text' },
  ],
}
