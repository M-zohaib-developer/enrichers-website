import type { Block } from 'payload'
import { buttonsField } from './shared'

export const businessIntro: Block = {
  slug: 'businessIntro',
  labels: { singular: 'Business Brokerage Intro', plural: 'Business Brokerage Intros' },
  fields: [
    { name: 'heading', type: 'text', required: true, defaultValue: 'Business Brokerage' },
    { name: 'body', type: 'textarea', required: true },
    { ...buttonsField },
  ],
}
