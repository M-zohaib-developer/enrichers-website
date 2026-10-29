import NextLink from 'next/link'
import { ArrowRightIcon } from '@/components/Icon'
import type { BlockData } from './shared'

export function ArticleList({ data }: { data: BlockData }) {
  return (
    <section id={data.sectionId || 'articles'} aria-labelledby={`${data.sectionId || 'articles'}-h`} className="theme-sunken border-t border-border-subtle py-12 lg:py-14">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 id={`${data.sectionId || 'articles'}-h`} className="font-display text-h3 font-normal tracking-[-0.015em] text-text">{data.heading}</h2>
          {data.linkUrl && <NextLink href={data.linkUrl} className="group inline-flex items-center gap-2 text-button font-semibold text-action hover:underline">{data.linkLabel}<ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" /></NextLink>}
        </div>
        <ul className="mt-6 grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
          {(data.items ?? []).map((item: any, index: number) => <li key={`${item.title || 'article'}-${index}`} className="border-b border-border py-3"><NextLink href={item.url || '#'} className="group flex items-start justify-between gap-4 text-body-sm font-semibold text-text hover:text-action"><span>{item.title}</span><ArrowRightIcon size={16} className="mt-0.5 shrink-0 text-text-muted transition-transform group-hover:translate-x-1 group-hover:text-action" /></NextLink></li>)}
        </ul>
      </div>
    </section>
  )
}
