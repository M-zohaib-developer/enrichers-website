import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

type Article = { title: string; slug: string; category: string; summary: string; published: string; topic: string; readingTime: string; cover?: string }

const articles: Article[] = [
  { title: 'Investigating the Determinants of Investment Avoidance', slug: 'investigating-the-determinants-ofinvestment-avoidance', category: 'Investment', summary: 'Myths, financial literacy, risk perception, and technology as a catalyst for change.', published: '14 Jul 2026', topic: 'Investment', readingTime: '5 min', cover: 'cover-01.webp' },
  { title: 'Why to Trade with Enrichers', slug: 'why-to-trade-with-enrichers', category: 'Trading', summary: 'What a licensed PMEX broker offers, and how to open your online trading account in 11 steps.', published: '27 Jun 2025', topic: 'Trading', readingTime: '4 min', cover: 'cover-02.webp' },
  { title: 'Commodity Future Trading', slug: 'commodity-future-trading', category: 'Commodities', summary: 'A practical introduction to commodity futures trading in Pakistan.', published: '27 Jun 2025', topic: 'Commodities', readingTime: '4 min', cover: 'cover-03.webp' },
  { title: 'Volatility in Markets is the Best Thing Since Sliced Bread', slug: 'volatility-in-markets-is-the-best-thing-since-sliced-bread', category: 'Trading', summary: 'Does risk equate with volatility? Understanding movement can improve preparation and discipline.', published: '27 Jun 2025', topic: 'Trading', readingTime: '4 min', cover: 'cover-04.webp' },
  { title: 'Will Gold Still Glitter in 2025? A Look at Future Trading Opportunities', slug: 'will-gold-still-glitter-in-2025-a-look-at-future-trading-opportunities', category: 'Commodities', summary: 'The forces shaping gold and the opportunities available to informed futures traders.', published: '27 Jun 2025', topic: 'Commodities', readingTime: '5 min', cover: 'cover-05.png' },
  { title: 'Leveraging the Agri Products Market', slug: 'leveraging-the-agri-products-market', category: 'Agriculture', summary: 'How Pakistan can build value by connecting agricultural production with stronger markets.', published: '27 Jun 2025', topic: 'Agriculture', readingTime: '4 min', cover: 'cover-06.webp' },
  { title: 'Agricultural industries can enhance economic opportunities', slug: 'agricultural-industries-can-enhance-economic-opportunities', category: 'Agriculture', summary: 'The role of agricultural industries in creating jobs, resilience and long-term growth.', published: '27 Jun 2025', topic: 'Agriculture', readingTime: '4 min', cover: 'cover-07.webp' },
  { title: 'Invest in Barrens', slug: 'invest-in-barrens', category: 'Real assets', summary: 'A look at how underused land can become a productive long-term investment.', published: '27 Jun 2025', topic: 'Real assets', readingTime: '4 min', cover: 'cover-08.webp' },
  { title: 'World Food Day', slug: 'world-food-day', category: 'Agriculture', summary: 'Why food security, efficient farming and responsible investment belong in the same conversation.', published: '16 Oct 2025', topic: 'Agriculture', readingTime: '3 min' },
  { title: 'Business Leadership', slug: 'business-leadership', category: 'Business', summary: 'The habits and decisions that help leaders build durable businesses in changing markets.', published: '27 Jun 2025', topic: 'Business', readingTime: '4 min' },
]

const text = (value: string, format = 0) => ({ type: 'text', version: 1, text: value, format })
const paragraph = (value: string) => ({ type: 'paragraph', version: 1, children: [text(value)] })
const heading = (value: string) => ({ type: 'heading', version: 1, tag: 'h2', children: [text(value)] })
const bodyFor = (article: Article) => {
  const focus = article.category === 'Commodities' ? 'supply, demand and global price discovery' : article.category === 'Agriculture' ? 'production, market access and resilient value chains' : article.category === 'Real assets' ? 'productive land, patient capital and long-term stewardship' : article.category === 'Business' ? 'clear decisions, disciplined execution and sustainable growth' : 'financial literacy, measured risk and informed participation'
  return { root: { type: 'root', version: 1, children: [paragraph(`At Enrichers, we believe useful market knowledge should be clear, practical and grounded in the realities facing investors and businesses in Pakistan. ${article.summary}`), heading(`Understanding ${focus}`), paragraph(`The most useful way to read ${article.title.toLowerCase()} is to connect the headline to the fundamentals. Investors should look at the underlying drivers, the risks that could change the picture and the information available before acting.`), heading('A practical way forward'), paragraph(`Good decisions begin with a clear objective and a realistic timeframe. Enrichers combines regulated access with practical research so clients can ask better questions and choose a route that fits their goals. There is no guaranteed return in financial markets.`)] } }
}

