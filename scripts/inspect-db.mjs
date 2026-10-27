/**
 * Read-only: lists the header/footer tables and their row counts.
 *
 * Used to confirm which tables belong to removed fields before letting the
 * schema sync drop them, so the decision is based on what is actually in the
 * database rather than on what the config happens to say today.
 *
 *   npx tsx scripts/inspect-db.mjs
 */
import 'dotenv/config'
import pg from 'pg'

const { Client } = pg
const client = new Client({ connectionString: process.env.DATABASE_URL })
await client.connect()

const { rows } = await client.query(`
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public'
    AND (table_name LIKE 'header%' OR table_name LIKE 'footer%')
  ORDER BY table_name
`)

console.log('rows  table')
console.log('----  -----')
for (const r of rows) {
  const { rows: count } = await client.query(`SELECT count(*)::int AS n FROM "${r.table_name}"`)
  console.log(String(count[0].n).padStart(4), ' ', r.table_name)
}

await client.end()
