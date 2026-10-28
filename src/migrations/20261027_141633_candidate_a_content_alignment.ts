import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "heading_accent" varchar DEFAULT 'with a licensed broker beside you.';
  ALTER TABLE "pages_blocks_licensing_credentials_items" ADD COLUMN "link_label" varchar DEFAULT 'View documents';
  ALTER TABLE "pages_blocks_account_opening_steps" ADD COLUMN "secondary_button_label" varchar;
  ALTER TABLE "pages_blocks_account_opening_steps" ADD COLUMN "secondary_button_url" varchar;
  ALTER TABLE "pages_blocks_consultation_qualifier" ADD COLUMN "hours" varchar DEFAULT 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed';
  ALTER TABLE "pages_blocks_market_research_cards" ADD COLUMN "button_label" varchar;
  ALTER TABLE "pages_blocks_market_research_cards" ADD COLUMN "button_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "heading_accent";
  ALTER TABLE "pages_blocks_licensing_credentials_items" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_account_opening_steps" DROP COLUMN "secondary_button_label";
  ALTER TABLE "pages_blocks_account_opening_steps" DROP COLUMN "secondary_button_url";
  ALTER TABLE "pages_blocks_consultation_qualifier" DROP COLUMN "hours";
  ALTER TABLE "pages_blocks_market_research_cards" DROP COLUMN "button_label";
  ALTER TABLE "pages_blocks_market_research_cards" DROP COLUMN "button_url";`)
}
