import type { Field } from 'payload'

/**
 * No Pages collection exists in this project yet (Phase 2 scope was theme
 * tokens only), so links are URL-only for now. Once Pages/content routing
 * is built (doc section 2.2), this can be upgraded to a relationTo-based
 * internal-reference option without changing the shape consumers read.
 */
export const link = (overrides: { labelRequired?: boolean } = {}): Field => ({
  name: 'link',
  type: 'group',
  fields: [
    {
      name: 'label',
      type: 'text',
      required: overrides.labelRequired ?? true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      defaultValue: '/',
      admin: {
        description: 'Relative path (e.g. /contact-us#consultation) or full URL.',
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      defaultValue: false,
      label: 'Open in new tab',
    },
  ],
})
