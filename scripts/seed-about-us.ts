/**
 * Seeds /about-us with the real content from enrichers.com.pk/about-us/.
 *
 * Replaces the generic three-block stub that scripts/seed-missing-pages.ts
 * writes for every unbuilt route. Safe to re-run.
 *
 *   npm run seed:about-us
 */
import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ctx = { context: { skipRevalidate: true } }

const run = async () => {
  const payload = await getPayload({ config })

  /** Finds the media row by alt, or uploads it. Keeps the script re-runnable. */
  const media = async (alt: string, file: string) => {
    const found = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return (
      found.docs[0] ??
      (await payload.create({
        collection: 'media',
        data: { alt },
        filePath: path.resolve(dirname, `../public/brand/${file}`),
      }))
    )
  }

  const forms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const form = forms.docs[0]
  if (!form) throw new Error('Investor enquiries form was not found. Run npm run seed:home first.')

  const heroImage = await media('Enrichers Investment Group reception and certificates', 'about-reception.webp')
  const groupImage = await media('Enrichers group MOU ceremony', 'about-group.webp')
  const founder = await media('Syed Abdullah Bukhari, Founder and Chairman', 'about-reference-founder.webp')
  const abdullah = await media('Syed Abdullah Bukhari portrait', 'team-abdullah-bukhari.webp')
  const tariq = await media('Syed Tariq Hussain portrait', 'team-tariq-hussain.webp')
  const hassan = await media('Muhammad Hassan Mehmood portrait', 'team-hassan-mehmood.webp')
  const zaidi = await media('Syed Hassan Abid Zaidi portrait', 'team-hassan-zaidi.webp')

  const layout = [
    {
      blockType: 'serviceHero',
      theme: 'light',
      breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'About', url: '' }, { label: 'About Enrichers', url: '' }],
      eyebrow: 'About Enrichers',
      heading: 'A knowledge-centric investment group, Lahore, since 2011.',
      body: 'Enrichers began as a brokerage and has grown into a group of companies spanning financial markets, physical trade, real estate, agriculture, and tourism & hospitality.',
      heroImage: heroImage.id,
      primary: { label: 'Meet our leadership', url: '/enrichers-team/' },
      secondary: { label: 'Regulation & disclosures', url: '/regulation/' },
    },
    {
      blockType: 'statsBand',
      sectionId: 'facts',
      background: 'surface',
      stats: [
        { value: '2011', label: 'Founded in Lahore' },
        { value: 'PSX · PMEX', label: 'TREC holder & corporate member' },
        { value: '6', label: 'Companies in the group' },
        { value: '3', label: 'Offices: Lahore, Islamabad, UAE' },
      ],
    },
    {
      blockType: 'imageTextFeature',
      sectionId: 'who-we-are',
      eyebrow: 'Who we are',
      heading: 'From a single brokerage to a diversified group',
      body: 'As a private equity investor, EIG uses the Musharakah model — a partnership in which every party shares both the rewards and the risks — to support promising companies and start-ups. The same principle underpins the group’s ambition to establish an agriculture-based investment bank.',
      highlights: [
        { label: 'Enrichers Private Limited' },
        { label: 'Enrichers Securities Private Limited' },
        { label: 'Enrichers Developers Private Limited' },
        { label: 'Enrichers Business Brokerage' },
        { label: 'Enri-Farms' },
        { label: 'Baab-ul-Ilm' },
      ],
      image: groupImage.id,
      imageAlt: 'Enrichers group MOU ceremony',
      imagePosition: 'right',
      background: 'surface',
    },
    {
      blockType: 'founderStatement',
      sectionId: 'founder',
      eyebrow: 'Message from the Founder & Chairman',
      quote: 'Enrichers Investment Group is a knowledge-centric company that believes in empowering clients through financial education.',
      body: 'We are committed to providing our clients with the necessary tools and resources to make informed investment decisions, hence helping them to achieve financial success. We recognize that financial markets are a dynamic blend of liquidity, transparency, and diversity.\n\nAs a visionary company, we aspire to establish an agriculture-based investment bank founded on the principles of Musharakah. This initiative reflects our commitment to contributing to Pakistan\'s economic growth and prosperity.',
      authorName: 'Syed Abdullah Bukhari',
      authorRole: 'Founder & Chairman',
      portrait: founder.id,
      imagePosition: 'left',
      buttons: [{ blockType: 'secondaryButton', label: 'Learn more about Enrichers', url: '/about-us/' }],
    },
    {
      blockType: 'processSteps',
      sectionId: 'commitments',
      eyebrow: 'Vision & mission',
      heading: 'What we commit to',
      intro: 'To be a distinctive investment group with a goal of making each day better than yesterday, contributing towards Pakistan’s social and economic development, providing diversified yet water-tight investment solutions.',
      steps: [
        { title: 'Comply with all government regulations.' },
        { title: 'Raise a consortium of new opportunities to meet clients’ diversified needs.' },
        { title: 'Keep an all-weather approach to ongoing market trends.' },
        { title: 'Provide customized yet watertight investment solutions.' },
        { title: 'Educate clients to make smart financial choices.' },
        { title: 'Serve all clients with integrity, objectivity, and the highest level of professional competence.' },
      ],
    },
    {
      blockType: 'benefitsGrid',
      sectionId: 'values',
      eyebrow: 'Core values',
      heading: 'Integrity, ownership, one team',
      background: 'gradient',
      items: [
        { title: 'Integrity', body: 'Commitment and honesty that runs from the executive to every tier of the organisation — to be truthful inside out.' },
        { title: 'Ownership', body: 'Complete responsibility for the quality and timeliness of every outcome. Every employee is an individual contributor.' },
        { title: 'One Team', body: 'No personal agendas and no divisions — collaboration and shared accountability across every department.' },
      ],
    },
    {
      blockType: 'teamGrid',
      sectionId: 'leadership',
      displayVariant: 'candidate',
      eyebrow: 'Leadership',
      heading: 'The people accountable',
      leadershipCtaLabel: 'Meet the full team',
      leadershipCtaUrl: '/enrichers-team/',
      leaders: [
        { name: 'Syed Abdullah Bukhari', role: 'Founder & Chairman', photo: abdullah.id, profileUrl: '/enrichers-team/syed-abdullah-bukhari/' },
        { name: 'Syed Tariq Hussain', role: 'Co-Chairman', photo: tariq.id, profileUrl: '/enrichers-team/syed-tariq-hussain/' },
        { name: 'Muhammad Hassan Mehmood', role: 'CEO – Enrichers Private Limited', photo: hassan.id, profileUrl: '/enrichers-team/muhammad-hassan-mehmood/' },
        { name: 'Syed Hassan Abid Zaidi', role: 'CEO – Enrichers Securities Pvt. Ltd.', photo: zaidi.id, profileUrl: '/enrichers-team/syed-hassan-abid-zaidi/' },
      ],
      members: [],
    },
    {
      blockType: 'readyWhenYouAre',
      heading: 'Work with Enrichers.',
      body: 'Trade with us, invest alongside us or join the team.',
      buttons: [
        { blockType: 'primaryButton', label: 'Open an account', url: '/open-account/' },
        { blockType: 'secondaryButton', label: 'Careers', url: '/careers/' },
      ],
      riskNotice: 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.',
    },
  ]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'about-us' } }, limit: 1 })
  const data = { title: 'About Enrichers', slug: 'about-us', layout } as never
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...ctx })
  else await payload.create({ collection: 'pages', data, ...ctx })

  payload.logger.info('Seeded /about-us')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
