/**
 * Replace the Home accountFaq block's heading with the PDF copy.
 * PDF: eyebrow "Questions" / heading "Everything you need to know".
 *
 * Run: npx tsx scripts/fix-faq-heading.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const cfg = await config
const payload = await getPayload({ config: cfg })
const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, overrideAccess: true })
const page: any = docs[0]
if (!page) { console.error('Home page not found'); process.exit(1) }
let touched = 0
for (const block of page.layout as any[]) {
  if (block.blockType === 'accountFaq') {
    block.eyebrow = 'Questions'
    block.heading = 'Everything you need to know'
    touched++
  }
}
await payload.update({ collection: 'pages', id: page.id, data: { layout: page.layout, _status: 'published' } as any, overrideAccess: true, context: { skipRevalidate: true } })
console.log(`Updated ${touched} accountFaq block(s) on /home/.`)
process.exit(0)
