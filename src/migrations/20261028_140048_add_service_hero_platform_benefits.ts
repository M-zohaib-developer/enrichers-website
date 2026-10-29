import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_service_hero_hero_benefits_icon" AS ENUM('fast', 'secure', 'devices', 'markets');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_hero_variant" AS ENUM('standard', 'platform');
  CREATE TYPE "public"."enum_pages_blocks_image_text_feature_image_position" AS ENUM('right', 'left');
  CREATE TABLE "pages_blocks_service_hero_hero_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_service_hero_hero_benefits_icon" DEFAULT 'fast',
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_focus_areas_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_focus_areas_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Key Focus Areas' NOT NULL,
  	"body" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_service_hero" ADD COLUMN "hero_variant" "enum_pages_blocks_service_hero_hero_variant" DEFAULT 'standard';
  ALTER TABLE "pages_blocks_service_hero" ADD COLUMN "heading_accent" varchar;
  ALTER TABLE "pages_blocks_image_text_feature" ADD COLUMN "image_position" "enum_pages_blocks_image_text_feature_image_position" DEFAULT 'right';
  ALTER TABLE "pages_blocks_service_hero_hero_benefits" ADD CONSTRAINT "pages_blocks_service_hero_hero_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ADD CONSTRAINT "pages_blocks_focus_areas_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ADD CONSTRAINT "pages_blocks_focus_areas_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_focus_areas_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_focus_areas_grid" ADD CONSTRAINT "pages_blocks_focus_areas_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_service_hero_hero_benefits_order_idx" ON "pages_blocks_service_hero_hero_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_hero_benefits_parent_id_idx" ON "pages_blocks_service_hero_hero_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_focus_areas_grid_items_order_idx" ON "pages_blocks_focus_areas_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_focus_areas_grid_items_parent_id_idx" ON "pages_blocks_focus_areas_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_focus_areas_grid_items_image_idx" ON "pages_blocks_focus_areas_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_focus_areas_grid_order_idx" ON "pages_blocks_focus_areas_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_focus_areas_grid_parent_id_idx" ON "pages_blocks_focus_areas_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_focus_areas_grid_path_idx" ON "pages_blocks_focus_areas_grid" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_service_hero_hero_benefits" CASCADE;
  DROP TABLE "pages_blocks_focus_areas_grid_items" CASCADE;
  DROP TABLE "pages_blocks_focus_areas_grid" CASCADE;
  ALTER TABLE "pages_blocks_service_hero" DROP COLUMN "hero_variant";
  ALTER TABLE "pages_blocks_service_hero" DROP COLUMN "heading_accent";
  ALTER TABLE "pages_blocks_image_text_feature" DROP COLUMN "image_position";
  DROP TYPE "public"."enum_pages_blocks_service_hero_hero_benefits_icon";
  DROP TYPE "public"."enum_pages_blocks_service_hero_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_image_text_feature_image_position";`)
}
