-- ============================================================================
-- Production migration — Enrichers Candidate A
-- Date: 2026-11-27
--
-- Brings the production `enrichers_candidate_a` DB in line with the code.
-- Adds EXACTLY the two schema changes made after the last DB restore:
--   1. media.sizes_*  — 42 columns + 7 indexes  (image performance / imageSizes)
--   2. site_settings  — the WhatsApp Settings global table
--
-- Verified as the complete delta by a column-level local↔prod diff
-- (48 new columns; production had nothing local lacked).
--
-- SAFE: fully idempotent (IF NOT EXISTS everywhere) and wrapped in one
-- transaction. Re-running it is a no-op. It only ADDS; it drops/alters nothing
-- and does not touch any existing row.
--
-- Run on the server (adjust container/user if different):
--   cat 2026-11-27_add-media-sizes-and-settings.sql \
--     | docker exec -i enrichers-candidate-a-db \
--         psql -U enrichers_candidate_a -d enrichers_candidate_a -v ON_ERROR_STOP=1
-- ============================================================================

BEGIN;

-- ── 1. media.sizes_* columns (imageSizes: thumbnail/square/small/medium/large/xlarge/og) ──
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_thumbnail_url character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_thumbnail_width numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_thumbnail_height numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_thumbnail_mime_type character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_thumbnail_filesize numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_thumbnail_filename character varying;

ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_square_url character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_square_width numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_square_height numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_square_mime_type character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_square_filesize numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_square_filename character varying;

ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_small_url character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_small_width numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_small_height numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_small_mime_type character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_small_filesize numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_small_filename character varying;

ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_medium_url character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_medium_width numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_medium_height numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_medium_mime_type character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_medium_filesize numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_medium_filename character varying;

ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_large_url character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_large_width numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_large_height numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_large_mime_type character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_large_filesize numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_large_filename character varying;

ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_xlarge_url character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_xlarge_width numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_xlarge_height numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_xlarge_mime_type character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_xlarge_filesize numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_xlarge_filename character varying;

ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_og_url character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_og_width numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_og_height numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_og_mime_type character varying;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_og_filesize numeric;
ALTER TABLE public.media ADD COLUMN IF NOT EXISTS sizes_og_filename character varying;

-- Indexes Payload creates on each size's *_filename column.
CREATE INDEX IF NOT EXISTS media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);
CREATE INDEX IF NOT EXISTS media_sizes_square_sizes_square_filename_idx ON public.media USING btree (sizes_square_filename);
CREATE INDEX IF NOT EXISTS media_sizes_small_sizes_small_filename_idx ON public.media USING btree (sizes_small_filename);
CREATE INDEX IF NOT EXISTS media_sizes_medium_sizes_medium_filename_idx ON public.media USING btree (sizes_medium_filename);
CREATE INDEX IF NOT EXISTS media_sizes_large_sizes_large_filename_idx ON public.media USING btree (sizes_large_filename);
CREATE INDEX IF NOT EXISTS media_sizes_xlarge_sizes_xlarge_filename_idx ON public.media USING btree (sizes_xlarge_filename);
CREATE INDEX IF NOT EXISTS media_sizes_og_sizes_og_filename_idx ON public.media USING btree (sizes_og_filename);

-- ── 2. site_settings table (WhatsApp Settings global) ──
-- `serial` recreates the same id sequence + default + PK as the local schema.
CREATE TABLE IF NOT EXISTS public.site_settings (
  id serial PRIMARY KEY,
  whatsapp_enabled boolean DEFAULT true,
  whatsapp_url character varying DEFAULT 'https://api.whatsapp.com/send?phone=9242111111333',
  whatsapp_tooltip character varying DEFAULT 'Chat with us on WhatsApp',
  updated_at timestamp(3) with time zone,
  created_at timestamp(3) with time zone
);

COMMIT;

-- Post-check (run manually after):
--   select count(*) from information_schema.columns where table_name='media' and column_name like 'sizes_%';  -- expect 42
--   select to_regclass('public.site_settings');  -- expect site_settings
