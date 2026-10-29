import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'linkedin', 'instagram', 'threads', 'youtube');
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "footer" ALTER COLUMN "email" SET DEFAULT 'connect@enrichers.com.pk';
  ALTER TABLE "pages_blocks_licensing_credentials" ADD COLUMN "section_id" varchar;
  ALTER TABLE "pages_blocks_licensing_credentials" ADD COLUMN "heading" varchar;
  ALTER TABLE "pages_blocks_licensing_credentials" ADD COLUMN "body" varchar;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "footer_social_links" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "footer_social_links" CASCADE;
  ALTER TABLE "footer" ALTER COLUMN "email" SET DEFAULT 'info@enrichers.com.pk';
  ALTER TABLE "pages_blocks_licensing_credentials" DROP COLUMN "section_id";
  ALTER TABLE "pages_blocks_licensing_credentials" DROP COLUMN "heading";
  ALTER TABLE "pages_blocks_licensing_credentials" DROP COLUMN "body";
  DROP TYPE "public"."enum_footer_social_links_platform";`)
}
