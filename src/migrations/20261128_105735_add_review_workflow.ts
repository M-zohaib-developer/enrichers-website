import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Adds the admin/editor review workflow.
 *
 * This migration was hand-trimmed from the auto-generated diff. Payload's
 * generator also saw drift from earlier dev-mode schema pushes
 * (glossary_letter_grid, video_gallery tables, guide_accordion.columns,
 * site_settings.youtube_*, _pages_v.autosave). Those already exist on both
 * local and server DBs — server got them through pg_dump sync, not through
 * a migration — so including them here would fail with "already exists".
 *
 * The `IF NOT EXISTS` / DO-block guards below make this file re-runnable on
 * any DB state: fresh, locally-pushed, or production-synced.
 *
 * What this migration DOES add (review workflow only):
 *   - enum enum_pages_review_status  (draft|pending|changes_requested|approved)
 *   - enum enum__pages_v_version_review_status
 *   - enum enum_users_role           (admin|editor)
 *   - pages.review_status, review_note, submitted_by_id, submitted_at,
 *     reviewed_by_id, reviewed_at  (+ FKs to users, + indexes)
 *   - _pages_v.version_review_status, version_review_note,
 *     version_submitted_by_id, version_submitted_at, version_reviewed_by_id,
 *     version_reviewed_at  (+ FKs, + indexes)
 *   - users.role NOT NULL DEFAULT 'editor'
 *   - site_settings.review_notify_override_to
 *
 * No existing row is invalidated: new columns are nullable or defaulted.
 */

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_review_status" AS ENUM('draft', 'pending', 'changes_requested', 'approved');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_version_review_status" AS ENUM('draft', 'pending', 'changes_requested', 'approved');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "review_status" "enum_pages_review_status" DEFAULT 'draft';
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "review_note" varchar;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "submitted_by_id" integer;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "submitted_at" timestamp(3) with time zone;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "reviewed_by_id" integer;
    ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "reviewed_at" timestamp(3) with time zone;

    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_review_status" "enum__pages_v_version_review_status" DEFAULT 'draft';
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_review_note" varchar;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_submitted_by_id" integer;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_submitted_at" timestamp(3) with time zone;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_reviewed_by_id" integer;
    ALTER TABLE "_pages_v" ADD COLUMN IF NOT EXISTS "version_reviewed_at" timestamp(3) with time zone;

    -- Add role nullable first, backfill existing rows, then enforce NOT NULL.
    -- This keeps the ADD COLUMN statement safe on a populated users table.
    ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "role" "enum_users_role";
    UPDATE "users" SET "role" = 'editor' WHERE "role" IS NULL;
    ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'editor';
    ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;

    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "review_notify_override_to" varchar;

    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_submitted_by_id_users_id_fk"
        FOREIGN KEY ("submitted_by_id") REFERENCES "public"."users"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "pages"
        ADD CONSTRAINT "pages_reviewed_by_id_users_id_fk"
        FOREIGN KEY ("reviewed_by_id") REFERENCES "public"."users"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v"
        ADD CONSTRAINT "_pages_v_version_submitted_by_id_users_id_fk"
        FOREIGN KEY ("version_submitted_by_id") REFERENCES "public"."users"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v"
        ADD CONSTRAINT "_pages_v_version_reviewed_by_id_users_id_fk"
        FOREIGN KEY ("version_reviewed_by_id") REFERENCES "public"."users"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    CREATE INDEX IF NOT EXISTS "pages_submitted_by_idx"            ON "pages"    USING btree ("submitted_by_id");
    CREATE INDEX IF NOT EXISTS "pages_reviewed_by_idx"             ON "pages"    USING btree ("reviewed_by_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_version_version_submitted_by_idx" ON "_pages_v" USING btree ("version_submitted_by_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_version_version_reviewed_by_idx"  ON "_pages_v" USING btree ("version_reviewed_by_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages"    DROP CONSTRAINT IF EXISTS "pages_submitted_by_id_users_id_fk";
    ALTER TABLE "pages"    DROP CONSTRAINT IF EXISTS "pages_reviewed_by_id_users_id_fk";
    ALTER TABLE "_pages_v" DROP CONSTRAINT IF EXISTS "_pages_v_version_submitted_by_id_users_id_fk";
    ALTER TABLE "_pages_v" DROP CONSTRAINT IF EXISTS "_pages_v_version_reviewed_by_id_users_id_fk";

    DROP INDEX IF EXISTS "pages_submitted_by_idx";
    DROP INDEX IF EXISTS "pages_reviewed_by_idx";
    DROP INDEX IF EXISTS "_pages_v_version_version_submitted_by_idx";
    DROP INDEX IF EXISTS "_pages_v_version_version_reviewed_by_idx";

    ALTER TABLE "pages"    DROP COLUMN IF EXISTS "review_status";
    ALTER TABLE "pages"    DROP COLUMN IF EXISTS "review_note";
    ALTER TABLE "pages"    DROP COLUMN IF EXISTS "submitted_by_id";
    ALTER TABLE "pages"    DROP COLUMN IF EXISTS "submitted_at";
    ALTER TABLE "pages"    DROP COLUMN IF EXISTS "reviewed_by_id";
    ALTER TABLE "pages"    DROP COLUMN IF EXISTS "reviewed_at";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_review_status";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_review_note";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_submitted_by_id";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_submitted_at";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_reviewed_by_id";
    ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_reviewed_at";
    ALTER TABLE "users"    DROP COLUMN IF EXISTS "role";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "review_notify_override_to";

    DROP TYPE IF EXISTS "public"."enum_pages_review_status";
    DROP TYPE IF EXISTS "public"."enum__pages_v_version_review_status";
    DROP TYPE IF EXISTS "public"."enum_users_role";
  `)
}
