import type { Block, Field } from 'payload'

import { Pages } from '@/collections/Pages'

import { BlocksOverviewClient } from './Client'

/** Walks the Pages field tree to find the layout blocks array. */
const findLayoutBlocks = (fields: Field[]): Block[] => {
  for (const field of fields) {
    if (field.type === 'blocks' && field.name === 'layout') {
      return field.blocks as Block[]
    }
    if (field.type === 'tabs') {
      for (const tab of field.tabs) {
        const found = findLayoutBlocks(tab.fields)
        if (found.length) return found
      }
    }
    if ('fields' in field && Array.isArray(field.fields)) {
      const found = findLayoutBlocks(field.fields)
      if (found.length) return found
    }
  }
  return []
}

const humanise = (slug: string): string =>
  slug.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, (c) => c.toUpperCase())

const BlocksOverview = async () => {
  const blocks = findLayoutBlocks(Pages.fields)

  const items = blocks
    .map((block) => {
      const singular = block.labels?.singular
      return {
        label: typeof singular === 'string' ? singular : humanise(block.slug),
        slug: block.slug,
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label))

  if (!items.length) return null

  return <BlocksOverviewClient items={items} />
}

export default BlocksOverview
