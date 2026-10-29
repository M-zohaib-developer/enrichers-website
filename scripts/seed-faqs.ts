/**
 * Seeds /faqs with the full question set from the Candidate A reference —
 * 19 questions across its six topic tabs, plus the contact band that closes
 * the page. Safe to re-run.
 *
 *   npm run seed:faqs
 */
import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ctx = { context: { skipRevalidate: true } }

/** Mirrors the six tab panels on the reference page, in the same order. */
const CATEGORIES = [
  {
    label: 'Getting started',
    items: [
      {
        question: "I'm new to trading and want to learn. How can you help?",
        answer:
          'As a licensed broker of PMEX and PSX, we tailor trading services to your financial goals. Our professionals design strategies around your needs and help you navigate local and global markets. Talk to our experts on WhatsApp at 042 111 111 333.',
      },
      {
        question: 'How is Enrichers different from other brokers?',
        answer:
          'We believe in educating our clients. Our growth comes from client service: best business practice, a personal experience and a problem-solving attitude.',
      },
      {
        question: 'What profit can I expect from investing in financial markets?',
        answer:
          "Profits aren't guaranteed. With the right guidance and strategy, markets like PSX and PMEX offer potential for growth, and smart investing is about making informed moves. Our experts can help you trade with clarity.",
      },
      {
        question: 'What documents do I need to open an account?',
        answer:
          'A valid CNIC, a mobile number registered in your name, an IBAN for a bank account in your own name, and your signature on a blank sheet of paper. Salaried applicants add a salary slip; business owners add a business registration document and a 6-month bank statement.',
      },
    ],
  },
  {
    label: 'General',
    items: [
      {
        question: 'What is Enrichers Investment Group?',
        answer:
          'Enrichers Investment Group is a financial and brokerage firm in Pakistan, offering diversified investment solutions including stock trading, commodities, business brokerage, and agricultural development projects.',
      },
      {
        question: 'Where is Enrichers located?',
        answer:
          'Our head office is on the 3rd Floor, High Q Tower, Gulberg 5, Lahore. We also have an office in the Islamabad Stock Exchange Building and a UAE office (Enrichers Foodstuff Trading LLC).',
      },
      {
        question: 'Do you provide advisory support?',
        answer:
          'Yes. We offer research-supported guidance and ongoing client support to help you make informed investment decisions.',
      },
      {
        question: 'Is Enrichers registered with the SECP?',
        answer:
          'Enrichers is a licensed financial broker of the Pakistan Mercantile Exchange (PMEX) and the Pakistan Stock Exchange (PSX), operating under the regulation of the SECP.',
      },
    ],
  },
  {
    label: 'Opening an account',
    items: [
      {
        question: 'What do I need to do to start trading with Enrichers on PMEX or PSX?',
        answer:
          'Open an account with Enrichers (PMEX or PSX), activate it, and deposit funds. Then you can trade equities, commodities, currencies, or global indices.',
      },
      {
        question: 'Can I invest if I am outside Pakistan?',
        answer:
          'Yes. Online account opening and digital documentation processing are available for overseas clients.',
      },
      {
        question: 'What is the minimum investment amount?',
        answer:
          'The minimum investment varies by service type. Our team will share suitable options based on your goals and preferred investment category.',
      },
    ],
  },
  {
    label: 'Stocks (PSX)',
    items: [
      {
        question: 'How do I open a stock trading account with Enrichers?',
        answer:
          'Open your trading account online or by visiting our office. Provide your CNIC, proof of income, and bank account details; our team guides you through KYC and account opening step by step.',
      },
      {
        question: 'Can beginners start investing through Enrichers?',
        answer:
          'Yes. Our specialists guide beginners with personalised support, educational resources, and risk-controlled strategies suitable for all experience levels.',
      },
      {
        question: 'What trading products are offered?',
        answer:
          'Equity trading, IPO subscriptions, and portfolio management with access to instruments listed on the PSX.',
      },
      {
        question: 'Do you provide research and market insights?',
        answer:
          'Yes. Our research team publishes market insights, technical analysis, fundamental reports, and trading ideas.',
      },
    ],
  },
  {
    label: 'Commodities (PMEX)',
    items: [
      {
        question: 'What is the security of deposited funds?',
        answer:
          'Client funds are deposited into designated accounts at the Pakistan Mercantile Exchange (PMEX) — licensed and regulated by the SECP. Investments in PSX are held through the regulated market infrastructure.',
      },
      {
        question: 'Do I need to take physical delivery of gold or oil?',
        answer:
          'No, not unless you want to. Cash-settled futures settle in cash at contract close; deliverable futures suit producers, processors, or anyone who wants physical ownership.',
      },
      {
        question: 'Is currency trading permissible?',
        answer:
          "Enrichers' position (from its FAQ): currency trading through PMEX meets the acceptable trade conditions, and no interest is charged on positions.",
      },
    ],
  },
  {
    label: 'The group',
    items: [
      {
        question: 'What is the Musharakah investing model, and how does Enrichers use it?',
        answer:
          'Musharakah is a partnership in which everyone shares the rewards and risks. Enrichers uses it to support start-ups and businesses in Pakistan by investing as a partner, sharing both profits and responsibilities.',
      },
    ],
  },
]

