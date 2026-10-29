import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_destination_location_showcase_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_destination_location_showcase_attractions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"title" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_destination_location_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'A location defined by nature' NOT NULL,
  	"body" varchar NOT NULL,
  	"supporting_text" varchar,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"attractions_intro" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_destination_location_showcase_facts" ADD CONSTRAINT "pages_blocks_destination_location_showcase_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_destination_location_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_location_showcase_attractions" ADD CONSTRAINT "pages_blocks_destination_location_showcase_attractions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_location_showcase_attractions" ADD CONSTRAINT "pages_blocks_destination_location_showcase_attractions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_destination_location_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_location_showcase" ADD CONSTRAINT "pages_blocks_destination_location_showcase_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_location_showcase" ADD CONSTRAINT "pages_blocks_destination_location_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_destination_location_showcase_facts_order_idx" ON "pages_blocks_destination_location_showcase_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_destination_location_showcase_facts_parent_id_idx" ON "pages_blocks_destination_location_showcase_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destination_location_showcase_attractions_order_idx" ON "pages_blocks_destination_location_showcase_attractions" USING btree ("_order");
  CREATE INDEX "pages_blocks_destination_location_showcase_attractions_parent_id_idx" ON "pages_blocks_destination_location_showcase_attractions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destination_location_showcase_attractions_i_idx" ON "pages_blocks_destination_location_showcase_attractions" USING btree ("image_id");
  CREATE INDEX "pages_blocks_destination_location_showcase_order_idx" ON "pages_blocks_destination_location_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_destination_location_showcase_parent_id_idx" ON "pages_blocks_destination_location_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destination_location_showcase_path_idx" ON "pages_blocks_destination_location_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_destination_location_showcase_image_idx" ON "pages_blocks_destination_location_showcase" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_destination_location_showcase_facts" CASCADE;
  DROP TABLE "pages_blocks_destination_location_showcase_attractions" CASCADE;
  DROP TABLE "pages_blocks_destination_location_showcase" CASCADE;`)
}
