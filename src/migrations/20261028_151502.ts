import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_destination_location_showcase_attractions" ADD COLUMN "body" varchar;
  ALTER TABLE "pages_blocks_destination_location_showcase" ADD COLUMN "image_caption" varchar;
  ALTER TABLE "pages_blocks_destination_location_showcase" ADD COLUMN "image_caption_detail" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_destination_location_showcase_attractions" DROP COLUMN "body";
  ALTER TABLE "pages_blocks_destination_location_showcase" DROP COLUMN "image_caption";
  ALTER TABLE "pages_blocks_destination_location_showcase" DROP COLUMN "image_caption_detail";`)
}
