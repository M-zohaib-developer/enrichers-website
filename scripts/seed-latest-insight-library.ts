import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const notes = [
  ['Global macro', '30 Jul 2026', 'Fed Holds Rates For A 5th Straight Meeting', 'The Federal Open Market Committee left the federal funds rate unchanged at 3.50%–3.75% on July 29, marking a fifth consecutive hold.', 'https://enrichers.com.pk/wp-content/uploads/2026/07/Fed-Holds-Rates.pdf', 'Fed Holds Rates For A 5th Straight Meeting'],
  ['Pakistan markets', '2 Jul 2026', "Can Pakistan's Bull Market Enter a Fourth Year?", "FY26 will likely be remembered as a defining year for Pakistan's equity market.", 'https://enrichers.com.pk/wp-content/uploads/2026/07/PSX-FY27-Outlook.pdf', "Can Pakistan's Bull Market Enter a Fourth Year?"],
  ['Global macro', '2 Jul 2026', 'Five Central Banks, One Month', "July isn't just another month on the calendar; it's a five-way central bank relay.", 'https://enrichers.com.pk/wp-content/uploads/2026/07/July-Opportunity-Map.pdf', 'Five Central Banks, One Month'],
  ['Geopolitics', 'Date to be confirmed', 'Two Geopolitical Clocks', 'A temporary two-week ceasefire between the US and Iran, alongside the conditional reopening of the Strait of Hormuz, has materially reduced near-term geopolitical tail risk.', 'https://enrichers.com.pk/wp-content/uploads/2026/04/Markets-Relief-Window.pdf', 'Two Geopolitical Clocks'],
  ['Opportunity Map', '1 Apr 2026', 'April Opportunity Map', 'As we move into April 2026, the global financial markets are shedding their winter skin and entering a high-stakes period of price discovery.', 'https://enrichers.com.pk/wp-content/uploads/2026/04/April-Opportunity-Map-2.pdf', 'April Opportunity Map'],
  ['Opportunity Map', '1 Mar 2026', 'March Opportunity Map', 'While January was driven by New Year optimism, February was defined by hotter-than-expected data and the AI-driven divergence in equities.', 'https://enrichers.com.pk/wp-content/uploads/2026/02/March-Opportunity-Map.pdf', 'March Opportunity Map'],
  ['Commodities', 'Date to be confirmed', "Is 'Warsh Nomination' the Ultimate Entry Point in Precious Metals?", 'On January 30, 2026, the US President confirmed Kevin Warsh as his nominee to succeed Jerome Powell as Chair of the Federal Reserve.', 'https://enrichers.com.pk/wp-content/uploads/2026/02/Warsh-Nomination-Precious-Metals-Opportunities.pdf', "Is 'Warsh Nomination' the Ultimate Entry Point in Precious Metals?"],
  ['Opportunity Map', '1 Jan 2026', 'January Opportunity Map', 'January kicks off 2026 with a whirlwind of economic data, central bank signals and geopolitical undercurrents.', 'https://enrichers.com.pk/wp-content/uploads/2026/01/January-Opportunity-Map.pdf', 'January Opportunity Map'],
  ['Commodities', 'Date to be confirmed', 'Silver Hits All-Time High', 'Silver has emerged as the top-performing commodity of 2025, climbing over 100% since January. Tight physical supply and shifting demand have driven prices higher.', 'https://enrichers.com.pk/wp-content/uploads/2025/12/Silver-Hits-All-Time-High.pdf', 'Silver Hits All-Time High'],
] as const

const articles = [
  'Investigating the Determinants of Investment Avoidance',
  'Why to Trade with Enrichers',
  'Commodity Future Trading',
  'Volatility in Markets is the Best Thing Since Sliced Bread',
  'Will Gold Still Glitter in 2025? A Look at Future Trading Opportunities',
  'Leveraging the Agri Products Market',
  'Agricultural industries can enhance economic opportunities',
  'Invest in Barrens',
  'World Food Day',
  'Business Leadership',
]

const run = async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({ collection: 'pages', where: { slug: { equals: 'latest-insight' } }, limit: 1 })
  const page = result.docs[0]
  if (!page) throw new Error('Latest Insight page was not found. Run npm run seed:missing-pages first.')

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  const hero = layout.find((block: any) => block.blockType === 'serviceHero') ?? layout[0]
  const ready = layout.find((block: any) => block.blockType === 'readyWhenYouAre') ?? {
    blockType: 'readyWhenYouAre',
    heading: 'Want a note explained?',
    body: 'Our analysts walk clients through the research and what it could mean for a PSX or PMEX position.',
    buttons: [
      { blockType: 'primaryButton', label: 'Book a consultation', url: '/contact-us/#consultation' },
      { blockType: 'secondaryButton', label: 'Open an account', url: '/open-account/' },
    ],
    riskNotice: 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.',
  }
  const coverDir = path.resolve(dirname, '../public/brand/latest-insight')
  const coverFiles = fs.readdirSync(coverDir).filter((filename) => /^cover-\d+\./.test(filename)).sort()
  const coverMedia = await Promise.all(coverFiles.map(async (filename) => {
    const alt = `Latest Insight cover ${filename.match(/\d+/)?.[0] || ''}`
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return existing.docs[0] ?? payload.create({ collection: 'media', data: { alt }, filePath: path.join(coverDir, filename) })
  }))

  const library = {
    blockType: 'researchLibrary', sectionId: 'notes', eyebrow: 'Enrichers research', heading: 'All research notes',
    notes: notes.map(([category, date, title, summary, url], index) => ({ category, date, title, summary, url, image: coverMedia[index]?.id })),
  }
  const articleList = { blockType: 'articleList', sectionId: 'articles', heading: 'Articles', linkLabel: 'All articles', linkUrl: '/blogs/', items: articles.map((title) => ({ title, url: '/blogs/' })) }
  await payload.update({ collection: 'pages', id: page.id, data: { title: 'Latest Market Insights', layout: [hero, library, articleList, ready] } as never, context: { skipRevalidate: true } })
  payload.logger.info('Added the editable Latest Insight research library')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
