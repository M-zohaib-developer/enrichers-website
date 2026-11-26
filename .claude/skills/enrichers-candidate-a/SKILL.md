---
name: enrichers-candidate-a
description: Complete project knowledge for the Enrichers Candidate A redesign — this is THE ONLY skill to use for this project. Covers how the user communicates, what they want, plus full technical knowledge: stack, all 44 blocks, design tokens, Header/Footer, shared components, admin customization, block preview system, fullscreen block preview, Blog Articles sidebar tab, seed scripts, and all conventions. Read this before starting any work.
---

# Enrichers Candidate A — Complete Project Knowledge

**Project path:** `/home/m-sohail-afzal/Documents/playnow/enrichers-candidate-a-redesign/`

> **This is the only skill for this project. When working on `enrichers-candidate-a-redesign`, use this skill and nothing else. Read it fully before writing a single line of code.**

---

## 0. Who is the User — How They Talk and What They Want

This section is the most important one. Read it first so you understand the person you are working with.

### How the user writes messages

The user writes in short, informal English with typos and abbreviations. This is normal — English is not their first language. Do NOT ask them to repeat or clarify when you can understand the meaning.

**Common patterns you will see:**

| What they write | What they mean |
|---|---|
| `u` | you |
| `teh` | the |
| `projetc` | project |
| `wriet` / `wriet teh` | write / write the |
| `ok` at the end | "do it" / "that's what I want" |
| `pleas` | please |
| `nto` | not |
| `creta` / `creat` | create |
| `dasbord` / `dashbord` | dashboard |
| `admon` / `admin` | admin |
| `blok` / `bloks` | block / blocks |
| `visibel` | visible |
| `mighy be` | might be |
| `i want that` | I want |
| `u show` / `u see` | you show / you see |
| `here u see` | here, look at this |
| `ok check please` | please do this |
| `u know` | you know |
| `reming` / `remind` | remaining |
| `tabe` / `tab` | tab |
| `invert` / `insert` | insert / move into |
| `blogs tabs` | Blog Articles sidebar tab |

**Example message:** `"here in teh admon dasbord u show the all blok in teh block section ok witht the real view ok"`
**Meaning:** Show all blocks in the admin dashboard block section with real visual previews.

**How to respond:**
- Always reply in **simple, plain English**. Short sentences. No heavy jargon.
- Put the main answer first, then details.
- Use small bullet lists, not long paragraphs.
- If you use a technical term, explain it in 2–3 plain words right after.
- Never ask "what did you mean?" unless it is truly impossible to understand — most messages are clear if you read them carefully.

### What the user wants — working rules

**1. UI design is the main focus.**
The user's exact words: *"our focus are mainly in the UI design ok UI design are responsive and fulfill the all requirement ok."*
- Every UI change must be **fully responsive** — mobile, tablet, desktop. Not just desktop.
- Every requirement in the request must be **fully implemented**, not approximated.
- Do not say "done" after just making it look right on desktop.
- Verify real breakpoints before reporting complete.

**2. Only implement what was asked.**
Do not add extra features, refactors, or abstractions the user did not ask for. If they said "add a button", add a button — not a whole button system.

**3. Do not stop to ask questions if you can figure it out.**
The user expects you to read the project, understand the patterns, and start working. Use this skill as your context. Only ask if you are truly blocked on something that only the user can decide.

**4. Understand instructions even when partially written.**
The user sometimes says the same thing two or three times in slightly different words as they clarify. When you see this, combine the messages into the full picture and act.

**5. When the user shows a screenshot or reference, match it exactly.**
The reference project is at `/home/m-sohail-afzal/Documents/playnow/my-reference-project`. When the user says "like the reference project", read the reference first and copy the exact pattern.

**6. Read before you code.**
Always read the existing files first. Never invent a pattern — find the nearest existing file and follow it.

---

## 1. Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 App Router |
| CMS | Payload CMS 3 (self-hosted, embedded in Next.js) |
| DB | PostgreSQL via `@payloadcms/db-postgres` |
| Styling | Tailwind CSS v4 (`@import 'tailwindcss'` in globals.css) |
| Language | TypeScript |
| Images | `sharp` |
| Rich text | `@payloadcms/richtext-lexical` |
| Forms | `@payloadcms/plugin-form-builder` |

The admin panel: `/admin`. Config: `src/payload.config.ts`. Frontend: `src/app/(frontend)/`. Admin SCSS: `src/app/(payload)/custom.scss`.

---

## 2. Design Token System — 3 tiers, strict

