/**
 * Seeds /enrichers-team with the real leadership and team roster from
 * enrichers.com.pk/enrichers-team/. Safe to re-run.
 *
 *   npm run seed:enrichers-team
 */
import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ctx = { context: { skipRevalidate: true } }

const LEADERS = [
  {
    name: 'Syed Abdullah Bukhari',
    role: 'Founder & Chairman',
    profileUrl: '/syed-abdullah-bhukahri/',
    file: 'team-abdullah-bukhari.webp',
    bio: 'Founded Enrichers in 2011 and has led its growth from a single company into a five-subsidiary investment group spanning brokerage, agriculture, real estate and hospitality.',
  },
  { name: 'Syed Tariq Hussain', role: 'Co-Chairman', profileUrl: '/syed-tariq-hussain/', file: 'team-tariq-hussain.webp', bio: 'Works alongside the Chairman on group strategy and the long-term direction of Enrichers’ investment consortium.' },
  { name: 'Muhammad Hassan Mehmood', role: 'CEO — Enrichers Private Limited', profileUrl: '/muhammad-hasssan/', file: 'team-hassan-mehmood.webp' },
  { name: 'Syed Hassan Abid Zaidi', role: 'CEO — Enrichers Securities (Pvt.) Ltd.', profileUrl: '/syed-hassan-abid-zaid/', file: 'team-hassan-zaidi.webp' },
  { name: 'Dr. Athar Mansoor', role: 'Chief Strategy Officer', profileUrl: '/dr-athar-mansoor-2/', file: 'team-athar-mansoor.webp' },
  { name: 'Hasnain Afzal Wattoo', role: 'Director Operations', profileUrl: '/hasnain-afzal-wattoo/', file: 'team-hasnain-wattoo.webp' },
  { name: 'Muhammad Saleem Ahmad', role: 'Director Corporate Linkages', profileUrl: '/muhammad-saleem-ahmad-2/', file: 'team-saleem-ahmad.webp' },
]

const MEMBERS = [
  { name: 'Khizer Sohail', role: 'Department Head, Business Development North', profileUrl: '/khizar-sohail/', file: 'team-khizer-sohail.jpg' },
  { name: 'Syed Yousaf Hussanin Zaidi', role: 'Business Relationship Strategist', profileUrl: '/syed-yousaf-hussain-zaidi/', file: 'team-yousaf-zaidi.jpg' },
  { name: 'Hafiz Muhammad Shahzad', role: 'Sr. Manager Business Development', profileUrl: '/hafiz-muhammad-shahzad-2/', file: 'team-shahzad.webp' },
  { name: 'Nadeem Akram', role: 'Sr. Manager Finance', profileUrl: '/nadeem-akram-2/', file: 'team-nadeem-akram.webp' },
  { name: 'Muhammad Nabeel', role: 'Sr. Manager Business Development', profileUrl: '/muhammad-nabeel-2/', file: 'team-nabeel.webp' },
  { name: 'Sidra Ejaz', role: 'Dy. Sr. Manager Business Development', profileUrl: '/sidra-ejaz-gondal/', file: 'team-sidra-ejaz.webp' },
]

const run = async () => {
  const payload = await getPayload({ config })

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

  const withPhoto = async <T extends { name: string; file: string }>(people: T[]) =>
    Promise.all(
      people.map(async ({ file, ...person }) => ({
        ...person,
        photo: (await media(person.name, file)).id,
      })),
    )

  const leaders = await withPhoto(LEADERS)
  const members = await withPhoto(MEMBERS)

  const layout = [
    {
      blockType: 'serviceHero',
      theme: 'dark',
      breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Our team', url: '' }],
      eyebrow: 'Our team',
      heading: 'Meet the team who make it happen',
      body: 'Specialists in investment markets, working to help our clients reach their financial goals.',
      badges: [],
    },
    {
      blockType: 'teamGrid',
      sectionId: 'team',
      displayVariant: 'candidate',
      eyebrow: 'Leadership', heading: 'Leadership', body: 'The founders, chief executives and directors of the group’s companies.',
      leadershipEyebrow: 'Leadership', leadershipHeading: 'Leadership', leadershipBody: 'The founders, chief executives and directors of the group’s companies.',
      managementEyebrow: 'Management', managementHeading: 'Management team', managementBody: '',
      leaders,
      members,
    },
    {
      blockType: 'founderStatement', sectionId: 'founder-statement',
      quote: 'Enrichers Investment Group is a knowledge-centric company that believes in empowering clients through financial education.',
      authorName: 'Syed Abdullah Bukhari', authorRole: 'Founder & Chairman, Enrichers Investment Group',
      portrait: (await media('Syed Abdullah Bukhari', 'team-abdullah-bukhari.webp')).id,
      buttons: [{ blockType: 'secondaryButton', label: 'About Enrichers', url: '/about-us/' }],
    },
    {
      blockType: 'readyWhenYouAre',
      variant: 'compact',
      heading: 'Join the team',
      body: 'Full-time and internship roles in business development, research and client services.',
      buttons: [
        { blockType: 'primaryButton', label: 'See open positions', url: '/careers/' },
        { blockType: 'secondaryButton', label: 'Contact us', url: '/contact-us/' },
      ],
      riskNotice: '',
    },
  ]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'enrichers-team' } }, limit: 1 })
  const data = { title: 'Our Team', slug: 'enrichers-team', layout } as never
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...ctx })
  else await payload.create({ collection: 'pages', data, ...ctx })

  payload.logger.info('Seeded /enrichers-team')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
