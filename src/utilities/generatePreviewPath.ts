const collectionPrefixMap: Record<string, string> = {
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
}

export function generatePreviewPath({ collection, slug }: Props): string | null {
  if (!slug) return null

  const encodedSlug = encodeURIComponent(slug)
  const params = new URLSearchParams({
    path: `${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${params.toString()}`
}
