/**
 * Drops the header/footer global tables so Payload can rebuild them cleanly.
 *
 * Why this is needed: the globals were restructured (flat dropdown fields →
 * nested navItems/groups/items, plus new footer contact and regulation
 * fields). Drizzle's dev push sees old tables disappearing and new ones
 * appearing at the same time and cannot tell a create from a rename, so it
 * stops on an interactive prompt and the sync never completes — which means
 * the admin UI has nowhere to save to.
 *
 * Removing the stale tables removes the ambiguity: with no rename candidates
 * left, the next push creates the new schema without asking anything.
 *
 * SAFETY: refuses to drop anything if any of those tables holds a row, so it
 * can only ever run against globals that have not been filled in yet. Re-run
 * it as often as you like.
 *
 *   npx tsx scripts/reset-globals-schema.mjs
 */
import 'dotenv/config'
import pg from 'pg'

const { Client } = pg
const client = new Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

const { rows: tables } = await client.query(`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public'
    AND (table_name LIKE 'header%' OR table_name LIKE 'footer%')
  ORDER BY table_name
`)

if (tables.length === 0) {
  console.log('No header/footer tables present — nothing to do.')
  await client.end()
  process.exit(0)
}

const populated = []
for (const t of tables) {
  const { rows } = await client.query(`SELECT count(*)::int AS n FROM "${t.table_name}"`)
  if (rows[0].n > 0) populated.push(`${t.table_name} (${rows[0].n} rows)`)
}

if (populated.length > 0) {
  console.error('Refusing to drop — these tables contain data:')
  populated.forEach((p) => console.error('  ' + p))
  console.error('\nExport or clear them first if you really intend to reset the schema.')
  await client.end()
  process.exit(1)
}

const names = tables.map((t) => `"${t.table_name}"`).join(', ')
await client.query(`DROP TABLE IF EXISTS ${names} CASCADE`)

console.log(`Dropped ${tables.length} empty table(s):`)
tables.forEach((t) => console.log('  ' + t.table_name))
console.log('\nNext push will recreate them from the current config.')

await client.end()
