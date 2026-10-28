import type { Block } from 'payload'
import { buttonsField } from './shared'
export const readyWhenYouAre: Block = {
  slug: 'readyWhenYouAre',
  labels: { singular: 'Ready When You Are CTA', plural: 'Ready When You Are CTAs' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Ready when you are.' },
    {
      name: 'body',
      type: 'textarea',
      defaultValue: 'Open a PSX or PMEX account online, or speak to our team first.',
    },
    { ...buttonsField, defaultValue: [
      { blockType: 'primaryButton', label: 'Open an account', url: '/open-account/' },
      { blockType: 'secondaryButton', label: 'Talk to our experts', url: '/contact-us/#consultation' },
    ] },
    {
      name: 'riskNotice',
      type: 'textarea',
      defaultValue:
        'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.',
    },
  ],
}
