import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_licensing_credentials_items_variant" AS ENUM('entity', 'documents');
  ALTER TABLE "pages_blocks_licensing_credentials_items" ADD COLUMN "note" varchar;
  ALTER TABLE "pages_blocks_licensing_credentials_items" ADD COLUMN "variant" "enum_pages_blocks_licensing_credentials_items_variant" DEFAULT 'entity';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_licensing_credentials_items" DROP COLUMN "note";
  ALTER TABLE "pages_blocks_licensing_credentials_items" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_licensing_credentials_items_variant";`)
}
