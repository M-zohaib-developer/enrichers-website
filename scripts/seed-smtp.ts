/**
 * Populate Settings → Email (SMTP) with the Gmail SMTP credentials the client
 * provided. Everything stays editable in the admin afterwards — this script
 * just saves the initial values so the admin does not have to type them in.
 *
 * Run: npx tsx scripts/seed-smtp.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function run() {
  const cfg = await config
  const payload = await getPayload({ config: cfg })
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      smtpEnabled: true,
      notificationsTo: 'mzohaibbhatti604@gmail.com',
      fromName: 'Enrichers Investment Group',
      fromAddress: '21014156-109@uog.edu.pk',
      smtpHost: 'smtp.gmail.com',
      smtpPort: 587,
      smtpSecure: false,
      smtpUser: '21014156-109@uog.edu.pk',
      smtpPass: 'rekfvimspnrhzhei',
    } as any,
    context: { skipRevalidate: true },
  })
  console.log('Settings → Email (SMTP) updated (host=smtp.gmail.com, notify→mzohaibbhatti604@gmail.com).')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
