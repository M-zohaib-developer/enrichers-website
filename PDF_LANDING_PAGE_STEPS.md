# Landing Page — Steps from the Client PDF

This is the full to-do list to match the client PDF (`Enrichers Website (Landing Page).pdf`)
with our current home page.

**Good news:** our home page is already built in the exact same section order as the PDF.
So most work is **copy changes**. A few sections need **new fields**, and there are a
few **build tasks** (red text in the PDF).

**Where the content lives:**
- Home page copy → `src/blocks/homeDefaults.ts` (`HOME_BLOCKS`)
- Home seed + consultation form → `scripts/seed-home.ts`
- Menu → `src/Header/config.ts` + `src/Header/defaults.ts`
- Footer → `src/Footer/config.ts` + `src/Footer/defaults.ts`

**Legend:** ✏️ = copy only · ➕ = needs a new field · 🔧 = build task · 🖼️ = image needed

---

## PHASE 1 — Copy changes (safe, do first)

> ## ✅ PHASE 1 COMPLETE — all 9 steps done & verified live on http://localhost:3000
> Steps 1–9 edited in `src/blocks/homeDefaults.ts`, seeded to the DB, and confirmed in the rendered page.
> Checks: `npx tsc --noEmit` ✅ silent · `npm run lint:colors` ✅ clean · old copy confirmed gone · no runtime errors.
> Also fixed: `scripts/seed-home.ts` now seeds only the 11 real home blocks (was failing on all 44).
>
> **3 small items intentionally deferred (need a new field or client input — tracked in Phase 3):**
> - Step 6: the secondary heading "Know the markets behind the market" needs a subheading field → Phase 3.
> - Step 7: the "Status: Design Stage" line needs a status field → Phase 3 Step 14. (The 2nd button "Partner with Us" IS done.)
> - Step 8: FAQ answers were **drafted from known facts** (SECP, MT5, CDC, 110% margin). The PDF only gave questions — **please review/confirm the answers**.

These are text edits only. No code structure changes.

### Step 1 — Hero (`marketHero`) ✏️ 🖼️ — ✅ DONE (copy); image pending
- [x] Eyebrow: `SECP-regulated broker. Lahore, since 2011` → **`Enrichers Investment Group · Since 2011`**
- [x] Heading: `Trade Pakistan markets with a licensed broker beside you.` → **`Converting Opportunities Into Real-Wealth`**
- [x] Body → **`Explore investment opportunities across global commodities, Pakistan's equity market, international indices, currencies, and diversified real assets.`**
- [x] Button: `Talk to our experts` → **`Talk to an Expert`** · `Open an account` → **`Open an Account`**
- [x] Replace the badge line (`PSX TREC holder…`) with tag line → **`Financial Markets · Real Estate · Business Brokerage · Agriculture`** (now renders as a dot-separated line, no tick icons)
- [ ] 🖼️ New hero image — named **LP:1** (see Phase 5 for size) — waiting on the image file

