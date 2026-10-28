import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_investment_path_cards_cards" ADD COLUMN "supporting_label" varchar;
  ALTER TABLE "pages_blocks_investment_path_cards_cards" ADD COLUMN "action_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_investment_path_cards_cards" DROP COLUMN "supporting_label";
  ALTER TABLE "pages_blocks_investment_path_cards_cards" DROP COLUMN "action_label";`)
}
