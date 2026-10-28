import type { Block } from 'payload'
import {
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const richTextSection: Block = {
  slug: 'richTextBlock',
  labels: { singular: 'Rich Text Block', plural: 'Rich Text Blocks' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'guide', label: 'Section ID' },
    { name: 'heading', type: 'text', label: 'Heading' },
    {
      name: 'background',
      type: 'select',
      defaultValue: 'white',
      options: [
        { label: 'White', value: 'white' },
        { label: 'White to blue gradient', value: 'gradient' },
      ],
    },
    { name: 'showAccentBar', type: 'checkbox', defaultValue: true, label: 'Show light-blue left accent bar' },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Content',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          BlockquoteFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],
}
