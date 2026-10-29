import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_research_library_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"image_id" integer,
  	"file_id" integer,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_research_library_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_research_library" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'notes',
  	"eyebrow" varchar DEFAULT 'Research library',
  	"heading" varchar DEFAULT 'All research notes',
  	"article_heading" varchar DEFAULT 'Articles',
  	"article_link_label" varchar DEFAULT 'All articles',
  	"article_link_url" varchar DEFAULT '/blogs/',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_research_library_notes" ADD CONSTRAINT "pages_blocks_research_library_notes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_library_notes" ADD CONSTRAINT "pages_blocks_research_library_notes_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_library_notes" ADD CONSTRAINT "pages_blocks_research_library_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_research_library"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_library_articles" ADD CONSTRAINT "pages_blocks_research_library_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_research_library"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_library" ADD CONSTRAINT "pages_blocks_research_library_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_research_library_notes_order_idx" ON "pages_blocks_research_library_notes" USING btree ("_order");
  CREATE INDEX "pages_blocks_research_library_notes_parent_id_idx" ON "pages_blocks_research_library_notes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_research_library_notes_image_idx" ON "pages_blocks_research_library_notes" USING btree ("image_id");
  CREATE INDEX "pages_blocks_research_library_notes_file_idx" ON "pages_blocks_research_library_notes" USING btree ("file_id");
  CREATE INDEX "pages_blocks_research_library_articles_order_idx" ON "pages_blocks_research_library_articles" USING btree ("_order");
  CREATE INDEX "pages_blocks_research_library_articles_parent_id_idx" ON "pages_blocks_research_library_articles" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_research_library_order_idx" ON "pages_blocks_research_library" USING btree ("_order");
  CREATE INDEX "pages_blocks_research_library_parent_id_idx" ON "pages_blocks_research_library" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_research_library_path_idx" ON "pages_blocks_research_library" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_research_library_notes" CASCADE;
  DROP TABLE "pages_blocks_research_library_articles" CASCADE;
  DROP TABLE "pages_blocks_research_library" CASCADE;`)
}
