# Migrations

Schema is **pushed** in development and **migrated** everywhere else — see
`push: process.env.NODE_ENV === 'development'` in `src/payload.config.ts`.
Leaving push on for a server would let a deploy reshape live tables on its own,
and the rename prompt it can stop on has nobody to answer it there.

## Deploying to a fresh server

```bash
npm run migrate       # builds the whole schema (230 tables)
npm run seed:globals  # optional — Header/Footer starting content
```

## Upgrading a database that predates drafts

`20261030_115220_enable_page_drafts` adds a `_status` column, and Postgres
back-fills existing rows as **draft** — which drops every page out of public
queries and 404s the whole site. After migrating such a database, run once:

```bash
npm run publish:pages   # marks existing pages published; idempotent
npm run verify:drafts   # confirms drafts stay private
```

A genuinely fresh server has no pages yet, so this step is a no-op there.

`npm run migrate:status` lists what has and has not run.
`npm run verify:migrations` proves the migrations still build the schema from
nothing: it creates a throwaway database, migrates it, checks the expected
tables appeared, then drops it. Run it after any schema change.

## Why this is a single baseline

The previous migration set (kept at `src/migrations-broken-backup/`) could not
build a database from scratch. `npm run verify:migrations` failed with:

```
Error running migration 20261028_140048_add_service_hero_platform_benefits
caused by: relation "pages_blocks_service_hero" does not exist
```

The cause was a lost migration. `20261028_122409.json` — a snapshot covering a
jump from 59 to 106 tables — had no matching `.ts` file, so roughly 47 tables
were never created by any migration while later migrations happily altered
them. Four tables were provably orphaned this way:

- `pages_blocks_service_hero`
- `pages_blocks_image_text_feature`
- `pages_blocks_consultation_showcase`
- `pages_blocks_consultation_showcase_images`

Development never noticed, because push had already created those tables
directly from the config. The gap only existed on the migration path — which is
the path a real deployment takes.

Rather than hand-patch a chain whose snapshots had already drifted, the set was
regenerated as one baseline from the current config, then verified against a
clean database.

`src/migrations-broken-backup/` is kept only so the old history is recoverable.
Nothing reads it — it can be deleted once you are happy.

## Adding a migration

```bash
npm run migrate:create <name>
npm run verify:migrations
```

Commit the `.ts`, the `.json` snapshot and the updated `index.ts` **together**.
The snapshot is what the next diff is measured against, so a missing one is
exactly how the previous set broke.
