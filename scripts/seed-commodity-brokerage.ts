import 'dotenv/config'

import { getPayload } from 'payload'
import config from '../src/payload.config'

const run = async () => {
  const payload = await getPayload({ config })
  const existingForms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const consultationForm = existingForms.docs[0]
  if (!consultationForm) throw new Error('Investor enquiries form was not found. Run npm run seed:home first.')

  const layout = [
    {
      blockType: 'serviceHero',
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: 'Commodity Brokerage', url: '' },
      ],
      eyebrow: 'Enrichers (Pvt.) Ltd.',
      heading: 'Commodity brokerage on PMEX',
      body: 'A full-scale futures broker with a Centralized Trading Unit — so you\'re never left guessing about margin calls, rollovers or settlement.',
      primary: { label: 'Open a PMEX account', url: '/open-account', variant: 'primary' },
      secondary: { label: 'Talk to an advisor', url: '#consultation', variant: 'secondary' },
      badges: [{ label: 'PMEX corporate member' }, { label: 'SECP regulated' }],
    },
    {
      blockType: 'sectionNavigation',
      ariaLabel: 'On this page',
      links: [
        { label: 'Product range', anchor: 'products', active: true },
        { label: 'Documents', anchor: 'documents' },
        { label: 'Consultation', anchor: 'consultation' },
        { label: 'FAQ', anchor: 'faq' },
      ],
      cta: { label: 'Open a PMEX account', url: '/open-account' },
    },
    {
      blockType: 'productRange',
      sectionId: 'products',
      eyebrow: 'Product range',
      heading: 'Futures, currencies and US indices',
      body: 'EPL offers four categories — metal, energy, agriculture and financials — through PMEX.',
      tabs: [
        {
          label: 'Deliverable futures',
          quote: 'Profiting is managing your risk.',
          features: [
            { term: 'Hassle-free', description: "EPL's physical deliverable futures offer hassle-free trading." },
            { term: 'Authentic', description: 'Actual delivery of settlement ensures reliability and authenticity.' },
            { term: 'Flexible', description: 'Flexible liquidation options for effortless P&L management.' },
            { term: 'Versatile', description: 'Suitable for producers, processors, and consumers across industries.' },
          ],
        },
        {
          label: 'Cash-settled futures',
          quote: 'Profiting is managing your risk.',
          features: [
            { term: 'No delivery', description: 'Liberates traders from physical commodity delivery obligations.' },
            { term: 'Cash only', description: 'Settlement occurs solely in cash, eliminating physical transactions.' },
            { term: 'Flexible exit', description: "Liquidate positions at expiration or at the trader's discretion." },
            { term: '4 categories', description: 'Metal, energy, agriculture, and financials.' },
          ],
        },
        {
          label: 'Currencies',
          quote: 'Profiting is managing your risk.',
          features: [
            { term: 'Lot size', description: 'Traded in lots of 100,000 units of the base currency (e.g. 1 lot EUR/USD = 100,000 euros).' },
            { term: 'Margin', description: 'Minimum margin is set by PMEX and EPL, typically around 1% of total trade value.' },
            { term: 'Know your exposure', description: 'Understanding lot sizes and margin requirements is crucial for managing trades.' },
          ],
        },
        {
          label: 'US index futures',
          features: [
            { term: 'Priced in US dollars', description: 'Trade the future direction of major US indices through PMEX.' },
          ],
          table: {
            caption: 'PMEX contract specifications',
            columns: [{ label: 'Index' }, { label: 'One lot' }, { label: 'Minimum tick' }],
            rows: [
              { cells: [{ value: 'NASDAQ-100' }, { value: '$20 × index' }, { value: '0.25 index points' }] },
              {
                cells: [
                  { value: 'Dow Jones Industrial Average' },
                  { value: '$10 × index' },
                  { value: '1.00 index point' },
                ],
              },
              { cells: [{ value: 'S&P 500' }, { value: '$50 × index' }, { value: '0.25 index points' }] },
            ],
          },
        },
      ],
      disclosureText: 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Margin requirements are set by PMEX and EPL.',
      disclosureLabel: 'Read the disclosures',
      disclosureUrl: '/regulation',
    },
    {
      blockType: 'requirementsChecklist',
      sectionId: 'documents',
      eyebrow: 'Documentation',
      heading: 'Four documents to open a PMEX account',
      groups: [
        {
          title: 'Commodity brokerage (PMEX)',
          items: [
            { label: 'Front and back of your CNIC' },
            { label: "Front and back of your nominee's CNIC" },
            { label: 'Picture of a cheque for IBAN verification' },
            { label: 'Proof of income' },
          ],
          buttons: [{ blockType: 'secondaryButton', label: 'Open a PMEX account', url: '/open-account' }],
        },
      ],
    },
    {
      blockType: 'consultationQualifier',
      eyebrow: 'Talk to an advisor',
      heading: 'Start small, understand margin first',
      subheading: 'Tell us your budget and goals — our Centralized Trading Unit will call you.',
      phone: '(042) 111 111 333',
      phoneHref: 'tel:+9242111111333',
      whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
      whatsappLabel: 'WhatsApp our client support',
      hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
      formStepLabel: 'Step 1 of 4 · Demo — nothing is submitted',
      formHeading: "Let's find the right investment path for you",
      formIntro: "Just a few quick questions, so we don't waste your time.",
      form: consultationForm.id,
    },
    {
      blockType: 'guideAccordion',
      sectionId: 'guide',
      eyebrow: 'Commodity trading guide',
      heading: 'Choosing a commodity broker in Pakistan',
      intro: 'Deliverable or cash-settled? What makes a good PMEX broker? The full guide from our current site, kept intact.',
      items: [
        {
          question: 'What makes a good PMEX broker',
          answer: "Check that they are a registered Corporate Member of PMEX, not just an authorised agent; that they offer real client support after account opening; that you can trade both deliverable and cash-settled futures; and that margin and risk policies are explained clearly. At Enrichers, our Centralized Trading Unit exists so you're never left guessing mid-trade — you get direct access to people who can walk you through margin calls, contract rollovers and settlement timing in plain language.",
        },
        {
          question: 'Gold, silver and currency trading in Pakistan',
          answer: 'Precious metals and currency trading have seen a real surge in interest. Whether you trade gold and silver futures for diversification, or currency pairs to hedge against rupee depreciation, a broker who understands futures trading in Pakistan makes a real difference.',
        },
        {
          question: 'Deliverable vs. cash-settled futures',
          answer: "Cash-settled futures let you trade purely on price movement, settling in cash at contract close. Deliverable futures suit producers, processors, or anyone who wants physical ownership. Most retail traders lean toward cash-settled contracts because they are faster, more flexible and don't tie up capital in storage or logistics.",
        },
        {
          question: 'Getting started as a first-time commodity trader',
          answer: "You don't need to start with a large sum. Start small, understand how margin works, and lean on your broker's research and risk-management support before scaling up.",
        },
      ],
    },
    {
      blockType: 'faqAccordion',
      sectionId: 'faq',
      heading: 'Commodity brokerage FAQs',
      items: [
        {
          question: 'What is the security of deposited funds?',
          answer: 'Client funds are deposited into designated accounts at the Pakistan Mercantile Exchange (PMEX) — licensed and regulated by the SECP. Investments in PSX are held through the regulated market infrastructure.',
        },
        {
          question: 'Do I need to take physical delivery of gold or oil?',
          answer: 'No, not unless you want to. Cash-settled futures settle in cash at contract close; deliverable futures suit producers, processors, or anyone who wants physical ownership.',
        },
        {
          question: 'Is currency trading permissible?',
          answer: "Enrichers' position (from its FAQ): currency trading through PMEX meets the acceptable trade conditions, and no interest is charged on positions.",
        },
      ],
    },
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'commodity-brokerage' } },
    limit: 1,
  })
  const data = { title: 'Commodity Brokerage', slug: 'commodity-brokerage', layout } as never
  const context = { context: { skipRevalidate: true } }

  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
    payload.logger.info('Updated the editable Commodity Brokerage page')
  } else {
    await payload.create({ collection: 'pages', data, ...context })
    payload.logger.info('Created the editable Commodity Brokerage page')
  }

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
