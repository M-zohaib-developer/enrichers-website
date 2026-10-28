import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { RenderHomeBlocks } from '@/blocks/HomeBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 1,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: { slug: { equals: slug } },
  })

  const page = result.docs[0]
  if (!page) notFound()

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderHomeBlocks blocks={(page.layout ?? []) as any} />
    </>
  )
}
