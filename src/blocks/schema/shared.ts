export const linkFields = [
  { name: 'label', type: 'text' as const, required: true },
  { name: 'url', type: 'text' as const, required: true },
]

/**
 * Payload's blocks field gives editors the requested + control: clicking it
 * presents Primary button and Secondary button as the two row types. The
 * visual component reads the row's blockType and applies the design token.
 */
export const buttonBlocks = [
  { slug: 'primaryButton', labels: { singular: 'Primary button', plural: 'Primary buttons' }, fields: linkFields },
  { slug: 'secondaryButton', labels: { singular: 'Secondary button', plural: 'Secondary buttons' }, fields: linkFields },
]

export const buttonsField = {
  name: 'buttons',
  type: 'blocks' as const,
  label: 'Buttons',
  maxRows: 2,
  admin: { description: 'Click + to add a Primary button or Secondary button.' },
  blocks: buttonBlocks,
}
