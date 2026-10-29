import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const text = (value: string, format = 0) => ({ type: 'text', version: 1, text: value, format, detail: 0, mode: 'normal', style: '' })
const paragraph = (...children: any[]) => ({ type: 'paragraph', version: 1, children, direction: null, format: '', indent: 0 })
const heading = (value: string) => ({ type: 'heading', tag: 'h3', version: 1, children: [text(value)], direction: null, format: '', indent: 0 })
const listItem = (value: string) => ({ type: 'listitem', version: 1, value: 1, children: [paragraph(text(value))], direction: null, format: '', indent: 0 })
const rich = (children: any[]) => ({ root: { type: 'root', version: 1, children, direction: null, format: '', indent: 0 } })

const documents = [
  ['SECP License', 'Authorisation and regulatory information for Enrichers.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/SECP-License-1.pdf'],
  ['PMEX Membership Certificate', 'Corporate membership documentation for Pakistan Mercantile Exchange.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/PMEX-Membership-Certificate-1.pdf'],
  ['Automated Direct Funds Model (ADFM)', 'Information about the ADFM framework.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Automated-Direct-Funds-Model-ADFM-1.pdf'],
  ["Do's & Don'ts by PMEX", 'Important investor guidance published by PMEX.', 'https://enrichers.com.pk/wp-content/uploads/2025/07/Dos-Donts-by-PMEX.pdf'],
  ['Investor Complaint Registration Form (PMEX)', 'Complaint registration form for PMEX investors.', '/complaints'],
] as const

const run = async () => {
  const payload = await getPayload({ config })
  const layout = [
    {
      blockType: 'serviceHero', theme: 'light', heroVariant: 'standard', breadcrumbPosition: 'top',
      breadcrumbs: [{ label: 'Home', url: '/' }, { label: 'Regulation & disclosures', url: '/regulation/' }],
      eyebrow: 'Trust', heading: 'Regulation & disclosures',
      body: "Enrichers' brokerage businesses are licensed and supervised. Here is exactly who regulates what — with the licences, investor guidance and complaint forms we publish.", badges: [],
    },
    {
      blockType: 'licensingCredentials', sectionId: 'licences', layoutVariant: 'split', eyebrow: 'Regulated entities', heading: 'Our licences',
      body: 'Two group companies hold exchange memberships under the Securities & Exchange Commission of Pakistan.',
      disclosureText: 'Enrichers Investment Group operates as a licensed brokerage house under SECP regulatory oversight. Trading in futures and financial markets carries inherent risks and may not be appropriate for every trader. The content on this site is intended solely for informational and educational purposes and should not be taken as personalized investment advice.',
      items: [
        { title: 'Enrichers Securities (Pvt.) Ltd.', body: 'TREC holder, Pakistan Stock Exchange (PSX)', note: 'SECP', url: '/stock-broking/', linkLabel: 'Explore stock broking', variant: 'entity' },
        { title: 'Enrichers (Pvt.) Ltd.', body: 'Corporate Member, Pakistan Mercantile Exchange (PMEX)', note: 'SECP', url: '/commodity-brokerage/', linkLabel: 'Explore commodity broking', variant: 'entity' },
        ...documents.map(([title, body, url], index) => ({ title, body, url, note: ['Licence · PDF', 'Membership · PDF', 'Client funds · PDF', 'Investor guidance · PDF', 'Complaints'][index], linkLabel: 'Open document', variant: 'documents' })),
      ],
    },
    {
      blockType: 'faqAccordion', sectionId: 'faq', heading: 'Your money and your rights', eyebrow: '', items: [
        { question: 'What is the security of deposited funds?', answer: 'Client funds and assets are handled through regulated brokerage processes and the applicable exchange and SECP requirements. Review the relevant account terms and disclosures before trading.' },
        { question: 'Do I need to take physical delivery of gold or oil?', answer: 'PMEX products have their own contract specifications. Your advisor can explain settlement and delivery terms for the product you choose before you place a trade.' },
        { question: 'Is currency trading permissible?', answer: 'Product suitability and permissibility depend on the instrument and your circumstances. Speak with our team for information about the available regulated products.' },
      ],
    },
    {
      blockType: 'contactDetails', sectionId: 'contact', heading: 'Need to raise a concern?',
      channels: [
        { icon: 'phone', label: 'Call us', description: '(042) 111 111 333', meta: 'Monday – Friday', url: 'tel:+9242111111333' },
        { icon: 'message', label: 'WhatsApp', description: 'Chat with our client-support experts', meta: 'Instant answers on market days', url: 'https://api.whatsapp.com/send?phone=9242111111333' },
        { icon: 'mail', label: 'Email', description: 'connect@enrichers.com.pk', meta: 'We reply on market days', url: 'mailto:connect@enrichers.com.pk' },
        { icon: 'building', label: 'Visit', description: '3rd Floor, High Q Tower, Gulberg 5, Lahore', meta: 'Head office', url: '/contact-us/#offices' },
      ],
      offices: [],
    },
  ]
  const slug = 'regulation'
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
  const data = { title: 'Regulation & disclosures', slug, layout } as never
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context: { skipRevalidate: true } })
  else await payload.create({ collection: 'pages', data, context: { skipRevalidate: true } })
  payload.logger.info('Seeded Regulation & disclosures page')
  process.exit(0)
}
run().catch((error) => { console.error(error); process.exit(1) })
