import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateSettings: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  // See revalidateHeader: the seeder updates via the Local API with no Next
  // request store, so skip the cache bust there (there's nothing to bust).
  if (context?.skipRevalidate) return doc

  payload.logger.info('Revalidating site settings')
  revalidateTag('global_site-settings', 'max')
  return doc
}
