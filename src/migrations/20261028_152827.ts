import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_immersive_media_gallery_interval" AS ENUM('4000', '5000', '6000');
  CREATE TABLE "pages_blocks_immersive_media_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_immersive_media_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"autoplay" boolean DEFAULT true,
  	"interval" "enum_pages_blocks_immersive_media_gallery_interval" DEFAULT '5000',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_immersive_media_gallery_items" ADD CONSTRAINT "pages_blocks_immersive_media_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_immersive_media_gallery_items" ADD CONSTRAINT "pages_blocks_immersive_media_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_immersive_media_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_immersive_media_gallery" ADD CONSTRAINT "pages_blocks_immersive_media_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_immersive_media_gallery_items_order_idx" ON "pages_blocks_immersive_media_gallery_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_immersive_media_gallery_items_parent_id_idx" ON "pages_blocks_immersive_media_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_immersive_media_gallery_items_image_idx" ON "pages_blocks_immersive_media_gallery_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_immersive_media_gallery_order_idx" ON "pages_blocks_immersive_media_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_immersive_media_gallery_parent_id_idx" ON "pages_blocks_immersive_media_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_immersive_media_gallery_path_idx" ON "pages_blocks_immersive_media_gallery" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_immersive_media_gallery_items" CASCADE;
  DROP TABLE "pages_blocks_immersive_media_gallery" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_immersive_media_gallery_interval";`)
}
