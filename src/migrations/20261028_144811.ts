import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_hospitality_experience_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hospitality_experience_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Designed around the destination experience' NOT NULL,
  	"body" varchar,
  	"closing_line" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_consultation_showcase_images" ADD COLUMN "caption" varchar;
  ALTER TABLE "pages_blocks_consultation_showcase" ADD COLUMN "reassurance" varchar;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ADD CONSTRAINT "pages_blocks_hospitality_experience_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ADD CONSTRAINT "pages_blocks_hospitality_experience_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hospitality_experience_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hospitality_experience_grid" ADD CONSTRAINT "pages_blocks_hospitality_experience_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hospitality_experience_grid_items_order_idx" ON "pages_blocks_hospitality_experience_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_items_parent_id_idx" ON "pages_blocks_hospitality_experience_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_items_image_idx" ON "pages_blocks_hospitality_experience_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_order_idx" ON "pages_blocks_hospitality_experience_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_parent_id_idx" ON "pages_blocks_hospitality_experience_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_path_idx" ON "pages_blocks_hospitality_experience_grid" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_hospitality_experience_grid_items" CASCADE;
  DROP TABLE "pages_blocks_hospitality_experience_grid" CASCADE;
  ALTER TABLE "pages_blocks_consultation_showcase_images" DROP COLUMN "caption";
  ALTER TABLE "pages_blocks_consultation_showcase" DROP COLUMN "reassurance";`)
}
