import type { Block } from 'payload'
import { buttonsField } from './shared'

export const platformDownloads: Block = {
  slug: 'platformDownloads',
  labels: { singular: 'Platform Downloads', plural: 'Platform Downloads' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'downloads', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Download MetaTrader 5' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Trade on the device that suits you' },
    { name: 'body', type: 'textarea', label: 'Intro text' },
    {
      name: 'platforms',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'platform', type: 'text', required: true, label: 'Platform label' },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Screenshot' },
        { ...buttonsField, label: 'Download buttons' },
      ],
    },
  ],
}
