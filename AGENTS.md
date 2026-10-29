<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Enrichers — read before touching a page, block or form

Detail lives in `shared-skill/`. Open the page you need; do not work from memory.

| Task | Read |
|---|---|
| Build / redesign / audit a page | `shared-skill/10-page-redesign-workflow.md` |
| Add or change a block | `shared-skill/09-block-workflow.md` |
| Payload fields, hooks, admin | `shared-skill/08-payload-master.md` |
| Colours and tokens | `shared-skill/02-design-tokens.md` |
| Images and the logo | `shared-skill/03-images-and-logo.md` |
| Schema push vs migrate | `shared-skill/05-database-and-migrations.md` |
| What to check, in order | `shared-skill/06-verify.md` |

## Non-negotiables

**Inspect before editing.** Audit the live page, the Candidate A reference, our
current output and the existing blocks. Report the mapping and ask. Do not
audit and implement in the same turn.

**Extend before you create.** Reuse a block → add an *optional* field → only
then write a new block. `serviceHero` carries both the dark and light hero
through one `theme` field; follow that pattern.

**No colour in a component.** `globals.css` sets `--color-*: initial`, which
deletes Tailwind's stock palette — `bg-black/35` and `bg-red-500` compile to
**nothing** and fail silently with no warning. Tokens only. `npm run
lint:colors` scans `.ts`/`.tsx` but will not catch hex inside a CSS class.

**HTTP 200 is not a finished page.** `scripts/seed-missing-pages.ts` gave 13
pages one identical three-block stub filled with invented copy. Diff against
the live site, never against the status code.

**Several Candidate A demo pages are placeholders** that say "this page is not
rebuilt": `faqs`, `business-brokerage`, `arid-land-development`, `agriculture`,
`download-metatrader-5-for-your-device`, `about-us`. Genuinely built: home,
`stock-broking`, `commodity-brokerage`, `open-account`, `contact-us`. When the
demo is a placeholder there is no reference — take content from the live site
and styling from the real Candidate A pages.

**Every schema field needs a reader.** `consultationShowcase` defined and
seeded six fields the component never rendered, so the section looked empty.
Read the schema and the component side by side and account for each field.

## Verify, then say what you did not verify

```bash
npx tsc --noEmit          # must be silent
npm run lint:colors       # must say "no hardcoded colours"
curl -s http://localhost:3000/<slug>
```

Then grep the compiled CSS to prove each new utility exists — a class that
never compiled looks exactly like one that did. Tailwind escapes `:` as `\:` in
its output, so search the bare fragment, not the full class name.

`preview_start` cannot attach while a `next dev` already owns port 3000, which
rules out interaction and breakpoint testing — list those as unverified rather
than implying they passed. `npx eslint` dies with a circular-structure config
error on every file in the repo; pre-existing, not yours.
