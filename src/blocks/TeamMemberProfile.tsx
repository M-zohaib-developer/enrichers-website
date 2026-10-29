import Image from 'next/image'
import NextLink from 'next/link'
import { RichText } from '@/components/RichText'
import { ArrowRightIcon } from '@/components/Icon'
import { Eyebrow, imageSrc, type BlockData, type MediaValue } from './shared'

type Credential = { text?: string | null; linkLabel?: string | null; linkUrl?: string | null }

export function TeamMemberProfile({ data }: { data: BlockData }) {
  const src = imageSrc(data.photo as MediaValue)
  const credentials = (Array.isArray(data.credentials) ? data.credentials : []) as Credential[]
  const company = data.companyLabel && data.companyUrl
    ? <a href={data.companyUrl} className="font-semibold text-action underline underline-offset-4 hover:text-action-hover">{data.companyLabel}</a>
    : data.companyLabel

  return (
    <section id={data.sectionId || undefined} className="theme-surface py-(--section-y)">
      <div className="container-x">
        <div className="mb-8">
          <NextLink href={data.backLinkUrl || '/enrichers-team/'} className="group inline-flex items-center gap-2 text-button font-semibold text-action hover:underline underline-offset-4">
            <ArrowRightIcon size={18} className="rotate-180 transition-transform duration-(--duration-fast) group-hover:-translate-x-0.5" />
            {data.backLinkLabel || 'Back to our team'}
          </NextLink>
        </div>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-sunken">
              {src ? <Image src={src} alt={data.heading || 'Team member'} fill priority className="object-cover object-top" sizes="(min-width: 1024px) 38vw, 100vw" /> : null}
            </div>
          </div>
          <div className="lg:col-span-7">
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            <h1 className="font-display text-h1 mt-4 font-normal tracking-[-0.02em] text-text">{data.heading}</h1>
            <p className="text-body-lg mt-4 font-semibold text-action">{data.role}{company ? <> · {company}</> : null}</p>
            {credentials.length > 0 && (
              <ul className="mt-8 space-y-3 border-y border-border py-5 text-body-sm text-text-secondary">
                {credentials.map((credential, index) => <li key={`${credential.text || 'credential'}-${index}`}>{credential.text}{credential.linkLabel && credential.linkUrl ? <> — <a href={credential.linkUrl} className="font-semibold text-action underline underline-offset-4 hover:text-action-hover">{credential.linkLabel}</a></> : null}</li>)}
              </ul>
            )}
          </div>
        </div>
        <RichText data={data.body} className="rich-text-profile mt-12 max-w-none text-body-lg text-text-secondary" />
      </div>
    </section>
  )
}
