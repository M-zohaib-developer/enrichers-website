import { getBlockInstances, getBlockPreviewContent } from '@/utilities/getBlockPreviewContent'
import configPromise from '@payload-config'
import { headers as nextHeaders } from 'next/headers'
import { getPayload } from 'payload'

/**
 * Live content + instance index for the Add Layout preview cards.
 * Authenticated: only logged-in editors should see published content via this
 * route. Falls back to empty objects on error so the drawer still opens.
 */
export const GET = async () => {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await nextHeaders() })

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const [content, instances] = await Promise.all([
      getBlockPreviewContent(),
      getBlockInstances(),
    ])
    return Response.json({ content, instances })
  } catch (error) {
    payload.logger.error(`Block preview content failed: ${(error as Error)?.message}`)
    return Response.json({ content: {}, instances: {} })
  }
}
