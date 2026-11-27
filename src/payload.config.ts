import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { sendFormNotification } from './utilities/sendFormNotification'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Header } from './Header/config'
import { Footer } from './Footer/config'
import { SiteSettings } from './globals/SiteSettings/config'
import { Pages } from './collections/Pages'
import { BlogArticles } from './collections/BlogArticles'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — Enrichers',
      description: '',
      icons: {
        icon: [{ sizes: 'any', url: '/favicon.ico' }],
      },
      openGraph: {
        description: '',
        siteName: 'Enrichers Investment Group',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    theme: 'light',
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#AdminLogo',
        Icon: '@/components/admin/Logo#AdminIcon',
      },
      beforeLogin: ['@/components/admin/BeforeLogin'],
      afterLogin: ['@/components/admin/LoginAside', '@/components/admin/LoginPlaceholders'],
      afterDashboard: ['@/components/BlocksOverview'],
    },
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 375, height: 667 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Pages, BlogArticles, Users, Media],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
    /**
     * Dev pushes the schema straight to the database; anywhere else the schema
     * comes from the committed migrations instead. Leaving push on in
     * production would let a deploy silently reshape live tables — and the
     * rename prompt it can stop on has no one to answer it on a server.
     */
    push: process.env.NODE_ENV === 'development',
    /**
     * Hides tables left over from the previous Header/Footer field shape.
     *
     * The globals were restructured (flat `tradeInvest`/`theGroup`/`about`/
     * `directLinks` arrays → nested `navItems.groups.items`, and footer
     * `offices` → `officesLine`). That makes the dev schema push see tables
     * disappearing and new ones appearing in the same pass, so drizzle-kit
     * cannot tell a CREATE from a RENAME and stops on an interactive prompt.
     * In a non-TTY (next dev, a script) that prompt never gets an answer, so
     * init hangs — which is why /admin would spin forever and nothing could
     * be saved.
     *
     * Excluding these from introspection means the push sees no deletions,
     * so it creates the new tables without asking. The old tables are left
     * alone rather than dropped: they are empty, and a filter is reversible
     * where a DROP is not. To remove them for good once this has settled,
     * run `npm run setup:globals` (it refuses to touch non-empty tables).
     *
     * Pure-negation patterns only exclude; every other table stays included.
     */
    tablesFilter: [
      '!header_trade_invest_links',
      '!header_the_group_links',
      '!header_about_links',
      '!header_direct_links',
      '!footer_offices',
      '!pages_blocks_research_library_articles',
    ],
  }),
  sharp,
  plugins: [
    formBuilderPlugin({
      // SMTP credentials live in the admin (Settings → Email), not in .env — so
      // the real notification is sent at submission time by this hook, which
      // reads the current settings from the database and mails them through the
      // Enrichers branded template. (Payload's own console-log adapter stays the
      // default for system emails; it is never used for form notifications.)
      formSubmissionOverrides: {
        hooks: {
          afterChange: [
            async ({ doc, operation, req: { payload } }) => {
              if (operation === 'create') {
                await sendFormNotification({ payload, submission: doc })
              }
              return doc
            },
          ],
        },
      },
      formOverrides: {
        fields: ({ defaultFields }) => ([
          ...defaultFields,
          {
            name: 'submitButtonColor',
            type: 'select',
            label: 'Submit Button Color',
            defaultValue: 'primary',
            options: [
              { label: 'Primary', value: 'primary' },
              { label: 'Dark / Navy', value: 'dark' },
              { label: 'Outline', value: 'outline' },
              { label: 'Ghost', value: 'ghost' },
            ],
            admin: { position: 'sidebar' },
          },
          {
            name: 'submitButtonIcon',
            type: 'text',
            label: 'Submit Button Icon',
            admin: { position: 'sidebar', description: 'Optional icon name, for example arrow-right.' },
          },
          ...(['step1', 'step2', 'step3', 'step4'] as const).flatMap((step) => [
            { name: `${step}Heading`, type: 'text', label: `${step} heading`, admin: { position: 'sidebar' } },
            { name: `${step}Intro`, type: 'text', label: `${step} intro`, admin: { position: 'sidebar' } },
          ]),
        ] as any),
      },
    }),
  ],
})
