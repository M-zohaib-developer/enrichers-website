import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "smtp_enabled" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "notifications_to" varchar DEFAULT 'connect@enrichers.com.pk';
  ALTER TABLE "site_settings" ADD COLUMN "from_name" varchar DEFAULT 'Enrichers Investment Group';
  ALTER TABLE "site_settings" ADD COLUMN "from_address" varchar DEFAULT 'connect@enrichers.com.pk';
  ALTER TABLE "site_settings" ADD COLUMN "smtp_host" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "smtp_port" numeric DEFAULT 587;
  ALTER TABLE "site_settings" ADD COLUMN "smtp_secure" boolean DEFAULT false;
  ALTER TABLE "site_settings" ADD COLUMN "smtp_user" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "smtp_pass" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "smtp_enabled";
  ALTER TABLE "site_settings" DROP COLUMN "notifications_to";
  ALTER TABLE "site_settings" DROP COLUMN "from_name";
  ALTER TABLE "site_settings" DROP COLUMN "from_address";
  ALTER TABLE "site_settings" DROP COLUMN "smtp_host";
  ALTER TABLE "site_settings" DROP COLUMN "smtp_port";
  ALTER TABLE "site_settings" DROP COLUMN "smtp_secure";
  ALTER TABLE "site_settings" DROP COLUMN "smtp_user";
  ALTER TABLE "site_settings" DROP COLUMN "smtp_pass";`)
}
