import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "forms" ADD COLUMN "step1_heading" varchar;
  ALTER TABLE "forms" ADD COLUMN "step1_intro" varchar;
  ALTER TABLE "forms" ADD COLUMN "step2_heading" varchar;
  ALTER TABLE "forms" ADD COLUMN "step2_intro" varchar;
  ALTER TABLE "forms" ADD COLUMN "step3_heading" varchar;
  ALTER TABLE "forms" ADD COLUMN "step3_intro" varchar;
  ALTER TABLE "forms" ADD COLUMN "step4_heading" varchar;
  ALTER TABLE "forms" ADD COLUMN "step4_intro" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "forms" DROP COLUMN "step1_heading";
  ALTER TABLE "forms" DROP COLUMN "step1_intro";
  ALTER TABLE "forms" DROP COLUMN "step2_heading";
  ALTER TABLE "forms" DROP COLUMN "step2_intro";
  ALTER TABLE "forms" DROP COLUMN "step3_heading";
  ALTER TABLE "forms" DROP COLUMN "step3_intro";
  ALTER TABLE "forms" DROP COLUMN "step4_heading";
  ALTER TABLE "forms" DROP COLUMN "step4_intro";`)
}
