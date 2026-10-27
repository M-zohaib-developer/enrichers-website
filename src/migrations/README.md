# Migrations

Schema for this project is **pushed** in development and **migrated** everywhere
else — see `push: process.env.NODE_ENV === 'development'` in `src/payload.config.ts`.
Leaving push enabled on a server would let a deploy reshape live tables on its
own, and the rename prompt it can stop on has nobody to answer it there.

## Deploying to a fresh server

```bash
npm run migrate      # creates every table, index and foreign key
npm run seed:globals # optional — fills Header/Footer with the starting content
```

`npm run migrate:status` lists what has and has not run.

## The files

| Migration | What it does |
|---|---|
| `20261027_115557_init` | The baseline. Creates all **21** tables — `users`, `media`, the Payload internals, plus `header` / `footer` and their nested link tables (`header_nav_items`, `header_nav_items_groups`, `header_nav_items_groups_items`, `footer_regulation_links`, `footer_legal_paragraphs`, `footer_bottom_links`, …). 18 foreign keys, 48 indexes. |
| `20261027_120621_deprecated_global_columns` | Adds the handful of columns kept by the deprecation shim in `Header/config.ts` and `Footer/config.ts`. They are not rendered and are hidden in admin. |

### Why that second migration exists

The globals were restructured (flat `tradeInvest` / `theGroup` / `about` /
`directLinks` arrays → nested `navItems.groups.items`; footer `offices` →
`officesLine`). On the existing dev database that meant columns and tables
disappearing while new ones appeared in the same pass, and drizzle-kit cannot
tell a CREATE from a RENAME — so the dev push stopped on an interactive prompt,
init hung, and `/admin` never loaded.

Declaring the old columns keeps the push free of deletions. A fresh server has
nothing to preserve, so these columns are dead weight there — harmless, but
worth removing once the dev database no longer needs the shim:

1. `npm run setup:globals` — drops the leftover empty tables (it refuses to run
   if any of them holds a row).
2. Delete the two `DEPRECATED` blocks from `Header/config.ts` and
   `Footer/config.ts`, and the `tablesFilter` from `src/payload.config.ts`.
3. `npm run migrate:create remove_deprecated_columns` and commit the result.

## Adding a migration

```bash
npm run migrate:create <name>
```

Generates the SQL by diffing the config against the last snapshot (the `.json`
beside each migration). Commit the `.ts`, the `.json` and the updated
`index.ts` together — the snapshot is what the next diff is measured from, so a
missing one makes the following migration wrong.
