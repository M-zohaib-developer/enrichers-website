import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "pages_blocks_agriculture_feature" ("_order" integer NOT NULL, "_parent_id" integer NOT NULL, "_path" text NOT NULL, "id" varchar PRIMARY KEY NOT NULL, "section_id" varchar, "eyebrow" varchar, "heading" varchar NOT NULL, "image_id" integer NOT NULL, "image_alt" varchar, "image_position" varchar DEFAULT 'right', "body" jsonb NOT NULL, "block_name" varchar);
    ALTER TABLE "pages_blocks_agriculture_feature" ADD CONSTRAINT "pages_blocks_agriculture_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "pages_blocks_agriculture_feature_order_idx" ON "pages_blocks_agriculture_feature" USING btree ("_order");
    CREATE INDEX "pages_blocks_agriculture_feature_parent_id_idx" ON "pages_blocks_agriculture_feature" USING btree ("_parent_id");
    CREATE INDEX "pages_blocks_agriculture_feature_path_idx" ON "pages_blocks_agriculture_feature" USING btree ("_path");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE "pages_blocks_agriculture_feature";`)
}
