import 'dotenv/config'

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from 'payload'

import config from '../src/payload.config'

/**
 * One-time: regenerate the resized WebP variants for images uploaded BEFORE
 * `imageSizes` was added to the Media collection. Payload only builds variants
 * on upload, so existing images have none until they're re-processed.
 *
 * For each image doc we re-feed its own file buffer through `payload.update`,
 * which re-runs the upload pipeline (sharp) and writes the new `sizes_*` files.
 * PDFs and any file already carrying variants are skipped. Safe to re-run.
 *
 *   npx tsx scripts/regenerate-media.ts
 */
const dirname = path.dirname(fileURLToPath(import.meta.url))
const MEDIA_DIR = path.resolve(dirname, '../media') // Payload default upload dir (no staticDir set)

const run = async () => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({ collection: 'media', limit: 1000, depth: 0 })
  const images = docs.filter((d) => String((d as { mimeType?: string }).mimeType || '').startsWith('image/'))

  payload.logger.info(`Found ${images.length} image(s) to regenerate (of ${docs.length} media docs).`)

  let ok = 0
  let skipped = 0
  let failed = 0

  for (const doc of images) {
    const filename = (doc as { filename?: string }).filename
    const mimeType = (doc as { mimeType?: string }).mimeType || 'image/webp'
    if (!filename) {
      skipped++
      continue
    }
    const filePath = path.join(MEDIA_DIR, filename)
    if (!fs.existsSync(filePath)) {
      payload.logger.warn(`  skip (file missing on disk): ${filename}`)
      skipped++
      continue
    }
    try {
      const buffer = fs.readFileSync(filePath)
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {},
        file: { data: buffer, mimetype: mimeType, name: filename, size: buffer.length },
        context: { skipRevalidate: true },
      })
      ok++
      if (ok % 25 === 0) payload.logger.info(`  ...${ok}/${images.length}`)
    } catch (error) {
      failed++
      payload.logger.error(`  fail ${filename}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  payload.logger.info(`Done. regenerated=${ok} skipped=${skipped} failed=${failed}`)
  process.exit(failed > 0 ? 1 : 0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
