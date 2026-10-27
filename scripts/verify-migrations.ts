/**
 * Proves the committed migrations can build the schema from nothing.
 *
 * Why this exists: in development the schema is *pushed* (drizzle diffs the
 * config against the database and alters it in place), so dev tables can be
 * correct while the migrations are incomplete — the failure only shows up on a
 * production deploy, where push is off and `payload migrate` is the only thing
 * that creates tables. This runs the real migrations against a throwaway
 * database and checks the result, so that gap is caught here instead of there.
 *
 * It never touches the development database: it creates a scratch database,
 * migrates it, counts what appeared, then drops it.
 *
 *   npx tsx scripts/verify-migrations.ts
 */
import 'dotenv/config'

import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { Client } from 'pg'

const execFileAsync = promisify(execFile)

/** Tables the application itself owns — Payload's own internals are extra. */
const REQUIRED_TABLES = [
  'users',
  'users_sessions',
  'media',
  'header',
  'header_nav_items',
  'header_nav_items_groups',
  'header_nav_items_groups_items',
  'footer',
  'footer_trade_invest_links',
  'footer_the_group_links',
  'footer_insights_learning_links',
  'footer_company_links',
  'footer_regulation_links',
  'footer_legal_paragraphs',
  'footer_bottom_links',
  'payload_migrations',
]

const SCRATCH_DB = 'enrichers_migrate_check'

const adminUrl = (base: URL) => {
  // Connect to the default maintenance database to CREATE/DROP the scratch one;
  // you cannot drop a database you are currently connected to.
  const u = new URL(base.toString())
  u.pathname = '/postgres'
  return u.toString()
}

const scratchUrl = (base: URL) => {
  const u = new URL(base.toString())
  u.pathname = `/${SCRATCH_DB}`
  return u.toString()
}

const run = async () => {
  if (!process.env.DATABASE_URL) {
    console.error('FAIL: DATABASE_URL is not set.')
    process.exit(1)
  }
  const base = new URL(process.env.DATABASE_URL)

  const admin = new Client({ connectionString: adminUrl(base) })
  await admin.connect()

  console.log(`creating scratch database "${SCRATCH_DB}"…`)
  await admin.query(`DROP DATABASE IF EXISTS ${SCRATCH_DB}`)
  await admin.query(`CREATE DATABASE ${SCRATCH_DB}`)

  let failed = false

  try {
    console.log('running `payload migrate` against it…\n')
    const { stdout, stderr } = await execFileAsync(
      'npx',
      ['payload', 'migrate'],
      {
        env: {
          ...process.env,
          DATABASE_URL: scratchUrl(base),
          // Force the migrate path rather than the dev push path.
          NODE_ENV: 'production',
          NODE_OPTIONS: '--no-deprecation',
        },
        maxBuffer: 20 * 1024 * 1024,
      },
    )
    const out = (stdout + stderr).replace(/\u001b\[[0-9;?]*[a-zA-Z]/g, '')
    out
      .split('\n')
      .filter((l) => /migrat|Done|error/i.test(l))
      .slice(0, 12)
      .forEach((l) => console.log('   ' + l.trim()))

    const check = new Client({ connectionString: scratchUrl(base) })
    await check.connect()
    const { rows } = await check.query<{ table_name: string }>(
      `SELECT table_name FROM information_schema.tables
        WHERE table_schema = 'public' AND table_type = 'BASE TABLE'`,
    )
    const present = new Set(rows.map((r) => r.table_name))

    const missing = REQUIRED_TABLES.filter((t) => !present.has(t))

    const { rows: applied } = await check.query<{ name: string }>(
      `SELECT name FROM payload_migrations ORDER BY name`,
    )
    await check.end()

    console.log(`\ntables created : ${present.size}`)
    console.log(`migrations ran : ${applied.map((a) => a.name).join(', ') || '(none)'}`)

    if (missing.length) {
      console.error(`\nFAIL: ${missing.length} expected table(s) missing:`)
      missing.forEach((m) => console.error('   - ' + m))
      failed = true
    } else {
      console.log(`\nPASS — all ${REQUIRED_TABLES.length} required tables built from migrations alone.`)
    }
  } catch (err) {
    console.error('\nFAIL: migrate errored.')
    console.error(err instanceof Error ? err.message : err)
    failed = true
  } finally {
    console.log(`\ndropping scratch database "${SCRATCH_DB}"…`)
    await admin.query(`DROP DATABASE IF EXISTS ${SCRATCH_DB}`)
    await admin.end()
  }

  process.exit(failed ? 1 : 0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
