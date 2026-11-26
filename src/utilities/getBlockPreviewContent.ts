import type { Page } from '@/payload-types'

import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

/** One real occurrence of a block type found on a published page. */
export type BlockInstance = {
  index: number
  pageSlug: string
  pageTitle: string
}

/** One row of a repeating block — a team member, a card, a step. */
export type BlockPreviewItem = {
  imageUrl?: string
  subtitle?: string
  title?: string
}

/** Only what a card draws. Deliberately not the whole block. */
export type BlockPreviewContent = {
  heading?: string
  imageUrl?: string
  items?: BlockPreviewItem[]
  subheading?: string
}

type LayoutBlock = Page['layout'][0]

/** Enough rows to fill a card; more would just inflate the response. */
const MAX_ITEMS = 6

const HEADING_KEYS = [
  'heading', 'leftHeading', 'rightHeading', 'quote',
  'formHeading', 'title', 'term',
]
const SUBHEADING_KEYS = [
  'subheading', 'body', 'intro', 'summary', 'description', 'subtext',
]
const IMAGE_KEYS = [
  'image', 'heroImage', 'portrait', 'thumbnail', 'featuredImage',
  'icon', 'media', 'photo', 'logo',
]
const ITEM_TITLE_KEYS = [
  'title', 'heading', 'cardHeading', 'name', 'label', 'value',
  'question', 'term', 'cardTitle',
]
const ITEM_SUBTITLE_KEYS = [
  'body', 'role', 'subtitle', 'description', 'answer', 'text',
  'caption', 'cardText', 'content', 'subheading',
]

const richTextToPlain = (value: unknown, depth = 0): string => {
  if (depth > 6 || !value || typeof value !== 'object') return ''
  const node = value as { children?: unknown[]; root?: unknown; text?: unknown }
  if (typeof node.text === 'string') return node.text
  if (node.root) return richTextToPlain(node.root, depth + 1)
  if (Array.isArray(node.children)) {
    return node.children
      .map((child) => richTextToPlain(child, depth + 1))
      .join(' ')
      .trim()
  }
  return ''
}

const asText = (value: unknown): string | undefined => {
  if (typeof value === 'string') return value.trim() || undefined
  const plain = richTextToPlain(value)
  return plain ? plain.slice(0, 120) : undefined
}

const pickImageUrl = (image: unknown): string | undefined => {
  if (!image || typeof image !== 'object') return undefined
  const media = image as {
    sizes?: Record<string, { url?: null | string } | undefined>
    url?: null | string
  }
  for (const size of ['thumbnail', 'square', 'small', 'medium']) {
    const url = media.sizes?.[size]?.url
    if (url) return url
  }
  return media.url ?? undefined
}

const firstMatch = (data: Record<string, unknown>, keys: string[]): unknown => {
  for (const key of keys) {
    if (data[key] != null) return data[key]
  }
  return undefined
}

const extractItems = (data: Record<string, unknown>): BlockPreviewItem[] | undefined => {
  let best: BlockPreviewItem[] | undefined
  let bestScore = 0

  for (const value of Object.values(data)) {
    if (!Array.isArray(value) || value.length === 0) continue

    const rows = value
      .filter((row): row is Record<string, unknown> => !!row && typeof row === 'object')
      .slice(0, MAX_ITEMS)
      .map((row) => ({
        imageUrl: pickImageUrl(firstMatch(row, IMAGE_KEYS)),
        subtitle: asText(firstMatch(row, ITEM_SUBTITLE_KEYS)),
        title: asText(firstMatch(row, ITEM_TITLE_KEYS)),
      }))
      .filter((item) => item.imageUrl || item.title || item.subtitle)

    if (!rows.length) continue

    const score = rows.reduce(
      (sum, item) =>
        sum + (item.imageUrl ? 3 : 0) + (item.title ? 2 : 0) + (item.subtitle ? 1 : 0),
      0,
    )

    if (score > bestScore) {
      best = rows
      bestScore = score
    }
  }

  return best
}

const extract = (block: LayoutBlock): BlockPreviewContent | null => {
  const data = block as unknown as Record<string, unknown>

  const content: BlockPreviewContent = {
    heading: asText(firstMatch(data, HEADING_KEYS)),
    imageUrl: pickImageUrl(firstMatch(data, IMAGE_KEYS)),
    items: extractItems(data),
    subheading: asText(firstMatch(data, SUBHEADING_KEYS)),
  }

  if (!content.heading && !content.imageUrl && !content.items && !content.subheading) {
    return null
  }
  return content
}

const read = async (): Promise<Record<string, BlockPreviewContent>> => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 3,
    draft: false,
    overrideAccess: false,
    pagination: false,
    sort: '-updatedAt',
    where: { _status: { equals: 'published' } },
  })

  const out: Record<string, BlockPreviewContent> = {}

  for (const page of docs) {
    for (const block of Array.isArray(page.layout) ? page.layout : []) {
      const slug = block?.blockType
      if (!slug || out[slug]) continue
      const content = extract(block)
      if (content) out[slug] = content
    }
  }

  return out
}

export const getBlockPreviewContent = unstable_cache(read, ['block-preview-content'], {
  revalidate: 60,
  tags: ['block-previews'],
})

/** Returns every occurrence of every block type found on published pages. */
const readInstances = async (): Promise<Record<string, BlockInstance[]>> => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 0,
    draft: false,
    overrideAccess: false,
    pagination: false,
    sort: '-updatedAt',
    where: { _status: { equals: 'published' } },
  })

  const out: Record<string, BlockInstance[]> = {}

  for (const page of docs) {
    const layout = Array.isArray(page.layout) ? page.layout : []
    layout.forEach((block, index) => {
      const type = block?.blockType
      if (!type) return
      if (!out[type]) out[type] = []
      out[type].push({
        index,
        pageSlug: page.slug,
        pageTitle: page.title,
      })
    })
  }

  return out
}

export const getBlockInstances = unstable_cache(readInstances, ['block-instances'], {
  revalidate: 60,
  tags: ['block-previews'],
})
