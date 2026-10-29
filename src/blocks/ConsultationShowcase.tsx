'use client'

import Image from 'next/image'
import type { Form as PayloadForm } from '@payloadcms/plugin-form-builder/types'
import type React from 'react'
import { useEffect, useState } from 'react'
import { ConsultationForm } from './ConsultationQualifier'
import { Eyebrow, imageAlt, imageSrc, type BlockData } from './shared'

function Icon({ children, size = 20 }: { children: React.ReactNode; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" aria-hidden="true">{children}</svg>
}

/**
 * Consultation section: a single panel holding the image carousel and the
 * multi-step form, so the two read as one composition instead of two cards
 * floating apart. The heading/contact fields the schema has always defined are
 * rendered here — before this they were seeded but never shown.
 */
export function ConsultationShowcase({ data }: { data: BlockData }) {
  const images = Array.isArray(data.images) ? data.images : []
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const interval = Math.max(2, Number(data.intervalSeconds) || 3) * 1000
  const form = data.form && typeof data.form === 'object' ? (data.form as PayloadForm) : null

  // Pausing on hover/focus keeps the image from swapping while someone is
  // reading a caption or tabbing through the carousel controls.
  useEffect(() => {
    if (images.length < 2 || paused) return
    const timer = window.setInterval(() => setActive((current) => (current + 1) % images.length), interval)
    return () => window.clearInterval(timer)
  }, [images.length, interval, paused])

  const image = images[active]
  const move = (direction: number) => {
    if (images.length < 2) return
    setActive((current) => (current + direction + images.length) % images.length)
  }

  const arrow = 'absolute top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-overlay/45 text-white backdrop-blur-sm transition-colors duration-(--duration-normal) hover:bg-overlay/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

  return (
    <section id={data.sectionId || 'consultation'} aria-labelledby="consultation-h" className="theme-sunken py-(--section-y)">
      <div className="container-x">
        <div className="max-w-measure">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <h2 id="consultation-h" className="font-display text-h2 mt-3 tracking-heading text-text">
            {data.heading || 'Get free consultation today'}
          </h2>
          {data.subheading && <p className="text-body-lg mt-4 text-text-secondary">{data.subheading}</p>}
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-border bg-surface shadow-lg lg:grid lg:grid-cols-12">
          <div
            className="relative min-h-[280px] bg-surface-sunken sm:min-h-[360px] lg:col-span-7 lg:min-h-[580px]"
            role="group"
            aria-roledescription="carousel"
            aria-label={data.heading || 'Consultation images'}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            {image && imageSrc(image.image) && (
              <Image
                key={active}
                src={imageSrc(image.image)}
                alt={imageAlt(image.image, image.alt || data.heading)}
                fill
                priority={active === 0}
                className="object-cover"
                sizes="(min-width: 1024px) 58vw, 100vw"
              />
            )}

            {image?.caption && (
              <>
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-overlay/85 to-transparent" />
                <p className="absolute inset-x-5 bottom-16 max-w-[34ch] text-body-lg font-semibold text-white sm:inset-x-7 sm:bottom-7 sm:pr-28">
                  {image.caption}
                </p>
              </>
            )}

            {images.length > 1 && (
              <>
                <button type="button" onClick={() => move(-1)} aria-label="Previous image" className={`${arrow} left-4`}>
                  <Icon size={22}><path d="M15 5L8 12L15 19" /></Icon>
                </button>
                <button type="button" onClick={() => move(1)} aria-label="Next image" className={`${arrow} right-4`}>
                  <Icon size={22}><path d="M9 5L16 12L9 19" /></Icon>
                </button>
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-overlay/45 px-3 py-2 backdrop-blur-sm sm:left-auto sm:right-5 sm:translate-x-0">
                  {images.map((item: any, index: number) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActive(index)}
                      aria-label={`Show image ${index + 1} of ${images.length}`}
                      aria-current={index === active}
                      className={`h-2 rounded-full transition-all duration-(--duration-normal) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${index === active ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="border-t border-border p-6 sm:p-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:p-10">
            {form ? (
              <ConsultationForm form={form} data={data} />
            ) : (
              <p className="text-body-sm text-text-secondary">Select a form in the block&rsquo;s Form tab.</p>
            )}
          </div>
        </div>

        {(data.phone || data.whatsappLabel || data.hours) && (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.phone && (
              <li>
                <a href={data.phoneHref} className="flex h-full items-center gap-3 rounded-md border border-border bg-surface px-4 py-3.5 transition-colors duration-(--duration-normal) hover:border-action">
                  <Icon><path d="M5 4H9L10.5 8.5L8 10C9 12.5 11.5 15 14 16L15.5 13.5L20 15V19C20 19.6 19.6 20 19 20C11 20 4 13 4 5C4 4.4 4.4 4 5 4Z" /></Icon>
                  <span className="text-body-sm font-semibold text-text">{data.phone}</span>
                </a>
              </li>
            )}
            {data.whatsappLabel && (
              <li>
                <a href={data.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex h-full items-center gap-3 rounded-md border border-border bg-surface px-4 py-3.5 transition-colors duration-(--duration-normal) hover:border-action">
                  <Icon><path d="M4 5H20V16H10L5 20V16H4Z" /><path d="M8 10H16M8 13H13" /></Icon>
                  <span className="text-body-sm font-semibold text-text">{data.whatsappLabel}</span>
                </a>
              </li>
            )}
            {data.hours && (
              <li className="flex h-full items-center gap-3 rounded-md border border-border-subtle px-4 py-3.5 sm:col-span-2 lg:col-span-1">
                <Icon><circle cx="12" cy="12" r="8.5" /><path d="M12 7V12L15.5 14" /></Icon>
                <span className="text-caption text-text-secondary">{data.hours}</span>
              </li>
            )}
          </ul>
        )}
      </div>
    </section>
  )
}
