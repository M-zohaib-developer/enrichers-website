import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const text = (value: string, format = 0) => ({ type: 'text', version: 1, text: value, format, detail: 0, mode: 'normal', style: '' })
const paragraph = (...children: any[]) => ({ type: 'paragraph', version: 1, children, direction: null, format: '', indent: 0 })
const link = (label: string, url: string) => ({ type: 'link', version: 2, fields: { url, linkType: 'custom', newTab: false }, children: [text(label)], direction: null, format: '', indent: 0 })
const externalLink = (label: string, url: string) => ({ type: 'link', version: 2, fields: { url, linkType: 'custom', newTab: true }, children: [text(label)], direction: null, format: '', indent: 0 })
const heading = (tag: 'h2' | 'h3' | 'h4', value: string) => ({ type: 'heading', tag, version: 1, children: [text(value)], direction: null, format: '', indent: 0 })
const list = (items: string[]) => ({ type: 'list', listType: 'bullet', version: 1, start: 1, children: items.map((item) => ({ type: 'listitem', version: 1, value: 1, children: [paragraph(text(item))], direction: null, format: '', indent: 0 })), direction: null, format: '', indent: 0 })
const richText = (children: any[]) => ({ root: { type: 'root', version: 1, children, direction: null, format: '' as const, indent: 0 } })

