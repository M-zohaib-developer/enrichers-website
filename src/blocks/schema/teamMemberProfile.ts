import type { Block } from 'payload'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  UnderlineFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const teamMemberProfile: Block = {
  slug: 'teamMemberProfile',
  labels: { singular: 'Team Member Profile', plural: 'Team Member Profiles' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'profile', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Team details' },
    { name: 'heading', type: 'text', required: true, label: 'Full name' },
    { name: 'photo', type: 'upload', relationTo: 'media', required: true, label: 'Portrait' },
    { name: 'role', type: 'text', required: true },
    { name: 'companyLabel', type: 'text', label: 'Company name (optional)' },
    { name: 'companyUrl', type: 'text', label: 'Company link (optional)' },
    {
      name: 'credentials',
      type: 'array',
      label: 'Credentials and affiliations',
      fields: [
        { name: 'text', type: 'text', required: true },
        { name: 'linkLabel', type: 'text', label: 'Linked label (optional)' },
        { name: 'linkUrl', type: 'text', label: 'Linked URL (optional)' },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      label: 'Biography',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          LinkFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    { name: 'backLinkLabel', type: 'text', defaultValue: 'Back to our team' },
    { name: 'backLinkUrl', type: 'text', defaultValue: '/enrichers-team/' },
  ],
}
