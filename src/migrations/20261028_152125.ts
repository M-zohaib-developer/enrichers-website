import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_video_text_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"video_url" varchar NOT NULL,
  	"thumbnail_id" integer NOT NULL,
  	"thumbnail_alt" varchar,
  	"video_label" varchar DEFAULT 'Watch project video',
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_video_text_feature" ADD CONSTRAINT "pages_blocks_video_text_feature_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_text_feature" ADD CONSTRAINT "pages_blocks_video_text_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_video_text_feature_order_idx" ON "pages_blocks_video_text_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_text_feature_parent_id_idx" ON "pages_blocks_video_text_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_text_feature_path_idx" ON "pages_blocks_video_text_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_text_feature_thumbnail_idx" ON "pages_blocks_video_text_feature" USING btree ("thumbnail_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_video_text_feature" CASCADE;`)
}
