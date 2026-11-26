import type { CollectionConfig } from 'payload'

/**
 * BlogArticles is a nav-only collection.
 *
 * It has no fields and creates no DB table beyond the bare minimum Payload
 * requires. Its only purpose is to show a "Blog Articles" entry inside the
 * "Content" sidebar group, directly below the Pages row.
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
    group: 'Content',
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
