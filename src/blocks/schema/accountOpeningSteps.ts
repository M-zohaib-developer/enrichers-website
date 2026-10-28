import type { Block } from 'payload'
import { linkFields } from './shared'
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
    {
      name: 'button',
      type: 'group',
      fields: linkFields,
      defaultValue: { label: 'Start with PSX or PMEX', url: '/open-account/' },
    },
    {
      name: 'secondaryButton',
      type: 'group',
      fields: linkFields,
      defaultValue: { label: "Documents you'll need", url: '/open-account/#documents' },
    },
  ],
}
