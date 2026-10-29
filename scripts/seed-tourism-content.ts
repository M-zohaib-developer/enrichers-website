import 'dotenv/config'

import { getPayload } from 'payload'
import config from '../src/payload.config'

const text = (value: string, format = 0) => ({ type: 'text', version: 1, text: value, format, detail: 0, mode: 'normal', style: '' })
const paragraph = (...children: any[]) => ({ type: 'paragraph', version: 1, children, direction: null, format: '', indent: 0 })
const heading = (tag: 'h2' | 'h3' | 'h4', value: string) => ({ type: 'heading', tag, version: 1, children: [text(value)], direction: null, format: '', indent: 0 })
const link = (label: string, url: string) => ({ type: 'link', version: 2, fields: { url, linkType: 'custom', newTab: false }, children: [text(label)], direction: null, format: '', indent: 0 })
const list = (items: string[]) => ({ type: 'list', listType: 'bullet', version: 1, start: 1, children: items.map((item) => ({ type: 'listitem', version: 1, value: 1, children: [paragraph(text(item))], direction: null, format: '', indent: 0 })), direction: null, format: '', indent: 0 })
const rich = (children: any[]) => ({ root: { type: 'root', version: 1, children, direction: null, format: '' as const, indent: 0 } })

const run = async () => {
  const payload = await getPayload({ config })
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'tourism-hospitality' } }, limit: 1 })
  const page = existing.docs[0]
  if (!page) throw new Error('Tourism & Hospitality page was not found. Run the tourism hero and consultation seeds first.')

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[2] = {
    blockType: 'richIntro',
    heading: 'Tourism Hospitality',
    body: rich([
      paragraph(text('Enrichers is unlocking Northern Pakistan’s tourism potential with a bold vision and strategic investments. From developing luxury destinations like our '), link('5-star hotel in Skardu', '/skardu-riverside-hotel/'), text(' to crafting immersive cultural experiences, we’re setting a new standard for hospitality and growth in the region.')),
    ]),
    buttons: [{ blockType: 'primaryButton', label: 'Get Started', url: 'https://api.whatsapp.com/send?phone=9242111111333' }],
  }
  layout[3] = {
    blockType: 'serviceOfferings',
    sectionId: 'tourism-potential',
    eyebrow: '',
    heading: 'Unveiling the Untapped Potential',
    body: '',
    background: 'gradient',
    columns: '2',
    items: [
      { title: 'Market Insight', body: "EIG recognizes the immense potential of Northern Pakistan's burgeoning tourism industry. The region's natural beauty, cultural treasures, and growing popularity make it a magnet for tourists seeking unique and enriching experiences.", details: [] },
      { title: 'Strategic Vision', body: 'We have a meticulously crafted plan to develop five key locations across Northern Pakistan. Each site will be carefully selected to maximize its potential and cater to the diverse needs of travelers.', details: [] },
      { title: 'A Luxurious Escape', body: 'EIG is proud to announce the development of a magnificent 5-star hotel in Skardu, Gilgit-Baltistan. This awe-inspiring property will redefine luxury hospitality in the region, offering guests unparalleled comfort and service amidst the breathtaking beauty of Skardu.', details: [] },
      { title: 'Unforgettable Experiences', body: 'Our commitment extends beyond providing exceptional accommodations. We aim to curate unforgettable experiences for our guests, allowing them to immerse themselves in the rich culture, breathtaking scenery, and captivating history of Skardu.', details: [] },
    ],
  }
  layout[4] = {
    blockType: 'richTextBlock',
    sectionId: 'tourism-investment-guide',
    heading: 'Tourism Investment Guide',
    background: 'white',
    showAccentBar: true,
    body: rich([
      paragraph(text('Northern Pakistan has spent years being described as “untapped potential” — but that description is starting to catch up with reality. Rising domestic tourism, growing international interest in destinations like Skardu and Hunza, and a genuine shortage of quality hospitality infrastructure have combined to make '), text('tourism investment in Pakistan', 1), text(' one of the more compelling, underexplored opportunities in the region right now.')),
      paragraph(text('EIG’s approach isn’t about chasing every opportunity at once — it’s about identifying a small number of high-potential locations and developing them properly, starting with our flagship '), link('5-star Skardu Riverside Hotel', '/skardu-riverside-hotel/'), text(' project.')),
      heading('h3', 'Why Northern Pakistan, Specifically?'),
      paragraph(text('A few factors make '), text('hospitality investment in Northern Pakistan', 1), text(' genuinely different from investing in more saturated tourism markets:')),
      list([
        'World-recognized natural landmarks (K2, Deosai Plains, Hunza, Skardu) that already draw international attention without needing to be “created” through marketing',
        'A significant gap between tourist demand and quality luxury accommodation supply — meaning early movers face far less direct competition',
        'Government and private-sector momentum increasingly turning toward Gilgit-Baltistan’s tourism development',
        'Strong potential for both domestic and international visitor growth over the coming years',
      ]),
      heading('h3', 'Sustainable Tourism — Why It Matters Beyond the Marketing Angle'),
      paragraph(text('“Sustainable tourism” gets used loosely in a lot of hospitality marketing, but for a region like Northern Pakistan, it’s a genuinely practical necessity, not just a buzzword. Developing hospitality projects that respect local culture, minimize environmental impact, and involve local communities isn’t just an ethical choice — it directly protects the long-term value of the tourism asset itself. A hospitality project that damages the very landscape and culture people are traveling to see undermines its own long-term investment case.')),
      heading('h3', 'What Makes a Strong Hospitality Investment in This Region'),
      paragraph(text('Beyond location, the projects most likely to succeed in Northern Pakistan’s tourism sector tend to share a few traits: genuine architectural respect for local heritage rather than generic luxury design, realistic development timelines that account for the region’s logistical challenges, and a clear plan for connecting visitors to authentic cultural experiences rather than just providing a place to sleep near scenic views.')),
      heading('h3', 'How Investors Typically Get Involved'),
      paragraph(text('Tourism and hospitality development isn’t a single-entry-point investment — opportunities range from direct equity partnerships in specific projects, to co-development models where investors and developers share both risk and upside, to more structured investment schemes for those who want project-level financial modeling and risk assessment before committing capital.')),
      paragraph(text('Interested in exploring tourism and hospitality investment opportunities in Northern Pakistan? '), link('Get in touch with our team', '/contact-us/'), text(' to learn more about current and upcoming projects, including the Skardu Riverside Hotel development.')),
    ]),
  }
  layout[5] = {
    blockType: 'faqAccordion',
    sectionId: 'tourism-faq',
    eyebrow: '',
    heading: 'Frequently Asked Questions',
    items: [
      { question: 'What is EIG’s role in Northern Pakistan tourism development?', answer: 'By making strategic investments in important tourist destinations, EIG aims to propel the growth of tourism in Northern Pakistan. The region is already Pakistan’s most popular tourism destination, attracting travelers across the globe. Our mission is to provide tourists with world-class facilities, including exclusive scenic resorts and/or a 5-star hotel in Skardu, Gilgit-Baltistan, setting new standards for luxury hospitality in the north.' },
      { question: 'What makes EIG’s hospitality investments different?', answer: 'We at EIG focus on luxury hospitality investments that are a harmony of comfort and culture, unlike ordinary projects. Our strategy is in terms of sustainability and luxurious service, with the intention to promote sustainable tourism while providing visitors with an enriched experience. Led by innovation, culture, and responsibility, Enrichers is redefining the future of luxury hospitality in Pakistan.' },
      { question: 'What are the long-term benefits of sustainable tourism in Northern Pakistan?', answer: 'The advantages of sustainable tourism go far beyond the tourism industry. EIG promotes community-sensitive development without damaging the face of the country.' },
      { question: 'What tourism and hospitality investment opportunities does Enrichers offer in Pakistan?', answer: 'Enrichers offers investment opportunities across hospitality developments, eco-tourism resorts, hotel projects and tourism infrastructure in Pakistan. We help investors capitalise on the growth of inbound tourism, regional destination development and hospitality services.' },
      { question: 'How does Enrichers support eco-friendly and sustainable tourism projects?', answer: 'Enrichers emphasises sustainable tourism by deploying responsible design, leveraging local cultural assets, engaging communities, and developing hospitality projects that minimise environmental impact and support regional development.' },
      { question: 'Which destinations or regions in Pakistan does Enrichers focus on for tourism and hospitality projects?', answer: 'Enrichers targets high-potential destinations across Pakistan — including mountain, lake and desert areas — working with local stakeholders to develop resorts, hotels and hospitality infrastructure that unlock tourism growth.' },
      { question: 'How can investors get involved in Enrichers’ tourism and hospitality ventures?', answer: 'Investors can engage via equity partnerships, co-development models or through Enrichers’ structured investment schemes. We provide project-level details, financial modelling, risk assessment and turnkey execution for hospitality assets.' },
    ],
  }
  layout[6] = {
    blockType: 'readyWhenYouAre',
    heading: 'Ready to explore the opportunity?',
    body: 'Talk to our team about current and upcoming tourism and hospitality projects.',
    buttons: [{ blockType: 'primaryButton', label: 'Contact us', url: '/contact-us/' }, { blockType: 'secondaryButton', label: 'Book a consultation', url: '/contact-us/#consultation' }],
    riskNotice: '',
  }

  await payload.update({ collection: 'pages', id: page.id, data: { layout } as never, context: { skipRevalidate: true } })
  payload.logger.info('Seeded Tourism & Hospitality content blocks from the live page')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
