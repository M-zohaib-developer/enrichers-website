import type { Block } from 'payload'

export const guideAccordion: Block = {
  slug: 'guideAccordion',
  labels: { singular: 'Guide Accordion', plural: 'Guide Accordions' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'guide', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Commodity trading guide' },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea', label: 'Intro text' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true, label: 'Question' },
        { name: 'answer', type: 'textarea', required: true, label: 'Answer' },
      ],
    },
  ],
}