const run = async () => {
  const payload = await getPayload({ config })
  const urls = new Map(articles.map((article) => [article.title, `/blogs/${article.slug}/`]))
  const related = (article: Article) => articles.filter((item) => item.slug !== article.slug).slice(0, 3).map((item) => ({ title: item.title, url: `/blogs/${item.slug}/`, summary: item.summary, category: item.category, published: item.published }))

  for (const article of articles) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: `blogs/${article.slug}` } }, limit: 1 })
    const media = article.cover ? (await payload.find({ collection: 'media', where: { alt: { equals: `Latest Insight cover ${article.cover.match(/(\d+)/)?.[1]}` } }, limit: 1 })).docs[0] : null
    const data = { title: article.title, slug: `blogs/${article.slug}`, _status: 'published', layout: [{ blockType: 'articleDetail', heading: article.title, category: article.category, summary: article.summary, published: article.published, author: 'Enrichers', topic: article.topic, readingTime: article.readingTime, featuredImage: media?.id, body: bodyFor(article), related: related(article) }] } as never
    if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context: { skipRevalidate: true } })
    else await payload.create({ collection: 'pages', data, context: { skipRevalidate: true } })
  }

  const blogsResult = await payload.find({ collection: 'pages', where: { slug: { equals: 'blogs' } }, limit: 1 })
  const blogsLayout = [
    { blockType: 'serviceHero', theme: 'light', breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Articles', url: '' }], eyebrow: 'Articles', heading: 'Ideas, explainers and market context.', body: 'Read practical articles from Enrichers on investing, business, agriculture and the wider economy.', primary: { label: 'Contact us', url: '/contact-us/' }, secondary: { label: 'Book a consultation', url: '/contact-us/#consultation' } },
    { blockType: 'articleList', sectionId: 'all-articles', heading: 'All articles', linkLabel: 'Research notes', linkUrl: '/latest-insight/', items: articles.map((article) => ({ title: article.title, url: urls.get(article.title) })) },
    { blockType: 'readyWhenYouAre', heading: 'Ready to talk?', body: 'Our team is here to help you take the next step.', buttons: [{ blockType: 'primaryButton', label: 'Contact us', url: '/contact-us/' }, { blockType: 'secondaryButton', label: 'Book a consultation', url: '/contact-us/#consultation' }], riskNotice: 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.' },
  ]
  if (blogsResult.docs[0]) await payload.update({ collection: 'pages', id: blogsResult.docs[0].id, data: { title: 'Articles', slug: 'blogs', _status: 'published', layout: blogsLayout } as never, context: { skipRevalidate: true } })
  else await payload.create({ collection: 'pages', data: { title: 'Articles', slug: 'blogs', _status: 'published', layout: blogsLayout } as never, context: { skipRevalidate: true } })

  const insight = await payload.find({ collection: 'pages', where: { slug: { equals: 'latest-insight' } }, limit: 1 })
  if (insight.docs[0]) {
    const layout = Array.isArray(insight.docs[0].layout) ? [...insight.docs[0].layout] as any[] : []
    const list = layout.find((block) => block.blockType === 'articleList')
    if (list) list.items = articles.map((article) => ({ title: article.title, url: urls.get(article.title) }))
    await payload.update({ collection: 'pages', id: insight.docs[0].id, data: { layout, _status: 'published' } as never, context: { skipRevalidate: true } })
  }
  payload.logger.info(`Seeded ${articles.length} article detail pages and connected Latest Insight`)
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
