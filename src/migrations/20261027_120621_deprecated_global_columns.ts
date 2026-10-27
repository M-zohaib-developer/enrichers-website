import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ADD COLUMN "trade_invest_label" varchar;
  ALTER TABLE "header" ADD COLUMN "trade_invest_promo_card_enabled" boolean;
  ALTER TABLE "header" ADD COLUMN "trade_invest_promo_card_title" varchar;
  ALTER TABLE "header" ADD COLUMN "trade_invest_promo_card_description" varchar;
  ALTER TABLE "header" ADD COLUMN "trade_invest_promo_card_link_label" varchar;
  ALTER TABLE "header" ADD COLUMN "trade_invest_promo_card_link_url" varchar;
  ALTER TABLE "header" ADD COLUMN "trade_invest_promo_card_link_new_tab" boolean;
  ALTER TABLE "header" ADD COLUMN "the_group_label" varchar;
  ALTER TABLE "header" ADD COLUMN "about_label" varchar;
  ALTER TABLE "footer" ADD COLUMN "entity_names" varchar;
  ALTER TABLE "footer" ADD COLUMN "disclaimer" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" DROP COLUMN "trade_invest_label";
  ALTER TABLE "header" DROP COLUMN "trade_invest_promo_card_enabled";
  ALTER TABLE "header" DROP COLUMN "trade_invest_promo_card_title";
  ALTER TABLE "header" DROP COLUMN "trade_invest_promo_card_description";
  ALTER TABLE "header" DROP COLUMN "trade_invest_promo_card_link_label";
  ALTER TABLE "header" DROP COLUMN "trade_invest_promo_card_link_url";
  ALTER TABLE "header" DROP COLUMN "trade_invest_promo_card_link_new_tab";
  ALTER TABLE "header" DROP COLUMN "the_group_label";
  ALTER TABLE "header" DROP COLUMN "about_label";
  ALTER TABLE "footer" DROP COLUMN "entity_names";
  ALTER TABLE "footer" DROP COLUMN "disclaimer";`)
}
