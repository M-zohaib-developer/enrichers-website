import type { Block } from 'payload'
import { buttonsField } from './shared'

/** Location facts and nearby landmarks for hospitality, tourism, and real-estate projects. */
export const destinationLocationShowcase: Block = {
  slug: 'destinationLocationShowcase',
  labels: { singular: 'Destination Location Showcase', plural: 'Destination Location Showcases' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'A location defined by nature' },
    { name: 'body', type: 'textarea', required: true },
    {
      name: 'facts',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true, label: 'Value' },
        { name: 'label', type: 'text', required: true, label: 'Label' },
      ],
    },
    { name: 'supportingText', type: 'textarea', label: 'Supporting text (optional)' },
    { ...buttonsField, label: 'Call to action' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Feature image' },
    { name: 'imageAlt', type: 'text', label: 'Feature image alt text' },
    { name: 'imageCaption', type: 'text', label: 'Feature image caption (optional)' },
    { name: 'imageCaptionDetail', type: 'text', label: 'Feature image caption detail (optional)' },
    { name: 'attractionsIntro', type: 'text', label: 'Nearby attractions intro (optional)' },
    {
      name: 'attractions',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'imageAlt', type: 'text', label: 'Image alt text' },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', label: 'Description (optional)' },
        { name: 'url', type: 'text', label: 'Optional information link' },
      ],
    },
  ],
}
