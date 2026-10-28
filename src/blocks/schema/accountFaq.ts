import type { Block } from 'payload'
export const accountFaq: Block = {
  slug: 'accountFaq',
  labels: { singular: 'Frequently Asked Questions', plural: 'Frequently Asked Questions' },
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Questions' },
    { name: 'heading', type: 'text', defaultValue: 'Before you open an account' },
    {
      name: 'categories',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'question', type: 'text' },
            { name: 'answer', type: 'textarea' },
          ],
        },
      ],
    },
  ],
}
