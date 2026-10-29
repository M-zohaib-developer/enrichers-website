import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const run = async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'strategicpartner' } },
    limit: 1,
  })
  const page = result.docs[0]
  if (!page) throw new Error('Strategic Partner page was not found. Run npm run seed:missing-pages first.')

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[0] = {
    blockType: 'serviceHero',
    theme: 'dark',
    heroVariant: 'standard',
    breadcrumbPosition: 'top',
    breadcrumbs: [
      { label: 'Home', url: '/' },
      { label: 'About', url: '/about-us/' },
      { label: 'Strategic partners', url: '/strategicpartner/' },
    ],
    eyebrow: 'Strategic partner programme',
    heading: 'Turn your referrals into strategic income.',
    headingAccent: 'into strategic income.',
    body: 'Refer clients. Create impact. Earn recurring side income. Join our inner circle of strategic partners.',
    primary: { label: 'Become a partner', url: '/strategicpartner/#consultation', variant: 'primary' },
    secondary: {
      label: 'Programme terms (PDF)',
      url: 'https://enrichers.com.pk/wp-content/uploads/2026/04/SP-Terms-Conditions.pdf',
      variant: 'secondary',
    },
    badges: [],
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { title: 'Strategic Partner Programme', layout } as never,
    context: { skipRevalidate: true },
  })
  payload.logger.info('Updated the Strategic Partner hero')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
