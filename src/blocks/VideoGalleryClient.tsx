'use client'

import { useEffect, useMemo, useState } from 'react'

export type GalleryVideo = {
  id: string
  title: string
  url: string
  thumbnail: string
  thumbnailAlt?: string
  duration?: string
  categories: string[]
  publishedAt: string
  playlistIds?: string[]
}

export type GalleryPlaylist = {
  id: string
  title: string
  itemCount: number
  thumbnail: string
  videoIds: string[]
}

const PAGE_SIZE = 12

function PlayIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function VideoGalleryClient({
  videos,
  playlists,
  categoryOrder,
}: {
  videos: GalleryVideo[]
  playlists: GalleryPlaylist[]
  categoryOrder: string[]
}) {
  // Deduplicate videos by id
  const uniqueVideos = useMemo(() => {
    const seen = new Set<string>()
    const out: GalleryVideo[] = []
    for (const v of videos) if (!seen.has(v.id)) { seen.add(v.id); out.push(v) }
    return out
  }, [videos])

  // Build tabs
  const nonEmptyCategories = useMemo(() => {
    const counts = new Map<string, number>()
    for (const v of uniqueVideos) {
      for (const c of v.categories || []) counts.set(c, (counts.get(c) || 0) + 1)
    }
    return categoryOrder.filter((c) => (counts.get(c) || 0) > 0)
  }, [uniqueVideos, categoryOrder])

  type TabKey = 'all' | 'playlists' | string
  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: 'all', label: 'All Videos' },
    ...(playlists.length ? [{ key: 'playlists' as TabKey, label: 'Playlists' }] : []),
    ...nonEmptyCategories.map((c) => ({ key: c, label: c })),
  ]

  const [tab, setTab] = useState<TabKey>('all')
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [activePlaylist, setActivePlaylist] = useState<string | null>(null)
  const [open, setOpen] = useState<GalleryVideo | null>(null)

  useEffect(() => {
    setVisible(PAGE_SIZE)
    if (tab !== 'playlists') setActivePlaylist(null)
  }, [tab])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const filteredVideos = useMemo(() => {
    if (tab === 'all') return uniqueVideos
    if (tab === 'playlists') {
      if (!activePlaylist) return []
      const pl = playlists.find((p) => p.id === activePlaylist)
      if (!pl) return []
      const ids = new Set(pl.videoIds)
      const ordered: GalleryVideo[] = []
      for (const id of pl.videoIds) {
        const v = uniqueVideos.find((x) => x.id === id)
        if (v) ordered.push(v)
      }
      // Any video not in the loaded list but in the playlist, still show by using a minimal shim.
      for (const id of pl.videoIds) {
        if (!uniqueVideos.find((v) => v.id === id) && ids.has(id)) {
          ordered.push({
            id,
            title: `Video ${id}`,
            url: `https://www.youtube.com/watch?v=${id}`,
            thumbnail: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
            categories: [],
            publishedAt: '',
          })
        }
      }
      return ordered
    }
    return uniqueVideos.filter((v) => (v.categories || []).includes(tab))
  }, [tab, activePlaylist, uniqueVideos, playlists])

  const shown = filteredVideos.slice(0, visible)
  const canLoadMore = filteredVideos.length > visible

  const playing = open ? `https://www.youtube-nocookie.com/embed/${open.id}?autoplay=1&rel=0` : null

  return (
    <>
      {/* Tabs */}
      <div role="tablist" aria-label="Video categories" className="mt-8 flex flex-wrap gap-2 border-b border-border overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`relative -mb-px shrink-0 whitespace-nowrap px-4 py-3 text-[15px] font-semibold transition-colors ${
              tab === t.key
                ? 'text-text after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-accent'
                : 'text-text-muted hover:text-text'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Playlists tab (no active playlist) */}
      {tab === 'playlists' && !activePlaylist ? (
        <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {playlists.map((pl) => (
            <li key={pl.id}>
              <button
                type="button"
                onClick={() => setActivePlaylist(pl.id)}
                className="group block w-full text-left"
                aria-label={`Open playlist: ${pl.title}`}
              >
                <span className="relative block aspect-video overflow-hidden rounded-sm bg-surface-sunken">
                  {pl.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={pl.thumbnail} alt={pl.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-(--duration-deliberate) group-hover:scale-[1.03]" loading="lazy" />
                  ) : (
                    <span className="absolute inset-0 grid place-items-center text-text-muted"><PlayIcon size={40} /></span>
                  )}
                  <span aria-hidden="true" className="absolute inset-0 bg-overlay/0 transition-colors group-hover:bg-overlay/25" />
                  {pl.itemCount > 0 && (
                    <span className="text-caption absolute right-2 bottom-2 rounded-xs bg-surface-inverse/80 px-1.5 py-0.5 font-semibold text-text-inverse">
                      {pl.itemCount} videos
                    </span>
                  )}
                </span>
                <span className="mt-3 block font-display text-h5 font-semibold text-text underline-offset-4 group-hover:underline">{pl.title}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <>
          {tab === 'playlists' && activePlaylist && (
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActivePlaylist(null)}
                className="inline-flex min-h-10 items-center gap-2 rounded-sm border border-border px-3 text-body-sm font-semibold text-text hover:bg-surface-sunken"
              >
                ← All playlists
              </button>
              <span className="text-body-sm text-text-muted">
                {playlists.find((p) => p.id === activePlaylist)?.title}
              </span>
            </div>
          )}

          {shown.length === 0 ? (
            <p className="mt-10 rounded-sm border border-dashed border-border bg-surface-sunken px-6 py-10 text-center text-body-sm text-text-muted">
              No videos in this view yet.
            </p>
          ) : (
            <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((v) => (
                <li key={v.id}>
                  <button
                    type="button"
                    onClick={() => setOpen(v)}
                    className="group block w-full text-left"
                    aria-label={`Play video: ${v.title}`}
                  >
                    <span className="relative block aspect-video overflow-hidden rounded-sm bg-surface-sunken">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={v.thumbnail}
                        alt={v.thumbnailAlt || v.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-(--duration-deliberate) group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                      <span aria-hidden="true" className="absolute inset-0 bg-overlay/0 transition-colors group-hover:bg-overlay/25" />
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid h-14 w-14 place-items-center rounded-full bg-chrome-cta text-chrome-on-cta shadow-md transition-transform group-hover:scale-110"><PlayIcon /></span>
                      </span>
                      {v.duration && (
                        <span className="text-caption absolute right-2 bottom-2 rounded-xs bg-surface-inverse/80 px-1.5 py-0.5 font-semibold text-text-inverse">
                          {v.duration}
                        </span>
                      )}
                    </span>
                    <span className="mt-3 block font-display text-h5 font-semibold text-text underline-offset-4 group-hover:underline line-clamp-2">
                      {v.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {canLoadMore && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((n) => n + PAGE_SIZE)}
                className="inline-flex min-h-11 items-center gap-2 rounded-sm bg-action px-5 text-button font-semibold text-on-action hover:bg-action-hover"
              >
                Load more ({filteredVideos.length - visible} remaining)
              </button>
            </div>
          )}
        </>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-[90] grid place-items-center bg-overlay/80 p-4"
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close video"
              className="absolute -top-11 right-0 grid h-9 w-9 place-items-center rounded-sm text-text-inverse hover:bg-chrome-ghost"
            >
              <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" />
              </svg>
            </button>
            <div className="aspect-video overflow-hidden rounded-sm bg-surface-inverse shadow-md">
              {playing ? (
                <iframe
                  src={playing}
                  title={open.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : null}
            </div>
            <div className="mt-3 flex items-center justify-between gap-4 text-text-inverse">
              <p className="text-body-sm font-semibold line-clamp-1">{open.title}</p>
              <a
                href={open.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-body-sm underline underline-offset-4"
              >
                Open on YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