**Rule: components ONLY use Tailwind utilities. Never hex or CSS vars directly in JSX.**

```
Tier 1  --e-*         raw palette — plain :root (NOT @theme, so no Tailwind utility is generated)
Tier 2  --ds-*        semantic runtime vars — these get re-pointed by theme classes
Tier 3  @theme inline exposes tier 2 as Tailwind utilities
```

Tailwind's default palette (`bg-black`, `bg-red-500`, etc.) is **disabled**. Any off-token color is a **build error**.

### Tier 1 — Primitive palette (in `src/app/(frontend)/globals.css`)

**Midnight (brand navy):**
- `--e-midnight-950: #07111f`
- `--e-midnight-900: #0a1f3d`
- `--e-midnight-800: #0f2445`
- `--e-midnight-700: #13294a`

**Cube (brand blue):**
- `--e-cube-50: #f0f8fd`
- `--e-cube-100: #dceffa`
- `--e-cube-200: #b7e0f5`
- `--e-cube-300: #8acfef`
- `--e-cube-400: #4fb4e6`
- `--e-cube-500: #1c95d0`
- `--e-cube-600: #1480b8`
- `--e-cube-700: #0b6aa2`
- `--e-cube-800: #0a4f7c`
- `--e-cube-900: #0a3558`

**Neutral:**
- `--e-neutral-0: #ffffff`
- `--e-neutral-25: #f5f7fa`
- `--e-neutral-50: #edf1f5`
- `--e-neutral-100: #e3e8ee`
- `--e-neutral-200: #c9d2dc`
- `--e-neutral-400: #7d8a9c`
- `--e-neutral-500: #5e6b7d`
- `--e-neutral-700: #3a4556`
- `--e-neutral-900: #0c1522`

**Accents:**
- `--e-logo-red: #d9272e`
- `--e-sandstone: #d6cbb3`
- `--e-slate: #52627a`
- `--e-verdigris: #0e8a7b`

**Status:**
- `--e-positive: #07806a`, `--e-positive-inverse: #3ccb9f`
- `--e-negative: #c23a31`, `--e-negative-inverse: #ff7a6e`
- `--e-warning: #9a5b00`, `--e-warning-inverse: #f0a83a`
- `--e-info: #0b6aa2`, `--e-info-inverse: #5cb8ea`

### Tier 2 — Semantic vars (`--ds-*`) — default light surface

| Semantic var | Tailwind utility |
|---|---|
| `--ds-background` | `bg-background` |
| `--ds-surface` | `bg-surface` |
| `--ds-surface-sunken` | `bg-surface-sunken` |
| `--ds-surface-inverse` | `bg-surface-inverse` |
| `--ds-text` | `text-text` |
| `--ds-text-secondary` | `text-text-secondary` |
| `--ds-text-muted` | `text-text-muted` |
| `--ds-text-inverse` | `text-text-inverse` |
| `--ds-text-link` | `text-text-link` |
| `--ds-action` | `bg-action` / `text-action` |
| `--ds-action-hover` | `bg-action-hover` |
| `--ds-on-action` | `text-on-action` |
| `--ds-border` | `border-border` |
| `--ds-border-subtle` | `border-border-subtle` |
| `--ds-border-strong` | `border-border-strong` |
| `--ds-accent` | `bg-accent` / `text-accent` |
| `--ds-chrome-strong` | `text-chrome-strong` |
| `--ds-chrome-muted` | `text-chrome-muted` |
| `--ds-chrome-soft` | `text-chrome-soft` |
| `--ds-chrome-legal` | `text-chrome-legal` |
| `--ds-chrome-rule` | `border-chrome-rule` |
| `--ds-chrome-hairline` | `border-chrome-hairline` |
| `--ds-chrome-ghost` | `bg-chrome-ghost` |
| `--ds-chrome-cta` | `bg-chrome-cta` |
| `--ds-chrome-on-cta` | `text-chrome-on-cta` |
| `--ds-chrome-active` | `text-chrome-active` |
| `--ds-overlay` | `bg-overlay` |

### Tier 3 — Theme classes (apply to a wrapper element)

| Class | Background | Text | Use on |
|---|---|---|---|
| `.theme-light` | `--e-neutral-0` white | dark | light blocks |
| `.theme-surface` | `--e-neutral-0` white | dark | card surfaces |
| `.theme-sunken` | `--e-neutral-50` off-white | dark | recessed bands |
| `.theme-inverse` | `--e-midnight-900` navy | white | header, footer, dark blocks |

