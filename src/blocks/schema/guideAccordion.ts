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
      name: 'columns',
      type: 'select',
      defaultValue: '1',
      options: [
        { label: '1 column (default)', value: '1' },
        { label: '2 columns', value: '2' },
      ],
      admin: { description: 'Render accordion items in 2 columns on wide screens — useful for long lists like a glossary.' },
    },
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
