# Landing Page — Image Delivery Specs

Hand these to the designer/photographer. Every image slot below is **CMS-editable**
in the admin (Pages → Home → the block → image field), and the editor shows the
recommended size next to each upload.

## Universal rules (apply to every image)

- **Format:** WebP or AVIF preferred (JPG/PNG accepted). The site re-optimises per device via Next.js image optimization.
- **File size:** keep each under ~400 KB (the hero can go to ~500 KB).
- **Cropping:** every image uses `object-cover` — it fills its box and the edges are cropped. So **keep the key subject centred**; don't put important content at the extreme edges.
- **It will never break the layout** — boxes are fixed aspect ratios. Wrong ratio = some cropping; too small = slight blur. That's all.
- **Naming:** use the PDF's reference names where given (LP:1, LP:2) so we can match them up.

---

## Landing-page images (priority — the 11 home sections)

| # | Section (block) | Recommended size | Ratio | Notes |
|---|---|---|---|---|
| **LP:1** | **Hero** (`marketHero`) | **1600 × 1280** | 5:4 | Trading-floor / market photo beside the hero text. Current image is only 972×831 — **replace with a sharp 5:4**. |
| — | **Research covers ×4** (`marketResearchCards`) | **900 × 1260** | 5:7 (portrait) | Report-cover style. ✅ The current `research-1…4.webp` (900×1273) now fit — the crop box was fixed to 5:7. Only replace if you want new covers. |
| — | **Skardu Riverside Hotel** (`skarduHotelFeature`) | **1600 × 1000** | 16:10 | Architectural render / site photo. Current `skardu-hotel.webp` (1368×720) works; a larger 16:10 is sharper. |
| **LP:2** | **Our Businesses** (`groupBusinessExplorer`) | **1000 × 1000** | 1:1 (square) | ✅ Slot added — each business card (Real Estate / Agriculture / Business Brokerage / AiBi) now has an optional **Panel image (LP:2)** field. Upload a square photo and it fills the panel; leave empty and it shows the icon (current behaviour). |

### "2–3 more visuals" (the PDF asked to add these)
The home page has three strong **text/icon-only** sections that could take a supporting image:
- **Client services** ("What you get with Enrichers") — a team/office photo, **1600 × 900 (16:9)**.
- **Licensed & regulated** — a certificate/office shot, **1200 × 800 (3:2)**.
- **Open an account steps** — an app/onboarding shot, **1200 × 800 (3:2)**.

Adding an image to any of these is a small code change (new image field + render). Say which ones and we'll wire them.

---

## Full per-slot reference (all blocks, from the in-editor guide)

| Block | Size | Ratio | Use |
|---|---|---|---|
| marketHero | 1600 × 1280 | 5:4 | Hero (LP:1) |
| marketResearchCards | 900 × 1260 | 5:7 | Research covers |
| skarduHotelFeature | 1600 × 1000 | 16:10 | Flagship hotel |
| serviceHero | 1200 × 1110 | ~1:1 | Inner-page hero image |
| knowledgeHero | 1000 × 1000 | 1:1 | Knowledge/FAQ hero |
| consultationShowcase | 1200 × 800 | 3:2 | Panel beside the form |
| imageTextFeature | 1200 × 675 | 16:9 | Landscape feature (Portrait toggle → 4:5) |
| agricultureFeature | 1200 × 800 | 3:2 | Field/farm/project |
| videoTextFeature | 1280 × 800 | 16:10 | Video thumbnail (play button overlaid) |
| immersiveMediaGallery | 1920 × 960 | 2:1 | Wide gallery slide |
| focusAreasGrid | 800 × 450 | 16:9 | Card image |
| hospitalityExperienceGrid | 700 × 400 | 7:4 | Wide card image |
| destinationLocationShowcase (main) | 1200 × 900 | 4:3 | Feature photo |
| destinationLocationShowcase (attraction) | 800 × 500 | 8:5 | Attraction card |
| platformDownloads | 800 × 600 | 4:3 | MT5 screenshot |
| articleDetail | 800 × 600 | 4:3 | Article sidebar |
| researchLibrary | 800 × 600 | 4:3 | Note cover thumbnail |
| founderStatement | 800 × 1000 | 4:5 | Portrait — face upper two-thirds |
| teamMemberProfile | 800 × 1000 | 4:5 | Portrait |
| teamGrid | 600 × 750 | 4:5 | Portrait |

---

## What's done (dev side) vs what we need from you

**Done (code):**
- ✅ Fixed the **research banner cropping** (box was 4:5, now 5:7 to match the real covers).
- ✅ Aligned the **hero** editor guidance to the real render box (5:4).
- ✅ Every image field shows its recommended size in the admin.

**Needed from you (the actual files):**
- [ ] **LP:1** hero image (1600 × 1280)
- [ ] **LP:2** panel photos (1000 × 1000) for the business cards — slot is ready; leave empty to keep the icons
- [ ] Any of the **2–3 extra visuals** above you want added (say which sections and we wire the fields)
- [ ] (Optional) new research covers / Skardu render if you want to replace the current ones

Drop the files into **admin → Media**, then pick them in each block's image field.
