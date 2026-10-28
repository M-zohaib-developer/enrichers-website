import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_market_hero_primary_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_market_hero_secondary_variant" AS ENUM('primary', 'secondary');
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "primary_variant" "enum_pages_blocks_market_hero_primary_variant" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "secondary_variant" "enum_pages_blocks_market_hero_secondary_variant" DEFAULT 'primary';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "primary_variant";
  ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "secondary_variant";
  DROP TYPE "public"."enum_pages_blocks_market_hero_primary_variant";
  DROP TYPE "public"."enum_pages_blocks_market_hero_secondary_variant";`)
}
