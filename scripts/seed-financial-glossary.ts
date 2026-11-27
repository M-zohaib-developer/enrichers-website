/**
 * Rebuild /financial-glossary/ as a proper content page.
 *
 * Content:
 *  - Dark serviceHero
 *  - richIntro paragraph
 *  - One guideAccordion per letter group, each holding its glossary terms
 *
 * Source: the handful of terms shown on https://enrichers.com.pk/financial-glossary/
 * plus standard trading/brokerage terminology relevant to Enrichers' products
 * (PSX, PMEX, futures, FX, commodities, real estate, agriculture).
 *
 * Run: npx tsx scripts/seed-financial-glossary.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type Term = { question: string; answer: string }

const TERMS: Term[] = [
  // ─── A ───
  { question: 'ADP Non-Farm Employment Change', answer: 'A monthly release tracking private US employment, excluding farm jobs. Often called the "private payrolls report." Watched as an early indicator of the official US labour report.' },
  { question: 'Analyst', answer: 'A financial professional who evaluates investments and issues buy, sell or hold recommendations for clients.' },
  { question: 'Annual Report', answer: 'A yearly publication by a listed company covering its operations, financial statements and outlook. Required disclosure for every PSX-listed company.' },
  { question: 'Arbitrage', answer: 'The simultaneous purchase and sale of a financial product to profit from small price differentials between markets or venues.' },
  { question: 'Ask (Offer) Price', answer: 'The price at which the market is prepared to sell a product. Quoted two-way as Bid/Ask. The Ask is sometimes called the Offer.' },
  { question: 'Asset Allocation', answer: 'How an investor divides a portfolio across asset classes — equities, commodities, cash, real assets — to balance risk and return against goals and horizon.' },
  { question: 'Averaging Down', answer: 'Buying more of a stock as the price falls, which lowers the investor\'s average purchase price. Reduces break-even but increases exposure.' },

  // ─── B ───
  { question: 'Base Currency', answer: 'The first currency in a currency pair. Shows how much the base currency is worth as measured against the second currency (the quote currency). In EUR/USD, EUR is the base.' },
  { question: 'Base Rate', answer: 'The policy lending rate set by the central bank of a given country. In Pakistan this is the SBP policy rate.' },
  { question: 'Bear Market', answer: 'A sustained decline — typically 20% or more from a recent peak — in a broad market index, accompanied by pessimistic sentiment.' },
  { question: 'Benchmark', answer: 'A standard index used to compare a portfolio\'s performance. The KSE-100 is the benchmark for Pakistani equities.' },
  { question: 'Beta', answer: 'A measure of a stock\'s volatility relative to the overall market. Beta of 1.0 moves in line with the market; above 1.0 moves more; below 1.0 moves less.' },
  { question: 'Bid Price', answer: 'The price at which the market is prepared to buy a product from you. The lower of the two prices quoted in a Bid/Ask pair.' },
  { question: 'Blue Chip', answer: 'Shares of a large, well-established company with a strong financial history and consistent dividends.' },
  { question: 'Book Value', answer: 'A company\'s total assets minus its total liabilities, as reported on its balance sheet.' },
  { question: 'Broker', answer: 'A regulated intermediary that executes buy and sell orders on an investor\'s behalf. Enrichers operates as a broker on PSX and PMEX.' },
  { question: 'Bull Market', answer: 'A sustained rise in a broad market index, typically 20% or more from a recent low, accompanied by optimistic sentiment.' },

  // ─── C ───
  { question: 'Call Option', answer: 'A contract giving the buyer the right, but not the obligation, to buy an underlying asset at a specified strike price before or on the expiry date.' },
  { question: 'Capital Gain', answer: 'The profit earned when a security is sold for more than its purchase price.' },
  { question: 'CDC (Central Depository Company)', answer: 'The institution that holds Pakistani securities in electronic form on behalf of investors. Your PSX shares live in a CDC sub-account tied to your broker.' },
  { question: 'Commission', answer: 'The fee charged by a broker for executing a trade. Usually a percentage of trade value or a flat amount per contract.' },
  { question: 'Commodity', answer: 'A basic good — energy (crude, gas), metals (gold, silver, copper), or agricultural product — used as an input in commerce.' },
  { question: 'Contract Note', answer: 'A legal confirmation issued by the broker to the client after a trade, detailing the instrument, quantity, price, and fees.' },
  { question: 'Correction', answer: 'A short-term decline of 10%–20% in a market or security from a recent peak.' },
  { question: 'Currency Pair', answer: 'The quotation of two different currencies, with the value of one being quoted against the other. E.g. USD/PKR.' },

  // ─── D ───
  { question: 'Day Trading', answer: 'Opening and closing positions within the same trading session, with no overnight exposure.' },
  { question: 'Derivative', answer: 'A financial contract whose value derives from an underlying asset — equity, index, commodity or currency. Futures and options are derivatives.' },
  { question: 'Dividend', answer: 'A distribution of a company\'s profits to shareholders, usually declared per share.' },

  // ─── E ───
  { question: 'Earnings Per Share (EPS)', answer: 'A company\'s net profit divided by the number of outstanding ordinary shares. A core input into the P/E ratio.' },
  { question: 'Equity', answer: 'Ownership in a company, represented by shares. Also used to mean the net value of a trading account.' },
  { question: 'ETF (Exchange-Traded Fund)', answer: 'A fund that holds a basket of assets and trades on an exchange like a stock. Offers diversified exposure in a single trade.' },
  { question: 'Ex-Dividend Date', answer: 'The cut-off date to be entitled to a declared dividend. Buying on or after this date means the seller keeps the next dividend.' },
  { question: 'Expiry Date', answer: 'The date on which a derivative contract (futures or options) settles and ceases to exist.' },

  // ─── F ───
  { question: 'Fiscal Year', answer: 'The 12-month accounting period a company uses for financial reporting. Pakistan\'s government fiscal year runs 1 July to 30 June.' },
  { question: 'Forex (FX)', answer: 'The global market for exchanging national currencies. The largest and most liquid financial market in the world.' },
  { question: 'Free Float', answer: 'The portion of a company\'s shares available for public trading, excluding strategic/insider holdings.' },
  { question: 'Fundamental Analysis', answer: 'Valuing a security by examining a company\'s financials, industry position, and broader economic context. Contrasted with technical analysis.' },
  { question: 'Futures Contract', answer: 'A standardised agreement to buy or sell an asset at a pre-set price on a specified future date. Traded on PMEX and other exchanges.' },

  // ─── G ───
  { question: 'GDP (Gross Domestic Product)', answer: 'The total value of goods and services produced in a country over a period. A headline measure of economic size and growth.' },

  // ─── H ───
  { question: 'Hedge', answer: 'A position taken to offset the risk of another position. Example: a gold producer selling gold futures to lock in a selling price.' },

  // ─── I ───
  { question: 'Index', answer: 'A measurement of a section of the market. The KSE-100 tracks the top 100 Pakistani stocks by free-float market cap.' },
  { question: 'Inflation', answer: 'The rate at which the general price level of goods and services rises, eroding purchasing power.' },
  { question: 'IPO (Initial Public Offering)', answer: 'The first time a private company offers its shares to the public on a stock exchange.' },

  // ─── K ───
  { question: 'KSE-100', answer: 'The Pakistan Stock Exchange\'s headline index — the top 100 companies by free-float-adjusted market capitalisation.' },
  { question: 'KSE-30', answer: 'A free-float-weighted index of the 30 largest and most liquid PSX companies.' },
  { question: 'KYC (Know Your Customer)', answer: 'The mandatory identity verification process brokers follow before opening an account, as required by SECP and SBP regulations.' },

  // ─── L ───
  { question: 'Leverage', answer: 'Using borrowed capital — or margin — to increase a position\'s size beyond the cash available. Amplifies both gains and losses.' },
  { question: 'Limit Order', answer: 'An order to buy or sell at a specified price or better. Not guaranteed to fill, but you control the execution price.' },
  { question: 'Liquidity', answer: 'How easily an asset can be bought or sold without materially affecting its price. Deep, liquid markets have tight spreads and large volumes.' },
  { question: 'Long Position', answer: 'A position held in anticipation that the asset\'s price will rise.' },
  { question: 'Lot Size', answer: 'The standard quantity of a derivative contract. One PMEX gold futures lot, for example, represents a fixed weight of gold.' },

  // ─── M ───
  { question: 'MACD (Moving Average Convergence Divergence)', answer: 'A momentum indicator that shows the relationship between two moving averages of a security\'s price.' },
  { question: 'Margin', answer: 'The cash deposit a broker requires to hold a leveraged position. Falls below the maintenance margin and you receive a margin call.' },
  { question: 'Market Capitalisation', answer: 'Share price multiplied by shares outstanding — the total market value of a listed company.' },
  { question: 'Market Order', answer: 'An order to buy or sell immediately at the best available current price. Executes fast but at the prevailing market price.' },
  { question: 'Moving Average', answer: 'The average price of a security over a specific number of periods. Smooths out price data to reveal trend direction.' },
  { question: 'MT5 (MetaTrader 5)', answer: 'A multi-asset trading platform widely used by PMEX brokers. Supports charting, algorithmic trading, and Expert Advisors.' },

  // ─── N ───
  { question: 'NAV (Net Asset Value)', answer: 'The per-unit value of a fund, calculated as total assets minus liabilities divided by the number of units.' },

  // ─── O ───
  { question: 'Open Interest', answer: 'The total number of outstanding derivative contracts (futures or options) that are not yet closed.' },
  { question: 'Option', answer: 'A derivative that gives the holder the right — not the obligation — to buy (call) or sell (put) an underlying at a set price by a set date.' },
  { question: 'OTC (Over-the-Counter)', answer: 'A trade conducted directly between two parties rather than on a public exchange.' },

  // ─── P ───
  { question: 'P/E Ratio (Price-to-Earnings)', answer: 'Share price divided by earnings per share. A core valuation shortcut — a high P/E implies the market expects stronger future earnings growth.' },
  { question: 'Pip', answer: 'The smallest standard price move in a currency pair — typically the fourth decimal place (0.0001).' },
  { question: 'PMEX (Pakistan Mercantile Exchange)', answer: 'Pakistan\'s futures exchange, where investors trade commodities (gold, silver, oil), index futures, and currency futures.' },
  { question: 'Portfolio', answer: 'The full collection of investments held by an individual or institution — equities, commodities, cash, real assets.' },
  { question: 'Premium', answer: 'The price paid by an option buyer to the option writer in exchange for the right the option grants.' },
  { question: 'PSX (Pakistan Stock Exchange)', answer: 'Pakistan\'s national stock exchange, where shares in listed Pakistani companies are traded.' },

  // ─── Q ───
  { question: 'Quantitative Easing', answer: 'A monetary policy where a central bank buys large quantities of financial assets to inject liquidity and lower interest rates.' },
  { question: 'Quote Currency', answer: 'The second currency in a currency pair. In USD/PKR, the Pakistani rupee is the quote currency.' },

  // ─── R ───
  { question: 'Resistance', answer: 'A price level a security has historically struggled to break above. Chartists watch resistance as a possible reversal or breakout point.' },
  { question: 'Return on Equity (ROE)', answer: 'Net income divided by shareholders\' equity, expressed as a percentage. A profitability yardstick.' },
  { question: 'Risk/Reward Ratio', answer: 'The potential loss on a trade divided by the potential gain. A 1:3 ratio means risking Rs 1 to make Rs 3.' },
  { question: 'Rollover', answer: 'Closing a futures position near expiry and simultaneously opening the same position in the next contract month to maintain exposure.' },

  // ─── S ───
  { question: 'SECP (Securities and Exchange Commission of Pakistan)', answer: 'Pakistan\'s securities regulator. Oversees PSX, PMEX, brokers, mutual funds, and listed companies.' },
  { question: 'Short Selling', answer: 'Selling a security you do not yet own, with the intent to buy it back later at a lower price. Profits from a falling market.' },
  { question: 'Spot Price', answer: 'The current price at which an asset can be bought or sold for immediate delivery and settlement.' },
  { question: 'Spread', answer: 'The difference between the Bid and Ask price. A tighter spread usually indicates a more liquid market.' },
  { question: 'Stop Loss', answer: 'A resting order placed to close a position once the price reaches a specified adverse level, capping the loss.' },
  { question: 'Support', answer: 'A price level a security has historically struggled to fall below. Chartists watch support as a possible bounce or breakdown point.' },

  // ─── T ───
  { question: 'Take Profit', answer: 'A resting order placed to close a position once the price reaches a specified favourable level, locking in the gain.' },
  { question: 'Technical Analysis', answer: 'Evaluating securities by analysing statistics from market activity — price and volume — and chart patterns. Contrasted with fundamental analysis.' },
  { question: 'Tick', answer: 'The minimum upward or downward price movement allowed for a trading instrument. Each market defines its own tick size.' },
  { question: 'Trailing Stop', answer: 'A stop loss that moves with the market in your favour, locking in profits while leaving room for the trend to continue.' },
  { question: 'TREC (Trading Right Entitlement Certificate)', answer: 'The licence that lets a brokerage house trade on the Pakistan Stock Exchange. Enrichers Securities (Pvt.) Ltd. is a TREC holder.' },

  // ─── U ───
  { question: 'Underlying Asset', answer: 'The financial instrument — stock, index, commodity or currency — on which a derivative contract is based.' },

  // ─── V ───
  { question: 'Volatility', answer: 'The degree to which a price fluctuates over a period. Higher volatility means larger, more frequent swings.' },
  { question: 'Volume', answer: 'The total number of shares or contracts traded during a given period. Used to confirm the strength of a price move.' },
  { question: 'VWAP (Volume-Weighted Average Price)', answer: 'The average price a security has traded at throughout the day, weighted by both volume and price. Used as an execution benchmark.' },

  // ─── W ───
  { question: 'Working Capital', answer: 'Current assets minus current liabilities. A gauge of a company\'s short-term operational liquidity.' },

  // ─── Y ───
  { question: 'Yield', answer: 'The income generated by an investment, expressed as a percentage of its price or face value. For bonds: coupon ÷ price.' },
  { question: 'YoY (Year-on-Year)', answer: 'A comparison of a metric to the same period one year earlier. Standard way to strip out seasonal effects.' },
]

function groupByLetter(terms: Term[]) {
  const map = new Map<string, Term[]>()
  for (const t of terms) {
    const letter = t.question[0].toUpperCase()
    if (!map.has(letter)) map.set(letter, [])
    map.get(letter)!.push(t)
  }
  const letters = Array.from(map.keys()).sort()
  return letters.map((letter) => ({
    letter,
    items: map.get(letter)!.sort((a, b) => a.question.localeCompare(b.question)),
  }))
}

async function run() {
  const cfg = await config
  const payload = await getPayload({ config: cfg })

  const grouped = groupByLetter(TERMS)

  const layout: any[] = [
    {
      blockType: 'serviceHero',
      theme: 'dark',
      eyebrow: 'Knowledge Hub',
      heading: 'Financial glossary',
      body: 'Clear, plain-English definitions for the terms you\'ll encounter trading PSX equities and PMEX futures, reading research, or evaluating an investment. Jump to any letter below.',
      primary: [
        { label: 'Open an account', url: '/open-account/', variant: 'primary' },
        { label: 'Book a consultation', url: '/contact-us/#consultation', variant: 'secondary' },
      ],
      showBottomBorder: true,
    },
yes
    {
      blockType: 'sectionNavigation',
      ariaLabel: 'Jump to letter',
      links: grouped.map((g, i) => ({
        label: g.letter,
        anchor: `letter-${g.letter.toLowerCase()}`,
        active: i === 0,
      })),
    },
    ...grouped.map((g) => ({
      blockType: 'guideAccordion',
      sectionId: `letter-${g.letter.toLowerCase()}`,
      eyebrow: `Letter ${g.letter}`,
      heading: g.letter,
      intro: '',
      columns: '2',
      items: g.items,
    })),
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'financial-glossary' } },
    limit: 1,
    overrideAccess: true,
  })

  if (existing.docs[0]) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data: { layout, title: 'Financial glossary' } as any,
      overrideAccess: true,
      context: { skipRevalidate: true },
    })
    console.log('Updated existing page id:', existing.docs[0].id)
  } else {
    const created = await payload.create({
      collection: 'pages',
      data: {
        slug: 'financial-glossary',
        title: 'Financial glossary',
        _status: 'published',
        layout,
      } as any,
      overrideAccess: true,
      context: { skipRevalidate: true },
    })
    console.log('Created page id:', (created as any).id)
  }

  console.log(`Seeded ${TERMS.length} terms across ${grouped.length} letters:`)
  for (const g of grouped) console.log(`  ${g.letter}: ${g.items.length}`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
