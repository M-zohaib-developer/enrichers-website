import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const run = async () => {
  const payload = await getPayload({ config })
  const email = 'dev@payloadcms.com'
  const existing = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (!existing.docs[0]) await payload.create({ collection: 'users', data: { email, password: 'test' } })
  payload.logger.info(`Admin test user ready: ${email}`)
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
