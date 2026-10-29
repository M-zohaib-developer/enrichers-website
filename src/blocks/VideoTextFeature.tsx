'use client'

import Image from 'next/image'
import { PlayCircle } from 'lucide-react'
import { useState } from 'react'
import { RichText } from '@/components/RichText'
import { imageAlt, imageSrc, type BlockData } from './shared'

export function VideoTextFeature({ data }: { data: BlockData }) {
  const thumbnail = imageSrc(data.thumbnail)
  const [isPlaying, setIsPlaying] = useState(false)
  const embedUrl = getEmbedUrl(data.videoUrl)

  return (
    <section id={data.sectionId || undefined} className="theme-surface py-(--section-y)">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          {data.eyebrow && <p className="inline-flex items-center gap-2 text-overline font-semibold tracking-overline text-text-muted uppercase"><span className="h-px w-6 bg-accent" aria-hidden="true" />{data.eyebrow}</p>}
          <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>
          <RichText data={data.body} className="mt-5 max-w-[62ch] text-body-lg text-text-secondary" />
        </div>

        {thumbnail && data.videoUrl && (
          <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-surface-sunken shadow-sm">
            {isPlaying && embedUrl ? (
              <iframe
                src={embedUrl}
                title={data.videoLabel || 'Watch project video'}
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button type="button" onClick={() => setIsPlaying(true)} className="group absolute inset-0 block w-full cursor-pointer overflow-hidden text-left outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action">
                <Image src={thumbnail} alt={imageAlt(data.thumbnail, data.thumbnailAlt || data.heading)} fill className="object-cover transition-transform duration-[500ms] ease-in-out group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none" sizes="(min-width: 1024px) 50vw, 100vw" />
                <span className="absolute inset-0 bg-surface-inverse/30 transition-opacity duration-[400ms] ease-in-out group-hover:bg-surface-inverse/45" aria-hidden="true" />
                <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true"><span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface text-action shadow-md transition-transform duration-[400ms] ease-in-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"><PlayCircle size={34} strokeWidth={1.5} /></span></span>
                <span className="sr-only">{data.videoLabel || 'Watch project video'}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function getEmbedUrl(value: unknown) {
  if (typeof value !== 'string' || !value) return null

  try {
    const url = new URL(value)
    const id = url.hostname.includes('youtu.be')
      ? url.pathname.slice(1)
      : url.searchParams.get('v') ?? url.pathname.split('/').filter(Boolean).pop()
    return id ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0` : null
  } catch {
    return null
  }
}
