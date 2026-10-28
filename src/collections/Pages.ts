import type { CollectionConfig } from 'payload'

import { HomeBlocks } from '@/blocks/home'
import { revalidatePage, revalidatePageAfterDelete } from './hooks/revalidatePage'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) =>
        generatePreviewPath({ collection: 'pages', slug: data?.slug }) ?? '',
    },
    preview: (data) =>
      generatePreviewPath({ collection: 'pages', slug: data?.slug as string }) ?? '',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: HomeBlocks,
      admin: { initCollapsed: true },
    },
  ],
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageAfterDelete],
  },
}
