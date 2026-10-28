import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" ADD COLUMN "risk_notice_enabled" boolean DEFAULT true;
  ALTER TABLE "header" ADD COLUMN "risk_notice_lead" varchar DEFAULT 'Risk notice:';
  ALTER TABLE "header" ADD COLUMN "risk_notice_body" varchar DEFAULT 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Enrichers operates under SECP regulatory oversight; content is for information and education, not personalised advice.';
  ALTER TABLE "footer" ADD COLUMN "whatsapp_label" varchar DEFAULT 'WhatsApp';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header" DROP COLUMN "risk_notice_enabled";
  ALTER TABLE "header" DROP COLUMN "risk_notice_lead";
  ALTER TABLE "header" DROP COLUMN "risk_notice_body";
  ALTER TABLE "footer" DROP COLUMN "whatsapp_label";`)
}
