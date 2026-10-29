import type { Block } from 'payload'

const person = (withBio: boolean) => [
  { name: 'name', type: 'text' as const, required: true },
  { name: 'role', type: 'text' as const, required: true },
  { name: 'photo', type: 'upload' as const, relationTo: 'media' as const },
  { name: 'profileUrl', type: 'text' as const, label: 'Profile URL (optional)' },
  ...(withBio
    ? [{ name: 'bio', type: 'textarea' as const, label: 'Short bio (optional)' }]
    : []),
]

export const teamGrid: Block = {
  slug: 'teamGrid',
  labels: { singular: 'Team Grid', plural: 'Team Grids' },
  fields: [
    { name: 'sectionId', type: 'text', label: 'Section ID' },
    { name: 'eyebrow', type: 'text' },
    { name: 'heading', type: 'text', required: true, defaultValue: 'Meet the team' },
    { name: 'body', type: 'textarea', label: 'Supporting text (optional)' },
    {
      name: 'displayVariant', type: 'select', defaultValue: 'legacy', label: 'Display style',
      options: [{ label: 'Legacy cards', value: 'legacy' }, { label: 'Candidate A portrait sections', value: 'candidate' }],
    },
    { name: 'leadershipEyebrow', type: 'text', label: 'Leadership eyebrow (Candidate A style)' },
    { name: 'leadershipHeading', type: 'text', label: 'Leadership heading (Candidate A style)' },
    { name: 'leadershipBody', type: 'textarea', label: 'Leadership description (Candidate A style)' },
    { name: 'leadershipCtaLabel', type: 'text', label: 'Leadership CTA label (optional)' },
    { name: 'leadershipCtaUrl', type: 'text', label: 'Leadership CTA URL (optional)' },
    { name: 'managementEyebrow', type: 'text', label: 'Management eyebrow (Candidate A style)' },
    { name: 'managementHeading', type: 'text', label: 'Management heading (Candidate A style)' },
    { name: 'managementBody', type: 'textarea', label: 'Management description (Candidate A style)' },
    {
      name: 'leaders',
      type: 'array',
      label: 'Leadership (large cards)',
      admin: {
        description: 'One or two people shown above the main grid at a larger size.',
      },
      fields: person(true),
    },
    {
      name: 'members',
      type: 'array',
      label: 'Team members (grid)',
      fields: person(false),
    },
  ],
}
