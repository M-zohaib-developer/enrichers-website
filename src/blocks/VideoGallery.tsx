import { Eyebrow, imageSrc, imageAlt, type BlockData, type MediaValue } from './shared'
import { VideoGalleryClient, type GalleryVideo, type GalleryPlaylist } from './VideoGalleryClient'
import {
  extractPlaylistId,
  extractVideoId,
  getYouTubeData,
  type YouTubeData,
} from '@/utilities/youtube'
import Image from 'next/image'

const CATEGORY_ORDER = ['PSX', 'PMEX', 'Market Updates', 'Educational Videos', 'Company Updates']

type ManualVideo = {
  youtubeUrl?: string
  customTitle?: string
  categories?: string[]
  customThumbnail?: MediaValue
}

type ManualPlaylist = {
  title?: string
  playlistUrl?: string
}

type LegacyPlaylist = {
  title?: string
  playlistId?: string
  videos?: Array<{ title?: string; videoUrl?: string; duration?: string; thumbnail?: MediaValue }>
}

function buildManualVideos(items: ManualVideo[]): GalleryVideo[] {
  const out: GalleryVideo[] = []
  const seen = new Set<string>()
  for (const v of items) {
    const id = extractVideoId(v.youtubeUrl)
    if (!id || seen.has(id)) continue
    seen.add(id)
    const uploaded = imageSrc(v.customThumbnail as MediaValue)
    out.push({
      id,
      title: v.customTitle || `Video ${id}`,
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: uploaded || `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
      thumbnailAlt: imageAlt(v.customThumbnail as MediaValue, v.customTitle || 'Video'),
      duration: undefined,
      categories: (v.categories || []).filter(Boolean),
      publishedAt: '',
    })
  }
  return out
}

function buildManualPlaylists(items: ManualPlaylist[]): GalleryPlaylist[] {
  const out: GalleryPlaylist[] = []
  const seen = new Set<string>()
  for (const p of items) {
    const id = extractPlaylistId(p.playlistUrl)
    if (!id || seen.has(id)) continue
    seen.add(id)
    out.push({
      id,
      title: p.title || 'Playlist',
      itemCount: 0,
      thumbnail: '',
      videoIds: [],
    })
  }
  return out
}

function buildFromApi(api: YouTubeData): { videos: GalleryVideo[]; playlists: GalleryPlaylist[] } {
  const videos: GalleryVideo[] = api.videos.map((v) => ({
    id: v.id,
    title: v.title,
    url: v.url,
    thumbnail: v.thumbnail,
    thumbnailAlt: v.title,
    duration: v.duration,
    categories: v.categories,
    publishedAt: v.publishedAt,
    playlistIds: v.playlistIds,
  }))
  const playlists: GalleryPlaylist[] = api.playlists.map((p) => ({
    id: p.id,
    title: p.title,
    itemCount: p.itemCount,
    thumbnail: p.thumbnail,
    videoIds: p.videoIds,
  }))
  return { videos, playlists }
}

function legacyFallback(playlists: LegacyPlaylist[], heading: string) {
  const first = playlists.find((p) => p.playlistId) || playlists[0]
  if (!first) return null
  if (first.playlistId) {
    return (
      <div className="mt-8 aspect-video w-full overflow-hidden rounded-sm bg-surface-inverse shadow-sm">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${first.playlistId}&rel=0`}
          title={first.title || heading}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }
  return null
}

export async function VideoGallery({ data }: { data: BlockData }) {
  const sourceMode = (data.sourceMode as string) || 'api'
  const manualVideos = (data.manualVideos ?? []) as ManualVideo[]
  const manualPlaylistsInput = (data.manualPlaylists ?? []) as ManualPlaylist[]
  const legacyPlaylists = (data.playlists ?? []) as LegacyPlaylist[]
  const categoryRules = (data.categoryRules ?? []) as Array<{ category?: string; keywords?: string }>

  let videos: GalleryVideo[] = []
  let playlists: GalleryPlaylist[] = []
  let apiError: string | undefined
  let apiTotal: number | undefined

  if (sourceMode === 'api') {
    const api = await getYouTubeData(categoryRules)
    if (api?.ok) {
      const built = buildFromApi(api)
      videos = built.videos
      playlists = built.playlists
      apiTotal = api.totalVideos
    } else if (api && !api.ok) {
      apiError = api.error
    }
  } else {
    videos = buildManualVideos(manualVideos)
  }

  // Pinned manual playlists apply in both modes
  const manualPls = buildManualPlaylists(manualPlaylistsInput)
  if (manualPls.length) {
    const seen = new Set(playlists.map((p) => p.id))
    for (const mp of manualPls) if (!seen.has(mp.id)) playlists.unshift(mp)
  }

  const logo = imageSrc(data.channelLogo as MediaValue, '/brand/enrichers-logo-enhanced.webp')
  const channelName = (data.channelName as string) || ''
  const channelStats =
    (data.channelStats as string) ||
    (sourceMode === 'api' && apiTotal ? `${apiTotal} videos on YouTube` : '')

  const hasContent = videos.length > 0

  return (
    <section id={data.sectionId || undefined} className="theme-surface py-(--section-y)">
      <div className="container-x">
        <div className="max-w-[760px]">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 className="font-display text-h2 mt-3 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          {data.body && <p className="text-body-lg mt-5 max-w-measure text-text-secondary">{data.body}</p>}
        </div>

        {channelName && (
          <div className="mt-8 flex items-center gap-4 rounded-sm border border-border bg-surface p-4 sm:p-5">
            <span className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-surface-sunken">
              <Image src={logo} alt={imageAlt(data.channelLogo as MediaValue, channelName)} fill className="object-contain p-1.5" sizes="56px" />
            </span>
            <div className="min-w-0">
              <p className="font-display text-h5 font-semibold text-text">{channelName}</p>
              {channelStats && <p className="text-body-sm text-text-muted">{channelStats}</p>}
            </div>
            {data.channelUrl && (
              <a
                href={data.channelUrl as string}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm bg-action px-4 text-button font-semibold text-on-action hover:bg-action-hover"
              >
                Visit channel
              </a>
            )}
          </div>
        )}

        {hasContent ? (
          <VideoGalleryClient
            videos={videos}
            playlists={playlists}
            categoryOrder={CATEGORY_ORDER}
          />
        ) : (
          <div className="mt-8">
            {legacyFallback(legacyPlaylists, data.heading as string) || (
              <p className="rounded-sm border border-dashed border-border bg-surface-sunken px-6 py-10 text-center text-body-sm text-text-muted">
                {apiError
                  ? `YouTube sync unavailable (${apiError}). Showing fallback.`
                  : sourceMode === 'manual'
                    ? 'Add videos in the admin to populate this gallery.'
                    : 'Enable YouTube sync in Settings → YouTube to populate this gallery.'}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
