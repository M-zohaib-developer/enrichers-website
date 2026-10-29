'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { DocumentIcon, ExternalLinkIcon } from '@/components/Icon'
import { Eyebrow, imageAlt, imageSrc, type BlockData } from './shared'

type Note = {
  category?: string | null
  date?: string | null
  title?: string | null
  summary?: string | null
  image?: any
  file?: { url?: string | null } | number | string | null
  url?: string | null
}

export function ResearchLibrary({ data }: { data: BlockData }) {
  const notes = (data.notes ?? []) as Note[]
  const categories = useMemo(() => ['All', ...Array.from(new Set(notes.map((note) => note.category).filter((category): category is string => Boolean(category))))], [notes])
  const [activeCategory, setActiveCategory] = useState('All')
  const [visibleCount, setVisibleCount] = useState(8)
  const filteredNotes = activeCategory === 'All' ? notes : notes.filter((note) => note.category === activeCategory)
  const visibleNotes = filteredNotes.slice(0, visibleCount)
  const remainingCount = Math.max(filteredNotes.length - visibleNotes.length, 0)

  return (
    <section id={data.sectionId || 'notes'} aria-labelledby={`${data.sectionId || 'notes'}-h`} className="theme-sunken py-[var(--section-y)]">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            <h2 id={`${data.sectionId || 'notes'}-h`} className="font-display mt-4 text-h2 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          </div>
          <p className="text-body-sm text-text-secondary">{visibleNotes.length} notes shown</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" aria-label="Filter research by topic">
            {categories.map((category) => (
              <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setVisibleCount(8) }} className={`rounded-full border px-4 py-2 text-button font-semibold transition-colors ${activeCategory === category ? 'border-action bg-action text-on-action' : 'border-border-strong bg-surface text-text-secondary hover:border-action hover:text-action'}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {visibleNotes.map((note, index) => {
            const file = note.file && typeof note.file === 'object' ? note.file : null
            const href = file?.url || note.url || '#'
            return (
              <a key={`${note.title || 'note'}-${index}`} href={href} target="_blank" rel="noopener noreferrer" className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface">
                  {imageSrc(note.image) ? <Image src={imageSrc(note.image)} alt={imageAlt(note.image, note.title || 'Research note')} fill className="object-cover transition-transform duration-(--duration-deliberate) group-hover:scale-[1.03]" sizes="(min-width: 1024px) 33vw, 92vw" /> : <div className="flex h-full items-center justify-center bg-surface-sunken text-action"><DocumentIcon size={42} /></div>}
                </div>
                <p className="text-caption mt-4 font-semibold tracking-[0.1em] text-text-muted uppercase">{note.category} · {note.date}</p>
                <h3 className="font-display text-h5 mt-2 font-semibold text-text underline-offset-4 group-hover:underline">{note.title}</h3>
                <p className="text-body-sm mt-2 line-clamp-3 text-text-secondary">{note.summary}</p>
                <span className="text-button mt-4 inline-flex items-center gap-2 font-semibold text-action">View more <ExternalLinkIcon size={16} /></span>
              </a>
            )
          })}
        </div>

        {remainingCount > 0 && (
          <div className="mt-12 flex justify-center">
            <button type="button" onClick={() => setVisibleCount((count) => count + 8)} className="rounded-sm border border-border-strong bg-surface px-5 py-3 text-button font-semibold text-action transition-colors hover:border-action hover:bg-surface-sunken focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-action">
              Show more notes <span className="font-normal text-text-muted">({remainingCount} more)</span>
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
