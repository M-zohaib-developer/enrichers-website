import type { Block } from 'payload'

export const faqAccordion: Block = {
  slug: 'faqAccordion',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'faq', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
  ],
}
