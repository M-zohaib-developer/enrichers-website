import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_group_business_explorer" ADD COLUMN "item_secondary_button_label" varchar;
  ALTER TABLE "pages_blocks_group_business_explorer" ADD COLUMN "item_secondary_button_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_group_business_explorer" DROP COLUMN "item_secondary_button_label";
  ALTER TABLE "pages_blocks_group_business_explorer" DROP COLUMN "item_secondary_button_url";`)
}
