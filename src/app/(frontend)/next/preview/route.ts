import { getPayload, type PayloadRequest } from 'payload'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import configPromise from '@payload-config'

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url)
  const path = searchParams.get('path')
  const previewSecret = searchParams.get('previewSecret')

  if (!path || !path.startsWith('/')) {
    return new Response('Invalid path', { status: 400 })
  }

  // Two ways in, either is enough:
  //  1. A configured PREVIEW_SECRET that matches (external / token preview).
  //  2. A logged-in admin user — live preview always runs inside the
  //     authenticated admin, so this keeps it working even if PREVIEW_SECRET
  //     is missing or misconfigured on the server (the previous cause of the
  //     "Forbidden" iframe: '' from the URL never equals an undefined env var).
  const secretOk = Boolean(process.env.PREVIEW_SECRET) && previewSecret === process.env.PREVIEW_SECRET

  const payload = await getPayload({ config: configPromise })
  let user
  try {
    user = (await payload.auth({ req: req as unknown as PayloadRequest, headers: req.headers })).user
  } catch {
    user = undefined
  }

  if (!user && !secretOk) {
    return new Response('Forbidden', { status: 403 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(path)
}
