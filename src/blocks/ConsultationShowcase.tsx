'use client'

import Image from 'next/image'
import type { Form as PayloadForm } from '@payloadcms/plugin-form-builder/types'
import { useEffect, useState } from 'react'
import { ConsultationForm } from './ConsultationQualifier'
import { imageAlt, imageSrc, type BlockData } from './shared'

export function ConsultationShowcase({ data }: { data: BlockData }) {
  const images = Array.isArray(data.images) ? data.images : []
  const [active, setActive] = useState(0)
  const interval = Math.max(2, Number(data.intervalSeconds) || 3) * 1000
  const form = data.form && typeof data.form === 'object' ? data.form as PayloadForm : null

  useEffect(() => {
    if (images.length < 2) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), interval)
    return () => window.clearInterval(timer)
  }, [images.length, interval])

  const image = images[active]
  const move = (direction: number) => {
    if (images.length < 2) return
    setActive((current) => (current + direction + images.length) % images.length)
  }
  return (
    <section id={data.sectionId || 'consultation'} aria-label="Free consultation" className="relative theme-sunken py-(--section-y)">
      <div className="container-x grid items-stretch gap-4 lg:grid-cols-12 lg:gap-6">
        <div className="flex min-h-[420px] lg:col-span-8">
          {image && imageSrc(image.image) && <div className="relative min-h-full flex-1 overflow-hidden rounded-sm bg-surface">
            <Image src={imageSrc(image.image)} alt={imageAlt(image.image, image.alt || data.heading)} fill className="object-cover transition-opacity duration-(--duration-normal)" sizes="(min-width: 1024px) 55vw, 100vw" />
            {images.length > 1 && <>
              <button type="button" onClick={() => move(-1)} aria-label="Previous consultation image" className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" aria-hidden="true"><path d="M15 5L8 12L15 19" /></svg>
              </button>
              <button type="button" onClick={() => move(1)} aria-label="Next consultation image" className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition-colors hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" aria-hidden="true"><path d="M9 5L16 12L9 19" /></svg>
              </button>
            </>}
          </div>}
        </div>
        <div className="flex lg:col-span-4"><div className="w-full rounded-sm border border-border bg-surface p-6 shadow-sm md:p-8">{form ? <ConsultationForm form={form} data={data} /> : <p className="text-body-sm text-text-secondary">Select a form in the block’s Form tab.</p>}</div></div>
      </div>
    </section>
  )
}
