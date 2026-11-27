import type { Block } from 'payload'
import { buttonsField } from './shared'
export const marketResearchCards: Block = {
  slug: 'marketResearchCards',
  labels: { singular: 'Market Research Cards', plural: 'Market Research Cards' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Enrichers research' },
    { name: 'heading', type: 'text', defaultValue: 'Market insight, every week' },
    {
      name: 'body',
      type: 'textarea',
      defaultValue:
        "Notes from our research team on Pakistan's equity market, commodities and the global macro picture.",
    },
    { name: 'subheading', type: 'text', label: 'Right-column heading (optional)', admin: { description: 'Small heading shown above the intro text, top-right.' } },
    { ...buttonsField, defaultValue: [{ blockType: 'secondaryButton', label: 'All research', url: '/latest-insight/' }] },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'category', type: 'text' },
        { name: 'date', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'url', type: 'text' },
        {
          name: 'image', type: 'upload', relationTo: 'media',
          admin: {
            components: {
              Description: {
                path: '@/fields/ImageGuide#ImageGuide',
                clientProps: { size: '900 × 1260', ratio: 0.71, hint: 'Research cover — portrait 5:7 (matches the report covers)' },
              },
            },
          },
        },
      ],
    },
  ],
}
