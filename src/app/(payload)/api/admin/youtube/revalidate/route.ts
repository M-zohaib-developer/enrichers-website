import { getPayload, type PayloadRequest } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import configPromise from '@payload-config'

export async function POST(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })
  let user
  try {
    user = (await payload.auth({ req: req as unknown as PayloadRequest, headers: req.headers })).user
  } catch {
    user = undefined
  }
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 403 })

  revalidateTag('youtube', 'max')
  return NextResponse.json({ ok: true })
}
