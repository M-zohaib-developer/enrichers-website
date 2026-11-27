# Production Deploy — Enrichers Candidate A (2026-11-27)

This deploy ships everything built since the last code deploy:
**(A) the WhatsApp feature** and **(B) the image performance work** (imageSizes +
next.config + Cache-Control + AVIF).

Server: `ssh dev` → `root@208.87.128.85`
App dir: `/root/enricher/enrichers-website`
DB container: `enrichers-candidate-a-db` · DB/user: `enrichers_candidate_a`

> The DB **content** is already in sync (from the earlier restore). This deploy
> only **adds schema** (48 columns) + the new **code**. It changes no existing row.

---

## 0. Safety backup first (read-only, ~1s)
```bash
ssh dev 'docker exec enrichers-candidate-a-db pg_dump -U enrichers_candidate_a -d enrichers_candidate_a -Fc --no-owner --no-acl \
  > /root/enricher/enrichers-website/backup_$(date +%Y%m%d_%H%M%S).dump'
```
(Rollback = `pg_restore --clean` this file. There is also an earlier
`server_backup_before_restore_*.dump` on the server.)

---

## 1. Deploy the code
Pull/sync the latest code to the server the way you normally do. The files that
changed in this release:

**WhatsApp feature**
- `src/globals/SiteSettings/config.ts` *(new)*
- `src/globals/SiteSettings/hooks/revalidateSettings.ts` *(new)*
- `src/components/WhatsAppFloat/index.tsx` *(new)*
- `src/app/(frontend)/layout.tsx` · `src/app/(frontend)/globals.css` · `src/payload.config.ts` · `src/payload-types.ts`

**Image performance**
- `src/collections/Media.ts` *(imageSizes)*
- `next.config.ts` *(qualities, deviceSizes, minimumCacheTTL, AVIF formats, Cache-Control headers)*
- `src/blocks/shared.tsx` · `src/blocks/MarketHero.tsx` · `src/blocks/ServiceHero.tsx`
- `scripts/regenerate-media.ts` *(new)*

**Also included if not already live** (blog admin + new pages)
- `src/components/admin/BlogArticlesList.tsx` · `src/fields/LayoutBlocksField.tsx` · `scripts/seed-new-pages.ts`

> Easiest + safest: deploy the **whole current `src/`, `next.config.ts`,
> `package.json`, `scripts/`** — don't cherry-pick.

Then install + build as usual:
```bash
ssh dev 'cd /root/enricher/enrichers-website && npm ci && npm run build'
```

---

## 2. Run the DB migration (adds the 48 columns — fast, idempotent)
Copy the SQL up and apply it:
```bash
scp deploy/2026-11-27_add-media-sizes-and-settings.sql dev:/root/enricher/enrichers-website/
ssh dev 'cat /root/enricher/enrichers-website/2026-11-27_add-media-sizes-and-settings.sql \
  | docker exec -i enrichers-candidate-a-db psql -U enrichers_candidate_a -d enrichers_candidate_a -v ON_ERROR_STOP=1'
```
Verify:
```bash
ssh dev 'docker exec enrichers-candidate-a-db psql -U enrichers_candidate_a -d enrichers_candidate_a -tAc \
  "select (select count(*) from information_schema.columns where table_name=''media'' and column_name like ''sizes_%'') as media_sizes, to_regclass(''public.site_settings'') as settings;"'
# expect: 42 | site_settings
```

---

## 3. Restart the app (picks up new code + schema)
```bash
ssh dev 'cd /root/enricher/enrichers-website && <your restart cmd, e.g. pm2 restart enrichers / docker compose up -d>'
```

---

## 4. Regenerate image variants for the server's existing images
Builds the WebP variants on the server (reads its own originals, writes variants
to its media dir). **Needs Step 2 done first** (the sizes_* columns).
```bash
ssh dev 'cd /root/enricher/enrichers-website && npm run regenerate:media'
# expect: "Done. regenerated=<N> skipped=0 failed=0"
```

---

## 5. Verify on production
```bash
# WhatsApp Settings table exists + button renders
curl -sI https://<prod-domain>/ | head -1

# Cache-Control on uploads
curl -sI "https://<prod-domain>/api/media/file/<some-image>.webp" | grep -i cache-control
# expect: public, max-age=3600, stale-while-revalidate=86400

# AVIF delivery (modern browser) — expect Content-Type: image/avif
curl -sI -H 'Accept: image/avif,image/webp,*/*' "https://<prod-domain>/_next/image?url=%2Fapi%2Fmedia%2Ffile%2F<img>&w=1200&q=75" | grep -i content-type
# WebP fallback — expect image/webp
curl -sI -H 'Accept: image/webp,*/*'            "https://<prod-domain>/_next/image?url=%2Fapi%2Fmedia%2Ffile%2F<img>&w=1200&q=75" | grep -i content-type
```

### ⚠️ Confirm prod `sharp` can encode AVIF (the one open risk)
```bash
ssh dev 'cd /root/enricher/enrichers-website && node -e "const s=require(\"sharp\");s({create:{width:64,height:64,channels:3,background:{r:0,g:0,b:0}}}).avif({quality:75}).toBuffer().then(b=>console.log(\"AVIF ok\",b.length)).catch(e=>console.log(\"AVIF FAIL\",e.message))"'
```
- Prints `AVIF ok <bytes>` → good.
- Prints `AVIF FAIL …` → the server's sharp lacks `aom`/`heif`; remove the
  `formats: ['image/avif','image/webp']` line from `next.config.ts`, rebuild —
  WebP still works and nothing else is affected.

---

## Rollback
- **Schema:** the migration only ADDs; to undo, drop the `site_settings` table and
  the `sizes_*` columns, or restore the Step 0 backup.
- **Code:** redeploy the previous build.
- **AVIF only:** delete the `formats` line and rebuild.

## Order summary
1. Backup → 2. Deploy code + build → 3. Run migration SQL → 4. Restart app →
5. `regenerate:media` → 6. Verify (headers, AVIF, sharp check).
