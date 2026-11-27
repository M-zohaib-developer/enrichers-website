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
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    // Every generated size is written as WebP (not the upload's own format), so a
    // PNG/JPG upload doesn't produce large lossless variants. `withoutEnlargement`
    // stops a small source being upscaled into a bigger variant that adds bytes
    // but no detail. NOTE: adding/removing an entry here is a SCHEMA change (new
    // `sizes_*` columns) — production needs a migration, not just a code deploy.
    imageSizes: [
      { name: 'thumbnail', width: 300, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'square', width: 500, height: 500, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'small', width: 600, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'medium', width: 900, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'large', width: 1400, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'xlarge', width: 1920, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 75 } } },
      // Social cards need exact dimensions, so this one crops and is not
      // `withoutEnlargement` — a short image still has to fill the 1200x630 frame.
      { name: 'og', width: 1200, height: 630, crop: 'center', formatOptions: { format: 'webp', options: { quality: 75 } } },
    ],
  },
}