**Important:** `.theme-inverse` re-points ALL `--ds-*` vars to dark surface values AND re-points `--ds-chrome-*` to the white opacity ladder (the reference ships). A primary button inside `.theme-inverse` reads `bg-chrome-cta` (white), not `bg-action` (navy) — that is intentional. Use `inverse` prop on `<Button>` / `<Buttons>` inside dark panels.

---

## 3. All 44 Blocks

Schema files: `src/blocks/schema/<file>.ts`
React component files: `src/blocks/<PascalCase>.tsx`
Registry: `src/blocks/home.ts` → `HomeBlocks: Block[]`

> **Important:** filename ≠ slug always. `richTextSection.ts` exports `slug: 'richTextBlock'`. Always use the slug.

| Slug | Schema file | React component |
|---|---|---|
| `serviceHero` | `serviceHero.ts` | `ServiceHero.tsx` |
| `marketHero` | `marketHero.ts` | `MarketHero.tsx` |
| `knowledgeHero` | `knowledgeHero.ts` | `KnowledgeHero.tsx` |
| `sectionNavigation` | `sectionNavigation.ts` | `SectionNavigation.tsx` |
| `richIntro` | `richIntro.ts` | `RichIntro.tsx` |
| `richTextBlock` | `richTextSection.ts` ← file differs | `RichTextSection.tsx` |
| `businessIntro` | `businessIntro.ts` | `BusinessIntro.tsx` |
| `founderStatement` | `founderStatement.ts` | `FounderStatement.tsx` |
| `statsBand` | `statsBand.ts` | `StatsBand.tsx` |
| `readyWhenYouAre` | `readyWhenYouAre.ts` | `ReadyWhenYouAre.tsx` |
| `splitContentList` | `splitContentList.ts` | `SplitContentList.tsx` |
| `imageTextFeature` | `imageTextFeature.ts` | `ImageTextFeature.tsx` |
| `agricultureFeature` | `agricultureFeature.ts` | `AgricultureFeature.tsx` |
| `videoTextFeature` | `videoTextFeature.ts` | `VideoTextFeature.tsx` |
| `immersiveMediaGallery` | `immersiveMediaGallery.ts` | `ImmersiveMediaGallery.tsx` |
| `benefitsGrid` | `benefitsGrid.ts` | `BenefitsGrid.tsx` |
| `clientServices` | `clientServices.ts` | `ClientServices.tsx` |
| `serviceOfferings` | `serviceOfferings.ts` | `ServiceOfferings.tsx` |
| `businessGroupCards` | `businessGroupCards.ts` | `BusinessGroupCards.tsx` |
| `groupBusinessExplorer` | `groupBusinessExplorer.ts` | `GroupBusinessExplorer.tsx` |
| `investmentPathCards` | `investmentPathCards.ts` | `InvestmentPathCards.tsx` |
| `productRange` | `productRange.ts` | `ProductRange.tsx` |
| `tabbedContent` | `tabbedContent.ts` | `TabbedContent.tsx` |
| `platformDownloads` | `platformDownloads.ts` | `PlatformDownloads.tsx` |
| `licensingCredentials` | `licensingCredentials.ts` | `LicensingCredentials.tsx` |
| `marketResearchCards` | `marketResearchCards.ts` | `MarketResearchCards.tsx` |
| `researchLibrary` | `researchLibrary.ts` | `ResearchLibrary.tsx` |
| `articleList` | `articleList.ts` | `ArticleList.tsx` |
| `articleDetail` | `articleDetail.ts` | `ArticleDetail.tsx` |
| `destinationLocationShowcase` | `destinationLocationShowcase.ts` | `DestinationLocationShowcase.tsx` |
| `processSteps` | `processSteps.ts` | `ProcessSteps.tsx` |
| `accountOpeningSteps` | `accountOpeningSteps.ts` | `AccountOpeningSteps.tsx` |
| `requirementsChecklist` | `requirementsChecklist.ts` | `RequirementsChecklist.tsx` |
| `guideAccordion` | `guideAccordion.ts` | `GuideAccordion.tsx` |
| `faqAccordion` | `faqAccordion.ts` | `FaqAccordion.tsx` |
| `accountFaq` | `accountFaq.ts` | `AccountFaq.tsx` |
| `consultationQualifier` | `consultationQualifier.ts` | `ConsultationQualifier.tsx` |
| `consultationShowcase` | `consultationShowcase.ts` | `ConsultationShowcase.tsx` |
| `contactDetails` | `contactDetails.ts` | `ContactDetails.tsx` |
| `teamGrid` | `teamGrid.ts` | `TeamGrid.tsx` |
| `teamMemberProfile` | `teamMemberProfile.ts` | `TeamMemberProfile.tsx` |
| `focusAreasGrid` | `focusAreasGrid.ts` | `FocusAreasGrid.tsx` |
| `hospitalityExperienceGrid` | `hospitalityExperienceGrid.ts` | `HospitalityExperienceGrid.tsx` |
| `skarduHotelFeature` | `skarduHotelFeature.ts` | `SkarduHotelFeature.tsx` |

