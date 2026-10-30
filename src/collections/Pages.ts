import type { CollectionConfig } from 'payload'

import { HomeBlocks } from '@/blocks/home'
import { revalidatePage, revalidatePageAfterDelete } from './hooks/revalidatePage'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Pages: CollectionConfig = {
  slug: 'pages',
  /**
   * Not `() => true`: with drafts on, a blanket read would serve unpublished
   * work to anyone hitting the public API. See the access helper.
   */
  access: { read: authenticatedOrPublished },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    /**
     * Both of these return null — never '' — when the document has no slug.
     *
     * An unsaved page has no public URL, so `generatePreviewPath` correctly
     * returns null. Coercing that to an empty string made Payload render an
     * enabled preview control pointing at nothing: the eye icon looked live,
     * but clicking it went nowhere. Payload's contract is that null/undefined
     * hides the control, which is the behaviour we actually want here.
     */
    livePreview: {
      url: ({ data }) => generatePreviewPath({ collection: 'pages', slug: data?.slug }),
    },
    preview: (data) =>
      generatePreviewPath({ collection: 'pages', slug: data?.slug as string }),
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
  /**
   * Drafts let an editor save work in progress and preview it before it goes
   * live — which is the point of the preview control.
   *
   * Two consequences worth knowing:
   *  - Payload adds a `_status` column and a parallel set of `_pages_v*`
   *    version tables, roughly doubling the page-block table count.
   *  - Every existing document needs `_status: 'published'`, or it drops out
   *    of public queries the moment this is switched on.
   */
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  hooks: {
    afterChange: [revalidatePage],
    afterDelete: [revalidatePageAfterDelete],
  },
}
