import 'dotenv/config'

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const text = (value: string, format = 0) => ({ type: 'text', version: 1, text: value, format, detail: 0, mode: 'normal', style: '' })
const paragraph = (...children: any[]) => ({ type: 'paragraph', version: 1, children, direction: null, format: '', indent: 0 })
const heading = (tag: 'h2' | 'h3', value: string) => ({ type: 'heading', tag, version: 1, children: [text(value)], direction: null, format: '', indent: 0 })
const link = (label: string, url: string) => ({ type: 'link', version: 2, fields: { url, linkType: 'custom', newTab: false }, children: [text(label)], direction: null, format: '', indent: 0 })
const list = (items: string[]) => ({ type: 'list', listType: 'bullet', version: 1, start: 1, children: items.map((item) => ({ type: 'listitem', version: 1, value: 1, children: [paragraph(text(item))], direction: null, format: '', indent: 0 })), direction: null, format: '', indent: 0 })
const rich = (children: any[]) => ({ root: { type: 'root', version: 1, children, direction: null, format: '' as const, indent: 0 } })

const run = async () => {
  const payload = await getPayload({ config })
  const mediaFor = async (alt: string, filename: string) => {
    const existingMedia = await payload.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1 })
    return existingMedia.docs[0] ?? payload.create({ collection: 'media', data: { alt }, filePath: path.resolve(dirname, `../public/brand/${filename}`) })
  }
  const heroImage = await mediaFor('Skardu Riverside Hotel', 'skardu-hotel.webp')
  const luxuryRoomImage = await mediaFor('Luxury room overlooking the Skardu landscape', 'skardu-luxury-room.png')
  const premiumHutImage = await mediaFor('Premium Balti-style signature hut', 'skardu-premium-hut.png')
  const riversideImage = await mediaFor('Immersive riverside experience in Skardu', 'skardu-riverside.png')
  const heritageImage = await mediaFor('Architecture inspired by local heritage', 'skardu-heritage.png')
  const locationImage = await mediaFor('Skardu Riverside Hotel location surrounded by mountains', 'skardu-location.png')
  const shigarValleyImage = await mediaFor('Shigar Valley near Skardu', 'skardu-shigar-valley.png')
  const k2BaseCampImage = await mediaFor('Gateway to K2 Base Camp', 'skardu-k2-base-camp.png')
  const coldDesertImage = await mediaFor('Sarfaranga Cold Desert', 'skardu-cold-desert.png')
  const deosaiImage = await mediaFor('Deosai Plains', 'skardu-deosai-plains.png')
  const sadparaImage = await mediaFor('Sadpara Lake', 'skardu-sadpara-lake.png')
  const architectureVideoThumbnail = await mediaFor('Architectural design meeting for the Skardu Riverside Hotel', 'skardu-architecture-video.jpeg')
  const galleryImage01 = await mediaFor('Skardu Riverside Hotel site gallery 01', 'skardu-gallery-01.jpeg')
  const galleryImage02 = await mediaFor('Skardu Riverside Hotel site gallery 02', 'skardu-gallery-02.jpeg')
  const galleryImage03 = await mediaFor('Skardu Riverside Hotel site gallery 03', 'skardu-gallery-03.jpeg')
  const galleryImage04 = await mediaFor('Skardu Riverside Hotel site gallery 04', 'skardu-gallery-04.jpeg')
  const galleryImage05 = await mediaFor('Skardu Riverside Hotel site gallery 05', 'skardu-gallery-05.jpeg')
  const galleryImage06 = await mediaFor('Skardu Riverside Hotel site gallery 06', 'skardu-gallery-06.jpeg')
  const galleryImage07 = await mediaFor('Skardu Riverside Hotel site gallery 07', 'skardu-gallery-07.jpeg')
  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'skardu-riverside-hotel' } }, limit: 1 })
  const page = existing.docs[0]
  if (!page) throw new Error('Skardu Riverside Hotel page was not found. Run npm run seed:missing-pages first.')
  const layout = [
    {
      blockType: 'marketHero', eyebrow: 'Hospitality investment', heading: 'Skardu Riverside Hotel', headingLineOne: 'Skardu Riverside', headingLineTwo: 'Hotel', headingLineThree: '',
      body: 'A purpose-built luxury hotel on 40 kanals of prime riverside land, designed for the next phase of Northern Pakistan’s tourism growth.', showButtons: true,
      buttons: [{ blockType: 'primaryButton', label: 'Explore the opportunity', url: '#investment-guide' }, { blockType: 'secondaryButton', label: 'Talk to our team', url: '/contact-us/#consultation' }], heroImage: heroImage.id, badges: [{ label: '40 kanal riverside site' }, { label: '100+ rooms planned' }],
    },
    {
      blockType: 'richIntro', heading: 'A landmark hospitality development by EIG', body: rich([paragraph(text('EIG is developing a purpose-built luxury hotel in Skardu, one of Pakistan’s fastest-emerging tourism destinations. Spread across 40 kanals of prime riverside land, this project brings together '), text('location, scale, and design discipline', 1), text(' to create a hospitality asset aligned with the next phase of Northern Pakistan’s growth. With proximity to key access points and major tourist corridors, the development is positioned to serve high-value domestic and international travelers seeking space, landscape, and experience-driven stays.'))]), buttons: [],
    },
    {
      blockType: 'hospitalityExperienceGrid', sectionId: 'experience', eyebrow: '', heading: 'Designed around the Skardu experience', body: 'A thoughtfully designed 5-star luxury hotel featuring 100+ rooms, where global hospitality standards meet the soul of Baltistan.', closingLine: 'Every element is curated to deliver authentic, high-end experiential travel.',
      items: [
        { image: luxuryRoomImage.id, imageAlt: 'Luxury room overlooking the Skardu landscape', title: 'Luxury rooms', body: 'Comfortable rooms designed for calm, light and views across the surrounding landscape.' },
        { image: premiumHutImage.id, imageAlt: 'Premium Balti-style signature hut', title: 'Premium Balti-style signature huts', body: 'Distinctive spaces that bring local character into a high-end stay.' },
        { image: riversideImage.id, imageAlt: 'Immersive riverside experience in Skardu', title: 'Immersive riverside experience', body: 'A continuous stretch of riverside terrain, naturally level, visually open and uninterrupted.' },
        { image: heritageImage.id, imageAlt: 'Architecture inspired by local heritage', title: 'Architecture inspired by local heritage', body: 'Sustainability, cultural authenticity and luxury design brought together with care.' },
      ],
    },
    {
      blockType: 'destinationLocationShowcase', sectionId: 'location', eyebrow: 'The setting', heading: 'A location defined by nature', body: 'A continuous stretch of riverside terrain, naturally level, visually open and uninterrupted.',
      facts: [
        { value: '40 kanal', label: 'Total land' },
        { value: '6 km', label: 'From Skardu City' },
        { value: '20 km', label: 'From Skardu International Airport' },
      ],
      supportingText: 'It is accessible without feeling crowded. Connected, without losing its character.',
      buttons: [{ blockType: 'primaryButton', label: 'Explore more', url: 'https://api.whatsapp.com/send?phone=9242111111333' }],
      image: locationImage.id,
      imageAlt: 'Skardu Riverside Hotel location surrounded by mountains',
      imageCaption: 'Skardu Valley',
      imageCaptionDetail: 'A place where mountains meet peace',
      attractionsIntro: 'The project sits within proximity of the region’s most iconic attractions:',
      attractions: [
        { image: shigarValleyImage.id, imageAlt: 'Shigar Valley near Skardu', title: 'Shigar Valley', body: 'Picturesque landscapes and rich culture', url: 'https://en.wikipedia.org/wiki/Shigar_Valley' },
        { image: k2BaseCampImage.id, imageAlt: 'Gateway to K2 Base Camp', title: 'Gateway to K2 Base Camp', body: 'The starting point for adventure', url: 'https://en.wikipedia.org/wiki/K2' },
        { image: coldDesertImage.id, imageAlt: 'Sarfaranga Cold Desert', title: 'Sarfaranga Cold Desert', body: 'Vast, serene and breathtaking', url: 'https://en.wikipedia.org/wiki/Sarfaranga_Desert' },
        { image: deosaiImage.id, imageAlt: 'Deosai Plains', title: 'Deosai Plains', body: 'Land of high altitude beauty', url: 'https://en.wikipedia.org/wiki/Deosai_National_Park' },
        { image: sadparaImage.id, imageAlt: 'Sadpara Lake', title: 'Sadpara Lake', body: 'A hidden gem in the mountains', url: 'https://en.wikipedia.org/wiki/Satpara_Lake' },
      ],
    },
    {
      blockType: 'videoTextFeature', sectionId: 'design', eyebrow: 'Design story', heading: 'Design & Architectural Excellence',
      body: rich([
        paragraph(text('The resort is being designed by '), text('Abid Ali & Associates', 1), text(', known for integrating '), text('sustainability, cultural authenticity, and luxury design.', 1)),
        paragraph(text('EIG has also formalized an MoU with renowned architect '), text('Abid Ali & Associates', 1), text(', under the leadership of '), text('Mr. Abid Ali Dada and Mr. Nayyar Ali Dada', 1), text(', for the development of the '), text('Enrichers Skardu Hotel Project', 1), text(', ensuring the project reflects timeless architectural value and national design excellence.')),
      ]),
      videoUrl: 'https://youtu.be/8plsvCvUUJc?si=f_RmnSBEBa1M5DXW',
      thumbnail: architectureVideoThumbnail.id,
      thumbnailAlt: 'Architectural design meeting for the Skardu Riverside Hotel',
      videoLabel: 'Watch the Skardu Riverside Hotel architecture video',
    },
    {
      blockType: 'immersiveMediaGallery', sectionId: 'gallery', eyebrow: 'Project gallery', heading: '', body: '', autoplay: true, interval: '5000',
      items: [
        { image: galleryImage01.id, imageAlt: 'Skardu Riverside Hotel site gallery 01', caption: 'Landscape and project context' },
        { image: galleryImage02.id, imageAlt: 'Skardu Riverside Hotel site gallery 02', caption: 'A destination shaped by the mountains' },
        { image: galleryImage03.id, imageAlt: 'Skardu Riverside Hotel site gallery 03', caption: 'The river valley beyond the site' },
        { image: galleryImage04.id, imageAlt: 'Skardu Riverside Hotel site gallery 04', caption: 'On-site progress and surrounding terrain' },
        { image: galleryImage05.id, imageAlt: 'Skardu Riverside Hotel site gallery 05', caption: 'The project journey in Skardu' },
        { image: galleryImage06.id, imageAlt: 'Skardu Riverside Hotel site gallery 06', caption: 'A closer view of the destination' },
        { image: galleryImage07.id, imageAlt: 'Skardu Riverside Hotel site gallery 07', caption: 'Northern Pakistan’s natural character' },
        { image: architectureVideoThumbnail.id, imageAlt: 'Architectural design meeting for the Skardu Riverside Hotel', caption: 'Design collaboration for the hotel project' },
      ],
    },
    {
      blockType: 'richTextBlock', sectionId: 'investment-guide', heading: 'Skardu Investment Guide', background: 'white', showAccentBar: true,
      body: rich([
        paragraph(text('Northern Pakistan has quietly become one of the most talked-about tourism stories in the region, and Skardu sits right at the center of it. If you’ve been following the growing interest in '), text('hotel investment in Pakistan', 1), text(', you’ve probably noticed how much attention Gilgit-Baltistan has picked up — and for good reason.')),
        paragraph(text('EIG’s Skardu Riverside Hotel isn’t just another hospitality project. It’s a 5-star development on 40 kanals of riverside land, positioned at the doorstep of some of the most recognizable natural landmarks in the world.')),
        heading('h3', 'Why Skardu is becoming a major tourism investment destination'),
        paragraph(text('A few things are driving the growing interest in '), text('Skardu tourism investment', 1), text(' right now:')),
        list([
          'Growing domestic and international tourist traffic to Northern Pakistan year over year',
          'Proximity to globally recognized destinations such as K2 Base Camp, Deosai Plains and Shigar Valley',
          'Limited existing luxury hospitality infrastructure in the region, giving early movers far less competition than saturated tourist cities',
          'Government and private-sector attention increasingly turning toward Gilgit-Baltistan’s tourism potential',
        ]),
        heading('h3', 'What makes a 5-star hotel project in Skardu different'),
        paragraph(text('Unlike hospitality investments in already-crowded markets, a '), text('luxury hotel in Skardu', 1), text(' benefits from something hard to manufacture elsewhere: genuinely unique surroundings. Riverside positioning, mountain views and architecture inspired by local Baltistan heritage are not marketing angles here — they are the actual physical reality of the site, which matters to the traveler this project is built for.')),
        heading('h3', 'Who should consider this kind of investment'),
        paragraph(text('Hospitality development projects like this typically appeal to investors looking to diversify beyond traditional stock and real estate holdings, those interested in tourism-sector growth, and those who want exposure to a genuinely scarce asset. Prime riverside land near globally recognized landmarks is not something that gets created twice.')),
        heading('h3', 'Learn more about this development'),
        paragraph(text('If Northern Pakistan’s tourism growth and hospitality investment opportunities are on your radar, this project is worth a closer look. '), link('Get in touch with our team', '/contact-us/'), text(' to learn more about the Skardu Riverside Hotel development and how it fits into EIG’s broader Tourism & Hospitality portfolio.')),
      ]),
    },
    {
      blockType: 'benefitsGrid', sectionId: 'investment-thesis', eyebrow: '', heading: 'A high-conviction asset', body: 'This development reflects a clear strategic thesis.', background: 'sunken', showHeader: true,
      items: [
        { title: 'Rising tourism curve', body: 'Northern Pakistan is attracting more domestic and international visitors each year.' },
        { title: 'Undersupply of premium assets', body: 'Quality luxury accommodation remains limited across the region.' },
        { title: 'Experiential travel', body: 'Travelers increasingly value nature, culture and memorable stays.' },
        { title: 'First-mover advantage', body: 'A carefully positioned project can create long-term value in a high-potential market.' },
      ],
    },
    {
      blockType: 'richIntro',
      heading: 'The EIG Approach',
      body: rich([
        paragraph(text('EIG’s philosophy is simple: Identify rare locations. Build enduring assets. Deliver global standards. Every decision, from land selection to design partnerships, reflects a commitment to quality, longevity, and distinction.')),
      ]),
      buttons: [],
    },
    { blockType: 'readyWhenYouAre', heading: 'Learn more about the development', body: 'Talk to our team about current information and hospitality investment opportunities.', buttons: [{ blockType: 'primaryButton', label: 'Contact us', url: '/contact-us/' }, { blockType: 'secondaryButton', label: 'Book a consultation', url: '/contact-us/#consultation' }], riskNotice: '' },
    {
      blockType: 'faqAccordion', sectionId: 'faq', eyebrow: '', heading: 'Frequently Asked Questions', items: [
        { question: 'What is Skardu Riverside Hotel?', answer: 'Skardu Riverside Hotel is a premium hospitality project by Enrichers Investment Group, designed to offer luxury accommodation, exceptional hospitality and views of Skardu’s natural landscapes while promoting sustainable tourism in Northern Pakistan.' },
        { question: 'Where is the hotel located?', answer: 'The hotel is located in Skardu, Gilgit-Baltistan, one of Pakistan’s most popular tourist destinations, surrounded by mountains, rivers and scenic valleys.' },
        { question: 'What facilities are planned?', answer: 'The project is planned to include luxury accommodation, fine dining, premium guest services, modern amenities, conference facilities and recreational spaces for leisure and business travelers.' },
        { question: 'How does the project support responsible tourism?', answer: 'The project is designed to encourage environmentally conscious development, support local communities and preserve the natural beauty and cultural heritage of the region.' },
        { question: 'Why is Skardu an ideal destination for tourism?', answer: 'Skardu is known for spectacular mountain scenery, lakes, glaciers, rich Balti culture and adventure tourism. Its growing popularity makes it one of Pakistan’s leading destinations for nature lovers, families and international visitors.' },
        { question: 'Is Skardu Riverside Hotel suitable for families and corporate travelers?', answer: 'Yes. The hotel is planned to accommodate families, couples, business travelers and tour groups with comfortable rooms, quality hospitality services, and facilities suited to both leisure and corporate stays.' },
        { question: 'What makes Skardu Riverside Hotel different from other hotels in Skardu?', answer: 'The project combines luxury hospitality with a riverside location, premium guest experiences, modern infrastructure and a commitment to sustainable tourism, creating a distinctive destination in Northern Pakistan.' },
      ],
    },
  ]
  await payload.update({ collection: 'pages', id: page.id, data: { layout } as never, context: { skipRevalidate: true } })
  payload.logger.info('Seeded Skardu Riverside Hotel with Candidate A content blocks')
  process.exit(0)
}
run().catch((error) => { console.error(error); process.exit(1) })
