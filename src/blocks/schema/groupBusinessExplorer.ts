import type { Block } from 'payload'
import { buttonsField } from './shared'
export const groupBusinessExplorer: Block = {
  slug: 'groupBusinessExplorer',
  labels: { singular: 'Group Business Explorer', plural: 'Group Business Explorers' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Beyond brokerage' },
    { name: 'heading', type: 'text', defaultValue: 'Part of a diversified investment group' },
    {
      name: 'body',
      type: 'textarea',
      defaultValue:
        'Enrichers also builds real assets — land, farms and hospitality — and advises on buying and selling businesses.',
    },
    { ...buttonsField, defaultValue: [
      { blockType: 'primaryButton', label: 'Explore business', url: '/' },
      { blockType: 'secondaryButton', label: 'Book a consultation', url: '/contact-us/' },
    ] },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'quote', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'url', type: 'text' },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'document',
          options: [
            { label: 'Document', value: 'document' },
            { label: 'Development', value: 'development' },
            { label: 'Agriculture', value: 'agriculture' },
            { label: 'Research', value: 'research' },
            { label: 'Hospitality', value: 'hospitality' },
          ],
        },
      ],
    },
  ],
}
