import type { Block } from 'payload'
import { buttonsField } from './shared'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

export const agricultureFeature: Block = {
  slug: 'agricultureFeature',
  labels: { singular: 'Agriculture Feature', plural: 'Agriculture Features' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)' },
    { name: 'heading', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'imageAlt', type: 'text', label: 'Image alt text' },
    { name: 'imagePosition', type: 'select', defaultValue: 'right', options: [{ label: 'Image right', value: 'right' }, { label: 'Image left', value: 'left' }] },
    {
      name: 'body', type: 'richText', required: true,
      editor: lexicalEditor({ features: [ParagraphFeature(), HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }), BoldFeature(), ItalicFeature(), LinkFeature(), UnorderedListFeature(), OrderedListFeature(), FixedToolbarFeature(), InlineToolbarFeature()] }),
      admin: { description: 'Use paragraphs, links, bold text, and arrow-style bullet lists.' },
    },
    { ...buttonsField, label: 'Feature buttons' },
  ],
}
