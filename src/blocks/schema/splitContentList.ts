import type { Block } from 'payload'

export const splitContentList: Block = {
  slug: 'splitContentList',
  labels: { singular: 'Split Content List', plural: 'Split Content Lists' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'leftHeading', type: 'text', required: true, label: 'Left heading' },
    { name: 'leftBody', type: 'textarea', required: true, label: 'Left text' },
    { name: 'rightHeading', type: 'text', required: true, label: 'Right heading' },
    { name: 'rightBody', type: 'textarea', required: true, label: 'Right text' },
    {
      name: 'rightItems', type: 'array', required: true, minRows: 1, label: 'Right-side list',
      fields: [{ name: 'label', type: 'text', required: true }],
    },
  ],
}
