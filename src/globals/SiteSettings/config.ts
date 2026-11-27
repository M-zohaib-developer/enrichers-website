import type { GlobalConfig } from 'payload'

import { revalidateSettings } from './hooks/revalidateSettings'

/**
 * Site-wide settings — shows as a "Settings" entry in the admin Globals group.
 *
 * Currently holds the floating WhatsApp button config: a toggle, the chat link,
 * and a tooltip. The frontend `WhatsAppFloat` component reads this global and
 * renders the button when enabled.
 */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Settings',
  access: { read: () => true },
  admin: {
    // Own sidebar heading "Settings" (separate from the "Globals" group that
    // holds Header/Footer), matching how Collections/Globals are grouped.
    group: 'Settings',
    description: 'Site-wide settings, such as the floating WhatsApp button.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'WhatsApp button',
          description: 'A floating WhatsApp button in the bottom-right corner of every page.',
          fields: [
            {
              name: 'whatsappEnabled',
              type: 'checkbox',
              label: 'Show the floating WhatsApp button',
              defaultValue: true,
            },
            {
              name: 'whatsappUrl',
              type: 'text',
              label: 'WhatsApp chat link',
              defaultValue: 'https://api.whatsapp.com/send?phone=9242111111333',
              admin: {
                description: 'Opened when a visitor clicks the button. Use a wa.me or api.whatsapp.com link.',
                condition: (data) => data?.whatsappEnabled !== false,
              },
            },
            {
              name: 'whatsappTooltip',
              type: 'text',
              label: 'Tooltip (optional)',
              defaultValue: 'Chat with us on WhatsApp',
              admin: {
                condition: (data) => data?.whatsappEnabled !== false,
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSettings],
  },
}
