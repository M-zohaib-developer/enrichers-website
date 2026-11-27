# Performance & Image Optimization — Plan (for review)

**Goal:** make the site faster, mainly by shrinking images — matching how the
reference project (`my-reference-project`) is set up.

> ⚠️ This is a **plan only — no code has been changed yet.** Review it, then we start.

---

## 1. Why the site is slow right now

I compared our project with the reference project. The reference does **three
image things that our project does not do at all**:

| # | Optimization | Reference project | Our project |
|---|---|---|---|
| 1 | **Resized image variants** (`imageSizes`) | ✅ 7 WebP sizes per image (q75) | ❌ **None** — only the full original is stored/served |
| 2 | **Next.js image tuning** (cache, sizes, quality) | ✅ 1-year cache, capped sizes | ❌ Defaults (4-hour cache, up to 3840px) |
| 3 | **Cache-Control headers** on uploads | ✅ 1-year immutable on `/api/media`, `/media`, `/brand` | ❌ None — browser re-downloads every visit |

**Proof from our project:**
- The `media` table has **no `sizes_*` columns** → confirms zero resized variants exist.
- Our stored images are large: `media/` is **25 MB**, with single files like
  `cover-05.png` (1.1 MB), `skardu-gallery-02.jpeg` (760 KB), etc. These full-size
  files are what the server has to fetch and re-encode on every image request.

**Net effect:** every image is served at (or re-encoded from) full size, with a
4-hour cache and no browser cache headers — so pages are heavy and images
re-download often.

---

## 2. What the reference project does (our target)

### A. Media collection — `imageSizes` (the biggest win)
Every uploaded image is auto-converted to **WebP at quality 75** in these sizes,
with `withoutEnlargement` (never upscale a small source):

| Variant | Width | Notes |
|---|---|---|
| thumbnail | 300 | admin/list |
| square | 500×500 | square cards |
| small | 600 | small cards |
| medium | 900 | most block images |
| large | 1400 | heroes |
| xlarge | 1920 | full-bleed |
| og | 1200×630 | social share |

Plus `formatOptions: { format: 'webp', quality: 75 }` so a PNG/JPG upload doesn't
stay huge, and `focalPoint: true` for better crops.

### B. `next.config` images
```
qualities: [75],
deviceSizes: [640, 750, 828, 1080, 1200, 1920],   // capped (default goes to 3840)
minimumCacheTTL: 31536000,                          // 1 year (default is 4h)
```

### C. Cache-Control headers
`async headers()` adds a **short, self-correcting** cache to `/api/media/file/*`,
`/media/*`, and `/brand/*`:
```
Cache-Control: public, max-age=3600, stale-while-revalidate=86400
```
> **Important:** the reference deliberately does **NOT** use `immutable` / 1-year
> here. The filenames are not content-hashed, so if an editor **replaces** an
> image, a 1-year immutable cache would show the old one for a year. The 1-hour +
> stale-while-revalidate window lets a replaced image "work its way out" of the
> cache on its own within ~1 hour. We'll copy this exactly.

---

## 3. Proposed work (prioritized)

> ## ✅ STEPS 1–3 DONE & VERIFIED (local)
> - **Step 1:** `imageSizes` added to `src/collections/Media.ts` (7 WebP variants @ q75 + `focalPoint` + `adminThumbnail`). Schema pushed — **42 `sizes_*` columns** created on the `media` table. New uploads now auto-generate small WebP variants.
> - **Step 2:** `next.config.ts` tuned — `qualities: [75]`, `deviceSizes` capped at 1920, `minimumCacheTTL: 31536000` (1-year optimised-image cache in production). Verified `/_next/image` serves **WebP** to a browser (`Content-Type: image/webp`, cache HIT).
> - **Step 3:** Cache-Control added — `public, max-age=3600, stale-while-revalidate=86400` on `/api/media/file/*` and `/brand/*`. **Verified live** on real image URLs.
> - Checks: `tsc` ✅ · `lint:colors` ✅.
> - **Still pending → Step 4:** the **141 existing images have 0 variants yet** (variants only build on upload). They currently still get optimised on-the-fly by `/_next/image` (already a win), but their Payload WebP variants aren't generated until we run the regenerate script.
> - **Production note:** the `sizes_*` columns are a **schema change** → prod needs a **migration**, not just a code deploy.

### ✅ Step 1 — Add `imageSizes` to our Media collection  *(biggest impact)*
- File: `src/collections/Media.ts`
- Add the 7 WebP variants + `formatOptions` + `focalPoint: true` (copy the reference).
- **Result:** new uploads produce small WebP variants; the frontend serves a
  `medium`/`large` variant instead of a 2 MB original.

### ✅ Step 2 — Tune `next.config.ts` images
- Add `qualities: [75]`, `deviceSizes: [...1920]`, `minimumCacheTTL: 31536000`.
- **Result:** images cached for a year, fewer variants to encode, smaller payloads.

### ✅ Step 3 — Add Cache-Control headers for uploads
- Add `async headers()` for `/api/media/file/*`, `/media/*`, `/brand/*`.
- **Result:** browsers stop re-downloading images on repeat visits.