### Adding a new block — checklist

1. Create schema: `src/blocks/schema/<slug>.ts` — exports a Payload `Block` object.
2. Import and add to `HomeBlocks` in `src/blocks/home.ts`.
3. Create React component: `src/blocks/<PascalCase>.tsx`.
4. Add entry to `HomeBlocks.tsx` renderer switch/map (see `src/blocks/HomeBlocks.tsx`).
5. Add miniature preview in `src/fields/blockPreviews/previews/group*.tsx`.
6. Add slug → component mapping in `src/fields/blockPreviews/index.tsx` → `previewMap`.

---

## 4. Shared Block Utilities

### `src/blocks/shared.tsx` — shared React helpers

Exports used across all block components:

| Export | Type | Purpose |
|---|---|---|
| `MediaValue` | type | `number \| { url?, alt? } \| null \| undefined` |
| `LinkValue` | type | `{ label?, url? } \| null \| undefined` |
| `BlockData` | type | `{ blockType: string; [key: string]: any }` |
| `imageSrc(media, fallback)` | fn | extracts `.url` from a Payload media object safely |
| `imageAlt(media, fallback)` | fn | extracts `.alt` from a Payload media object safely |
| `linkOk(link)` | fn | type guard — `true` only if both `label` and `url` are present |
| `Eyebrow` | component | small uppercase overline with the brand junction glyph |
| `Button` | component | renders primary or secondary button; props: `link`, `secondary`, `inverse`, `showArrow`, `showExternalIcon` |
| `Buttons` | component | renders a list of button blocks; props: `buttons`, `fallback`, `inverse`, `showArrow`, `showExternalIcon` |

**`Button` inverse rule:** Always pass `inverse` on dark backgrounds. Inside `.theme-inverse`, the default `bg-action` token resolves to blue-on-dark instead of white — the `inverse` prop switches to `bg-chrome-cta` (white) which is the correct reference behaviour.

### `src/blocks/schema/shared.ts` — shared Payload field helpers

| Export | Purpose |
|---|---|
| `linkFields` | `[{ name: 'label', type: 'text' }, { name: 'url', type: 'text' }]` |
| `buttonBlocks` | `primaryButton` + `secondaryButton` block definitions |
| `buttonsField` | a `blocks` field named `buttons`, max 2 rows, using `buttonBlocks` |

Use `buttonsField` in block schemas when a block needs CTA buttons.

### `src/fields/link.ts` — the full link field

A Payload `group` field (`name: 'link'`) with `label`, `url`, `file` (upload, media), and `newTab`. The `file` field wins over `url` — an editor can swap in a PDF without editing the URL. Used by Header, Footer, and anywhere a CMS-editable link is needed (not block CTAs — those use `buttonsField`).

---

## 5. Shared Components

### `src/components/CMSLink/index.tsx`
Renders a `{ label, url, newTab, file }` link group from Header/Footer globals. If `file` is set, it wins over `url` (PDF download case). External URLs and files render as `<a>`, internal URLs as `<NextLink>`.

### `src/components/Icon/index.tsx`
All icons in the project. Two families:

**UI icons** (1.5px stroke, `strokeLinecap="square"`, `strokeLinejoin="miter"` — the sharp look is deliberate):
`ChevronDownIcon`, `ChevronRightIcon`, `MenuIcon`, `CloseIcon`, `CheckIcon`, `PhoneIcon`, `MailIcon`, `ChatIcon` (alias: `WhatsAppIcon`), `JunctionMark`, `ArrowRightIcon`, `ExternalLinkIcon`, `PlusIcon`, `MinusIcon`, `DocumentIcon`, `ShieldIcon`, `PeopleIcon`, `ChartIcon`, `ScaleIcon`, `GlobeIcon`, `CompassIcon`, `LedgerIcon`

