import type { Block } from 'payload'
import { linkFields } from './shared'
export const skarduHotelFeature: Block = {
  slug: 'skarduHotelFeature',
  labels: { singular: 'Skardu Riverside Hotel Feature', plural: 'Skardu Riverside Hotel Features' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Flagship project' },
    { name: 'heading', type: 'text', defaultValue: 'Skardu Riverside Hotel' },
    {
      name: 'body',
      type: 'textarea',
      defaultValue:
        'A purpose-built 5-star luxury hotel on 40 kanals of riverside land in Skardu, Gilgit-Baltistan.',
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'imageCaption',
      type: 'text',
      defaultValue: 'Architectural visualisation',
      admin: {
        description: 'Overlaid on the bottom of the image. Leave blank to hide the caption.',
      },
    },
    {
      name: 'facts',
      type: 'array',
      fields: [
        { name: 'value', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'button',
      type: 'group',
      fields: linkFields,
      defaultValue: { label: 'Explore Skardu Riverside Hotel', url: '/skardu-riverside-hotel/' },
    },
  ],
}
