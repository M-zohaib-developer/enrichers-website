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
      breadcrumbs: [
        { label: 'Home', url: '/' },
        { label: 'Contact', url: '' },
      ],
      eyebrow: 'Contact',
      heading: 'Talk to Enrichers',
      body: 'Client support Monday to Friday. Choose the channel that suits you — or book a free consultation.',
      badges: [],
    },
    {
      blockType: 'contactDetails',
      sectionId: 'contact',
      heading: 'Ways to reach us',
      channels: [
        { icon: 'phone', label: 'Call us', description: '(042) 111 111 333', meta: 'Monday – Friday', url: 'tel:+9242111111333' },
        { icon: 'message', label: 'WhatsApp', description: 'Chat with our client-support experts', meta: 'Instant answers on market days', url: 'https://api.whatsapp.com/send?phone=9242111111333' },
        { icon: 'mail', label: 'Email', description: 'connect@enrichers.com.pk', meta: 'We reply on market days', url: 'mailto:connect@enrichers.com.pk' },
        { icon: 'mapPin', label: 'Visit', description: '3rd Floor, High Q Tower, Gulberg 5, Lahore', meta: 'Head office', url: '#offices' },
      ],
      offices: [
        { name: 'Head Office — Lahore', address: '3rd Floor, High Q Tower, Gulberg 5, Lahore, Pakistan', phone: '(042) 111 111 333', hours: 'Monday – Friday 24/5' },
        { name: 'Islamabad Office', address: 'Office G5, Ground Floor, Islamabad Stock Exchange Building, 55-B Jinnah Avenue, Islamabad', phone: '(051) 111 333 333' },
        { name: 'UAE Office', address: 'Enrichers Foodstuff Trading LLC, Office 13, Al-Habai Building, Ras Al Khor Third' },
      ],
    },
    {
      blockType: 'consultationQualifier',
      sectionId: 'consultation',
      eyebrow: 'Free consultation',
      heading: 'Book a free consultation',
      subheading: 'Three quick questions and an advisor will call you.',
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
  ]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'contact-us' } },
    limit: 1,
  })
  const data = { title: 'Contact Us', slug: 'contact-us', layout } as never
  const context = { context: { skipRevalidate: true } }

  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...context })
    payload.logger.info('Updated the editable Contact Us page')
  } else {
    await payload.create({ collection: 'pages', data, ...context })
    payload.logger.info('Created the editable Contact Us page')
  }

  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
