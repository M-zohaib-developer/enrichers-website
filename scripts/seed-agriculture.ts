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
    blockType: 'faqAccordion',
    sectionId: 'guide',
    eyebrow: 'Agriculture investment guide',
    heading: 'Investing in Pakistani agriculture',
    body: 'Why smart agriculture is drawing investors, how Mudarabah partnerships work, and who agricultural investment suits. The guide from our current site.',
    items: [
      { question: 'Why smart agriculture is gaining investor attention', answer: 'Food security concerns, affordable monitoring technology, export demand and the need to rely less on imported staples are all drawing capital to the sector.' },
      { question: 'Corporate farming and Mudarabah', answer: 'Mudarabah is an Islamic partnership in which capital and labour share the profit. It offers Shariah-conscious investors a transparent alternative to conventional lending.' },
      { question: 'From seed banking to export', answer: 'Seed banking, produce grading and export cultivation form one connected value chain: better seed, fairer prices for quality, and access to global markets.' },
      { question: 'Dairy, livestock and the road to meat export', answer: 'Structured investment and infrastructure improve outcomes for both farmers and investors, from milk supply today to meat export in future.' },
      { question: 'Is agricultural investment right for you?', answer: 'It suits investors with a longer time horizon who want diversification and exposure to an industry of national importance. Talk to our team before you decide.' },
    ],
  }
  const agricultureFaq = {
    blockType: 'faqAccordion',
    sectionId: 'faq',
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
  const agricultureFormFields = [
    { blockType: 'text', name: 'name', label: 'Name', required: true },
    { blockType: 'text', name: 'phone', label: 'Phone', required: true },
    { blockType: 'email', name: 'email', label: 'Email (optional)' },
    { blockType: 'select', name: 'topic', label: "I'm interested in", required: true, options: [
      { label: 'Arid land & agriculture', value: 'arid-land-agriculture' },
      { label: 'Stock broking (PSX)', value: 'stock-broking' },
      { label: 'Commodity brokerage (PMEX)', value: 'commodity-brokerage' },
      { label: 'Business brokerage', value: 'business-brokerage' },
      { label: 'Tourism & hospitality', value: 'tourism-hospitality' },
      { label: 'Strategic partnership', value: 'strategic-partnership' },
      { label: 'Something else', value: 'something-else' },
    ] },
    { blockType: 'textarea', name: 'message', label: 'Message' },
  ]
  const agricultureForms = await payload.find({ collection: 'forms', where: { title: { equals: 'Agriculture investment enquiries' } }, limit: 1 })
  const agricultureForm = agricultureForms.docs[0]
    ? await payload.update({ collection: 'forms', id: agricultureForms.docs[0].id, data: { title: 'Agriculture investment enquiries', fields: agricultureFormFields, submitButtonLabel: 'Send message', confirmationType: 'message', confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', version: 1, text: 'Thank you. We will be in touch shortly.' }] }] } }, emails: [] } as any })
    : await payload.create({ collection: 'forms', data: { title: 'Agriculture investment enquiries', fields: agricultureFormFields, submitButtonLabel: 'Send message', confirmationType: 'message', confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ type: 'text', version: 1, text: 'Thank you. We will be in touch shortly.' }] }] } }, emails: [] } as any })

  const mudarabahImage = await mediaFor('Corporate Farming') ?? image.id
  const layout = [{
    blockType: 'serviceHero',
    theme: 'dark',
    heroVariant: 'standard',
    breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Agriculture' }],
    eyebrow: 'Agriculture · Enri-Farms',
    heading: 'Agriculture Sustainable by design.',
    headingAccent: 'Sustainable by design.',
    body: "EIG recognizes the crucial role of sustainable practices in ensuring the long-term viability of Pakistan's agricultural sector — enhancing productivity while protecting the environment and conserving resources for future generations.",
    primary: { blockType: 'primaryButton', label: 'Book a consultation', url: '#consultation', variant: 'primary' },
    secondary: { blockType: 'secondaryButton', label: 'Our initiatives', url: '#initiatives', variant: 'secondary' },
    badges: [],
  }, {
    blockType: 'sectionNavigation',
    ariaLabel: 'On this page',
    links: [
      { label: 'Sustainability', anchor: 'sustainability', active: true },
      { label: 'Initiatives', anchor: 'initiatives' },
      { label: 'Mudarabah', anchor: 'mudarabah' },
      { label: 'Guide', anchor: 'guide' },
      { label: 'FAQ', anchor: 'faq' },
    ],
    cta: { label: 'Book a consultation', url: '#consultation' },
  }, {
    blockType: 'businessIntro',
    heading: 'Sustainability in Pakistani agriculture',
    body: 'Raising productivity while protecting the resources it depends on.',
  }, {
    blockType: 'benefitsGrid',
    sectionId: 'sustainability',
    eyebrow: 'Sustainability',
    heading: 'Sustainability in Pakistani agriculture',
    body: 'Raising productivity while protecting the resources it depends on.',
    showHeader: true,
    background: 'surface',
    items: [
      { title: 'Water conservation', body: 'Smart irrigation, such as centre-pivot systems, reduces waste and supports long-term water security.' },
      { title: 'Soil health', body: 'Crop rotation and organic farming maintain fertility and reduce reliance on chemical fertilisers.' },
    ],
  }, {
    blockType: 'serviceOfferings',
    sectionId: 'initiatives',
    eyebrow: 'Initiatives',
    heading: 'From seed to export',
    body: 'Seven connected initiatives across the agricultural value chain. Meat export is a future plan.',
    columns: '3',
    background: 'light',
    items: [
      { title: 'Smart agriculture', body: 'Drones, sensors and AI monitor crop health and optimise irrigation, with methods tailored to each soil.' },
      { title: 'Seed banking', body: 'Storing crop seeds for long-term food security, giving farmers resilient, adaptable varieties.' },
      { title: 'Export-oriented cultivation', body: 'Growing high-demand crops for global markets, earning foreign exchange and creating jobs.' },
      { title: 'Grading in produce', body: 'Grading raises market value so farmers are paid fairly for quality.' },
      { title: 'Corporate dairy farming', body: 'Large-scale dairy using best practice for a steady supply of high-quality milk.' },
      { title: 'Livestock', body: 'Better breeding, feed, welfare and healthcare to raise productivity for food and livelihoods.' },
      { title: 'Meat export · future plan', body: 'Infrastructure and capacity for a competitive presence in the global halal meat market.' },
    ],
  }, {
    blockType: 'agricultureFeature',
    sectionId: 'mudarabah',
    eyebrow: 'Corporate farming',
    heading: 'Mudarabah: partnership in place of lending',
    body: rich(paragraph(text('Enrichers is exploring corporate farming on the Mudarabah model, a Shariah-compliant partnership that encourages technology adoption and sustainable growth.'))),
    image: mudarabahImage,
    imageAlt: 'Corporate farming partnership',
    imagePosition: 'right',
  }, {
    blockType: 'consultationQualifier',
    sectionId: 'consultation',
    eyebrow: 'Free consultation',
    heading: 'Talk to us about agricultural investment',
    subheading: 'Agriculture suits a longer time horizon. Our team will walk you through the options.',
    phone: '(042) 111 111 333', phoneHref: 'tel:+9242111111333',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333', whatsappLabel: 'WhatsApp our client support',
    hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
    formMode: 'singlePage', form: agricultureForm.id,
  }, investmentGuide, agricultureFaq, {
    blockType: 'businessGroupCards',
    eyebrow: 'Enrichers Investment Group', heading: 'The rest of the group', body: 'Brokerage, real assets, agriculture and hospitality under one group.',
    items: [
      { eyebrow: 'Advisory', title: 'Business Brokerage', subtitle: 'Enrichers Business Brokerage', body: 'Mergers & acquisitions, buying and selling businesses, franchise brokerage and valuation.', url: '/business-brokerage', icon: 'document' },
      { eyebrow: 'Real assets', title: 'Arid Land Development', subtitle: 'Enrichers Developers (Pvt.) Ltd.', body: 'Turning arid land into productive farmland.', url: '/arid-land-development', icon: 'development' },
      { eyebrow: 'Agriculture', title: 'Agriculture Research Centre', subtitle: 'Baab-ul-Ilm', body: 'Research and training for a more productive agricultural future.', url: '/school-of-agriculture-research-centre', icon: 'agriculture' },
      { eyebrow: 'Hospitality', title: 'Tourism & Hospitality', body: 'Unlocking Northern Pakistan’s tourism potential.', url: '/tourism-hospitality', icon: 'hospitality' },
    ],
  }]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'agriculture' } }, limit: 1 })
  const data = { title: 'Agriculture', slug: 'agriculture', layout } as never
  const context = { context: { skipRevalidate: true } }
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
  else await payload.create({ collection: 'pages', data, ...context })
  payload.logger.info('Seeded the Agriculture MarketHero')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