const run = async () => {
  const payload = await getPayload({ config })

  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Enrichers frequently asked questions' } },
    limit: 1,
  })
  const image =
    existingMedia.docs[0] ??
    (await payload.create({
      collection: 'media',
      data: { alt: 'Enrichers frequently asked questions' },
      filePath: path.resolve(dirname, '../public/brand/faq-hero.webp'),
    }))

  const layout = [
    {
      blockType: 'knowledgeHero',
      breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'FAQs', url: '' }],
      eyebrow: 'Help',
      heading: 'Frequently asked questions',
      body: 'Getting started, opening an account, PSX and PMEX trading, and the wider group. Can’t find your answer? Ask us on WhatsApp.',
      image: image.id,
      imageAlt: 'Frequently asked questions',
    },
    {
      blockType: 'accountFaq',
      eyebrow: 'Browse by topic',
      heading: 'Find your answer',
      categories: CATEGORIES,
    },
    {
      blockType: 'contactDetails',
      sectionId: 'contact',
      heading: 'Have your own question?',
      channels: [
        {
          icon: 'phone',
          label: 'Call us',
          description: '(042) 111 111 333',
          meta: 'Monday – Friday',
          url: 'tel:+9242111111333',
        },
        {
          icon: 'message',
          label: 'WhatsApp',
          description: 'Chat with our client-support experts',
          meta: 'Instant answers on market days',
          url: 'https://api.whatsapp.com/send?phone=9242111111333',
        },
        {
          icon: 'mail',
          label: 'Email',
          description: 'connect@enrichers.com.pk',
          meta: 'We reply on market days',
          url: 'mailto:connect@enrichers.com.pk',
        },
        {
          icon: 'mapPin',
          label: 'Visit',
          description: '3rd Floor, High Q Tower, Gulberg 5, Lahore',
          meta: 'Head office',
          url: '/contact-us/',
        },
      ],
      offices: [
        {
          name: 'Lahore — head office',
          address: '3rd Floor, High Q Tower, Gulberg 5, Lahore, Pakistan',
          phone: '(042) 111 111 333',
          hours: 'Monday – Friday, market hours',
        },
      ],
    },
  ]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'faqs' } }, limit: 1 })
  const data = { title: 'Frequently Asked Questions', slug: 'faqs', layout } as never
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...ctx })
  else await payload.create({ collection: 'pages', data, ...ctx })

  const total = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)
  payload.logger.info(`Seeded /faqs — ${CATEGORIES.length} categories, ${total} questions`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
