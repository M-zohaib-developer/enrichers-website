import type { Block } from 'payload'

export const articleList: Block = {
  slug: 'articleList',
  labels: { singular: 'Article List', plural: 'Article Lists' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'articles', label: 'Section ID' },
    { name: 'heading', type: 'text', defaultValue: 'Articles' },
    { name: 'linkLabel', type: 'text', defaultValue: 'All articles' },
    { name: 'linkUrl', type: 'text', defaultValue: '/blogs/' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
