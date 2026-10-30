import type { Block } from 'payload'
import { buttonsField } from './shared'

export const processSteps: Block = {
  slug: 'processSteps',
  labels: { singular: 'Process Steps', plural: 'Process Steps' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'process', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Account opening' },
    { name: 'heading', type: 'text', required: true },
    { name: 'intro', type: 'textarea', label: 'Intro text' },
    {
      name: 'layoutVariant',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid', value: 'grid' },
        { label: 'Connected timeline', value: 'timeline' },
        { label: 'Candidate A cards', value: 'editorial' },
      ],
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea' },
      ],
    },
    { ...buttonsField, label: 'Call to action' },
  ],
}
