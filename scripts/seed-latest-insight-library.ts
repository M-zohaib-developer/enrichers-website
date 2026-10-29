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
  ['Opportunity Map', 'Jan 2026', 'February Opportunity Map', 'January 2026 has been defined by a decisive “flight to quality.”', 'https://enrichers.com.pk/wp-content/uploads/2026/01/February-Opportunity-Map.pdf', 'February Opportunity Map', 'february-opportunity-map.webp'],
  ['Geopolitics', 'Jan 2026', 'What’s Really Happening in Venezuela?', 'The U.S. has carried out its most forceful regime-change operation in Latin America in decades, culminating in the capture of Venezuelan President Nicolás Maduro.', 'https://enrichers.com.pk/wp-content/uploads/2026/01/Venezuela-in-Crisis-.pdf', 'What’s Really Happening in Venezuela?', 'whats-really-happening-in-venezuela.webp'],
  ['Opportunity Map', '1 Jan 2026', 'January Opportunity Map', 'January kicks off 2026 with a whirlwind of economic data, central bank signals and geopolitical undercurrents.', 'https://enrichers.com.pk/wp-content/uploads/2026/01/January-Opportunity-Map.pdf', 'January Opportunity Map'],
  ['Commodities', 'Date to be confirmed', 'Silver Hits All-Time High', 'Silver has emerged as the top-performing commodity of 2025, climbing over 100% since January. Tight physical supply and shifting demand have driven prices higher.', 'https://enrichers.com.pk/wp-content/uploads/2025/12/Silver-Hits-All-Time-High.pdf', 'Silver Hits All-Time High'],

  ['Global macro', 'Research note', 'Soft CPI: Are Rate Cuts Back on the Table?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/12/Soft-CPI-—-Rate-Cuts-.pdf', 'Soft CPI: Are Rate Cuts Back on the Table?', 'cover-12.webp'],
  ['Global macro', 'Research note', '2026 Markets Outlook', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/11/A-New-Bull-Market.pdf', '2026 Markets Outlook', 'cover-13.webp'],
  ['Global macro', 'Research note', 'Wall Street Meets New York’s First Muslim Mayor', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/11/The-Mamdani-Effect.pdf', 'Wall Street Meets New York’s First Muslim Mayor', 'cover-14.webp'],
  ['Commodities', 'Research note', 'Gold Unstoppable: How High Can It Go?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/10/Gold-Unstoppable-How-High-Can-It-Go.pdf', 'Gold Unstoppable: How High Can It Go?', 'cover-15.webp'],
  ['Global macro', 'Research note', 'CPI Report', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/10/CPI-Report-September-2025.pdf', 'CPI Report', 'cover-16.webp'],
  ['Global macro', 'Research note', 'Washington on Pause', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/10/U.S.-Government-Shutdown.pdf', 'Washington on Pause', 'cover-17.webp'],
  ['Opportunity Map', 'Research note', 'October Opportunity Map', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/10/October-Opportunity-Map.pdf', 'October Opportunity Map', 'cover-18.webp'],
  ['Commodities', 'Research note', 'Precious Metals Surge on Safe-Haven Demand', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/09/Precious-Metals-Surge-on-Safe-Haven-Demand.pdf', 'Precious Metals Surge on Safe-Haven Demand', 'cover-19.webp'],
  ['Global macro', 'Research note', 'Markets Are Already in 2026-2027', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/09/Markets-Are-Already-in-2026-2027.pdf', 'Markets Are Already in 2026-2027', 'cover-20.webp'],
  ['Global macro', 'Research note', 'Fed Begins 2025 Easing Cycle', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/09/Fed-Begins-2025-Easing-Cycle.pdf', 'Fed Begins 2025 Easing Cycle', 'cover-21.webp'],
  ['Global macro', 'Research note', 'AI Boom Could Push S&P 500 Beyond 7000', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/09/AI-Boom-Could-Push-SP-500-Beyond-7000-.pdf', 'AI Boom Could Push S&P 500 Beyond 7000', 'cover-22.webp'],
  ['Global macro', 'Research note', 'Is Fed About to Shock the World?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/09/Is-Fed-About-to-Shock-the-World.pdf', 'Is Fed About to Shock the World?', 'cover-23.webp'],
  ['Opportunity Map', 'Research note', 'September Opportunity Map', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/08/September-Opportunity-Map.pdf', 'September Opportunity Map', 'cover-24.webp'],
  ['Geopolitics', 'Research note', 'Ukraine Talks in Washington', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/08/Ukraine-Talks-in-Washington-.pdf', 'Ukraine Talks in Washington', 'cover-25.webp'],
  ['Global macro', 'Research note', 'CPI Report: July 2025', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/08/CPI-Report-July-2025.pdf', 'CPI Report: July 2025', 'cover-26.webp'],
  ['Global macro', 'Research note', 'Inflation in Focus: Why This Week Matters for Traders?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/08/Inflation-in-Focus.pdf', 'Inflation in Focus: Why This Week Matters for Traders?', 'cover-27.webp'],
  ['Commodities', 'Research note', 'Trump Targets Russian Oil Buyers: But at What Cost?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/08/Trump-Targets-Russian-Oil-Buyers.pdf', 'Trump Targets Russian Oil Buyers: But at What Cost?', 'cover-28.webp'],
  ['Global macro', 'Research note', 'Job Growth Slows: What’s Next for the Workforce?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/08/Only-73K-Jobs.pdf', 'Job Growth Slows: What’s Next for the Workforce?', 'cover-29.webp'],
  ['Global macro', 'Research note', 'Could August Shift the Whole Year?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Could-August-Shift-the-Whole-Year.pdf', 'Could August Shift the Whole Year?', 'cover-30.webp'],
  ['Global macro', 'Research note', 'Wall Street Pulse: Q2 Earnings', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Wall-Street-Pulse-Q2-Earnings_compressed.pdf', 'Wall Street Pulse: Q2 Earnings', 'cover-31.webp'],
  ['Global macro', 'Research note', 'Nasdaq Just Made History', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Nasdaq-Momentum-Is-Making-History.pdf', 'Nasdaq Just Made History', 'cover-32.webp'],
  ['Global macro', 'Research note', 'What Are the Magnificent 7 Stocks?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/What-Are-the-Magnificent-7-Stocks.pdf', 'What Are the Magnificent 7 Stocks?', 'cover-33.webp'],
  ['Commodities', 'Research note', 'Oil Prices Edge Higher Amid Sanctions Talk', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/Is-Trump-Replacing-Powell.pdf', 'Oil Prices Edge Higher Amid Sanctions Talk', 'cover-34.webp'],
  ['Commodities', 'Research note', 'Silver & Platinum Take Center Stage', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Silver-Platinum-Take-Center-Stage.pdf', 'Silver & Platinum Take Center Stage', 'cover-35.webp'],
  ['Global macro', 'Research note', 'CPI Climbs: Spending Locked', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/CPI-Climbs-Spending-Locked-1.pdf', 'CPI Climbs: Spending Locked', 'cover-36.webp'],
  ['Global macro', 'Research note', '14 Nations, 1 Deadline', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/14-Nations-1-Deadline.pdf', '14 Nations, 1 Deadline', 'cover-37.webp'],
  ['Global macro', 'Research note', 'Jobs Report Chained the July Rate Cut', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Jobs-Report-Chained-the-July-Rate-Cut.pdf', 'Jobs Report Chained the July Rate Cut', 'cover-38.webp'],
  ['Global macro', 'Research note', 'Busboy to Billionaire', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Nvidia-makes-History.pdf', 'Busboy to Billionaire', 'cover-39.webp'],
  ['Global macro', 'Research note', 'Will July 9 Redraw the Global Trade Map?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Will-July-9-Redraw-the-Global-Trade-Map.pdf', 'Will July 9 Redraw the Global Trade Map?', 'cover-40.webp'],
  ['Global macro', 'Research note', 'Wall Street’s Wild Ride into H2', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Wall-Streets-Wild-Ride-into-H2.pdf', 'Wall Street’s Wild Ride into H2', 'cover-41.webp'],
  ['Global macro', 'Research note', 'Can Pakistan Become the Next Crypto Frontier?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/Is-Trump-Replacing-Powell.pdf', 'Can Pakistan Become the Next Crypto Frontier?', 'cover-42.webp'],
  ['Global macro', 'Research note', 'What the Fed Drama Could Mean for Global Markets?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/Is-Trump-Replacing-Powell.pdf', 'What the Fed Drama Could Mean for Global Markets?', 'cover-43.webp'],
  ['Geopolitics', 'Research note', 'Markets Shift Gears After the US Strike', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/Markets-Shift-Gears-After-the-US-Strike.pdf', 'Markets Shift Gears After the US Strike', 'cover-44.webp'],
  ['Geopolitics', 'Research note', 'Decades of Pressure', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/What-Finally-Tore-It-All-Apart.pdf', 'Decades of Pressure', 'cover-45.webp'],
  ['Commodities', 'Research note', 'Oil Up, Stocks Down: What’s Next?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/Oil-Up-Stocks-Down.pdf', 'Oil Up, Stocks Down: What’s Next?', 'cover-46.webp'],
  ['Geopolitics', 'Research note', 'Is the U.S. Entering the War?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/Is-the-U.S.-Entering-the-War.pdf', 'Is the U.S. Entering the War?', 'cover-47.webp'],
  ['Geopolitics', 'Research note', 'War Clouds Over the Mideast', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/War-Clouds-over-Middle-East.pdf', 'War Clouds Over the Mideast', 'cover-48.webp'],
  ['Global macro', 'Research note', 'Escalating Israel-Iran Conflict', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/Escalating-Israel-Iran-Conflict.pdf', 'Escalating Israel-Iran Conflict', 'cover-49.webp'],
  ['Commodities', 'Research note', 'Oil Prices: Volatility in Motion', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/Oil-Up-Stocks-Down.pdf', 'Oil Prices: Volatility in Motion', 'cover-50.webp'],
  ['Global macro', 'Research note', 'What Is the Fed and Why Is This Meeting Important?', 'Read the full Enrichers research note for analysis and market context.', 'https://enrichers.com.pk/wp-content/uploads/2025/06/What-to-Expect-from-the-Fed.pdf', 'What Is the Fed and Why Is This Meeting Important?', 'cover-51.webp'],
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
  const readyExisting = layout.find((block: any) => block.blockType === 'readyWhenYouAre')
  const ready = {
    ...(readyExisting ?? {}),
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
  const coverFiles = fs.readdirSync(coverDir).filter((filename) => /\.(?:webp|png|jpe?g)$/i.test(filename)).sort()
  const coverMedia = await Promise.all(coverFiles.map(async (filename) => {
    const number = filename.match(/^cover-(\d+)\./)?.[1]
    const alt = number ? `Latest Insight cover ${number}` : `Latest Insight cover ${filename.replace(/\.[^.]+$/, '')}`
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return existing.docs[0] ?? payload.create({ collection: 'media', data: { alt }, filePath: path.join(coverDir, filename) })
  }))
  const mediaByFilename = new Map(coverFiles.map((filename, index) => [filename, coverMedia[index]]))

  const library = {
    blockType: 'researchLibrary', sectionId: 'notes', eyebrow: 'Enrichers research', heading: 'All research notes',
    notes: notes.map(([category, date, title, summary, url, , imageFile], index) => ({ category, date, title, summary, url, image: (imageFile ? mediaByFilename.get(imageFile) : coverMedia[index])?.id })),
  }
  const articleList = { blockType: 'articleList', sectionId: 'articles', heading: 'Articles', linkLabel: 'All articles', linkUrl: '/blogs/', items: articles.map((title) => ({ title, url: '/blogs/' })) }
  await payload.update({ collection: 'pages', id: page.id, data: { title: 'Latest Market Insights', layout: [hero, library, articleList, ready] } as never, context: { skipRevalidate: true } })
  payload.logger.info('Added the editable Latest Insight research library')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
