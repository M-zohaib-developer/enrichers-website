import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_text_feature_background" AS ENUM('surface', 'sunken');
  CREATE TYPE "public"."enum_pages_blocks_stats_band_background" AS ENUM('inverse', 'surface', 'sunken');
  CREATE TABLE "pages_blocks_stats_band_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"background" "enum_pages_blocks_stats_band_background" DEFAULT 'inverse',
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid_leaders" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"bio" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_team_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Meet the team' NOT NULL,
  	"body" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "header" ALTER COLUMN "consultation_link_link_url" DROP NOT NULL;
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_url" DROP NOT NULL;
  ALTER TABLE "footer_trade_invest_links" ALTER COLUMN "link_url" DROP NOT NULL;
  ALTER TABLE "footer_the_group_links" ALTER COLUMN "link_url" DROP NOT NULL;
  ALTER TABLE "footer_insights_learning_links" ALTER COLUMN "link_url" DROP NOT NULL;
  ALTER TABLE "footer_company_links" ALTER COLUMN "link_url" DROP NOT NULL;
  ALTER TABLE "footer_regulation_links" ALTER COLUMN "link_url" DROP NOT NULL;
  ALTER TABLE "footer_bottom_links" ALTER COLUMN "link_url" DROP NOT NULL;
  ALTER TABLE "pages_blocks_licensing_credentials_items" ADD COLUMN "file_id" integer;
  ALTER TABLE "pages_blocks_image_text_feature" ADD COLUMN "section_id" varchar;
  ALTER TABLE "pages_blocks_image_text_feature" ADD COLUMN "attribution_name" varchar;
  ALTER TABLE "pages_blocks_image_text_feature" ADD COLUMN "attribution_role" varchar;
  ALTER TABLE "pages_blocks_image_text_feature" ADD COLUMN "portrait" boolean DEFAULT false;
  ALTER TABLE "pages_blocks_image_text_feature" ADD COLUMN "background" "enum_pages_blocks_image_text_feature_background" DEFAULT 'surface';
  ALTER TABLE "header" ADD COLUMN "consultation_link_link_file_id" integer;
  ALTER TABLE "header" ADD COLUMN "cta_button_link_file_id" integer;
  ALTER TABLE "footer_trade_invest_links" ADD COLUMN "link_file_id" integer;
  ALTER TABLE "footer_the_group_links" ADD COLUMN "link_file_id" integer;
  ALTER TABLE "footer_insights_learning_links" ADD COLUMN "link_file_id" integer;
  ALTER TABLE "footer_company_links" ADD COLUMN "link_file_id" integer;
  ALTER TABLE "footer_regulation_links" ADD COLUMN "link_file_id" integer;
  ALTER TABLE "footer_bottom_links" ADD COLUMN "link_file_id" integer;
  ALTER TABLE "pages_blocks_stats_band_stats" ADD CONSTRAINT "pages_blocks_stats_band_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_band" ADD CONSTRAINT "pages_blocks_stats_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_leaders" ADD CONSTRAINT "pages_blocks_team_grid_leaders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_leaders" ADD CONSTRAINT "pages_blocks_team_grid_leaders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_members" ADD CONSTRAINT "pages_blocks_team_grid_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_members" ADD CONSTRAINT "pages_blocks_team_grid_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid" ADD CONSTRAINT "pages_blocks_team_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_stats_band_stats_order_idx" ON "pages_blocks_stats_band_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_band_stats_parent_id_idx" ON "pages_blocks_stats_band_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_band_order_idx" ON "pages_blocks_stats_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_band_parent_id_idx" ON "pages_blocks_stats_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_band_path_idx" ON "pages_blocks_stats_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_grid_leaders_order_idx" ON "pages_blocks_team_grid_leaders" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_leaders_parent_id_idx" ON "pages_blocks_team_grid_leaders" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_leaders_photo_idx" ON "pages_blocks_team_grid_leaders" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_grid_members_order_idx" ON "pages_blocks_team_grid_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_members_parent_id_idx" ON "pages_blocks_team_grid_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_members_photo_idx" ON "pages_blocks_team_grid_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_grid_order_idx" ON "pages_blocks_team_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_parent_id_idx" ON "pages_blocks_team_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_path_idx" ON "pages_blocks_team_grid" USING btree ("_path");
  ALTER TABLE "pages_blocks_licensing_credentials_items" ADD CONSTRAINT "pages_blocks_licensing_credentials_items_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_consultation_link_link_file_id_media_id_fk" FOREIGN KEY ("consultation_link_link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_button_link_file_id_media_id_fk" FOREIGN KEY ("cta_button_link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_trade_invest_links" ADD CONSTRAINT "footer_trade_invest_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_the_group_links" ADD CONSTRAINT "footer_the_group_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_insights_learning_links" ADD CONSTRAINT "footer_insights_learning_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_company_links" ADD CONSTRAINT "footer_company_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_regulation_links" ADD CONSTRAINT "footer_regulation_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_licensing_credentials_items_file_idx" ON "pages_blocks_licensing_credentials_items" USING btree ("file_id");
  CREATE INDEX "header_consultation_link_link_consultation_link_link_fil_idx" ON "header" USING btree ("consultation_link_link_file_id");
  CREATE INDEX "header_cta_button_link_cta_button_link_file_idx" ON "header" USING btree ("cta_button_link_file_id");
  CREATE INDEX "footer_trade_invest_links_link_link_file_idx" ON "footer_trade_invest_links" USING btree ("link_file_id");
  CREATE INDEX "footer_the_group_links_link_link_file_idx" ON "footer_the_group_links" USING btree ("link_file_id");
  CREATE INDEX "footer_insights_learning_links_link_link_file_idx" ON "footer_insights_learning_links" USING btree ("link_file_id");
  CREATE INDEX "footer_company_links_link_link_file_idx" ON "footer_company_links" USING btree ("link_file_id");
  CREATE INDEX "footer_regulation_links_link_link_file_idx" ON "footer_regulation_links" USING btree ("link_file_id");
  CREATE INDEX "footer_bottom_links_link_link_file_idx" ON "footer_bottom_links" USING btree ("link_file_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_stats_band_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid_leaders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_team_grid" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_stats_band_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_band" CASCADE;
  DROP TABLE "pages_blocks_team_grid_leaders" CASCADE;
  DROP TABLE "pages_blocks_team_grid_members" CASCADE;
  DROP TABLE "pages_blocks_team_grid" CASCADE;
  ALTER TABLE "pages_blocks_licensing_credentials_items" DROP CONSTRAINT "pages_blocks_licensing_credentials_items_file_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_consultation_link_link_file_id_media_id_fk";
  
  ALTER TABLE "header" DROP CONSTRAINT "header_cta_button_link_file_id_media_id_fk";
  
  ALTER TABLE "footer_trade_invest_links" DROP CONSTRAINT "footer_trade_invest_links_link_file_id_media_id_fk";
  
  ALTER TABLE "footer_the_group_links" DROP CONSTRAINT "footer_the_group_links_link_file_id_media_id_fk";
  
  ALTER TABLE "footer_insights_learning_links" DROP CONSTRAINT "footer_insights_learning_links_link_file_id_media_id_fk";
  
  ALTER TABLE "footer_company_links" DROP CONSTRAINT "footer_company_links_link_file_id_media_id_fk";
  
  ALTER TABLE "footer_regulation_links" DROP CONSTRAINT "footer_regulation_links_link_file_id_media_id_fk";
  
  ALTER TABLE "footer_bottom_links" DROP CONSTRAINT "footer_bottom_links_link_file_id_media_id_fk";
  
  DROP INDEX "pages_blocks_licensing_credentials_items_file_idx";
  DROP INDEX "header_consultation_link_link_consultation_link_link_fil_idx";
  DROP INDEX "header_cta_button_link_cta_button_link_file_idx";
  DROP INDEX "footer_trade_invest_links_link_link_file_idx";
  DROP INDEX "footer_the_group_links_link_link_file_idx";
  DROP INDEX "footer_insights_learning_links_link_link_file_idx";
  DROP INDEX "footer_company_links_link_link_file_idx";
  DROP INDEX "footer_regulation_links_link_link_file_idx";
  DROP INDEX "footer_bottom_links_link_link_file_idx";
  ALTER TABLE "header" ALTER COLUMN "consultation_link_link_url" SET NOT NULL;
  ALTER TABLE "header" ALTER COLUMN "cta_button_link_url" SET NOT NULL;
  ALTER TABLE "footer_trade_invest_links" ALTER COLUMN "link_url" SET NOT NULL;
  ALTER TABLE "footer_the_group_links" ALTER COLUMN "link_url" SET NOT NULL;
  ALTER TABLE "footer_insights_learning_links" ALTER COLUMN "link_url" SET NOT NULL;
  ALTER TABLE "footer_company_links" ALTER COLUMN "link_url" SET NOT NULL;
  ALTER TABLE "footer_regulation_links" ALTER COLUMN "link_url" SET NOT NULL;
  ALTER TABLE "footer_bottom_links" ALTER COLUMN "link_url" SET NOT NULL;
  ALTER TABLE "pages_blocks_licensing_credentials_items" DROP COLUMN "file_id";
  ALTER TABLE "pages_blocks_image_text_feature" DROP COLUMN "section_id";
  ALTER TABLE "pages_blocks_image_text_feature" DROP COLUMN "attribution_name";
  ALTER TABLE "pages_blocks_image_text_feature" DROP COLUMN "attribution_role";
  ALTER TABLE "pages_blocks_image_text_feature" DROP COLUMN "portrait";
  ALTER TABLE "pages_blocks_image_text_feature" DROP COLUMN "background";
  ALTER TABLE "header" DROP COLUMN "consultation_link_link_file_id";
  ALTER TABLE "header" DROP COLUMN "cta_button_link_file_id";
  ALTER TABLE "footer_trade_invest_links" DROP COLUMN "link_file_id";
  ALTER TABLE "footer_the_group_links" DROP COLUMN "link_file_id";
  ALTER TABLE "footer_insights_learning_links" DROP COLUMN "link_file_id";
  ALTER TABLE "footer_company_links" DROP COLUMN "link_file_id";
  ALTER TABLE "footer_regulation_links" DROP COLUMN "link_file_id";
  ALTER TABLE "footer_bottom_links" DROP COLUMN "link_file_id";
  DROP TYPE "public"."enum_pages_blocks_image_text_feature_background";
  DROP TYPE "public"."enum_pages_blocks_stats_band_background";`)
}
