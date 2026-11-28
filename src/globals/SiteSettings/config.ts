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
        {
          label: 'Email (SMTP)',
          description:
            'SMTP credentials used to email form enquiries. Entered here, not in .env. The host/username/password are only readable by logged-in admins — they are never exposed on the public API.',
          fields: [
            {
              name: 'smtpEnabled',
              type: 'checkbox',
              label: 'Email form enquiries',
              defaultValue: false,
              admin: { description: 'Turn on once the SMTP details below are filled in.' },
            },
            {
              name: 'notificationsTo',
              type: 'text',
              label: 'Send enquiries to',
              defaultValue: 'connect@enrichers.com.pk',
              admin: {
                description: 'The address that receives every form enquiry.',
                condition: (data) => Boolean(data?.smtpEnabled),
              },
            },
            {
              name: 'reviewNotifyOverrideTo',
              type: 'text',
              label: 'Send page-review notifications to (optional override)',
              admin: {
                description:
                  'Leave blank to notify every admin when an editor submits a page. Fill in to send review emails to a single address instead (e.g. editor-queue@enrichers.com.pk).',
                condition: (data) => Boolean(data?.smtpEnabled),
              },
            },
            {
              name: 'fromName',
              type: 'text',
              label: 'From name',
              defaultValue: 'Enrichers Investment Group',
              admin: { condition: (data) => Boolean(data?.smtpEnabled) },
            },
            {
              name: 'fromAddress',
              type: 'text',
              label: 'From address',
              defaultValue: 'connect@enrichers.com.pk',
              admin: {
                description: 'Must be an address your SMTP server is allowed to send as.',
                condition: (data) => Boolean(data?.smtpEnabled),
              },
            },
            {
              name: 'smtpHost',
              type: 'text',
              label: 'SMTP host',
              access: { read: ({ req }) => Boolean(req?.user) },
              admin: {
                description: 'e.g. mail.enrichers.com.pk',
                condition: (data) => Boolean(data?.smtpEnabled),
              },
            },
            {
              name: 'smtpPort',
              type: 'number',
              label: 'SMTP port',
              defaultValue: 587,
              access: { read: ({ req }) => Boolean(req?.user) },
              admin: {
                description: '587 for STARTTLS, or 465 for SSL.',
                condition: (data) => Boolean(data?.smtpEnabled),
              },
            },
            {
              name: 'smtpSecure',
              type: 'checkbox',
              label: 'Use SSL (port 465)',
              defaultValue: false,
              access: { read: ({ req }) => Boolean(req?.user) },
              admin: {
                description: 'Leave off for port 587 (STARTTLS); turn on for port 465.',
                condition: (data) => Boolean(data?.smtpEnabled),
              },
            },
            {
              name: 'smtpUser',
              type: 'text',
              label: 'SMTP username',
              access: { read: ({ req }) => Boolean(req?.user) },
              admin: { condition: (data) => Boolean(data?.smtpEnabled) },
            },
            {
              name: 'smtpPass',
              type: 'text',
              label: 'SMTP password',
              access: { read: ({ req }) => Boolean(req?.user) },
              admin: {
                description: 'Stored in the database. Use a mail app-password where possible.',
                condition: (data) => Boolean(data?.smtpEnabled),
              },
            },
          ],
        },
        {
          label: 'YouTube',
          description:
            'YouTube Data API v3 credentials for the Video Gallery block. The API key is only readable by logged-in admins — it is never exposed on the public API or in frontend JavaScript.',
          fields: [
            {
              name: 'youtubeEnabled',
              type: 'checkbox',
              label: 'Enable YouTube sync',
              defaultValue: false,
              admin: {
                description:
                  'Turn on once the API key below is filled in. Video Gallery blocks set to "Using YouTube API" will then auto-fetch all channel videos.',
              },
            },
            {
              name: 'youtubeChannelId',
              type: 'text',
              label: 'YouTube Channel ID',
              defaultValue: 'UC6sWRZs7xmIFmfldEZ_JB5Q',
              admin: {
                description:
                  'The channel ID starting with UC. For @enrichersinvestmentgroup this is UC6sWRZs7xmIFmfldEZ_JB5Q.',
                condition: (data) => Boolean(data?.youtubeEnabled),
              },
            },
            {
              name: 'youtubeCacheMinutes',
              type: 'number',
              label: 'Cache duration (minutes)',
              defaultValue: 1440,
              admin: {
                description:
                  'How long fetched videos are cached before the server re-syncs. 1440 = 24 hours. New uploads appear automatically after this window.',
                condition: (data) => Boolean(data?.youtubeEnabled),
              },
            },
            {
              name: 'youtubeApiKey',
              type: 'text',
              label: 'YouTube API key',
              access: { read: ({ req }) => Boolean(req?.user) },
              admin: {
                description:
                  'Create a key at console.cloud.google.com → enable "YouTube Data API v3" → Credentials → API key. Restrict the key to YouTube Data API v3. Stored in the database, admin-only.',
                condition: (data) => Boolean(data?.youtubeEnabled),
                components: {
                  afterInput: ['@/components/admin/YouTubeHelp#YouTubeHelp'],
                },
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
