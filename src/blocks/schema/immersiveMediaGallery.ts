import type { Block } from 'payload'

/** An editorial, auto-advancing media gallery with direct thumbnail navigation. */
export const immersiveMediaGallery: Block = {
  slug: 'immersiveMediaGallery',
  labels: { singular: 'Immersive Media Gallery', plural: 'Immersive Media Galleries' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)' },
    { name: 'heading', type: 'text', label: 'Heading (optional)' },
    { name: 'body', type: 'textarea', label: 'Introduction (optional)' },
    { name: 'autoplay', type: 'checkbox', defaultValue: true, label: 'Advance gallery automatically' },
    {
      name: 'interval',
      type: 'select',
      defaultValue: '5000',
      options: [
        { label: '4 seconds', value: '4000' },
        { label: '5 seconds', value: '5000' },
        { label: '6 seconds', value: '6000' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'imageAlt', type: 'text', label: 'Image alt text' },
        { name: 'caption', type: 'text', label: 'Caption (optional)' },
      ],
    },
  ],
}