**Social icons** (filled, not stroked — brand glyphs are unreadable at 18px as outlines):
`FacebookIcon`, `LinkedInIcon`, `InstagramIcon`, `YouTubeIcon`, `ThreadsIcon`

All accept `size` (px, default 24) and `className` props.

### `src/components/RichText/index.tsx`
Renders Payload lexical rich text. Used inside blocks that have a richText field.

### `src/components/Logo/index.tsx`
Frontend logo (not the admin logo). Used in Header and Footer components.

### `src/components/LivePreviewListener/index.tsx`
Client component that enables Payload live preview. Mounted in the frontend layout.

---

## 6. Collections

### Pages (`src/collections/Pages.ts`)
- `slug: 'pages'`
- `admin.group: 'Content'` — appears in the "Content" nav group in the admin sidebar
- Access: `authenticatedOrPublished` (not public by default — drafts are private)
- Fields: `title` (text, required), `slug` (text, required, unique), `layout` (blocks, required, `HomeBlocks`, `initCollapsed: true`)
- Versions: `drafts: true`, `maxPerDoc: 20`
- Hooks: `afterChange → revalidatePage`, `afterDelete → revalidatePageAfterDelete`
- Live preview and preview button use `generatePreviewPath`

### BlogArticles (`src/collections/BlogArticles.ts`)
- `slug: 'blog-articles'`
- `admin.group: 'Content'` — sits directly below Pages in the sidebar
- **Nav-only collection** — has no fields, creates no meaningful DB table
- Custom `List` view (`src/components/admin/BlogArticlesList.tsx`) immediately redirects to `/admin/collections/pages?where[slug][like]=blogs/`
- Access: `read: () => true`, `create/update/delete: () => false` — no editing here, all editing happens in Pages
- Purpose: gives editors a dedicated "Blog Articles" sidebar tab that pre-filters the pages list to blog slugs

### Users (`src/collections/Users.ts`)
Standard Payload users collection for admin login.

### Media (`src/collections/Media.ts`)
Standard Payload media collection. All image uploads go here. Relation target for `type: 'upload'` fields everywhere.

---

## 7. Globals

Fetched via `src/utilities/getGlobals.ts` → `getCachedGlobal(slug, depth)`:
- Uses `unstable_cache` (tag: `global_${slug}`) + React `cache` for per-request deduplication.
- Revalidated by each global's `afterChange` hook.

### Header (`src/Header/config.ts`)

Fields:
- `logo` — optional media upload (160px wide)
- `navItems[]` — primary nav. Each item: `label`, `href` (blank = mega-menu trigger), `groups[]` (columns with `heading` + `items[]`), `feature` (promo card in last column)
- `consultationLink` — text CTA at ≥1280px
- `ctaButton` — solid CTA at ≥640px
- `contact` — phone, phoneHref, whatsappUrl, whatsappLabel (shown in mobile menu)
- `riskNotice` — regulatory strip above header: `enabled`, `lead`, `body`

Nav default data: **Trade & invest** (Brokerage + Get started), **The group** (Land & advisory), **Research**, **About** (Company + Trust), **Contact**.

Deprecated hidden fields (`tradeInvest`, `theGroup`, `about`) — do not remove them; they prevent schema-push prompts. Use `npm run setup:globals` when cleaning up.

Components: `src/Header/Component.tsx` (server), `src/Header/Component.client.tsx` (mobile menu), `src/Header/RiskNotice.tsx`.

### Footer (`src/Footer/config.ts`)

Four tabs:
1. **Brand & contact** — logo, description, phone, email, whatsappUrl, socialLinks (platform select: facebook/linkedin/instagram/threads/youtube)
2. **Link groups** — four groups: `tradeInvest`, `theGroup`, `insightsLearning`, `company`. Each has `label` + `links[]` (using the `link` field)
3. **Regulation & disclosures** — `regulationTitle`, `regulationLinks[]`, `legalParagraphs[]` (lead + body), `officesLine`
4. **Bottom bar** — `copyrightText`, `bottomLinks[]`

Component: `src/Footer/Component.tsx`.

---

## 8. Admin Customization

### `src/payload.config.ts` — `admin.components`

```ts
components: {
  graphics: {
    Logo: '@/components/admin/Logo#AdminLogo',
    Icon: '@/components/admin/Logo#AdminIcon',
  },
  beforeLogin: ['@/components/admin/BeforeLogin'],
  afterLogin: ['@/components/admin/LoginAside', '@/components/admin/LoginPlaceholders'],
  afterDashboard: ['@/components/BlocksOverview'],
}
```