const run = async () => {
  const payload = await getPayload({ config })
  const getMedia = async (alt: string, filename: string) => {
    const existing = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return existing.docs[0] ?? payload.create({
      collection: 'media',
      data: { alt },
      filePath: path.resolve(dirname, `../public/brand/${filename}`),
    })
  }

  const heroImage = await getMedia('Agriculture Research Center', 'research-centre.webp')
  const consultationImageOne = await getMedia(
    'Agriculture Research Centre consultation 1',
    'research-centre-consultation-1.webp',
  )
  const consultationImageTwo = await getMedia(
    'Agriculture Research Centre consultation 2',
    'research-centre-consultation-2.webp',
  )
  const missionImage = await getMedia('Our Mission (Agriculture Research)', 'research-centre-mission.webp')
  const focusImages = await Promise.all([
    getMedia('Farm Management', 'research-focus-farm-management.webp'),
    getMedia('Smart Farming', 'research-focus-smart-farming.webp'),
    getMedia('Farm-to-Market Solutions', 'research-focus-farm-to-market.webp'),
    getMedia('Food Security', 'research-focus-food-security.webp'),
    getMedia('Exemplifying Best Farm', 'research-focus-best-farm.webp'),
    getMedia('Actionable Field Data Utilization', 'research-focus-field-data.webp'),
    getMedia('Promoting Research and Training', 'research-focus-research-training.webp'),
  ])
  const forms = await payload.find({ collection: 'forms', where: { title: { equals: 'Investor enquiries' } }, limit: 1 })
  const form = forms.docs[0]
  if (!form) throw new Error('Investor enquiries form was not found. Run npm run seed:home first.')

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'school-of-agriculture-research-centre' } },
    limit: 1,
  })
  const page = existing.docs[0]
  if (!page) throw new Error('Research Centre page was not found. Run npm run seed:missing-pages first.')

  const layout = Array.isArray(page.layout) ? [...page.layout] : []
  layout[0] = {
    blockType: 'marketHero',
    eyebrow: '',
    heading: 'Agriculture Research Center',
    headingLineOne: '',
    headingLineTwo: '',
    headingLineThree: '',
    body: '',
    showButtons: false,
    buttons: [],
    heroImage: heroImage.id,
    badges: [],
  }
  layout[1] = {
    blockType: 'consultationShowcase',
    sectionId: 'consultation',
    eyebrow: 'Free consultation',
    heading: 'Get free consultation today!',
    subheading: '',
    phone: '(042) 111 111 333',
    phoneHref: 'tel:+9242111111333',
    whatsappUrl: 'https://api.whatsapp.com/send?phone=9242111111333',
    whatsappLabel: 'WhatsApp our client support',
    hours: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
    formStepLabel: 'Step 1 of 4 · Demo — nothing is submitted',
    formHeading: "Let's find the right investment path for you",
    formIntro: "Just a few quick questions, so we don't waste your time.",
    form: form.id,
    images: [
      { image: consultationImageOne.id, alt: 'Agriculture Research Centre consultation 1' },
      { image: consultationImageTwo.id, alt: 'Agriculture Research Centre consultation 2' },
    ],
    intervalSeconds: 5,
  }
  layout[2] = {
    blockType: 'richIntro',
    heading: 'Agriculture Research Center',
    body: {
      root: {
        type: 'root',
        version: 1,
        children: [paragraph(
          text('Baab-ul-Ilm is an esteemed institute of agriculture sciences and research center that aims to tackle various challenges in the agri-food system to promote sustainable development. '),
          link('Our team', '/enrichers-team/'),
          text(' of seasoned experts adopts a proactive approach towards smart agriculture, efficient farm management, and access to updated agricultural technology, bridging the gap between fundamental research and agricultural practice. We encourage innovation and ongoing development while enabling learners to acquire practical knowledge and skill in a variety of agronomical-related subjects.'),
        )],
        direction: null,
        format: '',
        indent: 0,
      },
    },
    buttons: [{ blockType: 'primaryButton', label: 'Get Started', url: 'https://api.whatsapp.com/send?phone=9242111111333' }],
  }
  layout[3] = {
    blockType: 'imageTextFeature',
    heading: 'Our Mission',
    body: 'At Baab-ul-Ilm, our mission is clear: to collaborate with farmers, researchers, and stakeholders alike in forging a future food system that is both resilient and sustainable. Recognizing the impermanence of what is deemed modern today, we prioritize relentless innovation through rigorous research, ensuring that our practices remain ahead of the curve.',
    image: missionImage.id,
    imageAlt: 'Our Mission (Agriculture Research)',
    imagePosition: 'left',
  }
  layout[4] = {
    blockType: 'focusAreasGrid',
    sectionId: 'focus-areas',
    eyebrow: '',
    heading: 'Key Focus Areas',
    body: '',
    items: [
      { image: focusImages[0].id, imageAlt: 'Farm Management', title: 'Farm Management', body: 'Implementing efficient and effective strategies for farm operation optimization.' },
      { image: focusImages[1].id, imageAlt: 'Smart Farming', title: 'Smart Farming Platforms', body: 'Harnessing the power of technology to revolutionize agricultural practices and enhance productivity.' },
      { image: focusImages[2].id, imageAlt: 'Farm-to-Market Solutions', title: 'Farm-to-Market Solutions', body: 'Developing seamless solutions to connect producers with consumers, ensuring maximum efficiency and profitability.' },
      { image: focusImages[3].id, imageAlt: 'Food Security', title: 'Addressing Food Security Challenges', body: 'Tackling the pressing issue of food security through sustainable agricultural practices and innovative solutions.' },
      { image: focusImages[4].id, imageAlt: 'Exemplifying Best Farm', title: 'Exemplifying Best Farm Management Practices', body: 'Serving as a model for excellence in farm management, setting industry standards for others to follow.' },
      { image: focusImages[5].id, imageAlt: 'Actionable Field Data Utilization', title: 'Actionable Field Data Utilization', body: 'Leveraging data-driven insights to inform decision-making processes and drive tangible results.' },
      { image: focusImages[6].id, imageAlt: 'Promoting Research and Training', title: 'Promoting Research and Training', body: 'Fostering a culture of continuous learning and development, equipping individuals with the knowledge and skills necessary to thrive in the agricultural landscape of tomorrow.' },
    ],
  }
  layout[5] = {
    blockType: 'richTextBlock',
    sectionId: 'agriculture-research-guide',
    heading: 'Agriculture Research Guide',
    background: 'white',
    showAccentBar: true,
    body: richText([
      paragraph(text('Pakistan’s farmers don’t just need more investment — they need better information. That’s the gap Baab-ul-Ilm, EIG’s '), text('agriculture research center in Pakistan', 1), text(', was built to close: turning modern agricultural science into practical, usable knowledge for the people actually working the land.')),
      paragraph(text('While EIG’s broader agriculture initiatives focus on investment and infrastructure, the Research Centre’s job is different — it’s where the actual science, testing, and training happen before those practices ever reach a farm.')),
      heading('h3', 'Why Agricultural Research Matters More Than Ever in Pakistan'),
      paragraph(text('A few realities are making '), text('agricultural research in Pakistan', 1), text(' increasingly urgent:')),
      list([
        'Climate variability is making traditional farming timing and methods less reliable year over year',
        'Soil degradation from decades of conventional farming practices is reducing long-term yield potential',
        'Water scarcity is pushing farmers toward smarter, more efficient irrigation methods out of necessity, not just preference',
        'A widening gap between what agricultural science already knows and what actually reaches small and mid-sized farms',
      ]),
      heading('h3', 'What Makes Smart Farming “Smart”'),
      paragraph(text('Smart farming in Pakistan', 1), text(' isn’t just a buzzword — at Baab-ul-Ilm, it means using drones and sensors to monitor crop health in real time, applying data-driven insights instead of guesswork to farm management decisions, and testing soil health systematically rather than relying on tradition alone. The goal isn’t replacing farmers with technology — it’s giving them better information to make decisions they were already making, just with less certainty before.')),
      heading('h3', 'From Research to Real Farms: Closing the Knowledge Gap'),
      paragraph(text('One of the most overlooked challenges in agricultural development isn’t a lack of research — it’s the gap between research findings sitting in academic papers and actual changes happening on real farms. Baab-ul-Ilm’s approach specifically focuses on bridging that gap: taking rigorous research and translating it into training, tools, and practices farmers can genuinely apply, not just theoretical recommendations that never leave a lab.')),
      heading('h3', 'Training the Next Generation of Agricultural Innovators'),
      paragraph(text('Beyond research itself, part of the Centre’s mission is education — equipping learners with practical, hands-on knowledge across agronomical disciplines. This matters because sustainable agricultural change in Pakistan won’t come from imported technology alone; it depends on a growing base of trained people who understand both the science and the on-the-ground realities of Pakistani farming.')),
      heading('h3', 'Who Benefits From This Research?'),
      paragraph(text('The short answer: everyone in the agricultural value chain. Farmers get access to better methods and technology. Investors get a more resilient, better-informed agriculture sector to put capital behind. And the country gets a stronger food security foundation at a time when that matters more than ever.')),
      paragraph(text('Interested in learning more about Baab-ul-Ilm’s research initiatives or exploring partnership opportunities? '), externalLink('Reach out to our team', 'https://api.whatsapp.com/send?phone=9242111111333'), text(' to discuss how the Centre’s work aligns with your interests.')),
    ]),
  }
  layout[6] = {
    blockType: 'faqAccordion',
    sectionId: 'agriculture-research-faq',
    eyebrow: 'Frequently asked questions',
    heading: 'Agriculture Research FAQs',
    items: [
      {
        question: 'What does it mean for soil to be healthy, and why is it vital for smart farming in Pakistan?',
        answer: 'Soil health is the condition of the soil in terms of its structure, fertility, nutrient content, organic matter, and ability to sustain plant growth. Maintaining soil health is important for Pakistan’s smart agriculture systems because it helps crops grow well, uses water efficiently, and fights pests and illnesses. Enrichers’ School of Agriculture & Research Centre focuses on testing and improving soil to make sure that farms in Pakistan are as productive as possible.',
      },
      {
        question: 'What kinds of technology does the School of Agriculture & Research Centre utilize for smart farming in Pakistan?',
        answer: 'The Centre uses technology in smart farming platforms, data-driven insights, precision agriculture technologies, and research into methods for getting goods from farms to markets. These allow farmers in Pakistan to use water more efficiently, keep an eye on the health of their animals, and make more money.',
      },
      {
        question: 'How do livestock, dairy farming, and meat export fit into the Centre’s research plan in Pakistan?',
        answer: 'The Centre’s research focuses on livestock and dairy production because they are important to Pakistan’s economy and food system. The Centre develops ways to make dairy farming more productive, keep animals healthy, and increase the quality of meat. These techniques benefit Pakistan’s meat export business by helping ensure that meat meets international standards.',
      },
      {
        question: 'How does Enrichers’ School of Agriculture help with water conservation and agricultural management in Pakistan when it comes to Mudarabah or partnership models?',
        answer: 'The Centre teaches modern ways to run a farm and save water, such as smart irrigation and monitoring soil moisture. It also uses financial structures like Mudarabah or partnerships to assist farmers in investing in sustainable agriculture without having to pay for everything up front. This helps smaller farmers in Pakistan grow their businesses in a way that is good for the environment.',
      },
      {
        question: 'What kinds of agriculture initiatives does Enrichers Investment Group undertake in Pakistan?',
        answer: 'Enrichers focuses on sustainable farming practices and smart agriculture in Pakistan, including smart irrigation, drone and sensor-based crop monitoring, seed banking, export-oriented cultivation, produce grading, and corporate dairy and livestock farming.',
      },
      {
        question: 'How does Enrichers use technology in its agriculture projects?',
        answer: 'The company integrates advanced technologies such as drones, sensors, AI-driven farm management, smart irrigation systems, and soil monitoring to maximise yield while conserving resources.',
      },
      {
        question: 'What role does Enrichers play in the export-oriented cultivation of crops?',
        answer: 'Enrichers strategically cultivates high-demand crops for global markets and emphasises grading and quality control of agricultural produce so that farmers earn fair compensation and Pakistan’s exports grow.',
      },
      {
        question: 'How does Enrichers support dairy, livestock, and allied agriculture in Pakistan?',
        answer: 'Through corporate dairy farming and improved livestock productivity practices, Enrichers helps increase the supply of high-quality milk, supports farmer upskilling, and strengthens the livestock sector.',
      },
    ],
  }

  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { layout } as never,
    context: { skipRevalidate: true },
  })
  payload.logger.info('Added the Agriculture Research Centre consultation section')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
