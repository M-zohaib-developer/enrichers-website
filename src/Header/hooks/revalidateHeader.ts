import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  // revalidateTag only works inside a Next request/render. A standalone script
  // (the seeder) updates the global through the Local API with no such store,
  // and Next throws "static generation store missing" — which aborts the write
  // in the afterChange hook. There is no cache to bust in that context anyway.
  if (context?.skipRevalidate) return doc

  payload.logger.info('Revalidating header')
  // 'max' profile — this tag is only ever invalidated on demand by this hook,
  // not on a timer, so the background revalidate window doesn't matter.
  revalidateTag('global_header', 'max')
  return doc
}
