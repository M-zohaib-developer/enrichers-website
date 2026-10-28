import type { Block } from 'payload'

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
        {
          name: 'button',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', required: true, defaultValue: 'Download now' },
            { name: 'url', type: 'text', required: true },
            {
              name: 'variant', type: 'select', defaultValue: 'primary', options: [
                { label: 'Primary (filled)', value: 'primary' },
                { label: 'Secondary (outline)', value: 'secondary' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
