import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_skardu_hotel_feature" ADD COLUMN "image_caption" varchar DEFAULT 'Architectural visualisation';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_skardu_hotel_feature" DROP COLUMN "image_caption";`)
}
