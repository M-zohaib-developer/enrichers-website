import type { Block } from 'payload'

export const requirementsChecklist: Block = {
  slug: 'requirementsChecklist',
  labels: { singular: 'Requirements Checklist', plural: 'Requirements Checklists' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'documents', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Documentation' },
    { name: 'heading', type: 'text', defaultValue: "What you'll need", required: true },
    {
      name: 'groups',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Group title' },
        {
          name: 'items',
          type: 'array',
          required: true,
          fields: [{ name: 'label', type: 'text', required: true }],
        },
        {
          name: 'button',
          type: 'group',
          label: 'Secondary button',
          fields: [{ name: 'label', type: 'text' }, { name: 'url', type: 'text' }],
        },
      ],
    },
  ],
}
