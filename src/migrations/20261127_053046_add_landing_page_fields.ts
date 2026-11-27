import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_business_group_cards_items_icon" ADD VALUE 'research' BEFORE 'hospitality';
  ALTER TYPE "public"."enum__pages_v_blocks_business_group_cards_items_icon" ADD VALUE 'research' BEFORE 'hospitality';
  CREATE TABLE "pages_blocks_article_detail_related" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"summary" varchar,
  	"category" varchar,
  	"published" varchar
  );
  
  CREATE TABLE "pages_blocks_article_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"category" varchar DEFAULT 'Trading',
  	"summary" varchar,
  	"published" varchar,
  	"author" varchar DEFAULT 'Enrichers',
  	"topic" varchar DEFAULT 'Trading',
  	"reading_time" varchar DEFAULT '4 min',
  	"featured_image_id" integer,
  	"body" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_article_detail_related" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"summary" varchar,
  	"category" varchar,
  	"published" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_article_detail" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"category" varchar DEFAULT 'Trading',
  	"summary" varchar,
  	"published" varchar,
  	"author" varchar DEFAULT 'Enrichers',
  	"topic" varchar DEFAULT 'Trading',
  	"reading_time" varchar DEFAULT '4 min',
  	"featured_image_id" integer,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "blog_articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"whatsapp_enabled" boolean DEFAULT true,
  	"whatsapp_url" varchar DEFAULT 'https://api.whatsapp.com/send?phone=9242111111333',
  	"whatsapp_tooltip" varchar DEFAULT 'Chat with us on WhatsApp',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_consultation_qualifier" ADD COLUMN "email" varchar DEFAULT 'connect@enrichers.com.pk';
  ALTER TABLE "pages_blocks_consultation_qualifier" ADD COLUMN "email_href" varchar DEFAULT 'mailto:connect@enrichers.com.pk';
  ALTER TABLE "pages_blocks_consultation_qualifier" ADD COLUMN "address" varchar;
  ALTER TABLE "pages_blocks_market_research_cards" ADD COLUMN "subheading" varchar;
  ALTER TABLE "pages_blocks_group_business_explorer_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "pages_blocks_skardu_hotel_feature" ADD COLUMN "status" varchar DEFAULT 'Design Stage';
  ALTER TABLE "_pages_v_blocks_consultation_qualifier" ADD COLUMN "email" varchar DEFAULT 'connect@enrichers.com.pk';
  ALTER TABLE "_pages_v_blocks_consultation_qualifier" ADD COLUMN "email_href" varchar DEFAULT 'mailto:connect@enrichers.com.pk';
  ALTER TABLE "_pages_v_blocks_consultation_qualifier" ADD COLUMN "address" varchar;
  ALTER TABLE "_pages_v_blocks_market_research_cards" ADD COLUMN "subheading" varchar;
  ALTER TABLE "_pages_v_blocks_group_business_explorer_items" ADD COLUMN "image_id" integer;
  ALTER TABLE "_pages_v_blocks_skardu_hotel_feature" ADD COLUMN "status" varchar DEFAULT 'Design Stage';
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_square_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_square_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_square_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_square_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_square_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_square_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_small_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_small_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_small_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_small_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_small_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_small_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_medium_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_large_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_large_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_xlarge_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_og_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_og_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_og_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_og_filename" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_articles_id" integer;
  ALTER TABLE "pages_blocks_article_detail_related" ADD CONSTRAINT "pages_blocks_article_detail_related_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_article_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_detail" ADD CONSTRAINT "pages_blocks_article_detail_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_detail" ADD CONSTRAINT "pages_blocks_article_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_detail_related" ADD CONSTRAINT "_pages_v_blocks_article_detail_related_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_article_detail"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_detail" ADD CONSTRAINT "_pages_v_blocks_article_detail_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_detail" ADD CONSTRAINT "_pages_v_blocks_article_detail_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_article_detail_related_order_idx" ON "pages_blocks_article_detail_related" USING btree ("_order");
  CREATE INDEX "pages_blocks_article_detail_related_parent_id_idx" ON "pages_blocks_article_detail_related" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_article_detail_order_idx" ON "pages_blocks_article_detail" USING btree ("_order");
  CREATE INDEX "pages_blocks_article_detail_parent_id_idx" ON "pages_blocks_article_detail" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_article_detail_path_idx" ON "pages_blocks_article_detail" USING btree ("_path");
  CREATE INDEX "pages_blocks_article_detail_featured_image_idx" ON "pages_blocks_article_detail" USING btree ("featured_image_id");
  CREATE INDEX "_pages_v_blocks_article_detail_related_order_idx" ON "_pages_v_blocks_article_detail_related" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_article_detail_related_parent_id_idx" ON "_pages_v_blocks_article_detail_related" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_article_detail_order_idx" ON "_pages_v_blocks_article_detail" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_article_detail_parent_id_idx" ON "_pages_v_blocks_article_detail" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_article_detail_path_idx" ON "_pages_v_blocks_article_detail" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_article_detail_featured_image_idx" ON "_pages_v_blocks_article_detail" USING btree ("featured_image_id");
  CREATE INDEX "blog_articles_updated_at_idx" ON "blog_articles" USING btree ("updated_at");
  CREATE INDEX "blog_articles_created_at_idx" ON "blog_articles" USING btree ("created_at");
  ALTER TABLE "pages_blocks_group_business_explorer_items" ADD CONSTRAINT "pages_blocks_group_business_explorer_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group_business_explorer_items" ADD CONSTRAINT "_pages_v_blocks_group_business_explorer_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_articles_fk" FOREIGN KEY ("blog_articles_id") REFERENCES "public"."blog_articles"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_group_business_explorer_items_image_idx" ON "pages_blocks_group_business_explorer_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_group_business_explorer_items_image_idx" ON "_pages_v_blocks_group_business_explorer_items" USING btree ("image_id");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "payload_locked_documents_rels_blog_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_articles_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_article_detail_related" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_article_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_article_detail_related" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_article_detail" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_article_detail_related" CASCADE;
  DROP TABLE "pages_blocks_article_detail" CASCADE;
  DROP TABLE "_pages_v_blocks_article_detail_related" CASCADE;
  DROP TABLE "_pages_v_blocks_article_detail" CASCADE;
  DROP TABLE "blog_articles" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  ALTER TABLE "pages_blocks_group_business_explorer_items" DROP CONSTRAINT "pages_blocks_group_business_explorer_items_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_group_business_explorer_items" DROP CONSTRAINT "_pages_v_blocks_group_business_explorer_items_image_id_media_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_articles_fk";
  
  ALTER TABLE "pages_blocks_business_group_cards_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_business_group_cards_items" ALTER COLUMN "icon" SET DEFAULT 'document'::text;
  DROP TYPE "public"."enum_pages_blocks_business_group_cards_items_icon";
  CREATE TYPE "public"."enum_pages_blocks_business_group_cards_items_icon" AS ENUM('document', 'development', 'agriculture', 'hospitality');
  ALTER TABLE "pages_blocks_business_group_cards_items" ALTER COLUMN "icon" SET DEFAULT 'document'::"public"."enum_pages_blocks_business_group_cards_items_icon";
  ALTER TABLE "pages_blocks_business_group_cards_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum_pages_blocks_business_group_cards_items_icon" USING "icon"::"public"."enum_pages_blocks_business_group_cards_items_icon";
  ALTER TABLE "_pages_v_blocks_business_group_cards_items" ALTER COLUMN "icon" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_business_group_cards_items" ALTER COLUMN "icon" SET DEFAULT 'document'::text;
  DROP TYPE "public"."enum__pages_v_blocks_business_group_cards_items_icon";
  CREATE TYPE "public"."enum__pages_v_blocks_business_group_cards_items_icon" AS ENUM('document', 'development', 'agriculture', 'hospitality');
  ALTER TABLE "_pages_v_blocks_business_group_cards_items" ALTER COLUMN "icon" SET DEFAULT 'document'::"public"."enum__pages_v_blocks_business_group_cards_items_icon";
  ALTER TABLE "_pages_v_blocks_business_group_cards_items" ALTER COLUMN "icon" SET DATA TYPE "public"."enum__pages_v_blocks_business_group_cards_items_icon" USING "icon"::"public"."enum__pages_v_blocks_business_group_cards_items_icon";
  DROP INDEX "pages_blocks_group_business_explorer_items_image_idx";
  DROP INDEX "_pages_v_blocks_group_business_explorer_items_image_idx";
  DROP INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX "media_sizes_square_sizes_square_filename_idx";
  DROP INDEX "media_sizes_small_sizes_small_filename_idx";
  DROP INDEX "media_sizes_medium_sizes_medium_filename_idx";
  DROP INDEX "media_sizes_large_sizes_large_filename_idx";
  DROP INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx";
  DROP INDEX "media_sizes_og_sizes_og_filename_idx";
  DROP INDEX "payload_locked_documents_rels_blog_articles_id_idx";
  ALTER TABLE "pages_blocks_consultation_qualifier" DROP COLUMN "email";
  ALTER TABLE "pages_blocks_consultation_qualifier" DROP COLUMN "email_href";
  ALTER TABLE "pages_blocks_consultation_qualifier" DROP COLUMN "address";
  ALTER TABLE "pages_blocks_market_research_cards" DROP COLUMN "subheading";
  ALTER TABLE "pages_blocks_group_business_explorer_items" DROP COLUMN "image_id";
  ALTER TABLE "pages_blocks_skardu_hotel_feature" DROP COLUMN "status";
  ALTER TABLE "_pages_v_blocks_consultation_qualifier" DROP COLUMN "email";
  ALTER TABLE "_pages_v_blocks_consultation_qualifier" DROP COLUMN "email_href";
  ALTER TABLE "_pages_v_blocks_consultation_qualifier" DROP COLUMN "address";
  ALTER TABLE "_pages_v_blocks_market_research_cards" DROP COLUMN "subheading";
  ALTER TABLE "_pages_v_blocks_group_business_explorer_items" DROP COLUMN "image_id";
  ALTER TABLE "_pages_v_blocks_skardu_hotel_feature" DROP COLUMN "status";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_square_url";
  ALTER TABLE "media" DROP COLUMN "sizes_square_width";
  ALTER TABLE "media" DROP COLUMN "sizes_square_height";
  ALTER TABLE "media" DROP COLUMN "sizes_square_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_square_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_square_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_small_url";
  ALTER TABLE "media" DROP COLUMN "sizes_small_width";
  ALTER TABLE "media" DROP COLUMN "sizes_small_height";
  ALTER TABLE "media" DROP COLUMN "sizes_small_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_small_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_small_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_url";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_width";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_height";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_medium_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_large_url";
  ALTER TABLE "media" DROP COLUMN "sizes_large_width";
  ALTER TABLE "media" DROP COLUMN "sizes_large_height";
  ALTER TABLE "media" DROP COLUMN "sizes_large_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_large_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_large_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_url";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_width";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_height";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_xlarge_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_og_url";
  ALTER TABLE "media" DROP COLUMN "sizes_og_width";
  ALTER TABLE "media" DROP COLUMN "sizes_og_height";
  ALTER TABLE "media" DROP COLUMN "sizes_og_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_og_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_og_filename";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_articles_id";`)
}
