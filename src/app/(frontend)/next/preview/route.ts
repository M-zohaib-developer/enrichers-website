import { getPayload, type PayloadRequest } from 'payload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import configPromise from '@payload-config'

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (previewSecret !== process.env.PREVIEW_SECRET) {
    return new Response('Forbidden', { status: 403 })
  }

  if (!path || !path.startsWith('/')) {
    return new Response('Invalid path', { status: 400 })
  }

  const payload = await getPayload({ config: configPromise })

  let user
  try {
    const auth = await payload.auth({ req: req as unknown as PayloadRequest, headers: req.headers })
    user = auth.user
  } catch {
    return new Response('Forbidden', { status: 403 })
  }

  if (!user) {
    return new Response('Forbidden', { status: 403 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
