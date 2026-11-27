import type { CollectionConfig } from 'payload'

/**
 * BlogArticles is a nav-only collection.
 *
 * It has no fields and creates no DB table beyond the bare minimum Payload
 * requires. Its only purpose is to show a "Blog Articles" entry in the default
 * "Collections" sidebar group, directly below Pages. Both Pages and this
 * collection have no `admin.group`, so the "Content" group no longer exists;
 * order within "Collections" follows the `collections: []` array in
 * payload.config.ts ([Pages, BlogArticles, Users, Media]).
 *
 * The List view redirects to /admin/collections/pages filtered to blogs/
 * slugs. All actual blog documents live in the Pages collection.
 */
export const BlogArticles: CollectionConfig = {
  slug: 'blog-articles',
  labels: {
    singular: 'Blog Article',
    plural: 'Blog Articles',
  },
  admin: {
    hidden: () => false,
    components: {
      views: {
        list: {
          Component: '@/components/admin/BlogArticlesList#default',
        },
      },
    },
  },
  access: {
    read: () => true,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [],
}
