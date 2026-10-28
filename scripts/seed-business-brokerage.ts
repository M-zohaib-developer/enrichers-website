import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const text = (value: string, format = 0) => ({ type: 'text', version: 1, text: value, format, detail: 0, mode: 'normal', style: '' })
const paragraph = (...children: any[]) => ({ type: 'paragraph', version: 1, children, direction: null, format: '', indent: 0 })
const heading = (tag: 'h2' | 'h3' | 'h4', value: string) => ({ type: 'heading', tag, version: 1, children: [text(value)], direction: null, format: '', indent: 0 })
const list = (items: string[]) => ({ type: 'list', listType: 'bullet', version: 1, start: 1, children: items.map((item) => ({ type: 'listitem', version: 1, value: 1, children: [paragraph(text(item))], direction: null, format: '', indent: 0 })) , direction: null, format: '', indent: 0 })
const richText = (children: any[]) => ({ root: { type: 'root', version: 1, children, direction: null, format: '', indent: 0 } })

const run = async () => {
  const payload = await getPayload({ config })
  const existingForms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const consultationForm = existingForms.docs[0]
  if (!consultationForm) throw new Error('Investor enquiries form was not found. Run npm run seed:home first.')
  const getMedia = async (alt: string, filename: string) => {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return existing.docs[0] ?? await payload.create({ collection: 'media', data: { alt }, filePath: path.resolve(dirname, `../public/brand/${filename}`) })
  }
  const heroImage = await getMedia('Business brokerage', 'business-brokerage.webp')
  const carouselImages = [
    heroImage,
    await getMedia('Business brokerage consultation', 'business-brokerage-1.webp'),
    await getMedia('Business brokerage advisory', 'business-brokerage-2.webp'),
  ]

  const layout = [
    {
      blockType: 'marketHero',
      eyebrow: 'Business brokerage',
      heading: 'Buy, sell and grow businesses with confidence.',
      headingLineOne: 'Business brokerage',
      headingLineTwo: 'Buy, sell and grow',
      headingLineThree: 'with confidence.',
      body: 'Enrichers offers trusted business brokerage services, making it easier to buy, sell or invest with confidence. From accurate valuations to seamless transactions, we handle every step with professionalism and care.',
      buttons: [
        { blockType: 'primaryButton', label: 'Get a free consultation', url: '/contact-us/#consultation' },
        { blockType: 'secondaryButton', label: 'Talk to our team', url: '/contact-us/' },
      ],
      heroImage: heroImage.id,
      badges: [
        { label: 'Confidential guidance' },
        { label: 'End-to-end support' },
      ],
    },
    {
      blockType: 'consultationShowcase',
      sectionId: 'consultation',
      eyebrow: 'Free consultation',
      heading: 'Talk to a business advisor',
      subheading: 'Tell us what you are buying, selling or building and our team will call you.',
      phone: '(042) 111 111 333',
      phoneHref: 'tel:+9242111111333',
      whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
      whatsappLabel: 'WhatsApp our client support',
      hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
      formStepLabel: 'Step 1 of 4 · Demo — nothing is submitted',
      formHeading: 'Let’s understand your business goal',
      formIntro: 'A few quick questions help us prepare the right conversation.',
      form: consultationForm.id,
      images: carouselImages.map((image, index) => ({ image: image.id, alt: ['Business brokerage', 'Business brokerage consultation', 'Business brokerage advisory'][index] })),
      intervalSeconds: 3,
    },
    {
      blockType: 'businessIntro',
      heading: 'Business Brokerage',
      body: 'Enrichers offers trusted business brokerage services, making it easy to buy, sell, or invest with confidence. From accurate valuations to seamless transactions, we handle every step with professionalism and care.',
      buttons: [{ blockType: 'primaryButton', label: 'Get Started', url: 'https://api.whatsapp.com/send?phone=9242111111333' }],
    },
    {
      blockType: 'serviceOfferings',
      sectionId: 'offerings',
      eyebrow: '',
      heading: 'EIG Offerings',
      body: '',
      items: [
        { title: 'Seamless Transactions', body: 'We handle the entire process, from prescreening businesses to assisting with paperwork, ensuring a smooth and efficient transaction.' },
        { title: 'Reduced Risk', body: 'Our due diligence process minimizes risks by thoroughly vetting potential partners and uncovering any red flags.' },
        { title: 'Seamless Transactions', body: 'We handle the entire process, from prescreening businesses to assisting with paperwork, ensuring a smooth and efficient transaction.' },
        { title: 'Confidentiality Guaranteed', body: 'We prioritize discretion throughout the process, safeguarding sensitive information and ensuring legal compliance.' },
      ],
    },
    {
      blockType: 'benefitsGrid',
      sectionId: 'benefits',
      eyebrow: '',
      heading: 'Benefits of Working with Enrichers',
      items: [
        { title: 'Mergers & Acquisitions', body: 'Navigate the complexities of combining companies with our expertise in both mergers (creating a new entity) and acquisitions (one company buying another). We offer dedicated support tailored to your specific business goals.' },
        { title: 'Buy & Sell Businesses', body: 'Take control of your financial future by buying or selling your company with confidence. We leverage our market-leading approach and proven success to help you find the perfect match, maximizing your return on investment.' },
        { title: 'Franchise Brokerage', body: 'Explore the world of franchising with reduced risk. Our team of experts will guide you through a vast selection of opportunities, ensuring you select the right franchise that aligns with your goals. We take care of the complexities, providing seamless service and leveraging industry knowledge and regulations.' },
        { title: 'Business Valuation', body: "Get an accurate picture of your company's worth. We possess in-depth knowledge of valuing businesses across various industries, taking into account location, operational strength, and financial history. We protect your investment by securing the best possible price, negotiating effectively, and ensuring confidentiality throughout the process." },
        { title: 'Equity Stake & Start-Up Funding', body: 'Access a network of private equity firms and global funds to fuel your entrepreneurial ambitions. We offer exclusive services to help you acquire stakes in exciting businesses or secure funding for your ventures.' },
        { title: 'Investment Brokerage', body: 'Invest for the future with our expert guidance. We act as your trusted intermediary, connecting you with the best financial deals across Pakistan. Our team stays current on market trends, ensuring your investments are built for long-term success.' },
      ],
    },
    {
      blockType: 'richTextBlock',
      sectionId: 'business-brokerage-guide',
      heading: 'Business Brokerage Guide',
      background: 'white',
      showAccentBar: true,
      body: richText([
        paragraph(text('Buying or selling a business is nothing like buying or selling a house — there’s no standard listing price, no easy comparables, and a single bad deal structure can cost you far more than a bad negotiation on real estate ever would. That’s exactly why working with an experienced '), text('business broker in Pakistan', 1), text(' matters more than most first-time buyers or sellers expect.')),
        paragraph(text('Enrichers has guided business owners, investors, and entrepreneurs through this process for years, handling everything from valuation to deal structuring to the paperwork most people would rather not deal with alone.')),
        heading('h3', 'What Does a Business Broker Actually Do?'),
        paragraph(text('A good '), text('business brokerage service in Pakistan', 1), text(' does far more than just introduce a buyer to a seller. The real value shows up in the details:')),
        list([
          'Accurately valuing a business based on real financials, not just an owner’s optimistic asking price',
          'Vetting potential buyers or sellers to avoid wasted time on parties who were never serious',
          'Structuring the deal so both sides are protected, not just pushing for a quick close',
          'Managing confidentiality so employees, competitors, and customers don’t find out prematurely',
        ]),
        heading('h3', 'Buying a Business vs. Starting One From Scratch'),
        paragraph(text('Buying an established business gives you something a startup cannot: existing cash flow, a customer base, operational history, and a clearer picture of what you are actually buying. That established track record often carries a premium, but it can also reduce the uncertainty that comes with building everything from zero.')),
        heading('h3', 'Mergers & Acquisitions — Not Just for Large Corporations'),
        paragraph(text('Mergers and acquisitions happen at every scale. Whether you are combining two growing companies, acquiring a competitor, or bringing a strategic partner into your business, the process requires careful due diligence, legal compliance, and a deal structure that supports the long-term outcome.')),
        heading('h3', 'Franchise Opportunities: Lower Risk, Proven Systems'),
        paragraph(text('Franchising can offer a proven operating model, established branding, and support systems that make entering a new industry more predictable. Our '), text('franchise brokerage in Pakistan', 1), text(' service helps match investors with opportunities that fit their goals, capital, and experience.')),
        heading('h3', 'Is Now a Good Time to Buy or Sell a Business?'),
        paragraph(text('There is no universal answer. The right time depends on the business, the industry, the numbers, and the reason behind the transaction. A data-backed valuation and a clear understanding of current market conditions will help you make a decision based on evidence rather than timing headlines.')),
        paragraph(text('Thinking about buying, selling, or valuing a business in Pakistan? '), text('Get in touch with our business brokerage team', 1), text(' for a confidential conversation about your specific situation.')),
      ]),
    },
    {
      blockType: 'faqAccordion',
      sectionId: 'faq',
      eyebrow: '',
      heading: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is business brokerage in Pakistan, and how can Enrichers help?',
          answer: 'Business brokerage in Pakistan means professional services that help people buy, sell, invest in, or value businesses. Enrichers provides full-service support including business valuations, risk management, and paperwork for mergers and acquisitions, franchise opportunities, and equity investments.',
        },
        {
          question: 'What does Enrichers do to value businesses?',
          answer: 'Enrichers considers the industry, operational strength, financial history, location, assets, liabilities, revenue, growth potential, and current market conditions to build an accurate business assessment and help clients negotiate a strong deal.',
        },
        {
          question: 'Can Enrichers help with mergers and acquisitions in Pakistan?',
          answer: 'Yes. Enrichers supports both mergers and acquisitions, including due diligence, legal compliance, confidentiality, and deal structuring so the transaction can move forward smoothly and fairly.',
        },
        {
          question: 'What are Franchise Brokerage and Equity Stake & Startup Funding?',
          answer: 'Franchise Brokerage helps business owners find and assess opportunities that fit their goals. Equity Stake & Startup Funding connects founders and business owners with private equity firms, global funds, and strategic investors on clear and fair terms.',
        },
        {
          question: 'Why choose Enrichers for business brokerage?',
          answer: 'Enrichers combines industry experience, financial knowledge, market insight, strategic deal structuring, and end-to-end support to help clients manage business transactions with confidence and discretion.',
        },
      ],
    },
  ]

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'business-brokerage' } }, limit: 1 })
  const data = { title: 'Business Brokerage', slug: 'business-brokerage', layout } as never
  const context = { context: { skipRevalidate: true } }
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
  else await payload.create({ collection: 'pages', data, ...context })
  payload.logger.info('Seeded the editable Business Brokerage hero')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
