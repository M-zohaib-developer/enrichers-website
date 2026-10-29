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
      defaultValue: '/',
      admin: {
        description: 'Relative path (e.g. /contact-us#consultation) or full URL.',
        condition: (_data, siblingData) => !siblingData?.file,
      },
      // Not `required`, because a link can instead point at an uploaded
      // document. Exactly one of the two has to be set.
      validate: (value: unknown, options: { siblingData?: unknown }) => {
        if (value || (options?.siblingData as { file?: unknown })?.file) return true
        return 'Enter a URL, or upload a document below.'
      },
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Or link an uploaded document (PDF)',
      admin: {
        description:
          'Upload a PDF — a licence, certificate or disclosure — and it is linked instead of the URL. Clear this to go back to using a URL.',
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
