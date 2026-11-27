import 'server-only'

import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

import config from '@/payload.config'

export type YouTubeVideo = {
  id: string
  title: string
  description: string
  publishedAt: string
  thumbnail: string
  url: string
  duration?: string
  categories: string[]
  playlistIds: string[]
}

export type YouTubePlaylist = {
  id: string
  title: string
  description: string
  itemCount: number
  thumbnail: string
  videoIds: string[]
}

export type YouTubeData = {
  ok: boolean
  error?: string
  channelId?: string
  channelTitle?: string
  totalVideos: number
  videos: YouTubeVideo[]
  playlists: YouTubePlaylist[]
  fetchedAt: string
}

type Settings = {
  youtubeEnabled?: boolean
  youtubeApiKey?: string
  youtubeChannelId?: string
  youtubeCacheMinutes?: number
}

/** Read settings on the server with overrideAccess so the admin-only API key is visible. */
async function getYouTubeSettings(): Promise<Settings> {
  const cfg = await config
  const payload = await getPayload({ config: cfg })
  const settings = (await payload.findGlobal({
    slug: 'site-settings',
    overrideAccess: true,
    depth: 0,
  })) as any
  return {
    youtubeEnabled: Boolean(settings?.youtubeEnabled),
    youtubeApiKey: settings?.youtubeApiKey || '',
    youtubeChannelId: settings?.youtubeChannelId || '',
    youtubeCacheMinutes: Number(settings?.youtubeCacheMinutes) || 1440,
  }
}

/** ISO 8601 PT1H2M3S → "1:02:03" / "2:03" */
export function formatDuration(iso?: string): string | undefined {
  if (!iso) return undefined
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(iso)
  if (!m) return undefined
  const h = Number(m[1] || 0)
  const mi = Number(m[2] || 0)
  const s = Number(m[3] || 0)
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(mi)}:${pad(s)}` : `${mi}:${pad(s)}`
}

/** Extract a video ID from any common YouTube URL shape. */
export function extractVideoId(url?: string | null): string | null {
  if (!url) return null
  const trimmed = url.trim()
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed
  try {
    const u = new URL(trimmed)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1).split('/')[0] || null
    if (u.hostname.includes('youtube')) {
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2] || null
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2] || null
      if (u.pathname.startsWith('/watch')) return u.searchParams.get('v')
      if (u.pathname.startsWith('/v/')) return u.pathname.split('/')[2] || null
    }
  } catch {
    /* not a URL */
  }
  return null
}

/** Extract a playlist ID from any playlist URL shape. */
export function extractPlaylistId(url?: string | null): string | null {
  if (!url) return null
  const trimmed = url.trim()
  if (/^[A-Za-z0-9_-]{13,}$/.test(trimmed)) return trimmed
  try {
    const u = new URL(trimmed)
    return u.searchParams.get('list')
  } catch {
    return null
  }
}

async function ytFetch<T = any>(path: string, params: Record<string, string>, apiKey: string): Promise<T> {
  const qs = new URLSearchParams({ ...params, key: apiKey }).toString()
  const res = await fetch(`https://www.googleapis.com/youtube/v3/${path}?${qs}`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    let reason = `HTTP ${res.status}`
    try {
      const body = await res.json()
      reason = body?.error?.errors?.[0]?.reason || body?.error?.message || reason
    } catch {}
    throw new Error(reason)
  }
  return res.json() as Promise<T>
}

function buildCategoryMatchers(rules: Array<{ category?: string; keywords?: string }>) {
  return rules
    .map((r) => {
      const category = (r.category || '').trim()
      const kw = (r.keywords || '')
        .split(',')
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
      return category && kw.length ? { category, keywords: kw } : null
    })
    .filter(Boolean) as Array<{ category: string; keywords: string[] }>
}

export function categoriseVideo(
  video: { title: string; description: string },
  matchers: Array<{ category: string; keywords: string[] }>,
): string[] {
  const hay = `${video.title}\n${video.description}`.toLowerCase()
  const hits = new Set<string>()
  for (const m of matchers) {
    if (m.keywords.some((k) => hay.includes(k))) hits.add(m.category)
  }
  return Array.from(hits)
}

/** Verify an arbitrary key + channelId pair — used by the admin "Test Connection" button. */
export async function verifyChannel(apiKey: string, channelId: string) {
  const ch = await ytFetch<any>(
    'channels',
    { part: 'snippet,statistics,contentDetails', id: channelId },
    apiKey,
  )
  const item = ch?.items?.[0]
  if (!item) throw new Error('channelNotFound')
  const uploadsPlaylist = item?.contentDetails?.relatedPlaylists?.uploads
  let playlistCount = 0
  try {
    const pl = await ytFetch<any>('playlists', { part: 'id', channelId, maxResults: '50' }, apiKey)
    playlistCount = pl?.pageInfo?.totalResults ?? pl?.items?.length ?? 0
  } catch {}
  return {
    channelTitle: item.snippet?.title as string,
    videoCount: Number(item.statistics?.videoCount) || 0,
    playlistCount,
    uploadsPlaylist,
  }
}

async function fetchUploads(uploadsPlaylist: string, apiKey: string): Promise<any[]> {
  const items: any[] = []
  let pageToken: string | undefined
  let safety = 0
  do {
    const res = await ytFetch<any>(
      'playlistItems',
      {
        part: 'snippet,contentDetails',
        playlistId: uploadsPlaylist,
        maxResults: '50',
        ...(pageToken ? { pageToken } : {}),
      },
      apiKey,
    )
    items.push(...(res.items || []))
    pageToken = res.nextPageToken
    safety++
    if (safety > 200) break
  } while (pageToken)
  return items
}

