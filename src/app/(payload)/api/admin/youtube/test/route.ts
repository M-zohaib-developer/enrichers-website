import { getPayload, type PayloadRequest } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import configPromise from '@payload-config'

import { verifyChannel } from '@/utilities/youtube'

export async function POST(req: NextRequest): Promise<Response> {
  const payload = await getPayload({ config: configPromise })

  let user
  try {
    user = (await payload.auth({ req: req as unknown as PayloadRequest, headers: req.headers })).user
  } catch {
    user = undefined
  }
  if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 403 })

  const settings = (await payload.findGlobal({
    slug: 'site-settings',
    overrideAccess: true,
    depth: 0,
  })) as any

  const apiKey = settings?.youtubeApiKey as string | undefined
  const channelId = settings?.youtubeChannelId as string | undefined

  if (!apiKey) return NextResponse.json({ ok: false, error: 'No API key saved yet.' })
  if (!channelId) return NextResponse.json({ ok: false, error: 'No channel ID saved yet.' })

  try {
    const info = await verifyChannel(apiKey, channelId)
    return NextResponse.json({
      ok: true,
      channelTitle: info.channelTitle,
      videoCount: info.videoCount,
      playlistCount: info.playlistCount,
    })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err?.message || err) })
  }
}
