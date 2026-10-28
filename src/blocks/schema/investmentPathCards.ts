import type { Block } from 'payload'
import { buttonsField } from './shared'
export const investmentPathCards: Block = {
  slug: 'investmentPathCards',
  labels: { singular: 'Investment Path Cards', plural: 'Investment Path Cards' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Three ways to start' },
    { name: 'heading', type: 'text', defaultValue: 'What would you like to do?' },
    {
      name: 'body',
      type: 'textarea',
      defaultValue:
        "Choose the market you want to trade — or tell us your goals and we'll recommend a path.",
    },
    { name: 'cardActionLabel', type: 'text', defaultValue: 'Explore →' },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
        { name: 'supportingLabel', type: 'text' },
        { name: 'actionLabel', type: 'text' },
        { name: 'url', type: 'text' },
        { ...buttonsField },
      ],
    },
  ],
}
