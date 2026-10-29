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
      theme: 'light',
      showBottomBorder: false,
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: 'Open an account', url: '' },
      ],
      eyebrow: 'Open an account',
      heading: 'Open your trading account',
      body: 'Choose your market, prepare your documents and finish online on the exchange-approved portal. Overseas Pakistanis can open accounts online too.',
      badges: [],
    },
    {
      blockType: 'investmentPathCards',
      eyebrow: '',
      heading: 'Choose your market',
      body: '',
      cards: [
        {
          eyebrow: 'PSX',
          title: 'Stock broking account',
          body: 'Enrichers Securities (Pvt.) Ltd. — TREC holder of the Pakistan Stock Exchange.',
          buttons: [{ blockType: 'primaryButton', label: 'Continue to PSX portal', url: 'https://aof.eclear.com.pk/espl' }],
        },
        {
          eyebrow: 'PMEX',
          title: 'Commodity brokerage account',
          body: 'Enrichers (Pvt.) Ltd. — Corporate Member of the Pakistan Mercantile Exchange.',
          buttons: [{ blockType: 'secondaryButton', label: 'Continue to PMEX portal', url: 'https://www.aof.com.pk/' }],
        },
        {
          eyebrow: 'Help',
          title: 'Not sure which one?',
          body: 'Tell us your goals and an advisor will recommend the right account.',
          buttons: [{ blockType: 'secondaryButton', label: 'Get a recommendation', url: '#consultation' }],
        },
      ],
    },
    {
      blockType: 'processSteps',
      sectionId: 'steps',
      eyebrow: 'What happens next',
      heading: 'From form to first trade',
      intro: '',
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
      heading: 'Prepare your documents',
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
        },
        {
          title: 'Commodity brokerage (PMEX)',
          items: [
            { label: 'Front and back of your CNIC' },
            { label: "Front and back of your nominee's CNIC" },
            { label: 'Picture of a cheque for IBAN verification' },
            { label: 'Proof of income' },
          ],
        },
      ],
    },
    {
      blockType: 'consultationQualifier',
      eyebrow: 'Free consultation',
      heading: 'Prefer to talk first?',
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
      blockType: 'faqAccordion',
      sectionId: 'faq',
      heading: 'Account opening FAQs',
      items: [
        {
          question: 'What do I need to do to start trading with Enrichers on PMEX or PSX?',
          answer: 'Open an account with Enrichers (PMEX or PSX), activate it, and deposit funds. Then you can trade equities, commodities, currencies, or global indices.',
        },
        {
          question: 'Can I invest if I am outside Pakistan?',
          answer: 'Yes. Online account opening and digital documentation processing are available for overseas clients.',
        },
        {
          question: 'What is the minimum investment amount?',
          answer: 'The minimum investment varies by service type. Our team will share suitable options based on your goals and preferred investment category.',
        },
      ],
    },
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'open-account' } },
    limit: 1,
  })
  const data = { title: 'Open an Account', slug: 'open-account', layout } as never
  const context = { context: { skipRevalidate: true } }

  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
    payload.logger.info('Updated the editable Open an Account page hero')
  } else {
    await payload.create({ collection: 'pages', data, ...context })
    payload.logger.info('Created the editable Open an Account page hero')
  }

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
