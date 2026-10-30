import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })
  const forms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const form = forms.docs[0]
  if (!form) throw new Error('Investor enquiries form was not found. Run npm run seed:home first.')
  const partnershipForms = await payload.find({ collection: 'forms', where: { title: { equals: 'Arid land partnership enquiries' } }, limit: 1 })
  const partnershipForm = partnershipForms.docs[0]
    ? await payload.update({
        collection: 'forms',
        id: partnershipForms.docs[0].id,
        data: {
          title: 'Arid land partnership enquiries',
          fields: [
            { blockType: 'text', name: 'name', label: 'Name', required: true },
            { blockType: 'text', name: 'phone', label: 'Phone', required: true },
            { blockType: 'email', name: 'email', label: 'Email (optional)' },
            { blockType: 'select', name: 'topic', label: "I'm interested in", options: [
              { label: 'Arid land & agriculture', value: 'arid-land-agriculture' },
              { label: 'Stock broking (PSX)', value: 'stock-broking' },
              { label: 'Commodity brokerage (PMEX)', value: 'commodity-brokerage' },
              { label: 'Business brokerage', value: 'business-brokerage' },
              { label: 'Tourism & hospitality', value: 'tourism-hospitality' },
              { label: 'Strategic partnership', value: 'strategic-partnership' },
              { label: 'Something else', value: 'something-else' },
            ] },
            { blockType: 'textarea', name: 'message', label: 'Message' },
          ],
          submitButtonLabel: 'Send message', confirmationType: 'message', confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ text: 'Thank you. We will be in touch shortly.', type: 'text' }] }] } }, emails: [],
        } as any,
      })
    : await payload.create({
        collection: 'forms',
        data: {
          title: 'Arid land partnership enquiries',
          fields: [
            { blockType: 'text', name: 'name', label: 'Name', required: true },
            { blockType: 'text', name: 'phone', label: 'Phone', required: true },
            { blockType: 'email', name: 'email', label: 'Email (optional)' },
            { blockType: 'select', name: 'topic', label: "I'm interested in", options: [
              { label: 'Arid land & agriculture', value: 'arid-land-agriculture' }, { label: 'Stock broking (PSX)', value: 'stock-broking' }, { label: 'Commodity brokerage (PMEX)', value: 'commodity-brokerage' }, { label: 'Business brokerage', value: 'business-brokerage' }, { label: 'Tourism & hospitality', value: 'tourism-hospitality' }, { label: 'Strategic partnership', value: 'strategic-partnership' }, { label: 'Something else', value: 'something-else' },
            ] },
            { blockType: 'textarea', name: 'message', label: 'Message' },
          ],
          submitButtonLabel: 'Send message', confirmationType: 'message', confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ text: 'Thank you. We will be in touch shortly.', type: 'text' }] }] } }, emails: [],
        } as any,
      })

  const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'Arid land development' } }, limit: 1 })
  const image = existingMedia.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'Arid land development' },
    filePath: path.resolve(dirname, '../public/brand/arid-land.webp'),
  })
  const existingFieldsImage = await payload.find({ collection: 'media', where: { alt: { equals: 'Turning barren landscapes into flourishing fields' } }, limit: 1 })
  const fieldsImage = existingFieldsImage.docs[0] ?? await payload.create({
    collection: 'media',
    data: { alt: 'Turning barren landscapes into flourishing fields' },
    filePath: path.resolve(dirname, '../public/brand/arid-fields.webp'),
  })

  const layout = [{
    blockType: 'serviceHero',
    theme: 'dark',
    heroVariant: 'standard',
    breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Arid Land Development', url: '' }],
    eyebrow: 'Real assets · Enrichers Developers (Pvt.) Ltd.',
    heading: 'Arid land development Turning barren landscapes into flourishing fields.',
    headingAccent: 'Turning barren landscapes into flourishing fields.',
    body: "Enrichers' Arid Land Development turns arid land into productive farmland. Through smart innovation and sustainable practices, we help grow real value — boosting returns and uplifting local communities along the way.",
    primary: { label: 'Talk to us about partnering', url: '#consultation', variant: 'primary' },
    secondary: { label: 'What we deliver', url: '#deliverables', variant: 'secondary' },
    badges: [],
  }, {
    blockType: 'sectionNavigation',
    ariaLabel: 'On this page',
    links: [
      { label: 'Our values', anchor: 'values', active: true },
      { label: 'Deliverables', anchor: 'deliverables' },
      { label: 'Crops', anchor: 'crops' },
      { label: 'FAQ', anchor: 'faq' },
    ],
    cta: { label: 'Partner with us', url: '#consultation' },
  }, {
    blockType: 'consultationShowcase',
    sectionId: 'consultation',
    eyebrow: 'Free consultation',
    heading: 'Get free consultation today',
    subheading: 'Tell us how you want to develop productive farmland and our team will call you.',
    phone: '(042) 111 111 333',
    phoneHref: 'tel:+9242111111333',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
    whatsappLabel: 'WhatsApp our client support',
    hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
    formStepLabel: 'Step 1 of 4 · Demo — nothing is submitted',
    formHeading: 'Let’s understand your land-development goal',
    formIntro: 'A few quick questions help us prepare the right conversation.',
    form: form.id,
    images: [
      { image: image.id, alt: 'Arid land development' },
      { image: fieldsImage.id, alt: 'Turning barren landscapes into flourishing fields' },
    ],
    intervalSeconds: 3,
  }, {
    blockType: 'serviceOfferings',
    sectionId: 'deliverables',
    eyebrow: '',
    heading: 'Our Deliverables',
    body: 'Against sweat equity partnership, EIG will be providing following services;',
    background: 'light',
    columns: '2',
    items: [
      {
        title: 'Land Acquisition',
        details: [
          { label: 'To facilitate in the selection of land after due diligence' },
          { label: 'To ensure legitimate transfer of ownership and smooth possession' },
          { label: 'To provide cover to our partners' },
        ],
      },
      {
        title: 'Land Development',
        details: [
          { label: 'Strategic research in Agricultural Engineering Contouring and balancing land through various techniques and methods' },
          { label: 'Deploying best-suited irrigation methods' },
          { label: 'Treating soil characteristics' },
          { label: 'Building agri-tourism sites and superstructures like Dams, Processing Units, Cold Storage etc.' },
        ],
      },
      {
        title: 'Supply Chain Management',
        details: [
          { label: 'Import of best seeds, machines or technology' },
          { label: 'Utilizing EIG exposure of exports' },
          { label: 'Conducting own researches for HYVs' },
          { label: 'Processing organic fertilizers on farm' },
          { label: 'Building rain water harvesting ponds' },
        ],
      },
      {
        title: 'Farm Management',
        details: [
          { label: 'Ensuring the proper management of land and yield' },
          { label: 'Research based value addition' },
          { label: 'Provision of labor, supplies, mechanization and equipment' },
          { label: 'Exploring prospects of agriculture allied industry' },
          { label: 'Keeping, updating, and sharing books in transparency with partners' },
        ],
      },
    ],
  }, {
    blockType: 'splitContentList',
    sectionId: 'crops',
    leftHeading: 'Operational Efficiency and Precision',
    leftBody: 'EIG’s strategic presence across multiple regions in Pakistan allows for precise and efficient management of land parcels. We actively cultivate crops in various locations, including;',
    rightHeading: 'Diverse Crop Cultivation',
    rightBody: 'Our commitment to sustainable agriculture extends to cultivating a wide range of crops, including;',
    rightItems: [
      { label: 'Rice' },
      { label: 'Wheat' },
      { label: 'Mustard' },
      { label: 'Sugar Cane' },
      { label: 'Peanuts' },
      { label: 'Potatoes' },
    ],
  }, {
    blockType: 'benefitsGrid',
    sectionId: 'values',
    eyebrow: 'Sustainable Farming',
    heading: 'Our Values',
    body: 'Max Returns with Eco-care',
    background: 'sunken',
    items: [
      { title: 'Innovation', body: 'Advanced Efficiency Boosts Yield.' },
      { title: 'Collaboration', body: 'Shared Knowledge, Empowered Communities.' },
      { title: 'Empowerment', body: 'Fairness, Gender Equality in Rural.' },
    ],
  }, {
    blockType: 'imageTextFeature',
    heading: 'Turning barren landscapes into flourishing fields',
    body: 'Enrichers Investment Group’s Arid Land Development initiative breathes life into Pakistan’s untapped potential. We are committed to harnessing the power of innovation and collaboration to transform arid lands into thriving agricultural hubs, fostering economic growth, creating jobs, and enhancing food security for generations to come.',
    image: fieldsImage.id,
    imageAlt: 'Turning barren landscapes into flourishing fields',
  }, {
    blockType: 'businessIntro',
    heading: 'Arid Land Development',
    body: 'Enrichers’ Arid Land Development is all about turning arid land into productive farmland. Through smart innovation and sustainable practices, we help grow real value — boosting returns and uplifting local communities along the way.',
    buttons: [{ blockType: 'primaryButton', label: 'Get started', url: 'https://api.whatsapp.com/send?phone=9242111111333' }],
  }, {
    blockType: 'imageTextFeature',
    eyebrow: 'Why arid land',
    heading: "Unlocking Pakistan's untapped land",
    body: 'Enrichers Investment Group sees arid land as one of Pakistan’s largest untapped resources.\n\nBringing it into production creates agricultural hubs, economic growth and jobs, and strengthens long-term food security.',
    image: fieldsImage.id,
    imageAlt: 'Turning barren landscapes into flourishing fields',
    imagePosition: 'right',
    background: 'surface',
  }, {
    blockType: 'faqAccordion',
    sectionId: 'faq',
    heading: 'Frequently Asked Questions',
    items: [
      { question: 'What is the development of arid land in Pakistan?', answer: 'Arid Land Development in Pakistan is the process of turning dry or barren land into useful cropland. Enrichers helps farmers and investors cultivate profitable crops in Pakistan’s dry areas by offering expert services in land acquisition, soil management, and irrigation.' },
      { question: 'How does Enrichers help farmers in Pakistan\'s dry areas farm in a way that is good for the environment?', answer: 'Enrichers helps Pakistan’s farms stay sustainable by using innovative irrigation methods, collecting rainwater, treating the soil, and growing a variety of crops. These strategies protect Pakistan’s natural resources while keeping them productive over the long run.' },
      { question: 'What kinds of crops are planted in Pakistan\'s Arid Land Development projects?', answer: 'Enrichers has the expertise to cultivate a wide diversity of crops such as rice, wheat, sugarcane, mustard, peanuts, and potatoes. Many of these crops are farmed for both local use and export, which helps Pakistan’s agricultural economy.' },
      { question: 'Why is it vital for Pakistan\'s agriculture sector to develop arid land?', answer: 'Arid Land Development is very important for Pakistan since it boosts food security, provides jobs, and improves exports. Enrichers helps Pakistan’s economy flourish and its rural areas improve by turning unproductive land into productive farms.' },
      { question: 'Why is arid land development important for Pakistan’s economy?', answer: 'Because Pakistan has large areas of uncultivated, arid or semi-arid land, which — if developed properly — can boost food security, generate jobs and increase agricultural exports. Arid land development is a strategic way to transform unproductive land into value-creating assets.' },
    ],
  }]

  const hero = layout.find((block: any) => block.blockType === 'serviceHero') as any
  const navigation = layout.find((block: any) => block.blockType === 'sectionNavigation') as any
  const mediaContent = layout.find((block: any) => block.blockType === 'imageTextFeature' && block.eyebrow === 'Why arid land') as any
  const values = layout.find((block: any) => block.blockType === 'benefitsGrid') as any
  const deliverables = layout.find((block: any) => block.blockType === 'serviceOfferings') as any
  const crops = layout.find((block: any) => block.blockType === 'splitContentList') as any
  const consultation = layout.find((block: any) => block.blockType === 'consultationShowcase') as any
  const faq = layout.find((block: any) => block.blockType === 'faqAccordion') as any

  values.eyebrow = 'Our values'
  values.heading = 'How we work the land'
  values.body = ''
  values.items = [
    { title: 'Sustainable farming', body: 'Maximising returns while caring for the environment.' },
    { title: 'Innovation', body: 'Improving yields through efficiency.' },
    { title: 'Collaboration', body: 'Sharing knowledge and empowering communities.' },
    { title: 'Empowerment', body: 'Promoting fairness and gender equality in rural areas.' },
  ]
  deliverables.eyebrow = 'Sweat-equity partnership'
  deliverables.heading = 'What we deliver for our partners'
  deliverables.body = 'Four groups of work, from finding the land to sharing the books.'
  deliverables.items = [
    { title: 'Land acquisition', details: [{ label: 'Selection of land after due diligence' }, { label: 'Legitimate transfer of ownership and smooth possession' }, { label: 'Cover for our partners' }] },
    { title: 'Land development', details: [{ label: 'Research in agricultural engineering; contouring and balancing land' }, { label: 'Best-suited irrigation methods' }, { label: 'Treating soil characteristics' }, { label: 'Agri-tourism sites and superstructures (dams, processing units, cold storage)' }] },
    { title: 'Supply chain management', details: [{ label: 'Import of the best seeds, machines and technology' }, { label: "Utilising EIG's export exposure" }, { label: 'Own research for high-yield varieties' }, { label: 'On-farm organic fertiliser processing' }, { label: 'Rain-water harvesting ponds' }] },
    { title: 'Farm management', details: [{ label: 'Proper management of land and yield' }, { label: 'Research-based value addition' }, { label: 'Labour, supplies, mechanisation and equipment' }, { label: 'Transparent books shared with partners' }] },
  ]
  crops.leftHeading = 'Diverse crop cultivation'
  crops.leftBody = 'Our presence across regions supports precise land management and active cultivation at multiple sites.'
  crops.rightHeading = 'Crops grown across Pakistan'
  crops.rightBody = 'Our current crop cultivation includes:'
  consultation.eyebrow = 'Partner with us'
  consultation.heading = 'Talk to us about a land partnership'
  consultation.subheading = 'Tell us about your land or your investment goals and our team will call you.'
  const consultationForm = {
    blockType: 'consultationQualifier',
    sectionId: 'consultation',
    eyebrow: 'Partner with us',
    heading: 'Talk to us about a land partnership',
    subheading: 'Tell us about your land or your investment goals and our team will call you.',
    phone: '(042) 111 111 333',
    phoneHref: 'tel:+9242111111333',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
    whatsappLabel: 'WhatsApp our client support',
    hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
    formMode: 'singlePage',
    formStepLabel: 'Demo form — nothing is submitted from this preview.',
    formHeading: "Let's find the right investment path for you",
    formIntro: "Just a few quick questions, so we don't waste your time.",
    form: partnershipForm.id,
  }
  faq.heading = 'Arid land development FAQs'
  faq.items = [
    { question: 'What is arid land development?', answer: 'Arid land development is the process of turning dry or barren land into productive farmland through careful planning, soil improvement and sustainable irrigation.' },
    { question: 'How does it stay environmentally sustainable?', answer: 'We combine efficient irrigation, soil treatment, rainwater harvesting and research-led farming to protect natural resources while improving yields.' },
    { question: 'Which crops are grown?', answer: 'Our cultivation includes rice, wheat, mustard, sugar cane, peanuts and potatoes across several regions of Pakistan.' },
    { question: 'Why does arid land development matter for Pakistan?', answer: 'It can strengthen food security, create rural jobs, support exports and turn underused land into productive long-term assets.' },
  ]

  const explorer = {
    // Replace the older tabbed group explorer with the shared four-card
    // reference block used across the updated service pages.
    blockType: 'businessGroupCards',
    eyebrow: 'Enrichers Investment Group',
    heading: 'The rest of the group',
    body: 'Brokerage, real assets, agriculture and hospitality under one group.',
    items: [
      { eyebrow: 'Advisory', title: 'Business Brokerage', subtitle: 'Enrichers Business Brokerage', body: 'Mergers & acquisitions, buying and selling businesses, franchise brokerage and valuation.', url: '/business-brokerage', icon: 'document' },
      { eyebrow: 'Agriculture', title: 'Agriculture', subtitle: 'Enri-Farms', body: 'Smart agriculture, seed banking, export cultivation, dairy and Mudarabah corporate farming.', url: '/agriculture', icon: 'agriculture' },
      { eyebrow: 'Agriculture', title: 'Agriculture Research Centre', subtitle: 'Baab-ul-Ilm', body: 'An institute of agriculture sciences and research tackling challenges in the agri-food system.', url: '/school-of-agriculture-research-centre', icon: 'research' },
      { eyebrow: 'Hospitality', title: 'Tourism & Hospitality', body: "Unlocking Northern Pakistan's tourism potential, starting with a 5-star hotel in Skardu.", url: '/tourism-hospitality', icon: 'hospitality' },
    ],
  }
  const liveLayout = [hero, navigation, mediaContent, values, deliverables, crops, consultationForm, faq, explorer]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'arid-land-development' } }, limit: 1 })
  const data = { title: 'Arid Land Development', slug: 'arid-land-development', layout: liveLayout } as never
  const context = { context: { skipRevalidate: true } }
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
  else await payload.create({ collection: 'pages', data, ...context })
  payload.logger.info('Seeded the Arid Land Development consultation showcase')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
