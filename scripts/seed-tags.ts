import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const TAGS: Record<string, string> = {
  'Real Estate': 'Enrichers Properties Dubai · Residential Communities · Skardu Riverside Hotel · Property Brokerage',
  'Agriculture': 'Baab-ul-Ilm Research · Arid Land Development · Smart Farming · Mudarabah Partnerships',
  'Business Brokerage': 'Valuation · Buyer Matching · Negotiation · Discreet Closing',
  'AiBi Management Consultancies': 'Corporate Compliance · Digital Transformation · AI Training · Golden Visa Support',
}

const cfg = await config
const payload = await getPayload({ config: cfg })
const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, overrideAccess: true })
const page: any = docs[0]
if (!page) { console.error('Home page not found'); process.exit(1) }
for (const block of page.layout) {
  if (block.blockType === 'groupBusinessExplorer') {
    for (const item of block.items ?? []) {
      const tag = TAGS[item.label as string]
      if (tag) item.tags = tag
    }
  }
}
await payload.update({ collection: 'pages', id: page.id, data: { layout: page.layout }, overrideAccess: true, context: { skipRevalidate: true } })
console.log('Updated Our Businesses card tags')
process.exit(0)
