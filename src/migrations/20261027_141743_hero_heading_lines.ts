import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "heading_line_one" varchar DEFAULT 'Trade Pakistan''s';
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "heading_line_two" varchar DEFAULT 'markets with a licensed';
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "heading_line_three" varchar DEFAULT 'broker beside you.';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "heading_line_one";
  ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "heading_line_two";
  ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "heading_line_three";`)
}
