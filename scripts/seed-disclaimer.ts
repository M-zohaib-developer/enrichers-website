/**
 * Build a dedicated /disclaimer/ page in the Enrichers theme.
 *
 * Intro paragraph is the verbatim disclaimer from enrichers.com.pk's live
 * footer. The remaining sections are standard broker-disclaimer clauses
 * tailored to SECP / PSX / PMEX. All copy stays editable in admin.
 *
 * Also repoints the footer "Disclaimer" link from /regulation/ to /disclaimer/
 * (done via a separate edit to src/Footer/defaults.ts + seed-globals).
 *
 * Run: npx tsx scripts/seed-disclaimer.ts
 */
import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const cfg = await config
const payload = await getPayload({ config: cfg })

const layout: any[] = [
  {
    blockType: 'serviceHero',
    theme: 'dark',
    eyebrow: 'Important information',
    heading: 'Disclaimer',
    body:
      'Enrichers Investment Group operates as a licensed brokerage house under SECP regulatory oversight. Trading in futures and financial markets carries inherent risks and may not be appropriate for every trader. We do not offer guaranteed returns or manage funds. The content on this site is intended solely for informational and educational purposes and should not be taken as personalised investment advice.',
    primary: [
      { label: 'Open an account', url: '/open-account/', variant: 'primary' },
      { label: 'Book a consultation', url: '/contact-us/#consultation', variant: 'secondary' },
    ],
    showBottomBorder: true,
  },
  {
    blockType: 'guideAccordion',
    sectionId: 'disclaimer',
    eyebrow: 'Terms you should read',
    heading: 'What this website is — and what it is not',
    intro: 'Please read each item carefully before acting on anything you see on this website. These terms apply to every visitor.',
    columns: '1',
    items: [
      {
        question: '1. Regulatory oversight',
        answer:
          'Enrichers Investment Group operates through Enrichers Securities (Pvt.) Ltd. (a TREC holder of the Pakistan Stock Exchange) and Enrichers (Pvt.) Ltd. (a member of the Pakistan Mercantile Exchange), both regulated by the Securities and Exchange Commission of Pakistan (SECP). Our licences and membership certificates are available in the Regulation & disclosures section.',
      },
      {
        question: '2. Risk of loss',
        answer:
          'Investing and trading in securities, futures, commodities, currencies and derivatives carries risk, including the possible loss of your entire capital. Prices can move rapidly against you and leverage can amplify losses. You should only trade with capital you can afford to lose and only after you understand the nature and risks of each product.',
      },
      {
        question: '3. No guaranteed returns',
        answer:
          'Enrichers does not offer or imply guaranteed returns on any investment. Past performance is not an indicator of future results. Any projection, forecast, back-test or hypothetical result shown on this website is illustrative only and is not a promise of future performance.',
      },
      {
        question: '4. No personalised investment advice',
        answer:
          'All content on this website — research notes, market commentary, educational videos, articles, glossary entries, and product pages — is provided for information and education only. Nothing on this website constitutes personalised investment, legal or tax advice, nor a solicitation to buy or sell any security or contract. For advice that fits your circumstances, book a consultation with a licensed Enrichers advisor.',
      },
      {
        question: '5. No fund management',
        answer:
          'Enrichers does not pool, manage or accept custody of client funds under a managed-account mandate. Brokerage accounts are opened directly in the client\'s name on PSX and PMEX via the exchanges\' approved onboarding portals. Funds move through the regulated settlement rails of the relevant exchange and the Central Depository Company (CDC).',
      },
      {
        question: '6. Accuracy of information',
        answer:
          'We make reasonable efforts to keep information on this website current and correct, but we do not warrant its completeness or accuracy. Markets move, rules change, and third-party data occasionally contains errors. Nothing here should be relied on without independent verification. We reserve the right to update, revise or withdraw content at any time without notice.',
      },
      {
        question: '7. Third-party content and links',
        answer:
          'This website may link to or embed third-party content — for example, YouTube videos, charts, research reports, and press articles. Enrichers does not control, endorse or take responsibility for the content, accuracy or availability of third-party material.',
      },
      {
        question: '8. Jurisdiction and eligibility',
        answer:
          'Information on this website is directed primarily at residents of Pakistan who are eligible to open a brokerage account on PSX or PMEX. If you are accessing the website from another jurisdiction, you are responsible for ensuring that your use of the content and any resulting trading activity complies with your local laws and regulations.',
      },
      {
        question: '9. Complaints',
        answer:
          'If you believe you have a complaint against Enrichers, please raise it in writing through the Investor Complaint Registration Form linked in the Regulation & disclosures section. Complaints are handled in line with SECP and exchange-mandated procedures.',
      },
      {
        question: '10. Changes to this disclaimer',
        answer:
          'We may update this disclaimer from time to time. The current version always lives at this URL. Material changes will be flagged where appropriate. Continued use of the website after an update means you accept the revised terms.',
      },
    ],
  },
  {
    blockType: 'readyWhenYouAre',
    heading: 'Our team can walk you through the risks before you trade.',
    body:
      'If any part of this disclaimer is unclear, book a consultation and an Enrichers advisor will explain it in plain language.',
    buttons: [
      { blockType: 'primaryButton', label: 'Book a consultation', url: '/contact-us/#consultation' },
      { blockType: 'secondaryButton', label: 'Read the Regulation page', url: '/regulation/' },
    ],
    riskNotice:
      'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.',
  },
]

const existing = await payload.find({
  collection: 'pages',
  where: { slug: { equals: 'disclaimer' } },
  limit: 1,
  overrideAccess: true,
})

if (existing.docs[0]) {
  await payload.update({
    collection: 'pages',
    id: existing.docs[0].id,
    data: { title: 'Disclaimer', layout } as any,
    overrideAccess: true,
    context: { skipRevalidate: true },
  })
  console.log('Updated existing /disclaimer/ page id:', existing.docs[0].id)
} else {
  const created = await payload.create({
    collection: 'pages',
    data: {
      slug: 'disclaimer',
      title: 'Disclaimer',
      _status: 'published',
      layout,
    } as any,
    overrideAccess: true,
    context: { skipRevalidate: true },
  })
  console.log('Created /disclaimer/ page id:', (created as any).id)
}
process.exit(0)
