import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'
const cfg = await config
const payload = await getPayload({ config: cfg })
const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, overrideAccess: true, draft: true })
const page: any = docs[0]
await payload.update({
  collection: 'pages',
  id: page.id,
  data: { _status: 'published' } as any,
  overrideAccess: true,
  context: { skipRevalidate: true },
})
console.log('Republished /home/. _status now:', (await payload.findByID({ collection: 'pages', id: page.id, overrideAccess: true }))._status ?? 'see DB')
process.exit(0)