No `beforeNavLinks` or `afterNavLinks` are used. Sidebar nav order is controlled by `admin.group` on each collection and the order of `collections: []` in `payload.config.ts`.

### Admin sidebar nav — how groups work

Payload's `groupNavItems` utility groups collections by `admin.group`. Collections with the same group string appear together under a collapsible label. Order within a group follows the order in `collections: []`.

Current sidebar structure:
```
▼ Content
   Pages
   Blog Articles
▼ Collections   (Payload default group)
   Users
   Media
▼ Globals
   Header
   Footer
```

**Rule:** To add a new sidebar entry beside Pages, give it `admin.group: 'Content'` and add it to `collections: []` in the right position in `payload.config.ts`.

**Do NOT use `beforeNavLinks` or `afterNavLinks`** to inject sidebar items. Those slots render outside the `NavGroup` wrappers — `beforeNavLinks` appears above all groups and `afterNavLinks` appears below all groups. They cannot sit beside a specific collection.

### Critical rule: Tailwind does NOT compile in the Payload admin bundle

Tailwind's CSS is scoped to the `(frontend)` layout. Inside Payload admin components, only inline styles work. This applies to:
- `src/fields/blockPreviews/` (all files)
- `src/fields/LayoutBlocksField.tsx`
- Anything in `src/components/admin/`

Admin-specific CSS classes go in `src/app/(payload)/custom.scss`.

### Admin components

| File | Purpose |
|---|---|
| `src/components/admin/Logo.tsx` | `AdminLogo` + `AdminIcon` exports — renders Enrichers brand in admin |
| `src/components/admin/BeforeLogin.tsx` | Shows brand above the login form |
| `src/components/admin/LoginAside.tsx` | Right-side panel on the login screen |
| `src/components/admin/LoginPlaceholders.tsx` | Placeholder content on login |
| `src/components/admin/BlogArticlesList.tsx` | Custom List view for `blog-articles` — immediately redirects to Pages filtered by `blogs/` slug prefix |

### importMap.js — critical rules

File: `src/app/(payload)/admin/importMap.js`

Every admin-side component referenced in `payload.config.ts` or in a collection's `admin.components` must have:
1. An `import` statement at the top using the hash-suffixed alias: `import { X as X_<hash> } from '@/path'`
2. An entry in the `importMap` object: `"@/path#X": X_<hash>`

**The hash must match between the import alias and the map value.** A mismatch (e.g. `BlogNavLink_blog` used as value but never declared as an import alias) causes a `ReferenceError` at runtime. When adding a component manually, copy the hash pattern from an existing nearby entry.

**`generate:importmap` regenerates this file automatically** — run `npm run generate:importmap` if you are unsure whether the map is correct.

---

## 9. LayoutBlocksField — Custom Block Picker

File: `src/fields/LayoutBlocksField.tsx`

Replaces Payload's default blocks field picker with a visual drawer. Registered on the `layout` field of the Pages collection.

### What it does

- Renders Payload's own `<BlocksField>` for the existing block rows (drag, collapse, duplicate all work)
- Adds a custom `+` button that opens a Drawer with a search box and a card grid
- Each card shows a miniature visual preview (from `blockPreviews/`) and an eye icon
- Clicking the card body inserts the block via `addFieldRow` — same call Payload's default picker uses
- Clicking the eye icon opens `FullscreenPreviewModal` without inserting

### Blog Article auto-block feature

When the URL contains `?blog=1`, `LayoutBlocksField` reads this via `useSearchParams` and automatically calls `addFieldRow({ blockType: 'articleDetail', ... })` after a 300ms delay on a fresh document. This pre-populates the article block when an editor opens a new page via "Blog Articles → Create New".

The `BlogArticlesList` redirect component appends `?blog=1` to the create URL so this trigger fires automatically.

---

## 10. Block Preview System — Admin Drawer

The Add Layout drawer shows miniature visual previews for all 44 blocks.

### Files

| File | Role |
|---|---|
| `src/fields/blockPreviews/index.tsx` | `previewMap` (all 44 slugs → component) + `BlockPreview` dispatcher |
| `src/fields/blockPreviews/primitives.tsx` | Inline-style drawing tools (all admin-safe) |
| `src/fields/blockPreviews/previews/group1.tsx` | 15 previews: hero/nav/intro/stats/feature blocks |
| `src/fields/blockPreviews/previews/group2.tsx` | 15 previews: grid/service/tab/download/research/article blocks |
| `src/fields/blockPreviews/previews/group3.tsx` | 14 previews: steps/checklist/accordion/contact/team/hospitality blocks |

