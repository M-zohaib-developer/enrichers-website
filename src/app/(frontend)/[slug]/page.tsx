import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { RenderHomeBlocks } from '@/blocks/HomeBlocks'

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    depth: 1,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })

  const page = result.docs[0]
  if (!page) notFound()

  return <RenderHomeBlocks blocks={(page.layout ?? []) as any} />
}
