import type { Block } from 'payload'
import { BlockquoteFeature, BoldFeature, FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, ItalicFeature, LinkFeature, OrderedListFeature, UnderlineFeature, UnorderedListFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

export const articleDetail: Block = {
  slug: 'articleDetail',
  labels: { singular: 'Article detail', plural: 'Article details' },
  fields: [
    { name: 'heading', type: 'text', required: true, label: 'Article title' },
    { name: 'category', type: 'text', defaultValue: 'Trading', required: true },
    { name: 'summary', type: 'textarea', required: true },
    { name: 'published', type: 'text', required: true },
    { name: 'author', type: 'text', defaultValue: 'Enrichers', required: true },
    { name: 'topic', type: 'text', defaultValue: 'Trading', required: true },
    { name: 'readingTime', type: 'text', defaultValue: '4 min', required: true },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    {
      name: 'body', type: 'richText', required: true, label: 'Article content',
      editor: lexicalEditor({ features: ({ rootFeatures }) => [
        ...rootFeatures, HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }), BoldFeature(), ItalicFeature(), UnderlineFeature(), LinkFeature(), UnorderedListFeature(), OrderedListFeature(), BlockquoteFeature(), FixedToolbarFeature(), InlineToolbarFeature(),
      ] }),
    },
    { name: 'related', type: 'array', fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'url', type: 'text', required: true },
      { name: 'summary', type: 'text' },
      { name: 'category', type: 'text' },
      { name: 'published', type: 'text' },
    ] },
  ],
}
