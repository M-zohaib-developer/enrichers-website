/**
 * Populate the /video-gallery/ page's Video Gallery block in Manual mode with
 * real videos + playlists scraped from the @enrichersinvestmentgroup YouTube
 * channel. Reads scripts/yt-videos.json and scripts/yt-playlists.json.
 *
 * Usage: npx tsx scripts/seed-video-gallery-manual.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import fs from 'fs'
import path from 'path'

type RawVideo = { id: string; title: string }
type RawPlaylist = { id: string; title: string; items: number; first?: string }

// Mirror the DEFAULT_CATEGORY_RULES from the block schema.
const RULES: Array<{ category: string; keywords: string[] }> = [
  { category: 'PSX', keywords: ['psx', 'pakistan stock', 'kse', 'kse-100', 'kse100', 'stock exchange', 'equity', 'equities', 'stocks'] },
  { category: 'PMEX', keywords: ['pmex', 'commodity', 'commodities', 'gold', 'silver', 'crude', 'oil', 'futures', 'currency', 'forex', ' fx '] },
  { category: 'Market Updates', keywords: ['market update', 'market analysis', 'daily analytics', 'weekly', 'closing', 'pre-market', 'market behind markets', 'market review', 'market storm'] },
  { category: 'Educational Videos', keywords: ['learn', 'basics', 'how to', 'beginner', 'tutorial', 'explain', 'explained', 'guide', 'lesson', 'education', 'understanding', 'what really moves', 'how to start'] },
  { category: 'Company Updates', keywords: ['enrichers', 'ceo', 'chairman', 'founder', 'interview', 'milestone', 'anniversary', 'announcement', 'decade of enrichers', 'signing ceremony', 'event highlights', 'conference', 'mou'] },
]

function categorise(title: string): string[] {
  const hay = title.toLowerCase()
  const hits = new Set<string>()
  for (const r of RULES) {
    if (r.keywords.some((k) => hay.includes(k))) hits.add(r.category)
  }
  // Always tag "Enrichers" branded content as Company Updates for safety.
  if (hay.includes('enrichers') || hay.includes('eig ') || hay.includes('eig.')) hits.add('Company Updates')
  return Array.from(hits)
}

async function run() {
  const cfg = await config
  const payload = await getPayload({ config: cfg })

  const videos = JSON.parse(fs.readFileSync(path.resolve('scripts/yt-videos.json'), 'utf8')) as RawVideo[]
  const playlists = JSON.parse(fs.readFileSync(path.resolve('scripts/yt-playlists.json'), 'utf8')) as RawPlaylist[]

  const manualVideos = videos
    .filter((v) => v.id && v.title)
    // Clean JSON-escaped unicode in titles
    .map((v) => ({ ...v, title: JSON.parse(`"${v.title.replace(/"/g, '\\"')}"`) }))
    .map((v) => ({
      youtubeUrl: `https://www.youtube.com/watch?v=${v.id}`,
      customTitle: v.title,
      categories: categorise(v.title),
    }))

  const manualPlaylists = playlists.map((p) => ({
    title: p.title.replace(/^Enrichers Investment Group - /, ''),
    playlistUrl: `https://www.youtube.com/playlist?list=${p.id}`,
  }))

  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'video-gallery' } },
    limit: 1,
    overrideAccess: true,
  })

  const doc = page.docs[0] as any
  if (!doc) {
    console.error('No /video-gallery/ page found. Create it first via the main seed.')
    process.exit(1)
  }

  const layout = (doc.layout || []) as any[]
  let touched = 0
  for (const block of layout) {
    if (block.blockType === 'videoGallery') {
      block.heading = 'Enrichers Video Library'
      block.eyebrow = 'Knowledge Hub'
      block.body = 'Every video from the Enrichers Investment Group YouTube channel — organised by topic.'
      block.sourceMode = 'manual'
      block.manualVideos = manualVideos
      block.manualPlaylists = manualPlaylists
      block.channelName = 'Enrichers Investment Group'
      block.channelUrl = 'https://www.youtube.com/@enrichersinvestmentgroup'
      block.channelStats = `${videos.length} videos`
      // Clear the legacy playlists array so it does not flash the fallback
      block.playlists = []
      touched++
    }
  }

  await payload.update({
    collection: 'pages',
    id: doc.id,
    data: { layout } as any,
    overrideAccess: true,
    draft: false,
    context: { skipRevalidate: true },
  })

  console.log('Updated page id:', doc.id)
  console.log('videoGallery blocks touched:', touched)
  console.log('manualVideos written:', manualVideos.length)
  console.log('manualPlaylists written:', manualPlaylists.length)
  const catCounts: Record<string, number> = {}
  for (const v of manualVideos) for (const c of v.categories) catCounts[c] = (catCounts[c] || 0) + 1
  console.log('category counts:', catCounts)

  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
