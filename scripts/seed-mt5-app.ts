import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })
  const mediaFor = async (alt: string, filename: string) => {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return existing.docs[0] ?? payload.create({ collection: 'media', data: { alt }, filePath: path.resolve(dirname, '../public/brand', filename) })
  }
  const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'MetaTrader 5 app' } }, limit: 1 })
  const heroImage = existingMedia.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'MetaTrader 5 app' },
    filePath: path.resolve(dirname, '../public/brand/mt5-app.webp'),
  })
  const androidImage = await mediaFor('MetaTrader 5 Android screenshot', 'mt5-android.png')
  const windowsImage = await mediaFor('MetaTrader 5 Windows screenshot', 'mt5-windows.png')
  const macImage = await mediaFor('MetaTrader 5 MacOS screenshot', 'mt5-macos.png')

  const layout = [
    {
      blockType: 'serviceHero',
      theme: 'light',
      breadcrumbPosition: 'bottom',
      breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'MT5 App', url: '' }],
      eyebrow: '',
      heading: 'Download MetaTrader 5',
      body: '',
      heroImage: heroImage.id,
      badges: [],
    },
    {
      blockType: 'clientServices',
      eyebrow: 'Why choose MetaTrader 5?',
      heading: 'Trade smarter with powerful tools',
      body: 'MT5 goes beyond MT4, offering faster execution, more order types, advanced charting and powerful analysis tools, making trading smarter and easier.',
      items: [
        { title: 'Flexible order types', body: 'Eight pending order types give you precise control over entries and exits.', icon: 'chart' },
        { title: 'Multi-asset trading', body: 'Trade currencies, commodities, indices and crypto from one platform.', icon: 'globe' },
        { title: 'One-click execution', body: 'Trade instantly with a single tap when timing matters.', icon: 'compass' },
        { title: 'Advanced analysis', body: 'Use 21 timeframes and nine charting techniques to study the market.', icon: 'chart' },
        { title: 'Smart tools', body: 'Access an economic calendar, expert advisors and a strategy tester.', icon: 'ledger' },
      ],
      buttons: [],
    },
    {
      blockType: 'platformDownloads',
      sectionId: 'downloads',
      eyebrow: 'Download MetaTrader 5',
      heading: 'Trade on the device that suits you',
      body: 'Download MetaTrader 5 and access your markets wherever you are.',
      platforms: [
        {
          platform: 'Android',
          title: 'Download for Android',
          description: 'Trade currencies on your Android phone or tablet and check your account wherever you are.',
          image: androidImage.id,
          buttons: [{ blockType: 'primaryButton', label: 'Download for Android', url: 'https://play.google.com/store/apps/details?id=net.metaquotes.metatrader5&hl=en' }],
        },
        {
          platform: 'Windows',
          title: 'Download for Windows',
          description: 'Trade currencies and indices with technical and fundamental market analysis, copy trading and automated strategies.',
          image: windowsImage.id,
          buttons: [{ blockType: 'secondaryButton', label: 'Download for Windows', url: 'https://download.mql5.com/cdn/web/pakistan.mercantile.exchange/mt5/pmex5setup.exe' }],
        },
        {
          platform: 'MacOS',
          title: 'Download for MacOS',
          description: 'Trade currencies and indices with multiple order types and execution modes on your Mac.',
          image: macImage.id,
          buttons: [{ blockType: 'secondaryButton', label: 'Download for MacOS', url: '#' }],
        },
      ],
    },
    {
      blockType: 'processSteps',
      sectionId: 'getting-started',
      eyebrow: 'Getting started',
      heading: 'Start trading in three steps',
      intro: 'Open your account, install the platform and connect to the markets with support from our team.',
      steps: [
        { title: 'Open an account', body: 'Choose PMEX and complete the exchange-approved account opening process.' },
        { title: 'Download MetaTrader 5', body: 'Install the version for Android, Windows or MacOS that suits your device.' },
        { title: 'Log in and trade', body: 'Use your account details to access the platform and begin exploring the markets.' },
      ],
    },
    {
      blockType: 'readyWhenYouAre',
      heading: 'Ready to start trading?',
      body: 'Open a PMEX account and download MetaTrader 5 to get started.',
      buttons: [
        { blockType: 'primaryButton', label: 'Open a PMEX account', url: '/open-account/' },
        { blockType: 'secondaryButton', label: 'Talk to an advisor', url: '/contact-us/#consultation' },
      ],
      riskNotice: 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.',
    },
  ]
  const slug = 'download-metatrader-5-for-your-device'
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
  const data = { title: 'Download MetaTrader 5 For Your Device', slug, layout } as never
  const context = { context: { skipRevalidate: true } }

  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
  else await payload.create({ collection: 'pages', data, ...context })
  payload.logger.info('Seeded the editable MT5 App hero')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
