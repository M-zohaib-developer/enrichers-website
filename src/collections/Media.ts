import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'alt',
    description: 'Images used in blocks, and PDF documents such as licences and disclosures.',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt text / document name',
      admin: {
        description:
          'For an image, describe what it shows. For a PDF, give the document name — it is used as the link label.',
      },
    },
  ],
  upload: {
    // PDFs are allowed alongside images so an editor can upload a licence or
    // disclosure document instead of pasting a link to a file hosted elsewhere.
    mimeTypes: ['image/*', 'application/pdf'],
  },
}
