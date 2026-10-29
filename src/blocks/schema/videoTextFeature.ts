import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { BoldFeature, FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, ItalicFeature, LinkFeature, ParagraphFeature } from '@payloadcms/richtext-lexical'

/** A reusable editorial text-and-video feature for project, research, and corporate stories. */
export const videoTextFeature: Block = {
  slug: 'videoTextFeature',
  labels: { singular: 'Video and Text Feature', plural: 'Video and Text Features' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', label: 'Eyebrow (optional)' },
    { name: 'heading', type: 'text', required: true },
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: lexicalEditor({ features: [ParagraphFeature(), HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }), BoldFeature(), ItalicFeature(), LinkFeature(), FixedToolbarFeature(), InlineToolbarFeature()] }),
      admin: { description: 'Use paragraphs, bold text, italics, and links.' },
    },
    { name: 'videoUrl', type: 'text', required: true, label: 'Video URL' },
    { name: 'thumbnail', type: 'upload', relationTo: 'media', required: true, label: 'Video thumbnail' },
    { name: 'thumbnailAlt', type: 'text', label: 'Video thumbnail alt text' },
    { name: 'videoLabel', type: 'text', label: 'Video label', defaultValue: 'Watch project video' },
  ],
}
