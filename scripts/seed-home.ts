import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { HOME_BLOCKS } from '../src/blocks/homeDefaults'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const run = async () => {
  const payload = await getPayload({ config })
  const mediaFor = async (alt: string, filename: string) => {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return existing.docs[0] ?? payload.create({ collection: 'media', data: { alt }, filePath: path.resolve(dirname, '../public/brand', filename) })
  }

  const image = await mediaFor('The Enrichers client-services floor in Lahore', 'trading-floor.webp')
  // enrichers-logo-enhanced.webp is the single copy of the mark; the old
  // enrichers-logo.webp was a byte-identical duplicate and has been removed.
  const logo = await mediaFor('Enrichers Investment Group logo', 'enrichers-logo-enhanced.webp')
  const researchImages = await Promise.all([
    mediaFor('Fed Holds Rates For A 5th Straight Meeting', 'research-1.webp'),
    mediaFor("Can Pakistan's Bull Market Enter a Fourth Year?", 'research-2.webp'),
    mediaFor('Five Central Banks, One Month', 'research-3.webp'),
    mediaFor('Two Geopolitical Clocks', 'research-4.webp'),
  ])
  const hotelImage = await mediaFor('Architectural visualisation of the Skardu Riverside Hotel above the river', 'skardu-hotel.webp')
  const existingForms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const consultationForm = existingForms.docs[0]
    ? await payload.update({
        collection: 'forms', id: existingForms.docs[0].id, data: {
          title: 'Investor enquiries',
          fields: [
            { blockType: 'text', name: 'fullName', label: 'Full name', required: true },
            { blockType: 'text', name: 'phone', label: 'Phone number', required: true },
            { blockType: 'select', name: 'investmentAmount', label: 'Investment amount', required: true, options: [
              { label: 'Under PKR 50,000', value: 'under-50000', description: 'Getting started' }, { label: 'PKR 50K – 500K', value: '50k-500k', description: 'Entry level' }, { label: 'PKR 500K – 2M', value: '500k-2m', description: 'Intermediate' }, { label: 'PKR 2M – 5M', value: '2m-5m', description: 'Growth investor' }, { label: 'Over PKR 5M', value: 'over-5m', description: 'High net worth' },
            ] },
            { blockType: 'select', name: 'decisionMaker', label: 'Decision maker', required: true, options: [
              { label: 'I decide on my own', value: 'self', description: 'Full autonomy' }, { label: 'Spouse / partner', value: 'spouse-partner', description: 'Joint decision' }, { label: 'Family consensus', value: 'family', description: 'Group decision' }, { label: 'Business funds', value: 'business', description: 'Corporate decision' },
            ] },
            { blockType: 'select', name: 'primaryGoal', label: 'Primary goal', required: true, options: [
              { label: 'Grow through stocks', value: 'stocks', description: 'PSX equities & shares' }, { label: 'Trade commodities', value: 'commodities', description: 'Gold, oil & PMEX futures' }, { label: 'Mixed portfolio', value: 'mixed', description: 'PSX + PMEX diversified' }, { label: 'Still exploring', value: 'exploring', description: 'Need guidance first' },
            ] },
          ],
          submitButtonLabel: 'Submit',
          confirmationType: 'message',
          confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ text: 'Thank you. We will be in touch shortly.', type: 'text', version: 1 }] }] } },
          emails: [],
          step1Heading: "Let's find the right investment path for you", step1Intro: "Just a few quick questions, so we don't waste your time.",
          step2Heading: 'How much are you looking to invest?', step2Intro: 'This helps us recommend the right instruments for your capital.',
          step3Heading: 'Who gives the green light?', step3Intro: 'This helps our advisors prepare the right conversation for you.',
          step4Heading: "What's your primary goal right now?", step4Intro: 'PSX equities, PMEX commodities, or both.',
        } as any,
      })
    : await payload.create({
        collection: 'forms',
        data: {
          title: 'Investor enquiries',
          fields: [
            { blockType: 'text', name: 'fullName', label: 'Full name', required: true },
            { blockType: 'text', name: 'phone', label: 'Phone number', required: true },
            { blockType: 'select', name: 'investmentAmount', label: 'Investment amount', required: true, options: [{ label: 'Under PKR 50,000', value: 'under-50000', description: 'Getting started' }, { label: 'PKR 50K – 500K', value: '50k-500k', description: 'Entry level' }, { label: 'PKR 500K – 2M', value: '500k-2m', description: 'Intermediate' }, { label: 'PKR 2M – 5M', value: '2m-5m', description: 'Growth investor' }, { label: 'Over PKR 5M', value: 'over-5m', description: 'High net worth' }] },
            { blockType: 'select', name: 'decisionMaker', label: 'Decision maker', required: true, options: [{ label: 'I decide on my own', value: 'self', description: 'Full autonomy' }, { label: 'Spouse / partner', value: 'spouse-partner', description: 'Joint decision' }, { label: 'Family consensus', value: 'family', description: 'Group decision' }, { label: 'Business funds', value: 'business', description: 'Corporate decision' }] },
            { blockType: 'select', name: 'primaryGoal', label: 'Primary goal', required: true, options: [{ label: 'Grow through stocks', value: 'stocks', description: 'PSX equities & shares' }, { label: 'Trade commodities', value: 'commodities', description: 'Gold, oil & PMEX futures' }, { label: 'Mixed portfolio', value: 'mixed', description: 'PSX + PMEX diversified' }, { label: 'Still exploring', value: 'exploring', description: 'Need guidance first' }] },
          ],
          submitButtonLabel: 'Submit', confirmationType: 'message', confirmationMessage: { root: { type: 'root', version: 1, children: [{ type: 'paragraph', version: 1, children: [{ text: 'Thank you. We will be in touch shortly.', type: 'text', version: 1 }] }] } }, emails: [],
          step1Heading: "Let's find the right investment path for you", step1Intro: "Just a few quick questions, so we don't waste your time.", step2Heading: 'How much are you looking to invest?', step2Intro: 'This helps us recommend the right instruments for your capital.', step3Heading: 'Who gives the green light?', step3Intro: 'This helps our advisors prepare the right conversation for you.', step4Heading: "What's your primary goal right now?", step4Intro: 'PSX equities, PMEX commodities, or both.',
        } as any,
      })
  const layout = HOME_BLOCKS.map((block, index) => {
    if (index === 0) return { ...block, heroImage: image.id }
    if (block.blockType === 'marketResearchCards') return { ...block, cards: (block.cards ?? []).map((card: any, i: number) => ({ ...card, image: researchImages[i].id })) }
    if (block.blockType === 'skarduHotelFeature') return { ...block, image: hotelImage.id }
    if (block.blockType === 'consultationQualifier') return { ...block, form: consultationForm.id }
    return block
  })
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1 })

  // skipRevalidate: the Pages afterChange hook calls revalidatePath(), which
  // needs a Next request store. In a bare tsx process it throws and aborts the
  // write — the same reason the globals below pass it.
  const ctx = { context: { skipRevalidate: true } }

  if (existing.docs[0]) {
    await payload.update({ collection: 'pages', id: existing.docs[0].id, data: { title: 'Home', slug: 'home', layout } as never, ...ctx })
    payload.logger.info('Updated the editable Home page')
  } else {
    await payload.create({ collection: 'pages', data: { title: 'Home', slug: 'home', layout } as never, ...ctx })
    payload.logger.info('Created the editable Home page')
  }

  await payload.updateGlobal({ slug: 'header', data: { logo: logo.id } as never, context: { skipRevalidate: true } })
  await payload.updateGlobal({ slug: 'footer', data: { logo: logo.id, whatsappLabel: 'WhatsApp' } as never, context: { skipRevalidate: true } })

  payload.logger.info(`Hero media: ${image.filename ?? image.id}`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
