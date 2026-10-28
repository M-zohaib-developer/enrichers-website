import type { Block } from 'payload'
import { buttonsField } from './shared'
export const accountOpeningSteps: Block = {
  slug: 'accountOpeningSteps',
  labels: { singular: 'Account Opening Steps', plural: 'Account Opening Steps' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Open an account' },
    { name: 'heading', type: 'text', defaultValue: 'Four steps to your first trade' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
      ],
    },
    { name: 'note', type: 'textarea' },
    { ...buttonsField, defaultValue: [
      { blockType: 'primaryButton', label: 'Start with PSX or PMEX', url: '/open-account/' },
      { blockType: 'secondaryButton', label: "Documents you'll need", url: '/open-account/#documents' },
    ] },
  ],
}
