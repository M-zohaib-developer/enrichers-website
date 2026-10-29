/** Seeds the first two editable team-member profile pages. */
import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const text = (value: string, format = 0) => ({ type: 'text', version: 1, text: value, format, detail: 0, mode: 'normal', style: '' })
const paragraph = (...children: any[]) => ({ type: 'paragraph', version: 1, children, direction: null, format: '', indent: 0 })
const link = (label: string, url: string) => ({ type: 'link', version: 2, fields: { url, linkType: 'custom', newTab: true }, children: [text(label)], direction: null, format: '', indent: 0 })
const rich = (children: any[]) => ({ root: { type: 'root', version: 1, children, direction: null, format: '', indent: 0 } })

const run = async () => {
  const payload = await getPayload({ config })
  const media = await payload.find({ collection: 'media', where: { alt: { equals: 'Syed Abdullah Bukhari' } }, limit: 1 })
  if (!media.docs[0]) throw new Error('Run npm run seed:enrichers-team first so the portrait is available.')

  const layout = [{
    blockType: 'teamMemberProfile',
    sectionId: 'profile',
    eyebrow: 'Team details',
    heading: 'Syed Abdullah Bukhari',
    photo: media.docs[0].id,
    role: 'Founder & Chairman',
    companyLabel: 'Enrichers Investment Group',
    companyUrl: '/',
    credentials: [
      { text: 'Investment Certified', linkLabel: 'IFMA', linkUrl: 'https://ifma.org/' },
      { text: 'Certified Director – Code of Corporate Governance 2012 of SECP & ICMA' },
      { text: 'FCM - IFMP SECP | PMR - IFMP SECP' },
      { text: 'Member – National Risk Assessment (NRA) & Anti Money Laundering (AML) World Bank' },
    ],
    body: rich([
      paragraph(text('Mr. Syed is a compassionate, resilient and result-driven professional having more than 20 years of experience in domestic & international financial derivatives, fund management, agriculture and real estate industry. He is currently heading as the Chairman at Enrichers Investment Group.')),
      paragraph(text('His strategic acumen propelled Enrichers to a top 10 position among Pakistani brokers within 3 years of inception, fueled by his deep understanding of international markets, regulations, and corporate law. Recognized for his commitment to ethical leadership, Mr. Syed has established Enrichers as a benchmark for ethical practices in the industry.')),
      paragraph(text('As a thought leader, Mr. Syed champions innovation, pioneering the use of data science and predictive analytics to reshape industry dynamics and deliver exceptional client outcomes. A proven achiever with an unwavering results-oriented mindset, he is driven by a constant pursuit of improvement and exceeding expectations. Under his charismatic leadership, Enrichers not only thrives but sets the standard for ethical, data-driven success in the industry.')),
      paragraph(text('Learn more about '), link('Enrichers Investment Group', '/about-us/'), text('.')),
    ]),
    backLinkLabel: 'Back to our team',
    backLinkUrl: '/enrichers-team/',
  }]

  const slug = 'syed-abdullah-bhukahri'
  const data = { title: 'Syed Abdullah Bukhari', slug, layout } as never
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1 })
  if (existing.docs[0]) await payload.update({ collection: 'pages', id: existing.docs[0].id, data, context: { skipRevalidate: true } })
  else await payload.create({ collection: 'pages', data, context: { skipRevalidate: true } })
  const tariqMedia = await payload.find({ collection: 'media', where: { alt: { equals: 'Syed Tariq Hussain' } }, limit: 1 })
  if (!tariqMedia.docs[0]) throw new Error('Run npm run seed:enrichers-team first so the second portrait is available.')
  const tariqSlug = 'syed-tariq-hussain'
  const tariqData = {
    title: 'Syed Tariq Hussain',
    slug: tariqSlug,
    layout: [{
      blockType: 'teamMemberProfile', sectionId: 'profile', eyebrow: 'Team details', heading: 'Syed Tariq Hussain', photo: tariqMedia.docs[0].id,
      role: 'Co-Chairman', companyLabel: 'Enrichers Investment Group', companyUrl: '/',
      credentials: [{ text: 'Chartered Accountant', linkLabel: 'England', linkUrl: 'https://en.wikipedia.org/wiki/Chartered_accountant' }, { text: 'MBA (Finance & Accounting) York University – Canada' }],
      body: rich([
        paragraph(text('Mr. Tariq, a seasoned financial leader with a proven track record of steering large institutions towards success, brings a wealth of expertise to the table. His impressive career spans multiple leadership roles, including CEO positions at Emirates Investment Group and Emirates Global Islamic Bank (later merged with Al Baraka Bank). This experience has equipped him with a deep understanding of the financial landscape and a keen ability to navigate complex challenges.')),
        paragraph(text('Beyond his financial acumen, Mr. Tariq possesses unique hands-on experience in real estate investment on an engineering scale. This expertise transcends mere theoretical knowledge, allowing him to translate vision into tangible results. His involvement in the backbone of various real estate ventures, encompassing commercial, residential, and hospitality projects, further demonstrates his comprehensive understanding of the industry’s intricacies.')),
      ]), backLinkLabel: 'Back to our team', backLinkUrl: '/enrichers-team/',
    }],
  } as never
  const tariqExisting = await payload.find({ collection: 'pages', where: { slug: { equals: tariqSlug } }, limit: 1 })
  if (tariqExisting.docs[0]) await payload.update({ collection: 'pages', id: tariqExisting.docs[0].id, data: tariqData, context: { skipRevalidate: true } })
  else await payload.create({ collection: 'pages', data: tariqData, context: { skipRevalidate: true } })

  const remaining = [
    { slug: 'muhammad-hasssan', name: 'Muhammad Hassan Mehmood', role: 'CEO — Enrichers Private Limited', file: 'team-hassan-mehmood.webp', paragraphs: [
      'Mr. Hassan epitomizes natural leadership, armed with a finely tuned steering mechanism and a keen strategic direction. He holds responsibility for overseeing national business development operations, ensuring the seamless and efficient performance of regional sales teams. Guided by robust ethical values, he spearheads the acquisition process of the brokerage’s extensive clientele and ensures post-sale service excellence, thereby upholding high client service standards and securing a significant market share through functional enhancements.',
      'In addition to his primary responsibilities, Mr. Hassan remains vigilant in monitoring the financial derivatives market, staying abreast of dynamic market trends to provide tailored trading recommendations to clients. With a multidisciplinary background encompassing Law and Business Administration, he also holds certification as a Stock & Commodity Broker from the Institute of Financial Markets of Pakistan, a subsidiary of the Securities & Exchange Commission of Pakistan.',
    ] },
    { slug: 'syed-hassan-abid-zaid', name: 'Syed Hassan Abid Zaidi', role: 'Co - CEO — Enrichers Securities Private Limited', file: 'team-hassan-zaidi.webp', paragraphs: [
      'Syed Hassan Abid Zaidi is a knowledgeable capital market expert with thirty years of diversified experience. He began his journey on the trading floor of an exchange and ascended to the position of CEO at Escorts Capital Limited, where he led the company to unprecedented growth and success for eight years. With an unmatched passion for trading, he finds the atmosphere of the trading hall to be one of the wonders of the business world.',
      'Syed Hassan has a keen eye for identifying opportunities and has been instrumental in driving growth across various organizations he has worked with. He joined Backers & Partner Limited in August 2017 as Head of Sales and achieved significant revenue growth during his tenure. Prior to that, he served as the Head of Investments at Escorts Investment Bank Limited, where he played a pivotal role in managing the company’s investment portfolio. Syed Hassan possesses a wealth of experience in the investment banking sector, where he has honed his skills and established an excellent track record of success. His expertise and passion have propelled him to the top of the industry, and he continues to inspire and lead his team towards excellence.',
    ] },
    { slug: 'dr-athar-mansoor-2', name: 'Dr. Athar Mansoor', role: 'Chief Strategy Officer — Enrichers Investment Group', file: 'team-athar-mansoor.webp', paragraphs: [
      'Dr. Athar Mansoor, Chief Strategy Officer at EIG, leads strategic initiatives across both corporate and public sector domains, driving change through his deep understanding of management landscapes. He oversees executive education programs, building leadership capacity across diverse organizations. Beyond Pakistan, Dr. Athar champions the adoption of Artificial Intelligence and Big Data in the Asia Pacific region through insightful international consulting projects.',
      'A global citizen at heart, Dr. Athar’s academic journey spans prestigious universities in Australia, Europe, Hong Kong, Pakistan, Singapore, and the USA. This diverse lens informs his thought leadership, regularly shared at international forums across East Asia and North America. Dr. Athar’s passion lies in empowering others and partnering with clients to unlock their true potential and achieve remarkable results.',
    ] },
    { slug: 'hasnain-afzal-wattoo', name: 'Hasnain Afzal Wattoo', role: 'Director of Operations — Enrichers Investment Group', file: 'team-hasnain-wattoo.webp', paragraphs: [
      'Mr. Hasnain Afzal Wattoo, Director of Operations at Enrichers Investment Group, leads the firm’s operational backbone, ensuring smooth execution across departments and aligning day-to-day functions with long-term strategic goals. With a strong command of financial operations, compliance, and process optimization, he drives performance through structure, discipline, and innovation.',
      'At the core of his role is a commitment to building scalable systems that enhance client experience, mitigate risk, and support business agility. Mr. Hasnain’s leadership extends across trading operations, client servicing, and digital transformation, key enablers of Enrichers’ continued growth in a competitive market.',
      'A firm believer in accountability and operational excellence, he empowers teams to deliver with precision and purpose. His forward-thinking approach keeps Enrichers efficient, responsive, and well-positioned for the future.',
    ] },
    { slug: 'muhammad-saleem-ahmad-2', name: 'Muhammad Saleem Ahmad Ranjha', role: 'Director Corporate Linkages — Enrichers Investment Group', file: 'team-saleem-ahmad.webp', paragraphs: [
      'Muhammad Saleem Ahmad Ranjha serves as Director of Corporate Linkages at Enrichers Investment Group, where he builds strategic partnerships and strengthens industry connections. With a distinguished career in global tech and social initiatives, he is the Founding Director of Akhuwat and Chairman of OPEN Lahore. He also leads as CEO of Pakistan Public Aid Trust and serves as Vice Chairman of the Alkhidmat Information Technology Board.',
      'Mr Ranjha advises prominent organizations, including Fatima Group, Cables and Conductors Association, I2C, Avanceon, Octopus Digital, Global Semiconductor Group, the National Incubation Center Islamabad, and TEVTA Punjab. He sits on the boards of influential entities including the Global Islamic Finance Report, ISFIRE, Global Donors Forum, Iqra University, NUTECH Endowment Trust, Taleem Foundation, and other social and educational organizations.',
    ] },
    { slug: 'khizar-sohail', name: 'Khizer Sohail', role: 'Department Head North — Business Development', file: 'team-khizer-sohail.jpg', paragraphs: [
      'Mr. Khizar Sohail, Head of North Business Development at Enrichers Investment Group, plays a strategic role in driving growth, acquiring high value clients, and expanding the firm’s footprint across northern markets. Known for his sharp business instincts and results-driven mindset, Mr. Khizar leads with energy, precision, and purpose.',
      'A consistent high achiever, Mr. Khizar graduated with 35 A grades in BBA (Finance) from a top-ranked university, an early testament to his discipline and potential. His ability to identify quality leads, cultivate trust-based relationships, and close high-impact deals quickly propelled him into leadership.',
      'Passionate about financial markets and regulatory frameworks, Mr. Khizar further strengthened his expertise by earning the Commodity Broker Certification from IFMP. At Enrichers, he brings this financial acumen to life through a leadership style rooted in integrity, collaboration, and accountability.',
    ] },
    { slug: 'syed-yousaf-hussain-zaidi', name: 'Syed Yousaf Hussain Zaidi', role: 'Business Relationship Strategist — Enrichers Investment Group', file: 'team-yousaf-zaidi.jpg', paragraphs: [
      'Syed Yousaf Hussain Zaidi, Business Relationship Strategist at Enrichers Investment Group, brings a client-first philosophy to the heart of the company’s business development efforts. With a strong focus on relationship-building, he cultivates trust, fosters long-term partnerships, and ensures clients feel supported at every stage of their financial journey.',
      'Syed Yousaf combines strategic thinking with a deep understanding of client behavior, enabling him to identify opportunities, anticipate needs, and deliver personalized engagement strategies. His ability to translate complex financial solutions into meaningful conversations has made him a valued point of contact for clients and teams alike.',
      'A natural communicator with a commitment to excellence, Syed Yousaf strengthens the bridge between clients and Enrichers, ensuring clarity, responsiveness, and value-driven collaboration. His dedication and insight continue to shape a relationship culture grounded in trust and mutual growth.',
    ] },
    { slug: 'hafiz-muhammad-shahzad-2', name: 'Hafiz Muhammad Shahzad', role: 'Senior Manager — Business Development', file: 'team-shahzad.webp', paragraphs: [
      'Hafiz Muhammad Shahzad, Senior Manager – Business Development at Enrichers Investment Group, is known for his integrity, strong client relationships, and consistent delivery of results. With a solid track record in business development, he plays a pivotal role in expanding the company’s client base and deepening market presence.',
      'A dependable and principled professional, Mr. Shahzad combines in-depth financial knowledge with a sincere, client-first approach. His ability to build trust and long-term partnerships has made him a valued advisor to clients and a respected member of the Enrichers team.',
    ] },
    { slug: 'nadeem-akram-2', name: 'Nadeem Akram', role: 'Senior Manager Finance — Enrichers Investment Group', file: 'team-nadeem-akram.webp', paragraphs: [
      'Mr. Nadeem Akram, Senior Manager Finance at Enrichers Investment Group, brings over 25 years of hands-on experience in financial management, accounting, and strategic oversight. With a diverse background across the manufacturing, construction, engineering, oil, and investment sectors, he offers a well-rounded and pragmatic approach to financial leadership.',
      'Mr. Nadeem’s expertise lies in driving financial discipline, streamlining reporting structures, and ensuring robust compliance across the organization. His deep industry exposure, including roles in the sugar industry and oil sector, equips him with the insight to manage complex financial ecosystems with precision.',
      'Having worked across Pakistan and visited financial hubs such as the UAE, Bahrain, and Canada, Mr. Nadeem brings a global perspective to Enrichers’ financial operations.',
    ] },
    { slug: 'muhammad-nabeel-2', name: 'Muhammad Nabeel', role: 'Senior Manager — Business Development', file: 'team-nabeel.webp', paragraphs: [
      'Mr. Muhammad Nabeel, Senior Manager – Business Development at Enrichers Investment Group, leads key initiatives to drive client acquisition, strategic partnerships, and market expansion. With a strong background in relationship management and financial solutions, he plays a critical role in shaping the firm’s growth trajectory.',
      'Nabeel brings a results-oriented mindset, combining deep product knowledge with a clear understanding of evolving client needs. His ability to engage, advise, and build long-term trust has helped strengthen Enrichers’ position in a competitive investment landscape.',
    ] },
    { slug: 'sidra-ejaz-gondal', name: 'Sidra Ejaz Gondal', role: 'Deputy Senior Manager — Business Development', file: 'team-sidra-ejaz.webp', paragraphs: [
      'Ms. Sidra Ejaz Gondal, Deputy Senior Manager – Business Development at Enrichers Investment Group, plays a key role in expanding client relationships and driving strategic growth initiatives. With a sharp focus on market intelligence, lead generation, and client engagement, she helps position Enrichers as a trusted partner in the investment landscape.',
      'Ms. Sidra combines strong interpersonal skills with deep business insight to identify opportunities, nurture high-value relationships, and support revenue growth. Her proactive approach and client-first mindset have contributed to strengthening Enrichers’ brand presence and expanding its reach in a competitive market.',
      'With a solid understanding of financial products and investment solutions, Ms. Sidra is committed to creating meaningful partnerships that deliver value for clients and stakeholders alike.',
    ] },
  ]
  for (const person of remaining) {
    const mediaAlt = person.name === 'Muhammad Saleem Ahmad Ranjha' ? 'Muhammad Saleem Ahmad' : person.name === 'Syed Yousaf Hussain Zaidi' ? 'Syed Yousaf Hussanin Zaidi' : person.name === 'Sidra Ejaz Gondal' ? 'Sidra Ejaz' : person.name
    const personMedia = await payload.find({ collection: 'media', where: { alt: { equals: mediaAlt } }, limit: 1 })
    if (!personMedia.docs[0]) continue
    const profileData = { title: person.name, slug: person.slug, layout: [{ blockType: 'teamMemberProfile', sectionId: 'profile', eyebrow: 'Team details', heading: person.name, photo: personMedia.docs[0].id, role: person.role, companyLabel: 'Enrichers Investment Group', companyUrl: '/', credentials: [], body: rich(person.paragraphs.map((paragraphText) => paragraph(text(paragraphText)))), backLinkLabel: 'Back to our team', backLinkUrl: '/enrichers-team/' }] } as never
    const found = await payload.find({ collection: 'pages', where: { slug: { equals: person.slug } }, limit: 1 })
    if (found.docs[0]) await payload.update({ collection: 'pages', id: found.docs[0].id, data: profileData, context: { skipRevalidate: true } })
    else await payload.create({ collection: 'pages', data: profileData, context: { skipRevalidate: true } })
  }
  payload.logger.info('Seeded Syed Abdullah Bukhari and Syed Tariq Hussain profiles')
  process.exit(0)
}

run().catch((error) => { console.error(error); process.exit(1) })