> ## ✅ STEP 4 DONE & VERIFIED (local)
> Ran `scripts/regenerate-media.ts` (`npm run regenerate:media`) → **141/141 images regenerated, 0 failed.** Every image now has its 7 WebP variants.
> **Size drop per image (originals → the `medium`/`large` WebP served to the page):**
> - `cover-6.png` 1061 kB → **medium 50 kB** / large 83 kB (−95%)
> - `skardu-gallery-3.jpeg` 757 kB → **medium 70 kB** / large 131 kB (−91%)
> - `skardu-gallery-5.jpeg` 745 kB → **medium 60 kB** (−92%)
> **Totals:** originals **21 MB** → `medium` variants **~6.9 MB** (≈ 67% smaller across the set; individual images often −90%+).
> Disk grew 25 MB → 66 MB (originals kept + variants added) — expected trade-off; served bytes are far smaller.
> **Production:** needs the migration (sizes_* columns) + run `npm run regenerate:media` on the server after deploy.

### ✅ Step 4 — Regenerate variants for the images ALREADY uploaded  *(important)*
- Payload only builds variants **on upload**. The ~140 existing images won't have
  them until re-processed.
- I'll write a small script (`scripts/regenerate-media.ts`) that re-saves each
  media doc so Payload generates the new WebP sizes. One-time run, local + server.

> ## ✅ STEP 5 DONE & VERIFIED (local)
> `imageSrc()` in `src/blocks/shared.tsx` now returns the resized **WebP variant**
> (default `large` = 1400px; heroes use `xlarge` = 1920px), falling back to the
> original when a smaller source has no such variant. One central change → every
> block benefits.
> **Verified live:** of 67 `next/image` sources on the home page, **59 now point at
> a resized variant** (`…-WxH.webp`); the 8 originals are brand/logo assets and
> already-tiny images (expected). So `/_next/image` now optimises a small source
> (e.g. ~50–130 KB) instead of the full 1 MB original — less server work + faster
> first paint.
> Checks: `tsc` ✅ · `lint:colors` ✅.

### ⚪ Step 5 (optional) — Serve the right variant in blocks
- Our `imageSrc()` currently returns the **full** `.url`. I can make heroes/cards
  reference `.sizes.large/medium.url` for an extra win, though Next's
  `/_next/image` already resizes on delivery, so this is a smaller gain.

---

## 4. Risks & things to know (please read)

1. **Schema change + production migration.** Adding `imageSizes` adds `sizes_*`
   columns to the `media` table. Locally this auto-pushes; **production needs a
   migration** (prod doesn't auto-push). So this change must be deployed as:
   *code + a migration* — it's bigger than the WhatsApp change.
2. **Existing images need regeneration** (Step 4), or only new uploads benefit.
3. **Disk usage grows** a little — each image now stores ~7 small variants
   (still far smaller than serving the full original repeatedly).
4. **No visual change** — same images, just smaller/faster. Nothing on the page
   looks different.
5. This is **separate** from the pending WhatsApp deploy — I'd keep them as two
   clean changes.

---

## Step 6 — AVIF format ✅ DONE & VERIFIED (local)
Added `formats: ['image/avif', 'image/webp']` to `next.config.ts` (additive — only
changes the `/_next/image` output format). Verified end-to-end on `cover-6.png`:
- AVIF-capable browser → **`image/avif`, 41 KB**
- WebP-only browser → **`image/webp`, 70 KB** (fallback works)
- No Accept → original (`image/png`)
So AVIF is **~41% smaller than WebP** here (and ~96% smaller than the 1061 KB original).
**Unaffected (confirmed):** Cache-Control on `/api/media` unchanged, stored `sizes_*`
variants still `image/webp`, originals untouched, no image errors, `tsc`/`lint` clean.
**Prod caveat:** the server's `sharp` must also have `aom`/`heif` (ours has aom 3.12.0,
heif 1.19.7) — verify on the prod app container after deploy.

## 4b. Does editing from the admin still update the site? (YES)

This is the key worry with caching — here's exactly how it behaves:

| What the editor changes | Does it update? |
|---|---|
| **Text / content** (headings, blocks, menu, footer, Settings) | ✅ **Instantly.** Pages have an `afterChange → revalidatePage` hook, and Header/Footer/Settings have `revalidateTag` hooks. Any save busts that page/global's cache right away. |
| **Add a new image** (new upload) | ✅ **Instantly** — a new file = a new URL = a fresh cache key. |
| **Replace an image in place** (same media item) | ✅ Self-corrects within **~1 hour**, because we use `max-age=3600, stale-while-revalidate=86400` (not a 1-year immutable cache). The new image appears automatically; no manual cache clear needed. |

So: **content edits show immediately; image replacements show within about an
hour.** Nothing gets permanently stuck. (This is why Step 3 uses the short cache
window, not `immutable`.)

## 5. Expected impact
- Image bytes per page: typically **50–80% smaller** (full JPEG/PNG → WebP q75 at
  the right size).
- Repeat visits: images load **instantly from cache** (1-year Cache-Control).
- Less server CPU (fewer/again-cached encodes).
- Better Lighthouse / LCP, especially on the image-heavy home and Skardu pages.

---

## 6. What I will NOT touch
- No page content, layout, or wording changes.
- No new features.
- The WhatsApp feature / DB sync stays a separate task.

---

## Proposed order when you approve
1. Steps 1–3 (Media `imageSizes` + next.config + headers) — the config work.
2. Step 4 (regenerate existing images) — run the script, verify sizes drop.
3. Verify locally (tsc, lint, check a few image URLs are now WebP variants).
4. Then plan the production deploy (code + media migration + regenerate on server).

**Tell me to proceed and I'll start with Steps 1–3.**
