import type { Block } from 'payload'

const iconOptions = [
  { label: 'Phone', value: 'phone' },
  { label: 'Message', value: 'message' },
  { label: 'Mail', value: 'mail' },
  { label: 'Map pin', value: 'mapPin' },
  { label: 'Building', value: 'building' },
]

export const contactDetails: Block = {
  slug: 'contactDetails',
  labels: { singular: 'Contact Details', plural: 'Contact Details' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'contact', label: 'Section ID' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Ways to reach us' },
    {
      name: 'channels',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        { name: 'icon', type: 'select', options: iconOptions, defaultValue: 'phone', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'description', type: 'text', required: true },
        { name: 'meta', type: 'text', required: true, label: 'Supporting text' },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'offices',
      type: 'array',
      required: false,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'address', type: 'textarea', required: true },
        { name: 'phone', type: 'text', label: 'Phone (optional)' },
        { name: 'hours', type: 'text', label: 'Hours (optional)' },
      ],
    },
  ],
}
