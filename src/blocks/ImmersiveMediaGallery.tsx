'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { imageAlt, imageSrc, type BlockData } from './shared'

export function ImmersiveMediaGallery({ data }: { data: BlockData }) {
  const items = Array.isArray(data.items) ? data.items.filter((item) => imageSrc(item.image)) : []
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = items[activeIndex]
  const interval = Number(data.interval) || 5000

  useEffect(() => {
    if (!data.autoplay || items.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % items.length), interval)
    return () => window.clearInterval(timer)
  }, [data.autoplay, interval, items.length])

  if (!items.length) return null

  return (
    <section id={data.sectionId || undefined} className="theme-sunken py-(--section-y)">
      <div className="container-wide">
        {(data.eyebrow || data.heading || data.body) && <div className="max-w-[760px]">{data.eyebrow && <p className="inline-flex items-center gap-2 text-overline font-semibold tracking-overline text-text-muted uppercase"><span className="h-px w-6 bg-accent" aria-hidden="true" />{data.eyebrow}</p>}{data.heading && <h2 className="font-display text-h2 mt-3 text-text">{data.heading}</h2>}{data.body && <p className="text-body-lg mt-5 text-text-secondary">{data.body}</p>}</div>}

        <div className="mt-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-surface-inverse shadow-sm md:aspect-[2/1]">
            {items.map((item, index) => {
              const image = imageSrc(item.image)
              const isActive = index === activeIndex
              return <Image key={`${image}-${index}`} src={image} alt={isActive ? imageAlt(item.image, item.imageAlt || item.caption || 'Gallery image') : ''} fill priority={index === 0} className={`object-cover transition-[opacity,transform] duration-[700ms] ease-in-out motion-reduce:transition-none ${isActive ? 'z-10 scale-100 opacity-100' : 'z-0 scale-[1.035] opacity-0'}`} sizes="(min-width: 1024px) 90vw, 100vw" />
            })}
            {activeItem?.caption && <p className="absolute right-0 bottom-0 left-0 z-20 bg-surface-inverse/75 px-5 py-4 text-body-sm text-on-action md:px-7">{activeItem.caption}</p>}
            <p className="sr-only" aria-live="polite">Image {activeIndex + 1} of {items.length}{activeItem?.caption ? `: ${activeItem.caption}` : ''}</p>
          </div>

          <div className="mt-5 flex gap-3 overflow-x-auto pb-1" aria-label="Gallery images">
            {items.map((item, index) => {
              const image = imageSrc(item.image)
              const active = index === activeIndex
              return <button key={`${image}-${index}`} type="button" onClick={() => setActiveIndex(index)} aria-current={active ? 'true' : undefined} aria-label={`Show image ${index + 1}${item.caption ? `: ${item.caption}` : ''}`} className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-sm border outline-none transition-[border-color,opacity,transform] duration-[300ms] ease-in-out hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action motion-reduce:transition-none ${active ? 'border-accent opacity-100' : 'border-border opacity-60 hover:scale-[1.02]'}`}><Image src={image} alt="" fill className="object-cover" sizes="96px" /></button>
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
