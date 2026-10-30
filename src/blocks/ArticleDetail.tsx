import Image from 'next/image'
import NextLink from 'next/link'
import { ArrowRightIcon, ChevronRightIcon, JunctionMark } from '@/components/Icon'
import { RichText } from '@/components/RichText'
import { imageAlt, imageSrc, type BlockData } from './shared'

function BreadcrumbSeparator() {
  return <ChevronRightIcon size={14} className="shrink-0 text-text-muted" />
}

export function ArticleDetail({ data }: { data: BlockData }) {
  const related = Array.isArray(data.related) ? data.related : []
  const image = imageSrc(data.featuredImage)

  return <>
    <section className="theme-surface border-b border-border-subtle py-12 md:py-16">
      <div className="container-x">
        <nav aria-label="Breadcrumb" className="mb-6 text-caption">
          <ol className="flex flex-wrap items-center gap-1.5 text-text-muted">
            <li className="flex items-center gap-1.5"><NextLink className="hover:text-text hover:underline underline-offset-4" href="/">Home</NextLink></li>
            <li className="flex items-center gap-1.5"><BreadcrumbSeparator /><NextLink className="hover:text-text hover:underline underline-offset-4" href="/latest-insight/">Research</NextLink></li>
            <li className="flex items-center gap-1.5"><BreadcrumbSeparator /><NextLink className="hover:text-text hover:underline underline-offset-4" href="/blogs/">Articles</NextLink></li>
            <li className="flex items-center gap-1.5"><BreadcrumbSeparator /><span>{data.heading}</span></li>
          </ol>
        </nav>
        <p className="inline-flex items-center gap-2 text-overline font-semibold tracking-overline text-text-muted uppercase"><JunctionMark size={12} className="text-accent" />Article · {data.category}</p>
        <h1 className="font-display text-h1 tracking-[-0.02em] text-text">{data.heading}</h1>
        <p className="mt-5 max-w-[62ch] text-body-lg text-text-secondary">{data.summary}</p>
      </div>
    </section>
    <section className="theme-sunken !py-[var(--section-y)]">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-16">
        <article className="lg:col-span-8"><RichText data={data.body} className="rich-text-article" /><div className="mt-10 border-t border-border pt-6"><NextLink href="/open-account/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-action px-5 font-semibold text-on-action hover:bg-action-hover">Open an account <ArrowRightIcon size={18} /></NextLink></div></article>
        <aside className="lg:col-span-4 lg:pt-2">{image && <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-sm bg-surface"><Image src={image} alt={imageAlt(data.featuredImage, data.heading)} fill className="object-cover" sizes="(min-width: 1024px) 30vw, 100vw" /></div>}<dl className="border-y border-border text-body-sm"><div className="flex justify-between gap-4 border-b border-border py-4"><dt className="text-text-muted">Published</dt><dd className="font-semibold text-text">{data.published}</dd></div><div className="flex justify-between gap-4 border-b border-border py-4"><dt className="text-text-muted">By</dt><dd className="font-semibold text-text">{data.author}</dd></div><div className="flex justify-between gap-4 border-b border-border py-4"><dt className="text-text-muted">Topic</dt><dd className="font-semibold text-text">{data.topic}</dd></div><div className="flex justify-between gap-4 py-4"><dt className="text-text-muted">Reading time</dt><dd className="font-semibold text-text">{data.readingTime}</dd></div></dl></aside>
      </div>
    </section>
    <section className="theme-sunken border-t border-border-subtle py-(--section-y)"><div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><h2 className="font-display text-h3 font-semibold text-text">Ready to start?</h2><p className="mt-2 text-text-secondary">Open a PMEX or PSX account online. Our team helps with every step.</p></div><NextLink href="/open-account/" className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-sm bg-action px-5 font-semibold text-on-action hover:bg-action-hover">Open an account <ArrowRightIcon size={18} /></NextLink></div></section>
    {related.length > 0 && <section aria-labelledby="insightFeed-h" className="relative theme-surface py-(--section-y)"><div className="container-x"><div className="grid gap-6 lg:grid-cols-12 lg:items-end"><div className="lg:col-span-7"><h2 id="insightFeed-h" className="font-display text-h2 font-normal tracking-[-0.015em] text-text">More articles</h2></div><div className="lg:col-span-5"><div className="mt-6 flex flex-wrap gap-3 max-sm:flex-col"><NextLink href="/blogs/" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-border-strong px-5 text-button font-semibold text-action hover:bg-surface-sunken">All articles</NextLink></div></div></div><ul className="mt-10 grid gap-x-8 gap-y-2 md:grid-cols-2 lg:grid-cols-3">{related.map((item: any) => <li key={item.url}><NextLink className="group flex h-full flex-col border-t-2 border-border py-6 hover:border-action" href={item.url}><span className="text-caption font-semibold uppercase tracking-[0.1em] text-text-muted">{item.category || 'Article'} · {item.published || data.published}</span><span className="mt-3 font-display text-h4 font-semibold group-hover:underline underline-offset-4">{item.title}</span>{item.summary && <span className="mt-3 line-clamp-3 text-text-secondary">{item.summary}</span>}<span className="mt-auto inline-flex items-center gap-1.5 pt-5 font-semibold text-action">Read article <ArrowRightIcon size={16} /></span></NextLink></li>)}</ul></div></section>}
  </>
}