### Primitives (`primitives.tsx`) — inline styles only

| Export | Purpose |
|---|---|
| `C` | Color constants: `navy, blue, blueLight, bluePale, blueFaint, text, muted, border, surface, white, line` |
| `skyGradient` | CSS gradient string for sky backgrounds |
| `navyGradient` | CSS gradient string for navy backgrounds |
| `Frame` | 3:2 aspect ratio wrapper — wrap every preview in this |
| `Bar` | Placeholder text rectangle |
| `Heading` | Heavier Bar for titles |
| `ImageBox` | Gradient box with mountain/sun SVG icon |
| `Btn` | Button pill shape |
| `Card` | Card surface rectangle |
| `Row` | `display:flex; flex-direction:row` helper |
| `Col` | `display:flex; flex-direction:column` helper |
| `TextLine` | Shows real text if available, falls back to `Bar` |
| `ItemImage` | Shows real upload if available, falls back to `ImageBox` |
| `Eyebrow` | Small uppercase overline |

### Adding a new block preview

1. Add a preview component in one of `src/fields/blockPreviews/previews/group*.tsx`.
2. Export it.
3. Add `slug → component` in `src/fields/blockPreviews/index.tsx` → `previewMap`.

---

## 11. Fullscreen Block Preview (Eye Icon → Modal → iframe)

The eye icon on each card in the Add Layout drawer opens a fullscreen modal that iframes the actual frontend block.

### Files

| File | Role |
|---|---|
| `src/fields/blockPreviews/FullscreenPreviewModal.tsx` | Modal component — portal, iframe, prev/next nav, close |
| `src/app/(frontend)/block-preview/page.tsx` | Frontend route that renders a single isolated block (no header/footer) |
| `src/app/(frontend)/block-preview-content/route.ts` | Authenticated GET API — returns `{ content, instances }` for all blocks |
| `src/utilities/getBlockPreviewContent.ts` | Reads all published pages, extracts per-block content and instance list |
| `src/blocks/homeDefaults.ts` | Sample data for all 44 blocks — used as fallback for unused blocks |

### How it works

1. Eye icon click → `setPreviewBlock({ slug, label })` — does NOT insert the block
2. `FullscreenPreviewModal` renders via `createPortal(modal, document.body)` — escapes Payload's drawer stacking context
3. Modal iframes `/block-preview?type=<slug>` (unused block) or `/block-preview?type=<slug>&page=<pageSlug>&index=<n>` (used block)
4. `/block-preview` renders the block isolated — no header, no footer, full frontend CSS
5. Used blocks show saved content; unused blocks fall back to `homeDefaults`
6. If multiple instances exist, prev/next buttons and keyboard `←`/`→` cycle through them

### Stacking context — critical

**Never render the modal as a child of `LayoutBlocksField`.** Payload's `<Drawer>` creates its own CSS stacking context via `transform`. Any `position: fixed` inside it is trapped. Always use `createPortal(modal, document.body)`.

### Authentication

`/block-preview-content` calls `payload.auth({ headers })` and returns 401 if no user. The `/block-preview` page uses `position: fixed` overlay CSS + `pointer-events: none` on interactive elements — preview is read-only.

### Sample data

`src/blocks/homeDefaults.ts` exports `HOME_BLOCKS` covering all 44 block slugs. The `/block-preview` route uses this as the fallback when a block type has no published instances. Keep this file in sync when adding new blocks.

---

## 12. Admin Dashboard Block Gallery

File: `src/components/BlocksOverview/index.tsx` (server), `src/components/BlocksOverview/Client.tsx` (client)

Registered as `afterDashboard` in `payload.config.ts`. Shows all 44 blocks as miniature cards on the admin dashboard for reference. Cards are read-only — no eye icons here, only in the Add Layout drawer.

### Live content (optional)

`src/utilities/getBlockPreviewContent.ts` — reads all published pages (depth 3), extracts heading/imageUrl/items/subheading per block. Cached 60s, tag `block-previews`.

---

## 13. Color Lint Gate

`scripts/check-hardcoded-colors.mjs` — blocks any hardcoded hex/rgb in JSX/TSX files.

Excluded paths:
- `src/fields/blockPreviews/` — intentional inline styles (admin, Tailwind not available)
- `src/fields/LayoutBlocksField.tsx` — same reason
- `src/components/admin/ImagePlaceholder.tsx` — admin-only, inline styles intentional
- `src/fields/ImageGuide.tsx` — admin-only, inline styles intentional
- `src/payload-types.ts` — generated file

