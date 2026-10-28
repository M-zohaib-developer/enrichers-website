import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_client_services_items_icon" AS ENUM('people', 'chart', 'scale', 'globe', 'compass', 'ledger');
  CREATE TYPE "public"."enum_pages_blocks_client_services_primary_button_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_client_services_secondary_button_variant" AS ENUM('primary', 'secondary');
  ALTER TABLE "pages_blocks_client_services_items" ADD COLUMN "icon" "enum_pages_blocks_client_services_items_icon" DEFAULT 'people';
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "primary_button_label" varchar;
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "primary_button_url" varchar;
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "primary_button_variant" "enum_pages_blocks_client_services_primary_button_variant" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "secondary_button_label" varchar;
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "secondary_button_url" varchar;
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "secondary_button_variant" "enum_pages_blocks_client_services_secondary_button_variant" DEFAULT 'primary';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_client_services_items" DROP COLUMN "icon";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "primary_button_label";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "primary_button_url";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "primary_button_variant";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "secondary_button_label";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "secondary_button_url";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "secondary_button_variant";
  DROP TYPE "public"."enum_pages_blocks_client_services_items_icon";
  DROP TYPE "public"."enum_pages_blocks_client_services_primary_button_variant";
  DROP TYPE "public"."enum_pages_blocks_client_services_secondary_button_variant";`)
}
