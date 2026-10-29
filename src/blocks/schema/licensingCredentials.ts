import type { Block } from 'payload'
export const licensingCredentials: Block = {
  slug: 'licensingCredentials',
  labels: {
    singular: 'Licensing & Regulatory Credentials',
    plural: 'Licensing & Regulatory Credentials',
  },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID (optional)' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Licensed, and published openly' },
    { name: 'heading', type: 'text', label: 'Heading (optional)' },
    { name: 'body', type: 'textarea', label: 'Supporting text (optional)' },
    {
      name: 'layoutVariant',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Cards grid', value: 'cards' },
        { label: 'Split entities and documents', value: 'split' },
      ],
    },
    { name: 'disclosureText', type: 'textarea', label: 'Disclosure note (split layout)' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
        {
          name: 'note',
          type: 'text',
          admin: {
            description:
              'Small highlighted line under the body, e.g. the regulator. Leave blank to hide.',
          },
        },
        {
          name: 'url',
          type: 'text',
          admin: {
            description: 'Relative path or full URL. Ignored when a document is uploaded below.',
          },
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'Or upload a document (PDF)',
          admin: {
            description:
              'Upload a licence, certificate or disclosure PDF. When set, the card links to this file instead of the URL.',
          },
        },
        { name: 'linkLabel', type: 'text', defaultValue: 'View documents' },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'entity',
          options: [
            { label: 'Regulated entity (solid border, shield)', value: 'entity' },
            { label: 'Documents (dashed border, document icon)', value: 'documents' },
          ],
          admin: {
            description:
              'Chooses the border and icon. Set per item so reordering or adding a card cannot move the styling to the wrong one.',
          },
        },
      ],
      defaultValue: [
        {
          title: 'Enrichers Securities (Pvt.) Ltd.',
          body: 'TREC holder, Pakistan Stock Exchange (PSX)',
          note: 'Regulated by the SECP',
          url: '/stock-broking/',
          variant: 'entity',
        },
        {
          title: 'Enrichers (Pvt.) Ltd.',
          body: 'Corporate Member, Pakistan Mercantile Exchange (PMEX)',
          note: 'Regulated by the SECP',
          url: '/commodity-brokerage/',
          variant: 'entity',
        },
        {
          title: 'Licences & disclosures',
          body: 'SECP licence, PMEX membership certificate, ADFM and complaint forms.',
          url: '/regulation/',
          variant: 'documents',
        },
      ],
    },
  ],
}
