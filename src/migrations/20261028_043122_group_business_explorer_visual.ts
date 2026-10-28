import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_group_business_explorer_items_icon" AS ENUM('document', 'development', 'agriculture', 'research', 'hospitality');
  ALTER TABLE "pages_blocks_group_business_explorer_items" ADD COLUMN "icon" "enum_pages_blocks_group_business_explorer_items_icon" DEFAULT 'document';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_group_business_explorer_items" DROP COLUMN "icon";
  DROP TYPE "public"."enum_pages_blocks_group_business_explorer_items_icon";`)
}
