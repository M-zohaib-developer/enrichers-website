import type { Block } from 'payload'

export const processSteps: Block = {
  slug: 'processSteps',
  labels: { singular: 'Process Steps', plural: 'Process Steps' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'process', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Account opening' },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea', label: 'Intro text' },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}
