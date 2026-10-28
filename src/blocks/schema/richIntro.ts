import type { Block } from 'payload'
import {
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
import { buttonsField } from './shared'

export const richIntro: Block = {
  slug: 'richIntro',
  labels: { singular: 'Rich Intro', plural: 'Rich Intros' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    { ...buttonsField },
  ],
}
