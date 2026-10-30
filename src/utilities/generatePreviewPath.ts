const collectionPrefixMap: Record<string, string> = {
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
}

export function generatePreviewPath({ collection, slug }: Props): string | null {
  if (!slug) return null

  // Keep nested routes such as `blogs/article-slug` as real path segments.
  // Encoding the slash produces `/blogs%2Farticle-slug`, which Next.js cannot
  // match against the `/blogs/[articleSlug]` route and causes a preview 404.
  const encodedSlug = slug.split('/').map((segment) => encodeURIComponent(segment)).join('/')
  const params = new URLSearchParams({
    path: `${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${params.toString()}`
}
