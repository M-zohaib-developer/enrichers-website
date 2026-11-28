import type { CollectionConfig } from 'payload'

import { HomeBlocks } from '@/blocks/home'
import { revalidatePage, revalidatePageAfterDelete } from './hooks/revalidatePage'
import { pagesReviewGuard } from './hooks/pagesReviewGuard'
import { pagesReviewAfterChange } from './hooks/pagesReviewAfterChange'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { isAdmin, isAdminField } from '@/access/isAdmin'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'
import { pagesUpdateAccess } from '@/access/pagesUpdateAccess'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: authenticatedOrPublished,
    create: isAdminOrEditor,
    update: pagesUpdateAccess,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'reviewStatus', 'updatedAt'],
    components: {
      edit: {
        beforeDocumentControls: ['@/admin/components/ReviewControls#default'],
      },
    },
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
      admin: {
        initCollapsed: true,
        components: {
          Field: '@/fields/LayoutBlocksField#LayoutBlocksField',
        },
      },
    },
    // ─── Review workflow (sidebar) ─────────────────────────────────────────
    {
      name: 'reviewStatus',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending Approval', value: 'pending' },
        { label: 'Changes Requested', value: 'changes_requested' },
        { label: 'Approved', value: 'approved' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Draft = editor is still writing. Pending = waiting on admin. Changes Requested = admin returned it. Approved = admin published it.',
      },
      // Editors can read it; the hook enforces which transitions they may
      // write. Field-level `update` stays open because editors legitimately
      // need to flip draft→pending; the hook validates the value.
    },
    {
      name: 'reviewNote',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Admin fills this in when requesting changes. Shown to the editor on reopen.',
        condition: (_data, siblingData) =>
          siblingData?.reviewStatus === 'changes_requested' ||
          siblingData?.reviewStatus === 'pending',
      },
      access: {
        // Only admin can write a review note. Editors read it (they need to
        // see the admin's feedback), but cannot silently blank it out.
        update: isAdminField,
        create: isAdminField,
      },
    },
    {
      name: 'submittedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'submittedAt',
      type: 'date',
      admin: { position: 'sidebar', readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'reviewedAt',
      type: 'date',
      admin: { position: 'sidebar', readOnly: true, date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
  versions: {
    drafts: {
      autosave: { interval: 400 },
    },
    maxPerDoc: 20,
  },
  hooks: {
    beforeChange: [pagesReviewGuard],
    afterChange: [revalidatePage, pagesReviewAfterChange],
    afterDelete: [revalidatePageAfterDelete],
  },
}
