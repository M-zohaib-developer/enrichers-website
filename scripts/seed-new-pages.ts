import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'

/**
 * Full pages (not stubs) for the new verticals and the legal page, built with
 * the same block system as the rest of the site.
 *
 * Content references:
 * - Real Estate / AiBi card copy from the client landing-page PDF.
 * - Enrichers divisions from enrichers.com.pk (Enrichers Developers Pvt. Ltd.).
 * - AiBi services from aibi.ae (AI + Behavioural Intelligence, Dubai).
 */

const run = async () => {
  const payload = await getPayload({ config })

  // Reuse the shared "Investor enquiries" form for the consultation sections.
  const forms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const form = forms.docs[0]
  if (!form) throw new Error('Investor enquiries form not found — run `npm run seed:home` first.')

  const group = {
    blockType: 'businessGroupCards',
    eyebrow: 'Enrichers Investment Group',
    heading: 'Part of a diversified group',
    body: 'Brokerage, real assets, agriculture and hospitality under one group.',
    items: [
      { eyebrow: 'Advisory', title: 'Business Brokerage', subtitle: 'Buy, sell & invest', body: 'M&A and business transactions handled with discretion.', url: '/business-brokerage/', icon: 'document' },
      { eyebrow: 'Agriculture', title: 'Agriculture', subtitle: 'Smart farming', body: 'Turning underused land into productive farmland.', url: '/agriculture/', icon: 'agriculture' },
      { eyebrow: 'Hospitality', title: 'Skardu Riverside Hotel', subtitle: 'Flagship project', body: 'A 5-star riverside hotel in Gilgit-Baltistan.', url: '/skardu-riverside-hotel/', icon: 'hospitality' },
    ],
  }

  const consult = (heading: string, subheading: string) => ({
    blockType: 'consultationQualifier',
    sectionId: 'consultation',
    eyebrow: 'Enquiries',
    heading,
    subheading,
    phone: '(042) 111 111 333',
    phoneHref: 'tel:+9242111111333',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
    whatsappLabel: 'WhatsApp our client support',
    email: 'connect@enrichers.com.pk',
    emailHref: 'mailto:connect@enrichers.com.pk',
    hours: '24 hours, Monday to Friday · Closed weekends',
    address: 'Enrichers Investment Group, Head Office, 3rd Floor, High Q Tower, Gulberg 5, Lahore, Pakistan.',
    formMode: 'wizard',
    form: form.id,
  })

  const PAGES = [
    // ───────────────────────── REAL ESTATE ─────────────────────────
    {
      title: 'Real Estate',
      slug: 'real-estate',
      layout: [
        {
          blockType: 'serviceHero',
          theme: 'light',
          breadcrumbs: [ { label: 'Home', url: '/' }, { label: 'Real Estate', url: '' } ],
          eyebrow: 'Real Estate · Pakistan & UAE',
          heading: 'Real estate that holds its value.',
          headingAccent: 'holds its value.',
          body: 'From residential communities in Lahore and a riverside luxury hotel in Skardu to property brokerage in Dubai, we develop, buy, sell and lease real estate that holds its value. Our Dubai arm, Enrichers Properties, is licensed by the Department of Economy and Tourism.',
          primary: { label: 'Book a consultation', url: '#consultation', variant: 'primary' },
          secondary: { label: 'What we do', url: '#services', variant: 'secondary' },
          badges: [ { label: 'Enrichers Developers (Pvt.) Ltd.' }, { label: 'Enrichers Properties — Dubai' }, { label: 'Licensed by DET, Dubai' } ],
        },
        {
          blockType: 'sectionNavigation',
          ariaLabel: 'On this page',
          links: [
            { label: 'What we do', anchor: 'services', active: true },
            { label: 'Where we operate', anchor: 'footprint' },
            { label: 'Consultation', anchor: 'consultation' },
            { label: 'FAQ', anchor: 'faq' },
          ],
          cta: { label: 'Book a consultation', url: '#consultation' },
        },
        {
          blockType: 'serviceOfferings',
          sectionId: 'services',
          eyebrow: 'What we do',
          heading: 'Development, brokerage, leasing and advisory',
          body: 'One team across the full real-estate lifecycle, in Pakistan and the UAE.',
          columns: '2',
          background: 'light',
          items: [
            { title: 'Development', body: 'Residential communities in Lahore and flagship hospitality in Skardu — built and delivered to hold long-term value.', details: [ { label: 'Residential communities' }, { label: 'Hospitality developments' }, { label: 'Mixed-use projects' } ] },
            { title: 'Property brokerage', body: 'Buy, sell and lease residential and commercial property in Pakistan and Dubai, with regulated and discreet guidance.', details: [ { label: 'Buy & sell' }, { label: 'Leasing' }, { label: 'Investor matching' } ] },
            { title: 'Investment & advisory', body: 'Research-led advice on where value is created, structured around your goals and risk appetite.', details: [ { label: 'Market research' }, { label: 'Portfolio structuring' }, { label: 'Partnership models' } ] },
            { title: 'UAE desk — Enrichers Properties', body: 'Our Dubai arm, licensed by the Department of Economy and Tourism, opens the UAE market to our clients.', details: [ { label: 'Dubai property brokerage' }, { label: 'Golden Visa pathways' }, { label: 'Cross-border support' } ] },
          ],
        },
        {
          blockType: 'statsBand',
          sectionId: 'footprint',
          eyebrow: 'Where we operate',
          heading: 'A footprint across Pakistan and the UAE',
          background: 'surface',
          stats: [
            { value: 'Lahore', label: 'Residential communities' },
            { value: 'Skardu', label: 'Riverside luxury hotel' },
            { value: 'Dubai', label: 'Property brokerage (DET-licensed)' },
            { value: '40 kanal', label: 'Skardu flagship site' },
          ],
          footnote: 'Figures reflect current and in-development projects.',
        },
        consult('Talk to our real-estate team', 'Tell us what you are looking to buy, sell or develop and an advisor will call you.'),
        {
          blockType: 'faqAccordion',
          sectionId: 'faq',
          eyebrow: 'Questions',
          heading: 'Real estate FAQs',
          items: [
            { question: 'Which markets do you cover?', answer: 'Pakistan — residential communities in Lahore and our flagship Skardu Riverside Hotel — and the UAE through Enrichers Properties, our Dubai arm licensed by the Department of Economy and Tourism.' },
            { question: 'Can overseas Pakistanis invest?', answer: 'Yes. We support overseas clients end to end, including property in Dubai and Golden Visa pathways.' },
            { question: 'Do you handle buying and selling, or only development?', answer: 'Both. We develop our own projects and act as a brokerage to buy, sell and lease residential and commercial property.' },
            { question: 'Is Enrichers regulated?', answer: 'Enrichers Investment Group operates under SECP oversight in Pakistan, and Enrichers Properties is licensed by the Department of Economy and Tourism in Dubai.' },
          ],
        },
        group,
        {
          blockType: 'readyWhenYouAre',
          heading: 'Ready when you are.',
          body: 'Start building real wealth. Talk to our real-estate team about investment, development or partnership.',
          buttons: [
            { blockType: 'primaryButton', label: 'Book a Consultation', url: '#consultation' },
            { blockType: 'secondaryButton', label: 'Talk to our Experts', url: '/contact-us/#consultation' },
          ],
          riskNotice: 'Investing and trading carries risk, including the possible loss of capital. Returns are not guaranteed.',
        },
      ],
    },

    // ───────────────────────── AiBi ─────────────────────────
    {
      title: 'AiBi Management Consultancies',
      slug: 'aibi',
      layout: [
        {
          blockType: 'serviceHero',
          theme: 'light',
          breadcrumbs: [ { label: 'Home', url: '/' }, { label: 'AiBi Management Consultancies', url: '' } ],
          eyebrow: 'Consultancy · Dubai',
          heading: 'AiBi Management Consultancies',
          body: 'Our Dubai-based consultancy helps organisations grow smarter through corporate compliance, process optimisation, digital transformation, back-office technology, and Golden Visa support, alongside advanced AI training and institutional advisory.',
          primary: { label: 'Book a consultation', url: '#consultation', variant: 'primary' },
          secondary: { label: 'Our services', url: '#services', variant: 'secondary' },
          badges: [ { label: 'AiBi Management Consultancy' }, { label: 'Dubai, UAE' }, { label: 'AI + Behavioural Intelligence' } ],
        },
        {
          blockType: 'sectionNavigation',
          ariaLabel: 'On this page',
          links: [
            { label: 'Services', anchor: 'services', active: true },
            { label: 'Why AiBi', anchor: 'why' },
            { label: 'Consultation', anchor: 'consultation' },
            { label: 'FAQ', anchor: 'faq' },
          ],
          cta: { label: 'Book a consultation', url: '#consultation' },
        },
        {
          blockType: 'businessIntro',
          heading: 'Artificial Intelligence and Behavioural Intelligence',
          body: 'AiBi pairs advanced AI analytics with behavioural insight — how people actually think and decide — to deliver strategies that are data-driven, culturally relevant and built to last. We work with executives and leadership teams across Dubai, the wider Middle East, and internationally.',
          buttons: [],
        },
        {
          blockType: 'serviceOfferings',
          sectionId: 'services',
          eyebrow: 'What we do',
          heading: 'Consultancy services',
          body: 'Intelligence, tools and market access for a dynamic world.',
          columns: '3',
          background: 'light',
          items: [
            { title: 'Corporate compliance & governance', body: 'Guidance through jurisdictional requirements while protecting organisational integrity.' },
            { title: 'Business process optimisation', body: 'Technology-enhanced operating models that increase efficiency.' },
            { title: 'Digital transformation & AI', body: 'AI-powered automation, predictive analytics and scalable systems.' },
            { title: 'Back-office technology', body: 'Modern back-office platforms that keep operations running smoothly.' },
            { title: 'Golden Visa support', body: 'Pathways and support for UAE residency and long-term stays.' },
            { title: 'AI & behavioural training', body: 'Coaching and workshops that turn behavioural data into better decisions.' },
            { title: 'Institutional advisory', body: 'Strategic expansion, growth planning and portfolio optimisation.' },
            { title: 'Market access & liquidity', body: 'Access to deep, transparent liquidity pools for efficient execution.' },
          ],
        },
        {
          blockType: 'benefitsGrid',
          sectionId: 'why',
          eyebrow: 'Why AiBi',
          heading: 'AI power, human insight',
          showHeader: true,
          background: 'sunken',
          items: [
            { title: 'Data-driven', body: 'Decisions grounded in analytics, not guesswork.' },
            { title: 'Behaviourally aware', body: 'Strategies that reflect how people actually decide.' },
            { title: 'Dubai-based', body: 'On the ground in the UAE, working across the Middle East.' },
            { title: 'Compliance-first', body: 'Governance and regulation built into every engagement.' },
            { title: 'Scalable', body: 'Approaches that grow with your organisation.' },
            { title: 'Globally connected', body: 'Access to international liquidity and market networks.' },
          ],
        },
        consult('Talk to the AiBi team', 'Tell us about your organisation and goals, and an advisor will be in touch.'),
        {
          blockType: 'faqAccordion',
          sectionId: 'faq',
          eyebrow: 'Questions',
          heading: 'AiBi FAQs',
          items: [
            { question: 'Where is AiBi based?', answer: 'AiBi Management Consultancy is based in Dubai and works with clients across the UAE, the wider Middle East and internationally.' },
            { question: 'What does "AI and Behavioural Intelligence" mean?', answer: 'We combine AI analytics with behavioural insight — decoding how people think and decide — to deliver strategies that are both data-driven and human-centred.' },
            { question: 'Can you help with UAE residency?', answer: 'Yes. We support Golden Visa pathways and long-term UAE residency alongside our corporate services.' },
            { question: 'Who do you work with?', answer: 'Executives, leadership teams and organisations across diverse industries, in the UAE and beyond.' },
          ],
        },
        group,
        {
          blockType: 'readyWhenYouAre',
          heading: 'Ready when you are.',
          body: 'Speak with the AiBi team about consultancy, compliance and growth.',
          buttons: [
            { blockType: 'primaryButton', label: 'Book a Consultation', url: '#consultation' },
            { blockType: 'secondaryButton', label: 'Talk to our Experts', url: '/contact-us/#consultation' },
          ],
          riskNotice: 'AiBi Management Consultancy provides advisory services; content is for information and education only.',
        },
      ],
    },

    // ───────────────────────── TERMS OF USE ─────────────────────────
    {
      title: 'Terms of Use',
      slug: 'terms-of-use',
      layout: [
        {
          blockType: 'serviceHero',
          theme: 'light',
          breadcrumbs: [ { label: 'Home', url: '/' }, { label: 'Terms of Use', url: '' } ],
          eyebrow: 'Legal',
          heading: 'Terms of Use',
          body: 'These Terms of Use govern your access to and use of the Enrichers Investment Group website and the information it contains. Please read them carefully.',
          secondary: { label: 'Regulation & disclosures', url: '/regulation/', variant: 'secondary' },
          badges: [],
        },
        {
          blockType: 'businessIntro',
          heading: 'Please read carefully',
          body: 'By accessing or using this website you agree to be bound by these Terms of Use. If you do not agree, please do not use the site. Last updated: November 2026.',
          buttons: [],
        },
        {
          blockType: 'guideAccordion',
          sectionId: 'terms',
          eyebrow: 'The terms',
          heading: 'Terms of Use in detail',
          intro: 'The sections below set out how you may use this website and the limits of our responsibility.',
          items: [
            { question: 'Use of the website', answer: 'You may use this site for lawful, personal and informational purposes only. You must not misuse the site, attempt to gain unauthorised access, or disrupt its operation.' },
            { question: 'No investment advice', answer: 'Content on this site is provided for information and education only and is not personalised investment advice, an offer, or a solicitation. Investing and trading in securities, futures and other financial markets carries risk, including the possible loss of capital, and may not suit every investor. Brokerage services are provided by Enrichers Securities (Pvt.) Ltd. (PSX) and Enrichers (Pvt.) Ltd. (PMEX), both regulated by the SECP.' },
            { question: 'Intellectual property', answer: 'All content on this site — text, graphics, logos and images — is owned by or licensed to Enrichers Investment Group and is protected by applicable laws. You may not copy, reproduce or distribute it without our permission.' },
            { question: 'Third-party links', answer: 'This site may link to third-party websites. We are not responsible for their content, policies or practices, and a link does not imply endorsement.' },
            { question: 'Limitation of liability', answer: 'The site is provided on an "as is" basis. To the fullest extent permitted by law, Enrichers Investment Group is not liable for any loss arising from your use of, or reliance on, this site or its content.' },
            { question: 'Changes to these terms', answer: 'We may update these Terms of Use from time to time. The version published on this page is always the current one.' },
            { question: 'Governing law', answer: 'These terms are governed by the laws of Pakistan, and any disputes are subject to the jurisdiction of the courts of Lahore.' },
          ],
        },
        {
          blockType: 'businessIntro',
          heading: 'Questions about these terms?',
          body: 'Email connect@enrichers.com.pk or call (042) 111 111 333. For licensing and investor information, see our Regulation & Disclosures page.',
          buttons: [ { blockType: 'secondaryButton', label: 'Regulation & disclosures', url: '/regulation/' } ],
        },
      ],
    },

    // ───────────────────────── PRIVACY POLICY ─────────────────────────
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      layout: [
        {
          blockType: 'serviceHero',
          theme: 'light',
          breadcrumbs: [ { label: 'Home', url: '/' }, { label: 'Privacy Policy', url: '' } ],
          eyebrow: 'Legal',
          heading: 'Privacy Policy',
          body: 'Your personal data is important to us, and we want you to know how we collect, use and protect it. This policy explains your choices and how to reach us.',
          secondary: { label: 'Terms of Use', url: '/terms-of-use/', variant: 'secondary' },
          showBottomBorder: false,
          badges: [],
        },
        {
          blockType: 'businessIntro',
          heading: 'Your privacy matters',
          body: 'This policy applies to Enrichers Investment Group, its subsidiaries, affiliates, branches and representative offices (together "we", "us" and "our"). Some affiliates run their own websites with their own privacy notices, and this policy does not apply to third-party websites we do not operate. Last updated: November 2026.',
          buttons: [],
        },
        {
          blockType: 'guideAccordion',
          sectionId: 'privacy',
          eyebrow: 'The policy',
          heading: 'Privacy policy in detail',
          intro: 'The sections below explain what we collect, how we use it, and the choices you have.',
          items: [
            { question: 'What personal data we collect', answer: 'Personal data is information that identifies you or is about you as an individual. We may collect your name and contact details, the information you provide when you open an account or submit an enquiry, and data about how you use our website.' },
            { question: 'How we use your data', answer: 'We use your personal data to provide our services, respond to your enquiries, open and manage accounts, meet our regulatory and legal obligations, and improve your client experience.' },
            { question: 'Data analytics and AI', answer: 'We may use your data for data analytics, including profiling and behavioural analysis, and for automated decisions. We use artificial intelligence and machine learning to help improve our communications and client experience.' },
            { question: 'Marketing communications', answer: 'With your consent, we may send you news, offers and promotions, market research, charitable appeals and event information by post, email, SMS, WhatsApp or social media. You can opt out at any time by contacting us.' },
            { question: 'Sharing and third parties', answer: 'We do not sell your personal data. We share it only with service providers and affiliates who help us deliver our services, and where required by law or our regulators.' },
            { question: 'How we protect your data', answer: 'We apply technical, physical and organisational measures to keep your personal data safe and confidential. Where we work with third parties, our contracts include appropriate data-protection terms, and our staff are trained on data-privacy standards.' },
            { question: 'Your choices and opt-out', answer: 'You can ask to access, correct or delete your personal data, or withdraw consent for marketing, by contacting us. To stop marketing messages you can also reply "STOP" to our WhatsApp messages.' },
            { question: 'Employee and applicant data', answer: 'Our HR team handles applicant and employee data in line with this policy, with access limited to authorised personnel for employment purposes. Applicants and employees can opt out by emailing hr@enrichers.com.pk or replying "STOP" to WhatsApp messages.' },
            { question: 'Changes to this policy', answer: 'We may update this privacy notice from time to time. The current version and its date are always shown on this page.' },
          ],
        },
        {
          blockType: 'businessIntro',
          heading: 'Questions about your privacy?',
          body: 'Email connect@enrichers.com.pk or call (042) 111 111 333. For licensing and investor information, see our Regulation & Disclosures page.',
          buttons: [ { blockType: 'secondaryButton', label: 'Regulation & disclosures', url: '/regulation/' } ],
        },
      ],
    },

    // ───────────────────────── VIDEO GALLERY ─────────────────────────
    {
      title: 'Video Gallery',
      slug: 'video-gallery',
      layout: [
        {
          blockType: 'serviceHero',
          theme: 'dark',
          heroVariant: 'standard',
          breadcrumbs: [ { label: 'Home', url: '/' }, { label: 'Video Gallery', url: '' } ],
          eyebrow: 'Knowledge Hub · Videos',
          heading: 'Watch, learn and stay ahead of the markets.',
          headingAccent: 'stay ahead of the markets.',
          body: 'Market updates, educational explainers and the Enrichers story — all in one place.',
          primary: { blockType: 'primaryButton', label: 'Book a consultation', url: '/contact-us/#consultation', variant: 'primary' },
          secondary: { blockType: 'secondaryButton', label: 'Read our research', url: '/latest-insight/', variant: 'secondary' },
          badges: [],
        },
        {
          blockType: 'videoGallery',
          sectionId: 'videos',
          eyebrow: 'Knowledge Hub',
          heading: 'Video gallery',
          body: 'Market updates, educational explainers and the Enrichers story — straight from our YouTube channel.',
          channelName: 'Enrichers Investment Group',
          channelUrl: 'https://www.youtube.com/@enrichersinvestmentgroup',
          channelStats: '484 videos · 5M views',
          // Each playlist embeds the whole YouTube playlist (every video shows
          // automatically). "All videos" is the channel's uploads playlist.
          playlists: [
            { title: 'All videos', playlistId: 'UU6sWRZs7xmIFmfldEZ_JB5Q' },
            { title: 'A Decade of Enrichers', playlistId: 'PLYagOOyOHG7Jqd4Nsuamp_JTQS6PyL58l' },
            { title: 'Daily Market Analytics', playlistId: 'PLYagOOyOHG7LQGjrta6FaD8ktkki_daLi' },
          ],
        },
        {
          blockType: 'readyWhenYouAre',
          heading: 'Ready when you are.',
          body: 'Open a PSX or PMEX account online, or speak with our team first.',
          buttons: [
            { blockType: 'primaryButton', label: 'Open an Account', url: '/open-account/' },
            { blockType: 'secondaryButton', label: 'Talk to our Experts', url: '/contact-us/#consultation' },
          ],
          riskNotice: 'Content is for information and education only and is not personalised investment advice.',
        },
      ],
    },
  ]

  const ctx = { context: { skipRevalidate: true } }
  for (const page of PAGES) {
    const existing = await payload.find({ collection: 'pages', where: { slug: { equals: page.slug } }, limit: 1 })
    // _status: 'published' so the public route serves them (drafts 404 for visitors).
    const data = { title: page.title, slug: page.slug, layout: page.layout, _status: 'published' } as never
    if (existing.docs[0]) {
      await payload.update({ collection: 'pages', id: existing.docs[0].id, data, ...ctx })
      payload.logger.info(`Updated page: /${page.slug}/`)
    } else {
      await payload.create({ collection: 'pages', data, ...ctx })
      payload.logger.info(`Created page: /${page.slug}/`)
    }
  }
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
