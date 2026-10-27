import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateFooter: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  // See revalidateHeader: outside a Next request there is no cache store, and
  // calling revalidateTag there throws and aborts the write.
  if (context?.skipRevalidate) return doc

  payload.logger.info('Revalidating footer')
  revalidateTag('global_footer', 'max')
  return doc
}