> Edited: `src/blocks/homeDefaults.ts` (marketHero copy) + `src/blocks/MarketHero.tsx`
> (empty heading-line guard + badges now render as `·` separated verticals).
> Checks: `npx tsc --noEmit` ✅ silent · `npm run lint:colors` ✅ no hardcoded colours.
>
> **VERIFIED LIVE (dev server on http://localhost:3000):**
> - Hero renders new copy: heading "Converting Opportunities / Into Real-Wealth" (2 lines, no blank 3rd line), new eyebrow, body, `Open an Account` + `Talk to an Expert`, and the verticals line `Financial Markets · Real Estate · Business Brokerage · Agriculture` (3 `·`, no tick icons). Old hero copy gone. No runtime errors.
>
> ⚠️ **`npm run seed:home` is currently BROKEN (pre-existing, not from this change).**
> It maps ALL 44 blocks in `HOME_BLOCKS`, but the live home page only has 11 blocks, and
> ~31 required image/fields on blocks 8–44 are empty → Payload rejects the write.
> I pushed the hero via a one-off targeted update instead. **Recommended fix:** make
> `seed-home.ts` seed only the 11 real home blocks so future copy steps can just run `seed:home`.

### Step 2 — Licensed & regulated (`licensingCredentials`) ✏️
- [ ] Change top heading/eyebrow to **`LICENSED & REGULATED`**
- [ ] 3 cards stay the same (already match).

### Step 3 — Three ways to start (`investmentPathCards`) ✏️
- [ ] Heading: `What would you like to do?` → **`Where would you like to begin?`**
- [ ] Body → **`Choose the market that suits you, or share your goals and we'll recommend the right path.`**
- [ ] Card 1: label → `01 PSX · EQUITIES`; body → `Equity investing, IPO subscriptions, and research-backed guidance through Enrichers Securities (Pvt.) Ltd., a TREC holder of the Pakistan Stock Exchange.`; button `Stock broking` → **`Start Investing`**
- [ ] Card 2: label → `02 PMEX · MULTI-ASSET`; title → `Access commodities, indices & currencies`; body → `Trade futures and spot contracts in metals, energy, agriculture, US indices, and currency pairs through regulated exchange platforms`; button → **`Explore PMEX`**
- [ ] Card 3: body → `Answer three quick questions about your budget, goals, and experience, and an advisor will call you with a plan that fits.`; button `Book a consultation` → **`Book a Free Consultation`**

### Step 4 — Client services (`clientServices`) ✏️
- [ ] Body → **`More than order execution: our team helps you understand the reasoning behind every decision.`**
- [ ] Item 2: `Price graph reading` → **`Technical Analysis`** · body → `Charts translated into actionable market insight.`
- [ ] Item 4: `Macroeconomic analysis` body → `Economic shifts. Clear market insights.`
- [ ] Item 5: `Geopolitics market impact` → **`Geopolitical Insight`** · body → `Global developments, clearly translated.`
- [ ] Item 6: `Money management` body → `Strategy behind every investment.`
- [ ] Items 1 & 3 stay the same.

### Step 5 — Open an account (`accountOpeningSteps`) ✏️
- [ ] Heading: `Four steps to your first trade` → **`Four steps to get started`**
- [ ] Step 1: `Register your account` → **`Register`** · body → `Complete the short online form to open your PSX or PMEX account.`
- [ ] Step 2: `Activate your account` → **`Verify`** · body → `Confirm your identity through KYC and the OTP sent to your mobile.`
- [ ] Step 3: `Add funds` → **`Fund`** · body → `Deposit through bank transfer.`
- [ ] Step 4: `Start trading` → **`Invest`** · body → `Access equities, commodities, US indices, and currency pairs.`
- [ ] Note → `Account opening is completed on the exchange-approved online portals. Overseas Pakistanis can also open accounts fully online.`
- [ ] Buttons stay the same.

### Step 6 — Research & insights (`marketResearchCards`) ✏️ 🖼️
- [ ] Add secondary heading (top-right) → **`Know the markets behind the market`**
- [ ] Body → `Research on equities, commodities, currencies, US indices, real estate and agriculture, connecting global trends to real opportunities.`
- [ ] Button: `All research` → **`Explore all research`**
- [ ] 🖼️ PDF shows **4 banners**, we have 3 — add a 4th card + fix cropping (see Phase 5).

### Step 7 — Skardu Riverside Hotel (`skarduHotelFeature`) ✏️ (+ ➕ in Phase 3)
- [ ] Eyebrow: `Flagship project` → **`FLAGSHIP PROJECT · HOSPITALITY`**
- [ ] Body → `A purpose-built luxury hotel on 40 kanals of riverside land in Skardu, Gilgit-Baltistan, set between the Indus and the Karakoram.`
- [ ] Stats + caption stay the same.
- [ ] (New status line + 2nd button → see Step 13)

### Step 8 — FAQ (`accountFaq`) ✏️ (content expansion — 3 tabs → 5 tabs)
- [ ] Tab 1 `Opening an account` — add questions:
      How do I open an account with Enrichers on PSX or PMEX? / What documents do I need? / How long does account opening take? / Can I invest if I'm outside Pakistan? / What is the minimum amount to get started? / How do I deposit and withdraw funds?
- [ ] Tab 2 rename `Stocks (PSX)` → **`PSX Stocks`** — questions:
      What can I invest in on PSX? / Where are my shares held? / What are your commission rates? / Can I invest through a mobile app?
- [ ] Tab 3 rename `Commodities (PMEX)` → **`PMEX Markets`** — questions:
      What can I access through PMEX? / What's the difference between futures and spot contracts? / How does margin work? / What are PMEX market hours? / Which platform will I use?
- [ ] Tab 4 NEW `Our Businesses` — questions:
      How can I invest in or partner on Enrichers' real estate, agriculture, or hospitality projects? / How does the arid land partnership model work?
- [ ] Tab 5 NEW `General` — questions:
      Is Enrichers regulated? / How is my money kept safe? / How do I raise a complaint?

### Step 9 — Ready when you are (`readyWhenYouAre`) ✏️
- [ ] Add lead line → **`Start building real wealth.`**
- [ ] Body → `Open a PSX or PMEX account online, or speak with our team first.`
- [ ] Fix the disclaimer → `Investing and trading in securities, futures, and other financial markets carries risk, including the possible loss of capital. Returns are not guaranteed. Brokerage services are provided by Enrichers Securities (Pvt.) Ltd. (PSX) and Enrichers (Pvt.) Ltd. (PMEX), both regulated by the SECP.`

---

## PHASE 2 — Menu + Footer restructure 🔧

> ## ✅ PHASE 2 COMPLETE — verified live on http://localhost:3000
> **Menu (Step 10):** now 7 tabs — Markets · Business Verticals · Knowledge Hub · About · Open Account · Book a Consultation · Careers, plus the "Open an account" button (+1). Markets children renamed to PSX Stocks / PMEX Markets. Careers promoted out of the About dropdown. Contact tab dropped. Duplicate right-side "Book a consultation" link removed.
> **Footer (Step 11):** bottom row now Privacy Policy · Terms of Use · Disclaimer. The 4 columns were kept (they already match the PDF footer mockup) and Regulation & Disclosures left as-is.
> **Strategic Partner (Step 12):** already linked under About → Trust and in the footer (3 links on the page) — satisfies "a navigation link to the dedicated page".
> Files: `src/Header/defaults.ts`, `src/Header/Component.client.tsx`, `src/Footer/defaults.ts`. Re-seeded via `npm run seed:globals`.
> Checks: `tsc` ✅ silent · `lint:colors` ✅ clean · nav shows exactly 7 tabs · footer row updated · old labels gone.
>
> ⚠️ **Note:** the `/terms-of-use/` page may not exist yet (Disclaimer points to `/regulation/`). Create a Terms of Use page when ready. Footer column headings were left as "Trade & invest / The group / Insights & learning / Company" to match the PDF mockup — tell me if you'd rather rename them to the new menu names (Markets / Business Verticals / Knowledge Hub / Company).

### Step 10 — Main menu: 5 tabs → 7+1 tabs
PDF wants these 7 tabs + 1 button:
1. **Markets** (rename dropdown children → **PSX Stocks**, **PMEX Markets**; keep the rest of Get Started)
2. **Business Verticals** (was "The group")
3. **Knowledge Hub** (was "Research"; add educational videos)
4. **About** (stays)
5. **Open Account** (promote from button to a tab)
6. **Book a Consultation** (promote from link to a tab)
7. **Careers** (promote from under About to a top tab)
- +1 button: **Open an account**
- [ ] Rename "Trade & invest" → "Markets" and its children to PSX Stocks / PMEX Markets
- [ ] Rename "The group" → "Business Verticals"
- [ ] Rename "Research" → "Knowledge Hub"
- [ ] Add top-level: Open Account, Book a Consultation, Careers
- [ ] Decide what happens to the "Contact" tab (PDF drops it from the 7+1 list)
- Files: `src/Header/config.ts`, `src/Header/defaults.ts`

### Step 11 — Footer realign 🔧
- [ ] Rework footer columns to match the new 7+1 menu.
- [ ] Keep **Regulation & Disclosures** as is (already correct).
- [ ] Bottom thin row → `Privacy Policy · Terms of Use · Disclaimer`
- Files: `src/Footer/config.ts`, `src/Footer/defaults.ts`

### Step 12 — Strategic Partner page (decision)
- [ ] PDF: Strategic Partner is a **separate page**; decide placement (button or nav element).
- Note: we already link `/strategicpartner/` under About — confirm if that's enough.

---

## PHASE 3 — New fields needed (small code work) ➕

> ## ✅ PHASE 3 COMPLETE — verified live on http://localhost:3000 (12/12 checks pass)
> New schema fields added (schema + component + data + DB push + seed), all rendered:
> - **Step 13 Consultation:** added `email` + `emailHref` + `address` fields; heading → "Talk to an investment expert"; hours → "24 hours, Monday to Friday · Closed weekends". Email now a mailto link, address shown with a pin icon.
> - **Step 14 Skardu:** added `status` field → renders "Status: Design Stage" chip. ("Partner with Us" 2nd button was already done in Phase 1.)
> - **Step 15 Our Businesses:** restructured 5 tabs → **4 cards** (Real Estate · Agriculture · Business Brokerage · AiBi Management Consultancies). Reused the `quote` field for the tagline; added a **per-card `buttons`** field so each card has its own 2 buttons. New heading "One group, many ways to build wealth" + new body + all card copy from the PDF.
> - **Step 6/16 Research:** added a `subheading` field → "Know the markets behind the market" renders top-right above the intro.
> - **Step 16 Licensed heading:** handled in Phase 1 (eyebrow → "Licensed & regulated"); no extra field needed.
>
> Files: `src/blocks/schema/{consultationQualifier,skarduHotelFeature,groupBusinessExplorer,marketResearchCards}.ts` + their components + `homeDefaults.ts`. Checks: `tsc` ✅ · `lint:colors` ✅ · DB columns/tables pushed in dev · seeded.
>
> ⚠️ **New pages referenced that may not exist yet:** `/real-estate/` and `/aibi/` (Explore buttons on the new cards). Create those pages when ready, or point the buttons elsewhere.

These sections need a new schema field before the copy can go in.
Files: block schema in `src/blocks/schema/<slug>.ts` + the component in `src/blocks/<Name>.tsx`.

### Step 13 — Consultation (`consultationQualifier`)
- [ ] ➕ Add **email** field → show `connect@enrichers.com.pk`
- [ ] ➕ Add **address** field → `Enrichers Investment Group, Head Office, 3rd Floor, High Q Tower, Gulberg 5, Lahore, Pakistan.`
- [ ] Heading → **`Talk to an investment expert`**
- [ ] Hours → `24 hours, Monday to Friday · Closed weekends`

### Step 14 — Skardu Hotel (`skarduHotelFeature`)
- [ ] ➕ Add a **status** line → `Status: Design Stage`
- [ ] ➕ Add a **2nd button** → `Partner with Us` (keep `Explore the Hotel`)

### Step 15 — Our Businesses (`groupBusinessExplorer`) — biggest change
PDF changes this from **5 tabs** to **4 cards**, each with a tagline + 2 buttons.
- [ ] ➕ Add **tagline** field + **per-card buttons** (currently items have only url + icon)
- [ ] Section heading → `One group, many ways to build wealth`
- [ ] Body → `Alongside our brokerage, Enrichers develops real estate, from residential communities to a riverside hotel in Skardu, turns barren land into productive farmland, advises on buying and selling businesses, and helps organisations grow through its management consultancy.`
- [ ] Card 1 **Real Estate** — label `REAL ESTATE · PAKISTAN & UAE`, tagline `Building value you can stand on.`, buttons [Explore Real Estate] [Book a Consultation]
- [ ] Card 2 **Agriculture** — label `LAND & AGRICULTURE`, tagline `Cultivating a sustainable future.`, buttons [Explore Agriculture] [Partner with us]
- [ ] Card 3 **Business Brokerage** — label `ADVISORY · BUSINESS BROKERAGE`, tagline `There's always a Bid for an Ask.`, buttons [Explore Business Brokerage] [Book a Consultation]
- [ ] Card 4 **AiBi Management Consultancies** — label `CONSULTANCY · DUBAI`, tagline `Artificial Intelligence and Behavioural Intelligence`, buttons [Explore AiBi] [Book a Consultation]
- (Full body copy for each card is in the PDF, pages 11–12.)
- [ ] 🔧 Fix the **double arrow** on the current button (see Step 17)

### Step 16 — Licensed heading (`licensingCredentials`)
- [ ] ➕ (optional) If we want `LICENSED & REGULATED` as a real heading (not the eyebrow), add a heading field. Otherwise reuse the eyebrow.

---

## PHASE 4 — Build tasks (red text) 🔧

> ## ✅ PHASE 4 COMPLETE — verified live on http://localhost:3000
> - **Step 17 (double arrow):** No fix needed — our build already renders a **single** arrow on the Our-Businesses button (no literal `→` in any label; the Button component adds exactly one). The double-arrow was a reference-site artifact, not present in our code.
> - **Step 18 (country-code selector):** Added a dial-code `<select>` before the phone input on the consultation form, **defaulting to +92**, with 12 codes (PK, UAE, KSA, UK, US, IN, AU, Oman, Qatar, Bahrain, Kuwait, Bangladesh). On submit the chosen code is prepended to the phone value, so overseas leads are captured. Added to **both** the wizard form (the live home one) and the single-page form.
> Files: `src/blocks/ConsultationQualifier.tsx` (component only — no schema/seed). Checks: `tsc` ✅ · `lint:colors` ✅ · select renders with +92 selected.

### Step 17 — Fix double arrow
- [ ] On the Our Businesses button, the arrow shows twice (label arrow + component arrow). Fix so only one shows.

### Step 18 — Country code selector on the phone field
- [ ] Consultation form phone input: placeholder `03XX XXXXXXX` only fits Pakistani numbers.
- [ ] Add a **country-code selector that defaults to +92** so we don't lose overseas leads.
- File: the consultation form component (`ConsultationForm` / `SinglePageForm`).

---

## POST-REVIEW FOLLOW-UPS ✅ (done & verified)

> - **Missing pages created:** `/real-estate/`, `/aibi/`, `/terms-of-use/` now exist as published, branded stub pages (serviceHero + intro + CTA). The Our-Businesses buttons and footer link no longer 404. New script: `scripts/seed-new-pages.ts` (`npm run seed:new-pages`).
> - **Phone leading-zero bug fixed:** `withDialCode` now strips the trunk zero, so `0300 1234567` with +92 submits as `+92 300 1234567` (was `+92 0300…`, undialable).
> - **config.ts drift fixed:** the header `navItems` default now points at `FALLBACK_NAV` (single source of truth — removed the stale 143-line inline 5-tab array). The dead `consultationLink` field is deprecated/hidden (kept, not deleted, to avoid a schema-push prompt), no longer seeded; dead `FALLBACK_CONSULTATION` export and type removed.
> Checks: `tsc` ✅ · `lint:colors` ✅ · 3 pages HTTP 200 with correct titles · nav still exactly 7 tabs · no regressions.
>
> ⚠️ **Dev-server note:** `npm run dev` (turbopack) intermittently fails with a `next/font/google` module-resolution error on cold start in this environment — a known turbopack flake, unrelated to the code (Google Fonts is reachable; the webpack pipeline builds fine). Workaround if you hit it: `./node_modules/.bin/next dev --webpack`, or just retry.

## PHASE 5 — Images to deliver 🖼️

> ## 🟡 PHASE 5 — dev-side DONE; waiting on the actual image files from you
> Full specs are in **`IMAGE_SPECS.md`** (per-slot sizes for the designer).
> **Fixed in code (verified live):**
> - ✅ **Research banner cropping** (the PDF's complaint) — the render box was `aspect-[4/5]` (0.80) but the real cover images are 900×1273 (0.71), so they were cropped. Changed the box to `aspect-[5/7]` so the covers show fully. (`MarketResearchCards.tsx`)
> - ✅ **Hero editor guidance** aligned to the real render box (was 1600×1200 4:3, now 1600×1280 5:4). (`schema/marketHero.ts`)
> - ✅ Every image field shows its recommended size in the admin.
> **Still needed from you (actual files — I can't create photography):** LP:1 hero (1600×1280), a decision on LP:2 (icon panel vs a real photo), and any of the "2–3 extra visuals". See `IMAGE_SPECS.md`.

Give the design team recommended dimensions + format for:
- [ ] **LP:1** — hero image
- [ ] **LP:2** — Our Businesses / group image
- [ ] **Research banners** — currently cropped; give correct size (4 banners)
- [ ] **2–3 extra visuals** the PDF suggests adding to make the page more engaging

Recommended specs (to confirm with design):
| Image | Suggested size | Format |
|---|---|---|
| LP:1 hero | 1600 × 1200 (4:3) | WebP/AVIF |
| LP:2 group | 1200 × 1200 (1:1) | WebP/AVIF |
| Research banner | 800 × 1000 (4:5 portrait) | WebP |

---

## Suggested order to work

1. **Phase 1** — all copy edits (one pass on `homeDefaults.ts` + seeds). Biggest visible match, lowest risk.
2. **Phase 2** — menu + footer.
3. **Phase 3** — the 4 new fields.
4. **Phase 4** — double arrow + country code selector.
5. **Phase 5** — images.

After each phase, run the project checks:
```bash
npx tsc --noEmit        # must be silent
npm run lint:colors     # must say no hardcoded colours
npm run dev             # check the page in the browser
```
