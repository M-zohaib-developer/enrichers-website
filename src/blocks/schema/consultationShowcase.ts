import type { Block } from 'payload'

export const consultationShowcase: Block = {
  slug: 'consultationShowcase',
  labels: { singular: 'Consultation Image Showcase', plural: 'Consultation Image Showcases' },
  fields: [
    { name: 'sectionId', type: 'text', defaultValue: 'consultation', label: 'Section ID' },
    { name: 'eyebrow', type: 'text', defaultValue: 'Free consultation' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Get free consultation today' },
    { name: 'subheading', type: 'textarea', label: 'Supporting text' },
    { name: 'phone', type: 'text', defaultValue: '(042) 111 111 333' },
    { name: 'phoneHref', type: 'text', defaultValue: 'tel:+9242111111333' },
    { name: 'whatsappUrl', type: 'text', defaultValue: 'https://api.whatsapp.com/send?phone=9242111111333' },
    { name: 'whatsappLabel', type: 'text', defaultValue: 'WhatsApp our client support' },
    { name: 'hours', type: 'text', defaultValue: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed' },
    { name: 'formStepLabel', type: 'text', defaultValue: 'Step 1 of 4 · Demo — nothing is submitted' },
    { name: 'formHeading', type: 'text', defaultValue: "Let's find the right investment path for you" },
    { name: 'formIntro', type: 'text', defaultValue: "Just a few quick questions, so we don't waste your time." },
    { name: 'form', type: 'relationship', relationTo: 'forms', required: true },
    {
      name: 'images', type: 'array', required: true, minRows: 1, label: 'Carousel images',
      admin: { description: 'Add 2–4 images. The carousel changes automatically every 3 seconds.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'alt', type: 'text', required: true },
      ],
    },
    { name: 'intervalSeconds', type: 'number', defaultValue: 3, min: 2, max: 10, label: 'Rotation interval (seconds)' },
  ],
}
