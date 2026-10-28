import { RichText } from '@/components/RichText'
import type { BlockData } from './shared'

export function RichTextSection({ data }: { data: BlockData }) {
  const sectionId = data.sectionId || 'guide'
  const headingId = `${sectionId}-h`

  return (
    <section id={sectionId} aria-labelledby={data.heading ? headingId : undefined} className={`py-10 sm:py-12 lg:py-14 ${data.background === 'gradient' ? 'rich-text-gradient' : 'theme-light'}`}>
      <div className="mx-auto w-full max-w-[1280px] px-3 sm:px-5 lg:px-8">
        <div className={data.showAccentBar ? 'border-l-4 border-accent pl-3 sm:pl-4 lg:pl-5' : ''}>
          {data.heading && <h2 id={headingId} className="rich-text-block-heading mb-5">{data.heading}</h2>}
          <RichText data={data.body} className="max-w-none" />
        </div>
      </div>
    </section>
  )
}