Run via: `npm run lint:colors` or as part of `npm run lint`.

---

## 14. npm Scripts Reference

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run devsafe` | Delete `.next` then start dev (use when HMR breaks) |
| `npm run build` | Production build (8GB heap) |
| `npm run lint` | ESLint + color lint |
| `npm run lint:colors` | Color lint only |
| `npm run generate:types` | Regenerate `src/payload-types.ts` |
| `npm run generate:importmap` | Regenerate admin import map |
| `npm run migrate` | Run pending migrations |
| `npm run migrate:create` | Create a new migration file |
| `npm run migrate:status` | Show migration status |
| `npm run migrate:fresh` | Drop all and re-run from scratch |
| `npm run seed:globals` | Seed Header + Footer globals |
| `npm run seed:home` | Seed the home page blocks |
| `npm run seed:stock-broking` | Seed stock broking page |
| `npm run seed:commodity-brokerage` | Seed commodity brokerage page |
| `npm run seed:open-account` | Seed open account page |
| `npm run seed:contact-us` | Seed contact page |
| `npm run seed:articles` | Seed articles/research |
| `npm run seed:enrichers-team` | Seed team page |
| `npm run seed:about-us` | Seed about us page |
| *(many more)* | Each major page has a seed script in `scripts/` |

---

## 15. Migrations

Location: `src/migrations/`

Committed migrations:
- `20261030_044615_baseline_schema` — full initial schema
- `20261030_115220_enable_page_drafts` — added `_pages_v*` version tables

DB push is `development` only. In staging/production, run `npm run migrate`.

---

## 16. App Routes

```
src/app/(frontend)/
  page.tsx                       ← home page (renders HomeBlocks)
  [slug]/page.tsx                ← all other pages
  blogs/[articleSlug]/page.tsx   ← article detail pages
  block-preview/page.tsx         ← isolated block render for fullscreen preview modal
  block-preview-content/route.ts ← authenticated API — block content + instances
  next/preview/route.ts          ← Payload live preview endpoint
  layout.tsx                     ← root frontend layout (fonts, LivePreviewListener)
  globals.css                    ← design tokens + Tailwind

src/app/(payload)/
  admin/[[...segments]]/page.tsx ← Payload admin
  api/[...slug]/route.ts         ← Payload REST API
  custom.scss                    ← admin-only styles
```

---

## 17. Home Page Seed Data

`src/blocks/homeDefaults.ts` — `HOME_BLOCKS` covers all 44 block types with sample content. Used as:
- Homepage seed data (real marketing copy, real image paths, real nav URLs)
- Fallback sample data for the fullscreen block preview modal (unused blocks)

**Keep in sync when adding blocks.** If a new block slug is not in `homeDefaults.ts`, its fullscreen preview will fail to render for unused instances.

Default block order on homepage:
`marketHero` → `licensingCredentials` → `investmentPathCards` → `clientServices` → `accountOpeningSteps` → `consultationQualifier` → `marketResearchCards` → `groupBusinessExplorer` → `skarduHotelFeature` → `accountFaq` → `readyWhenYouAre`

---

## 18. Key Conventions

- `@/` alias = `src/`
- Block schema: `src/blocks/schema/<slug>.ts` — exports `Block` from `'payload'`
- Block component: `src/blocks/<PascalCase>.tsx` — `export default function BlockName(props)`
- Block component receives Payload-generated typed props from `payload-types.ts`
- Never use `bg-black`, `text-white`, or any hardcoded Tailwind color — use design token utilities only
- Admin components: **inline styles only**, no Tailwind
- Buttons on dark surfaces: always pass `inverse` prop to `<Button>` / `<Buttons>`
- DB push is dev-only; migrations are the source of truth elsewhere
- Deprecated Header/Footer fields (`tradeInvest`, `theGroup`, `about`, `entityNames`, `disclaimer`) are hidden — do NOT remove them (they prevent schema-push interactive prompts on deploy)
- Component string paths in Payload config (e.g. `'@/Header/RowLabel#RowLabel'`) — required because direct imports of `@payloadcms/ui` client components crash in plain Node (Payload CLI, `generate:types`)

---

## 19. Reference Project

A working reference implementation: `/home/m-sohail-afzal/Documents/playnow/my-reference-project`

Use it to understand patterns before implementing anything unfamiliar.
