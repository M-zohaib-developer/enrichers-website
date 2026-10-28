import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_primary_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_secondary_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_primary_button" ADD CONSTRAINT "pages_blocks_primary_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_secondary_button" ADD CONSTRAINT "pages_blocks_secondary_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_primary_button_order_idx" ON "pages_blocks_primary_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_primary_button_parent_id_idx" ON "pages_blocks_primary_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_primary_button_path_idx" ON "pages_blocks_primary_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_secondary_button_order_idx" ON "pages_blocks_secondary_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_secondary_button_parent_id_idx" ON "pages_blocks_secondary_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_secondary_button_path_idx" ON "pages_blocks_secondary_button" USING btree ("_path");
  ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "primary_label";
  ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "primary_url";
  ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "primary_variant";
  ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "secondary_label";
  ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "secondary_url";
  ALTER TABLE "pages_blocks_market_hero" DROP COLUMN "secondary_variant";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "primary_button_label";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "primary_button_url";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "primary_button_variant";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "secondary_button_label";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "secondary_button_url";
  ALTER TABLE "pages_blocks_client_services" DROP COLUMN "secondary_button_variant";
  ALTER TABLE "pages_blocks_account_opening_steps" DROP COLUMN "button_label";
  ALTER TABLE "pages_blocks_account_opening_steps" DROP COLUMN "button_url";
  ALTER TABLE "pages_blocks_account_opening_steps" DROP COLUMN "secondary_button_label";
  ALTER TABLE "pages_blocks_account_opening_steps" DROP COLUMN "secondary_button_url";
  ALTER TABLE "pages_blocks_market_research_cards" DROP COLUMN "button_label";
  ALTER TABLE "pages_blocks_market_research_cards" DROP COLUMN "button_url";
  ALTER TABLE "pages_blocks_group_business_explorer" DROP COLUMN "item_button_label";
  ALTER TABLE "pages_blocks_group_business_explorer" DROP COLUMN "item_secondary_button_label";
  ALTER TABLE "pages_blocks_group_business_explorer" DROP COLUMN "item_secondary_button_url";
  ALTER TABLE "pages_blocks_skardu_hotel_feature" DROP COLUMN "button_label";
  ALTER TABLE "pages_blocks_skardu_hotel_feature" DROP COLUMN "button_url";
  ALTER TABLE "pages_blocks_ready_when_you_are" DROP COLUMN "open_account_label";
  ALTER TABLE "pages_blocks_ready_when_you_are" DROP COLUMN "open_account_url";
  ALTER TABLE "pages_blocks_ready_when_you_are" DROP COLUMN "contact_label";
  ALTER TABLE "pages_blocks_ready_when_you_are" DROP COLUMN "contact_url";
  DROP TYPE "public"."enum_pages_blocks_market_hero_primary_variant";
  DROP TYPE "public"."enum_pages_blocks_market_hero_secondary_variant";
  DROP TYPE "public"."enum_pages_blocks_client_services_primary_button_variant";
  DROP TYPE "public"."enum_pages_blocks_client_services_secondary_button_variant";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_market_hero_primary_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_market_hero_secondary_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_client_services_primary_button_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_client_services_secondary_button_variant" AS ENUM('primary', 'secondary');
  DROP TABLE "pages_blocks_primary_button" CASCADE;
  DROP TABLE "pages_blocks_secondary_button" CASCADE;
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "primary_label" varchar;
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "primary_url" varchar;
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "primary_variant" "enum_pages_blocks_market_hero_primary_variant" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "secondary_label" varchar;
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "secondary_url" varchar;
  ALTER TABLE "pages_blocks_market_hero" ADD COLUMN "secondary_variant" "enum_pages_blocks_market_hero_secondary_variant" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "primary_button_label" varchar;
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "primary_button_url" varchar;
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "primary_button_variant" "enum_pages_blocks_client_services_primary_button_variant" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "secondary_button_label" varchar;
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "secondary_button_url" varchar;
  ALTER TABLE "pages_blocks_client_services" ADD COLUMN "secondary_button_variant" "enum_pages_blocks_client_services_secondary_button_variant" DEFAULT 'primary';
  ALTER TABLE "pages_blocks_account_opening_steps" ADD COLUMN "button_label" varchar;
  ALTER TABLE "pages_blocks_account_opening_steps" ADD COLUMN "button_url" varchar;
  ALTER TABLE "pages_blocks_account_opening_steps" ADD COLUMN "secondary_button_label" varchar;
  ALTER TABLE "pages_blocks_account_opening_steps" ADD COLUMN "secondary_button_url" varchar;
  ALTER TABLE "pages_blocks_market_research_cards" ADD COLUMN "button_label" varchar;
  ALTER TABLE "pages_blocks_market_research_cards" ADD COLUMN "button_url" varchar;
  ALTER TABLE "pages_blocks_group_business_explorer" ADD COLUMN "item_button_label" varchar DEFAULT 'Explore business';
  ALTER TABLE "pages_blocks_group_business_explorer" ADD COLUMN "item_secondary_button_label" varchar;
  ALTER TABLE "pages_blocks_group_business_explorer" ADD COLUMN "item_secondary_button_url" varchar;
  ALTER TABLE "pages_blocks_skardu_hotel_feature" ADD COLUMN "button_label" varchar;
  ALTER TABLE "pages_blocks_skardu_hotel_feature" ADD COLUMN "button_url" varchar;
  ALTER TABLE "pages_blocks_ready_when_you_are" ADD COLUMN "open_account_label" varchar;
  ALTER TABLE "pages_blocks_ready_when_you_are" ADD COLUMN "open_account_url" varchar;
  ALTER TABLE "pages_blocks_ready_when_you_are" ADD COLUMN "contact_label" varchar;
  ALTER TABLE "pages_blocks_ready_when_you_are" ADD COLUMN "contact_url" varchar;`)
}
