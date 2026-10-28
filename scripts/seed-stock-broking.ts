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
        { label: 'Stock Broking', url: '' },
      ],
      eyebrow: 'Enrichers Securities (Pvt.) Ltd.',
      heading: 'Stock broking on the Pakistan Stock Exchange',
      body: 'Your account, your trades and your money move through a properly licensed and monitored channel — with research and a real person to call.',
      primary: { label: 'Open a PSX account', url: '/open-account', variant: 'primary' },
      secondary: { label: 'Talk to an advisor', url: '#consultation', variant: 'secondary' },
      badges: [{ label: 'PSX TREC holder' }, { label: 'SECP regulated' }],
    },
    {
      blockType: 'sectionNavigation',
      ariaLabel: 'On this page',
      links: [
        { label: 'Products', anchor: 'products', active: true },
        { label: 'How to open', anchor: 'process' },
        { label: 'Documents', anchor: 'documents' },
        { label: 'Consultation', anchor: 'consultation' },
        { label: 'FAQ', anchor: 'faq' },
      ],
      cta: { label: 'Open a PSX account', url: '/open-account' },
    },
    {
      blockType: 'tabbedContent',
      sectionId: 'products',
      eyebrow: 'What you can do',
      heading: 'Equities, IPOs and portfolio management',
      body: 'Most first-time investors start with straightforward equity trading and move toward portfolio management as their capital and confidence grow.',
      tabs: [
        { label: 'Equity trading', body: 'Buying and selling shares of listed companies on the PSX.' },
        { label: 'IPO subscriptions', body: 'Get in early when a company first lists publicly, often before broader market demand sets in.' },
        { label: 'Portfolio management', body: 'Work with advisors who structure and rebalance a mix of holdings based on your goals and risk tolerance.' },
      ],
      disclosureText: 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Margin requirements are set by PMEX and EPL.',
      disclosureLabel: 'Read the disclosures',
      disclosureUrl: '/regulation',
    },
    {
      blockType: 'processSteps',
      sectionId: 'process',
      eyebrow: 'Account opening',
      heading: 'Step-by-step account opening',
      intro: 'From form to first investment, with a dedicated agent assigned to you.',
      steps: [
        { title: 'Form submitted', body: 'You submit an account opening form.' },
        { title: 'Documentation', body: 'You submit the necessary documents.' },
        { title: 'Agent assigned', body: 'A dedicated agent is assigned to assist you throughout onboarding.' },
        { title: 'NCCPL & compliance verification', body: 'OTP, KYC and AML checks verify your identity and financial background.' },
        { title: 'Customer onboarded', body: 'Once payment is confirmed, your trading account is activated.' },
        { title: 'Initial investment', body: 'You receive bank details or payment options for your initial investment.' },
      ],
    },
    {
      blockType: 'requirementsChecklist',
      sectionId: 'documents',
      eyebrow: 'Documentation',
      heading: "What you'll need",
      groups: [
        {
          title: 'Stock broking (PSX)',
          items: [
            { label: 'CNIC copy' },
            { label: 'Mobile number' },
            { label: 'Specimen signature' },
            { label: 'Bank account' },
            { label: 'Latest income tax return' },
            { label: 'Nominee details (optional)' },
            { label: 'Valid email address' },
            { label: 'Proof of income' },
            { label: 'Proof of residential address' },
            { label: 'Zakat declaration form' },
            { label: "Mother's maiden name" },
          ],
          buttons: [{ blockType: 'secondaryButton', label: 'Open a PSX account', url: '/open-account' }],
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
      eyebrow: 'Stock trading guide',
      heading: 'Choosing a stock broker in Pakistan',
      intro: 'The first real decision is not which stock to buy — it is which broker you trust to get you there.',
      items: [
        { question: 'What to look for in a PSX broker', answer: 'Check that the broker is a licensed TREC holder, provides clear pricing and disclosures, and gives you reliable research and client support after your account is open.' },
        { question: 'Equity trading, IPOs and portfolio management — what is the difference?', answer: 'Equity trading lets you buy and sell listed shares. IPO subscriptions let you apply for new listings, while portfolio management structures and rebalances holdings around your goals and risk tolerance.' },
        { question: 'Is investing in PSX stocks safe for beginners?', answer: 'All market investing carries risk. Start with an amount you can afford, understand the companies you are buying, and use research and risk-management guidance before increasing your exposure.' },
        { question: 'Getting started with your first trading account', answer: 'Complete the account opening form, provide the required documents, complete KYC and compliance checks, then fund the account once it is activated.' },
      ],
    },
    {
      blockType: 'faqAccordion',
      sectionId: 'faq',
      heading: 'Commodity brokerage FAQs',
      items: [
        { question: 'What is the security of deposited funds?', answer: 'Client funds are deposited into designated accounts at the Pakistan Mercantile Exchange (PMEX) — licensed and regulated by the SECP. Investments in PSX are held through the regulated market infrastructure.' },
        { question: 'Do I need to take physical delivery of gold or oil?', answer: 'No, not unless you want to. Cash-settled futures settle in cash at contract close; deliverable futures suit producers, processors, or anyone who wants physical ownership.' },
        { question: 'Is currency trading permissible?', answer: "Enrichers' position (from its FAQ): currency trading through PMEX meets the acceptable trade conditions, and no interest is charged on positions." },
      ],
    },
  ]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'stock-broking' } }, limit: 1 })
  const data = { title: 'Stock Broking', slug: 'stock-broking', layout } as never
  const context = { context: { skipRevalidate: true } }

  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
    payload.logger.info('Updated the editable Stock Broking page')
  } else {
    await payload.create({ collection: 'pages', data, ...context })
    payload.logger.info('Created the editable Stock Broking page')
  }

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