async function fetchVideoDetails(videoIds: string[], apiKey: string) {
  const out = new Map<string, { duration?: string }>()
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50)
    const res = await ytFetch<any>(
      'videos',
      { part: 'contentDetails', id: batch.join(',') },
      apiKey,
    )
    for (const it of res.items || []) {
      out.set(it.id, { duration: it.contentDetails?.duration })
    }
  }
  return out
}

async function fetchChannelPlaylists(channelId: string, apiKey: string): Promise<any[]> {
  const items: any[] = []
  let pageToken: string | undefined
  let safety = 0
  do {
    const res = await ytFetch<any>(
      'playlists',
      {
        part: 'snippet,contentDetails',
        channelId,
        maxResults: '50',
        ...(pageToken ? { pageToken } : {}),
      },
      apiKey,
    )
    items.push(...(res.items || []))
    pageToken = res.nextPageToken
    safety++
    if (safety > 20) break
  } while (pageToken)
  return items
}

async function fetchPlaylistItemIds(playlistId: string, apiKey: string): Promise<string[]> {
  const ids: string[] = []
  let pageToken: string | undefined
  let safety = 0
  do {
    const res = await ytFetch<any>(
      'playlistItems',
      {
        part: 'contentDetails',
        playlistId,
        maxResults: '50',
        ...(pageToken ? { pageToken } : {}),
      },
      apiKey,
    )
    for (const it of res.items || []) {
      if (it.contentDetails?.videoId) ids.push(it.contentDetails.videoId)
    }
    pageToken = res.nextPageToken
    safety++
    if (safety > 200) break
  } while (pageToken)
  return ids
}

export async function syncChannel(
  opts: {
    channelId: string
    apiKey: string
    categoryRules?: Array<{ category?: string; keywords?: string }>
  },
): Promise<YouTubeData> {
  const { channelId, apiKey } = opts
  const fetchedAt = new Date(0).toISOString() // overwritten below; keep deterministic for caching
  try {
    const info = await verifyChannel(apiKey, channelId)
    if (!info.uploadsPlaylist) throw new Error('uploadsPlaylistMissing')

    const uploadItems = await fetchUploads(info.uploadsPlaylist, apiKey)
    const videoIds = Array.from(new Set(uploadItems.map((i) => i.contentDetails?.videoId).filter(Boolean)))
    const details = await fetchVideoDetails(videoIds, apiKey)

    const matchers = buildCategoryMatchers(opts.categoryRules || [])

    const videos: YouTubeVideo[] = []
    const seen = new Set<string>()
    for (const it of uploadItems) {
      const id: string | undefined = it.contentDetails?.videoId
      if (!id || seen.has(id)) continue
      seen.add(id)
      const sn = it.snippet || {}
      const title = sn.title || ''
      const description = sn.description || ''
      const thumb =
        sn.thumbnails?.maxres?.url ||
        sn.thumbnails?.standard?.url ||
        sn.thumbnails?.high?.url ||
        sn.thumbnails?.medium?.url ||
        `https://img.youtube.com/vi/${id}/hqdefault.jpg`
      videos.push({
        id,
        title,
        description,
        publishedAt: sn.publishedAt || '',
        thumbnail: thumb,
        url: `https://www.youtube.com/watch?v=${id}`,
        duration: formatDuration(details.get(id)?.duration),
        categories: categoriseVideo({ title, description }, matchers),
        playlistIds: [],
      })
    }
    videos.sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))

    const rawPlaylists = await fetchChannelPlaylists(channelId, apiKey)
    const playlists: YouTubePlaylist[] = []
    for (const p of rawPlaylists) {
      const pid = p.id as string
      let ids: string[] = []
      try {
        ids = await fetchPlaylistItemIds(pid, apiKey)
      } catch {}
      for (const vid of ids) {
        const v = videos.find((x) => x.id === vid)
        if (v && !v.playlistIds.includes(pid)) v.playlistIds.push(pid)
      }
      const sn = p.snippet || {}
      const thumb =
        sn.thumbnails?.high?.url ||
        sn.thumbnails?.medium?.url ||
        sn.thumbnails?.default?.url ||
        (ids[0] ? `https://img.youtube.com/vi/${ids[0]}/hqdefault.jpg` : '')
      playlists.push({
        id: pid,
        title: sn.title || 'Playlist',
        description: sn.description || '',
        itemCount: Number(p.contentDetails?.itemCount) || ids.length,
        thumbnail: thumb,
        videoIds: ids,
      })
    }

    return {
      ok: true,
      channelId,
      channelTitle: info.channelTitle,
      totalVideos: info.videoCount || videos.length,
      videos,
      playlists,
      fetchedAt,
    }
  } catch (err: any) {
    return {
      ok: false,
      error: String(err?.message || err),
      channelId,
      totalVideos: 0,
      videos: [],
      playlists: [],
      fetchedAt,
    }
  }
}

/** Public, cached entry point used by the server component. */
export async function getYouTubeData(
  categoryRules?: Array<{ category?: string; keywords?: string }>,
): Promise<YouTubeData | null> {
  const s = await getYouTubeSettings()
  if (!s.youtubeEnabled || !s.youtubeApiKey || !s.youtubeChannelId) return null

  const revalidate = Math.max(60, (s.youtubeCacheMinutes || 1440) * 60)
  const cached = unstable_cache(
    async () =>
      syncChannel({
        channelId: s.youtubeChannelId!,
        apiKey: s.youtubeApiKey!,
        categoryRules,
      }),
    ['youtube', s.youtubeChannelId!, JSON.stringify(categoryRules || [])],
    { tags: ['youtube'], revalidate },
  )
  return cached()
}
