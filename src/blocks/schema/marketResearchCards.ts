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
    { ...buttonsField, defaultValue: [{ blockType: 'secondaryButton', label: 'All research', url: '/latest-insight/' }] },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'category', type: 'text' },
        { name: 'date', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'url', type: 'text' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
