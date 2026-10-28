import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const text = (value: string, format = 0) => ({ type: 'text', version: 1, detail: 0, format, mode: 'normal', style: '', text: value })
const paragraph = (...nodes: any[]) => ({ type: 'paragraph', version: 1, children: nodes, direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '' })
const list = (values: string[]) => ({ type: 'list', version: 1, listType: 'bullet', start: 1, tag: 'ul', direction: 'ltr', format: '', indent: 0, children: values.map((value) => ({ type: 'listitem', version: 1, value: 1, direction: 'ltr', format: '', indent: 0, textFormat: 0, textStyle: '', children: [text(value)] })) })
const link = (label: string, url: string) => ({ type: 'link', version: 2, fields: { url, linkType: 'custom', newTab: false }, children: [text(label)], direction: 'ltr', format: '', indent: 0 })
const rich = (...nodes: any[]) => ({ root: { type: 'root', version: 1, direction: 'ltr', format: '', indent: 0, children: nodes } })

const run = async () => {
  const payload = await getPayload({ config })
  const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'Agriculture' } }, limit: 1 })
  const image = existingMedia.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'Agriculture' },
    filePath: path.resolve(dirname, '../public/brand/agriculture.webp'),
  })
  const localAssets = [
    ['Smart Agriculture', 'agriculture-smart.jpg'],
    ['Corporate Farming', 'agriculture-corporate-farming.webp'],
    ['Corporate Dairy Farming', 'agriculture-corporate-dairy-farming.jpg'],
    ['Export-Oriented Cultivation', 'agriculture-export-oriented-cultivation.jpg'],
    ['Grading in Produces', 'agriculture-grading-produces.jpg'],
    ['Livestock', 'agriculture-livestock.jpg'],
    ['Meat Export', 'agriculture-meat-export.jpg'],
    ['Meat Export (Future Plan)', 'agriculture-meat-export-1.jpg'],
  ] as const
  for (const [alt, filename] of localAssets) {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    if (!existing.docs[0]) await payload.create({ collection: 'media', data: { alt }, filePath: path.resolve(dirname, `../public/brand/${filename}`) })
  }
  const carouselImages = [
    { image: image.id, alt: 'Agriculture' },
    ...await Promise.all(localAssets.map(async ([alt]) => {
      const result = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
      return { image: result.docs[0].id, alt }
    })),
  ]
  const mediaFor = async (alt: string) => {
    const result = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return result.docs[0]?.id
  }
  const agricultureFeatures = [
    { heading: 'Smart Agriculture: Harnessing Technology for Productivity', imageAlt: 'Smart Agriculture', imagePosition: 'right', body: rich(list(['EIG acknowledges the transformative power of smart agriculture technologies.', 'Integration of drones, sensors, and AI enables us to monitor crop health and optimize irrigation.', 'Customized cultivation techniques based on specific soil conditions promote efficiency, productivity, and a sustainable future for Pakistan’s agriculture sector.'])) },
    { heading: 'Seed Banking: Safeguarding Food Security amidst Challenges', imageAlt: 'Seed Banking', imagePosition: 'left', body: rich(list(['EIG invests in seed banking to address climate change and agricultural productivity challenges.', 'Seed banking involves collecting and storing essential crop seeds for long-term food security.', 'Preserving and protecting these seeds grants farmers access to resilient and adaptable crops.'])) },
    { heading: 'Export-Oriented Cultivation: Connecting Pakistani Farmers to Global Markets', imageAlt: 'Export-Oriented Cultivation', imagePosition: 'right', body: rich(list(['EIG acknowledges the vast potential of export-oriented cultivation for economic growth and job creation in Pakistan.', 'By prioritizing high-demand crops for global markets, we aim to generate foreign exchange and create employment opportunities.', 'This strategic approach benefits farmers and contributes to the overall development of the country.'])) },
    { heading: 'Grading in Produces: Ensuring Quality and Fair Compensation', imageAlt: 'Grading in Produces', imagePosition: 'left', body: rich(list(['EIG promotes the grading of agricultural products to ensure fair compensation for farmers’ hard work.', 'Grading agricultural produce improves market value and enables fair pricing for farmers.', 'Quality standards help connect Pakistani agriculture with international demand.'])) },
    { heading: 'Corporate Dairy Farming: Enhancing Efficiency in Dairy Production', imageAlt: 'Corporate Dairy Farming', imagePosition: 'right', body: rich(list(['EIG demonstrates its commitment to sustainable agriculture through strategic investments in corporate dairy farming.', 'Large-scale dairy cow raising aims to enhance productivity and ensure a steady supply of high-quality milk.', 'Sustainable practices support the economic viability of dairy farmers.'])) },
    { heading: 'Livestock: Improving Productivity for Food and Livelihoods', imageAlt: 'Livestock', imagePosition: 'left', body: rich(list(['EIG focuses on increasing livestock output as a source of food and income for many Pakistanis.', 'Improved breeding practices, better feed, and enhanced healthcare procedures support farmers.', 'This investment aims to improve livelihoods and enhance food security over the long term.'])) },
    { heading: 'Meat Export (Future Plan): Tapping into Growing Global Market', imageAlt: 'Meat Export (Future Plan)', imagePosition: 'right', body: rich(list(['EIG envisions Pakistan as a significant player in the meat export market.', 'Strategic investments in infrastructure and capacity will facilitate easier meat exports.', 'Meeting international demand can drive agricultural advancement and economic prosperity.'])) },
    { heading: 'Corporate Farming (Mudarabah): Collaboration for Agricultural Efficiency', imageAlt: 'Corporate Farming', imagePosition: 'left', body: rich(list(['Corporate farming involves partnerships between capital investors and labor contributors.', 'This Islamic financial plan encourages technology adoption and sustainable growth.', 'Corporate farming supports better resource utilization, fair profit sharing, and increased agricultural production.'])) },
  ]
  const featureBlocks = await Promise.all(agricultureFeatures.map(async (feature, index) => ({
    blockType: 'agricultureFeature',
    sectionId: `agriculture-feature-${index + 1}`,
    heading: feature.heading,
    image: await mediaFor(feature.imageAlt) ?? image.id,
    imageAlt: feature.imageAlt,
    imagePosition: feature.imagePosition,
    body: feature.body,
    buttons: [{ blockType: 'primaryButton', label: 'Get started', url: 'https://api.whatsapp.com/send?phone=9242111111333' }],
  })))
  const investmentGuide = {
    blockType: 'richTextBlock',
    sectionId: 'agriculture-investment-guide',
    heading: 'Agriculture Investment Guide',
    background: 'white',
    showAccentBar: true,
    body: rich(
      paragraph(text('Pakistan’s agriculture sector employs nearly 40% of the national workforce, yet it remains one of the most underinvested areas of the economy relative to its actual economic potential. That gap is exactly where '), text('agriculture investment in Pakistan', 1), text(' becomes interesting — not as a nostalgic or purely social cause, but as a genuine, underexplored opportunity.')),
      paragraph(text('EIG’s agriculture initiatives, led through Enri-Farms, focus on exactly this: bringing modern technology, sustainable practices, and structured investment models to a sector that badly needs both capital and better methods.')),
      { type: 'heading', tag: 'h3', version: 1, children: [text('Why Smart Agriculture Is Gaining Investor Attention in Pakistan')], direction: 'ltr', format: '', indent: 0 },
      paragraph(text('A few forces are converging to make '), text('smart agriculture in Pakistan', 1), text(' a genuinely growing space:')),
      list(['Rising food security concerns as population growth outpaces traditional farming yields', 'Increasing adoption of drone, sensor, and AI-based monitoring tools that were previously only viable in large commercial farming markets abroad', 'Growing export demand for high-quality Pakistani agricultural products, provided grading and quality standards keep improving', 'Government and private-sector interest in reducing dependency on imported food staples']),
      { type: 'heading', tag: 'h3', version: 1, children: [text('Corporate Farming and Mudarabah — An Islamic Approach to Agricultural Investment')], direction: 'ltr', format: '', indent: 0 },
      paragraph(text('One of the more distinctive aspects of EIG’s agriculture strategy is its use of '), text('Mudarabah', 1), text(', an Islamic partnership-based financing structure where capital investors (Rabb-ul-mal) and working partners (Mudarib) share both effort and profit fairly. For investors specifically looking for Shariah-compliant ways to participate in Pakistan’s agricultural growth, this model offers a structured, transparent alternative to conventional lending-based farm financing.')),
      { type: 'heading', tag: 'h3', version: 1, children: [text('From Seed Banking to Export: The Full Agricultural Value Chain')], direction: 'ltr', format: '', indent: 0 },
      paragraph(text('Agriculture investment isn’t just about growing more — it’s about growing '), text('better', 2), text(' and getting produce to market efficiently. That’s why initiatives like seed banking (preserving resilient crop varieties for long-term food security), produce grading (ensuring farmers get fairly compensated for quality), and export-oriented cultivation (connecting Pakistani farmers to international demand) all matter as part of one connected strategy, not isolated projects.')),
      { type: 'heading', tag: 'h3', version: 1, children: [text('Dairy, Livestock, and the Road to Meat Export')], direction: 'ltr', format: '', indent: 0 },
      paragraph(text('Beyond crops, corporate dairy farming and improved livestock practices represent a significant, often overlooked opportunity in Pakistani agriculture. With rising domestic demand for quality dairy and a genuine long-term opportunity in international meat export markets, this is an area where structured investment and better infrastructure can meaningfully shift outcomes for farmers and investors alike.')),
      { type: 'heading', tag: 'h3', version: 1, children: [text('Is Agricultural Investment Right for You?')], direction: 'ltr', format: '', indent: 0 },
      paragraph(text('Agriculture investment tends to suit investors thinking in longer time horizons rather than quick returns — this is a sector where infrastructure, technology adoption, and market access take time to compound into real results. If you’re looking to diversify away from purely financial-market investments and want exposure to a sector with genuine national importance, it’s worth a serious look.')),
      paragraph(text('Interested in learning more about EIG’s agriculture investment opportunities? '), link('Reach out to our team', 'https://enrichers.com.pk/contact-us/'), text(' to discuss how Enri-Farms’ initiatives align with your investment goals.')),
    ),
  }
  const agricultureFaq = {
    blockType: 'faqAccordion',
    sectionId: 'agriculture-faq',
    eyebrow: 'Frequently asked questions',
    heading: 'Agriculture investment FAQs',
    items: [
      { question: "How does EIG play a role towards Pakistan's future of agriculture?", answer: 'EIG is leading sustainable growth in Pakistani agriculture through innovative farming practices, water conservation in agriculture, and soil health improvement. By adopting smart farming platforms, advanced irrigation, and cultivation that benefits the soil, we enable farmers to attain increased productivity while maintaining long-term food security.' },
      { question: 'What role does smart agriculture play in your initiatives?', answer: 'We place smart agriculture at the center of our strategy. We bring technology to agriculture using drones, sensors, and AI to track crop health, streamline irrigation, and increase farm management efficiency. These tools lead to increased yields, sustainability and resource conservation.' },
      { question: 'How does EIG facilitate dairy and livestock farming in Pakistan?', answer: 'EIG is investing in advanced dairy farming methods and animal breeding to increase quality and productivity. Our corporate dairy farming in Pakistan provides a year-round supply of high-quality milk, while livestock farming practices support food security, rural incomes and long-term economic stability.' },
      { question: 'How is EIG going to export meat and enter into the global market?', answer: 'EIG believes Pakistan has the potential to become a leading halal meat export nation. By supporting meat exporters with infrastructure, grading and international standards, we can link domestic farmers with foreign markets, generate new revenues and make Pakistan a stronger participant in meat export.' },
      { question: 'How does Mudarabah investment benefit sustainable farm management?', answer: 'Through farm Mudarabah plans, EIG brings farmers and investors together in an equal-profit-sharing association. This approach improves farm management efficiency, promotes smart agriculture adoption and offers long-term agricultural development opportunities to working partners and capital investors.' },
      { question: 'What kinds of agriculture initiatives does Enrichers undertake in Pakistan?', answer: 'Enrichers focuses on sustainable farming practices, smart agriculture using drones, sensors and AI, seed banking, export-oriented cultivation, grading of produce, and corporate dairy and livestock farming.' },
      { question: 'How does Enrichers use technology in its agriculture projects?', answer: 'We integrate smart irrigation systems, drones and sensors for crop-health monitoring, AI-based farm management, and data-driven soil and water health protocols to maximise yield while conserving resources.' },
      { question: 'What role does Enrichers play in export-oriented cultivation of crops?', answer: 'Enrichers targets high-demand crops for global markets and promotes grading and quality control of agricultural produce so farmers earn fair compensation and Pakistan’s exports grow.' },
      { question: 'How does Enrichers support dairy, livestock and allied agriculture in Pakistan?', answer: 'Through corporate dairy farming and enhanced livestock productivity practices, Enrichers helps improve the supply of high-quality milk, supports farmer up-skilling and strengthens the livestock sector.' },
    ],
  }
  const forms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const form = forms.docs[0]
  if (!form) throw new Error('Investor enquiries form was not found. Run npm run seed:home first.')

  const layout = [{
    blockType: 'marketHero',
    eyebrow: 'Agriculture',
    heading: 'Agriculture',
    headingLineOne: 'Agriculture',
    headingLineTwo: '',
    headingLineThree: '',
    body: 'Sustainable agriculture initiatives designed to strengthen productivity, food security and long-term growth in Pakistan.',
    showButtons: false,
    buttons: [],
    heroImage: image.id,
    badges: [],
  }, {
    blockType: 'consultationShowcase',
    sectionId: 'consultation',
    eyebrow: 'Free consultation',
    heading: 'Get free consultation today',
    subheading: 'Tell us what you want to build in agriculture and our team will call you.',
    phone: '(042) 111 111 333',
    phoneHref: 'tel:+9242111111333',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
    whatsappLabel: 'WhatsApp our client support',
    hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
    formStepLabel: 'Step 1 of 4 · Demo — nothing is submitted',
    formHeading: 'Let’s understand your agriculture goal',
    formIntro: 'A few quick questions help us prepare the right conversation.',
    form: form.id,
    images: carouselImages,
    intervalSeconds: 3,
  }, {
    blockType: 'businessIntro',
    heading: 'Sustainability in Pakistani Agriculture',
    body: 'EIG recognizes the crucial role of sustainable practices in ensuring the long-term viability of Pakistan’s agricultural sector. Our initiatives are designed to not only enhance productivity and economic gain but also to protect the environment and conserve precious resources for future generations.',
    buttons: [{ blockType: 'primaryButton', label: 'Get started', url: 'https://api.whatsapp.com/send?phone=9242111111333' }],
  }, {
    blockType: 'benefitsGrid',
    sectionId: 'sustainability-practices',
    heading: 'Sustainability practices',
    showHeader: false,
    background: 'sunken',
    items: [
      { title: 'Water Conservation', body: 'Smart irrigation techniques promoted through our smart agriculture initiatives like center pivot irrigation systems aim to optimize water usage, minimizing waste and ensuring long-term water security.' },
      { title: 'Soil Health', body: 'Encouraging practices like crop rotation and organic farming helps maintain soil fertility and reduce dependence on chemical fertilizers, leading to healthier crops and a more balanced ecosystem.' },
    ],
  }, ...featureBlocks, investmentGuide, agricultureFaq]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'agriculture' } }, limit: 1 })
  const data = { title: 'Agriculture', slug: 'agriculture', layout } as never
  const context = { context: { skipRevalidate: true } }
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
  else await payload.create({ collection: 'pages', data, ...context })
  payload.logger.info('Seeded the Agriculture MarketHero')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
