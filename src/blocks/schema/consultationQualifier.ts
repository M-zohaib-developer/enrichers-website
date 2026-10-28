import type { Block } from 'payload'

export const consultationQualifier: Block = {
  slug: 'consultationQualifier',
  labels: { singular: 'Consultation / Qualifier Form', plural: 'Consultation / Qualifier Forms' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'eyebrow', type: 'text', defaultValue: 'Investor enquiries' },
            { name: 'heading', type: 'text', defaultValue: 'Talk to us about the project' },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'phone', type: 'text', defaultValue: '(042) 111 111 333' },
            { name: 'phoneHref', type: 'text', defaultValue: 'tel:+9242111111333' },
            { name: 'whatsappUrl', type: 'text', defaultValue: 'https://api.whatsapp.com/send?phone=9242111111333' },
            { name: 'whatsappLabel', type: 'text', defaultValue: 'WhatsApp our client support' },
            { name: 'hours', type: 'text', defaultValue: 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed' },
          ],
        },
        {
          label: 'Form',
          fields: [
            { name: 'formStepLabel', type: 'text', defaultValue: 'Step 1 of 4 · Demo — nothing is submitted' },
            { name: 'formHeading', type: 'text', defaultValue: "Let's find the right investment path for you" },
            { name: 'formIntro', type: 'text', defaultValue: "Just a few quick questions, so we don't waste your time." },
            {
              name: 'form',
              type: 'relationship',
              relationTo: 'forms',
              required: true,
              admin: { description: 'Select the form document managed in the Forms collection.' },
            },
          ],
        },
      ],
    },
  ],
}
