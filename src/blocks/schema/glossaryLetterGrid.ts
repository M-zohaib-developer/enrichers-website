import type { Block } from 'payload'

export const glossaryLetterGrid: Block = {
  slug: 'glossaryLetterGrid',
  labels: { singular: 'Glossary Letter Grid', plural: 'Glossary Letter Grids' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID', defaultValue: 'glossary' },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text' },
    { name: 'intro', type: 'textarea', label: 'Intro text' },
    {
      name: 'groups',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Letter group', plural: 'Letter groups' },
      admin: {
        description:
          'One row per letter. Desktop renders two letters side by side (A|B, C|D…); mobile stacks them in order. Anchor ids are generated as "letter-{letter}" so the sticky nav keeps working.',
      },
      fields: [
        {
          name: 'letter',
          type: 'text',
          required: true,
          maxLength: 2,
          admin: { description: 'Single letter, e.g. A. Used as heading and anchor id.' },
        },
        {
          name: 'items',
          type: 'array',
          required: true,
          minRows: 1,
          labels: { singular: 'Term', plural: 'Terms' },
          fields: [
            { name: 'question', type: 'text', required: true, label: 'Term' },
            { name: 'answer', type: 'textarea', required: true, label: 'Definition' },
          ],
        },
      ],
    },
  ],
}
