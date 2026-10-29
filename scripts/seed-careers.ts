/**
 * Seeds /careers with the Candidate A reference layout.
 * Replaces whatever blocks the page currently has. Safe to re-run.
 *
 *   npx tsx scripts/seed-careers.ts
 */
import 'dotenv/config'

import { getPayload } from 'payload'
import config from '../src/payload.config'

const ctx = { context: { skipRevalidate: true } }

const run = async () => {
  const payload = await getPayload({ config })

  const existingForms = await payload.find({ collection: 'forms', where: { title: { equals: 'Careers application' } }, limit: 1 })
  const formData = {
    title: 'Careers application',
    fields: [
      { blockType: 'text', name: 'name', label: 'Name', required: true },
      { blockType: 'text', name: 'phone', label: 'Phone', required: true },
      { blockType: 'email', name: 'email', label: 'Email (optional)', required: false },
      {
        blockType: 'select', name: 'position', label: 'Position',
        options: [
          { label: 'Client Services Head', value: 'client-services-head' },
          { label: 'OBD (Online Business Development)', value: 'obd' },
          { label: 'MTO (Management Trainee Officer)', value: 'mto' },
          { label: 'Research Analyst', value: 'research-analyst' },
          { label: 'Open application', value: 'open' },
        ],
      },
      { blockType: 'textarea', name: 'message', label: 'Message' },
    ],
    submitButtonLabel: 'Send message',
    confirmationType: 'message',
    confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ text: 'Thank you for your application. Our team will be in touch.', type: 'text', version: 1 }] }] } },
  }
  const form = existingForms.docs[0]
    ? await payload.update({ collection: 'forms', id: existingForms.docs[0].id, data: formData as never })
    : await payload.create({ collection: 'forms', data: formData as never })

  const layout = [
    // 1. Hero (light)
    {
      blockType: 'serviceHero',
      theme: 'light',
      heroVariant: 'standard',
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about-us/' },
        { label: 'Careers', url: '' },
      ],
      breadcrumbPosition: 'top',
      eyebrow: 'Careers',
      heading: "Build your career in Pakistan's markets",
      body: "Full-time and internship positions in business development, brokerage, research and client services.",
      primary: { label: 'See open positions', url: '#positions', variant: 'primary' },
      secondary: { label: 'Apply now', url: '#application', variant: 'secondary' },
      badges: [],
    },

    // 2. Open positions (4 job cards)
    {
      blockType: 'investmentPathCards',
      sectionId: 'positions',
      eyebrow: 'Opportunities',
      heading: 'Current openings',
      body: 'Every role is available full time or as an internship, based in Pakistan.',
      cards: [
        {
          eyebrow: 'Client services',
          title: 'Client Services Head',
          body: 'Lead and grow the client services team, ensuring high-quality support for investors and traders across all products.',
          supportingLabel: 'Full time / internship · Pakistan',
          buttons: [{ blockType: 'secondaryButton', label: 'Job description', url: '#' }],
        },
        {
          eyebrow: 'Business development',
          title: 'OBD (Online Business Development)',
          body: 'Drive digital client acquisition, manage online campaigns and convert leads into active trading accounts.',
          supportingLabel: 'Full time / internship · Pakistan',
          buttons: [{ blockType: 'secondaryButton', label: 'Job description', url: '#' }],
        },
        {
          eyebrow: 'Management',
          title: 'MTO (Management Trainee Officer)',
          body: 'A structured programme across departments — brokerage, research, compliance and operations — to build future leaders.',
          supportingLabel: 'Full time / internship · Pakistan',
          buttons: [{ blockType: 'secondaryButton', label: 'Job description', url: '#' }],
        },
        {
          eyebrow: 'Research',
          title: 'Research Analyst',
          body: 'Produce market research, analysis and investment notes across equities, commodities and macroeconomics.',
          supportingLabel: 'Full time / internship · Pakistan',
          buttons: [{ blockType: 'secondaryButton', label: 'Job description', url: '#' }],
        },
      ],
    },

    // 3. Core values (What we look for)
    {
      blockType: 'clientServices',
      eyebrow: 'Culture',
      heading: 'What we look for',
      body: 'Our core values shape who we hire and how we work together.',
      items: [
        {
          icon: 'scale',
          title: 'Integrity',
          body: 'Commitment and honesty that runs from the executive to every tier of the organisation — to be truthful inside out.',
        },
        {
          icon: 'people',
          title: 'Ownership',
          body: 'Complete responsibility for the quality and timeliness of every outcome. Every employee is an individual contributor.',
        },
        {
          icon: 'ledger',
          title: 'One Team',
          body: 'No personal agendas and no divisions — collaboration and shared accountability across every department.',
        },
      ],
      buttons: [],
    },

    // 4. Application form
    {
      blockType: 'consultationQualifier',
      sectionId: 'application',
      eyebrow: 'Apply',
      heading: 'Join our team',
      subheading: "Tell us which position you're applying for and a little about yourself. Our team will be in touch.",
      phone: '(042) 111 111 333',
      phoneHref: 'tel:+9242111111333',
      whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
      whatsappLabel: 'WhatsApp our client support',
      hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
      formMode: 'singlePage',
      form: form.id,
    },

    // 5. FAQs
    {
      blockType: 'faqAccordion',
      sectionId: 'careers-faq',
      eyebrow: '',
      heading: 'Careers FAQs',
      items: [
        {
          question: 'What kinds of roles does Enrichers offer?',
          answer: 'Full-time and internship roles in business development, investing, brokerage, commodities trading and financial services, based in Pakistan.',
        },
        {
          question: 'Do you offer internships?',
          answer: 'Yes, for the MTO, Client Services and Research Analyst positions. Interns work on brokerage, market research and client service.',
        },
        {
          question: 'How do I apply?',
          answer: "Use the form on this page with your name, phone, email and the position you want. Each role's job description is linked above.",
        },
        {
          question: 'What do Research Analyst and OBD candidates need?',
          answer: 'Analytical and communication skills, a background in finance, economics or business, experience with clients, data or market research, and a willingness to learn. Each job description lists the full criteria.',
        },
      ],
    },
  ]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'careers' } }, limit: 1 })
  const data = { title: 'Careers', slug: 'careers', layout } as never

  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...ctx })
  } else {
    await payload.create({ collection: 'pages', data, ...ctx })
  }

  payload.logger.info('Seeded /careers — 5 blocks matching Candidate A reference')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
