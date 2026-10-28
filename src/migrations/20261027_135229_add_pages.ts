import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_market_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_market_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'SECP-regulated broker · Lahore, since 2011',
  	"heading" varchar DEFAULT 'Trade Pakistan''s markets with a licensed broker beside you.' NOT NULL,
  	"body" varchar DEFAULT 'Invest in PSX equities, or trade gold, oil, currencies and US index futures on PMEX — with research, risk management and client support 24/5.',
  	"primary_label" varchar,
  	"primary_url" varchar,
  	"secondary_label" varchar,
  	"secondary_url" varchar,
  	"hero_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_licensing_credentials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_licensing_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Licensed, and published openly',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_investment_path_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_investment_path_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Three ways to start',
  	"heading" varchar DEFAULT 'What would you like to do?',
  	"body" varchar DEFAULT 'Choose the market you want to trade — or tell us your goals and we''ll recommend a path.',
  	"card_action_label" varchar DEFAULT 'Explore →',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_client_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_client_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Client services',
  	"heading" varchar DEFAULT 'What you get with Enrichers',
  	"body" varchar DEFAULT 'More than order execution — our team helps you understand why a trade makes sense.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_account_opening_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_account_opening_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Open an account',
  	"heading" varchar DEFAULT 'Four steps to your first trade',
  	"note" varchar,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_consultation_qualifier" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Free consultation',
  	"heading" varchar DEFAULT 'Let''s find the right investment path for you',
  	"body" varchar DEFAULT 'Three quick questions so our advisors can prepare the right conversation. Prefer to talk now?',
  	"phone" varchar DEFAULT '(042) 111 111 333',
  	"phone_href" varchar DEFAULT 'tel:+9242111111333',
  	"whatsapp_url" varchar DEFAULT 'https://api.whatsapp.com/send?phone=9242111111333',
  	"whatsapp_label" varchar DEFAULT 'WhatsApp our client support',
  	"form_step_label" varchar DEFAULT 'Step 1 of 4 · Demo — nothing is submitted',
  	"form_heading" varchar DEFAULT 'Let''s find the right investment path for you',
  	"form_intro" varchar DEFAULT 'Just a few quick questions, so we don''t waste your time.',
  	"full_name_label" varchar DEFAULT 'Full name',
  	"phone_label" varchar DEFAULT 'Phone number',
  	"submit_label" varchar DEFAULT 'Let''s get started',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_market_research_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"date" varchar,
  	"title" varchar,
  	"url" varchar,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_market_research_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Enrichers research',
  	"heading" varchar DEFAULT 'Market insight, every week',
  	"body" varchar DEFAULT 'Notes from our research team on Pakistan''s equity market, commodities and the global macro picture.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_group_business_explorer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"quote" varchar,
  	"body" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_group_business_explorer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Beyond brokerage',
  	"heading" varchar DEFAULT 'Part of a diversified investment group',
  	"body" varchar DEFAULT 'Enrichers also builds real assets — land, farms and hospitality — and advises on buying and selling businesses.',
  	"item_button_label" varchar DEFAULT 'Explore business',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_skardu_hotel_feature_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_skardu_hotel_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Flagship project',
  	"heading" varchar DEFAULT 'Skardu Riverside Hotel',
  	"body" varchar DEFAULT 'A purpose-built 5-star luxury hotel on 40 kanals of riverside land in Skardu, Gilgit-Baltistan.',
  	"image_id" integer,
  	"button_label" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_account_faq_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "pages_blocks_account_faq_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "pages_blocks_account_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Questions',
  	"heading" varchar DEFAULT 'Before you open an account',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_ready_when_you_are" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready when you are.',
  	"body" varchar DEFAULT 'Open a PSX or PMEX account online, or speak to our team first.',
  	"open_account_label" varchar,
  	"open_account_url" varchar,
  	"contact_label" varchar,
  	"contact_url" varchar,
  	"risk_notice" varchar DEFAULT 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_blocks_market_hero_badges" ADD CONSTRAINT "pages_blocks_market_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_market_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_market_hero" ADD CONSTRAINT "pages_blocks_market_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_market_hero" ADD CONSTRAINT "pages_blocks_market_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_licensing_credentials_items" ADD CONSTRAINT "pages_blocks_licensing_credentials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_licensing_credentials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_licensing_credentials" ADD CONSTRAINT "pages_blocks_licensing_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_investment_path_cards_cards" ADD CONSTRAINT "pages_blocks_investment_path_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_investment_path_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_investment_path_cards" ADD CONSTRAINT "pages_blocks_investment_path_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_client_services_items" ADD CONSTRAINT "pages_blocks_client_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_client_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_client_services" ADD CONSTRAINT "pages_blocks_client_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_account_opening_steps_steps" ADD CONSTRAINT "pages_blocks_account_opening_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_account_opening_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_account_opening_steps" ADD CONSTRAINT "pages_blocks_account_opening_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation_qualifier" ADD CONSTRAINT "pages_blocks_consultation_qualifier_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_market_research_cards_cards" ADD CONSTRAINT "pages_blocks_market_research_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_market_research_cards_cards" ADD CONSTRAINT "pages_blocks_market_research_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_market_research_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_market_research_cards" ADD CONSTRAINT "pages_blocks_market_research_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_group_business_explorer_items" ADD CONSTRAINT "pages_blocks_group_business_explorer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_group_business_explorer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_group_business_explorer" ADD CONSTRAINT "pages_blocks_group_business_explorer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_skardu_hotel_feature_facts" ADD CONSTRAINT "pages_blocks_skardu_hotel_feature_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_skardu_hotel_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_skardu_hotel_feature" ADD CONSTRAINT "pages_blocks_skardu_hotel_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_skardu_hotel_feature" ADD CONSTRAINT "pages_blocks_skardu_hotel_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_account_faq_categories_items" ADD CONSTRAINT "pages_blocks_account_faq_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_account_faq_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_account_faq_categories" ADD CONSTRAINT "pages_blocks_account_faq_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_account_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_account_faq" ADD CONSTRAINT "pages_blocks_account_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_ready_when_you_are" ADD CONSTRAINT "pages_blocks_ready_when_you_are_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_market_hero_badges_order_idx" ON "pages_blocks_market_hero_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_market_hero_badges_parent_id_idx" ON "pages_blocks_market_hero_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_market_hero_order_idx" ON "pages_blocks_market_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_market_hero_parent_id_idx" ON "pages_blocks_market_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_market_hero_path_idx" ON "pages_blocks_market_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_market_hero_hero_image_idx" ON "pages_blocks_market_hero" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_licensing_credentials_items_order_idx" ON "pages_blocks_licensing_credentials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_licensing_credentials_items_parent_id_idx" ON "pages_blocks_licensing_credentials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_licensing_credentials_order_idx" ON "pages_blocks_licensing_credentials" USING btree ("_order");
  CREATE INDEX "pages_blocks_licensing_credentials_parent_id_idx" ON "pages_blocks_licensing_credentials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_licensing_credentials_path_idx" ON "pages_blocks_licensing_credentials" USING btree ("_path");
  CREATE INDEX "pages_blocks_investment_path_cards_cards_order_idx" ON "pages_blocks_investment_path_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_investment_path_cards_cards_parent_id_idx" ON "pages_blocks_investment_path_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_investment_path_cards_order_idx" ON "pages_blocks_investment_path_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_investment_path_cards_parent_id_idx" ON "pages_blocks_investment_path_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_investment_path_cards_path_idx" ON "pages_blocks_investment_path_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_client_services_items_order_idx" ON "pages_blocks_client_services_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_client_services_items_parent_id_idx" ON "pages_blocks_client_services_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_client_services_order_idx" ON "pages_blocks_client_services" USING btree ("_order");
  CREATE INDEX "pages_blocks_client_services_parent_id_idx" ON "pages_blocks_client_services" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_client_services_path_idx" ON "pages_blocks_client_services" USING btree ("_path");
  CREATE INDEX "pages_blocks_account_opening_steps_steps_order_idx" ON "pages_blocks_account_opening_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_account_opening_steps_steps_parent_id_idx" ON "pages_blocks_account_opening_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_account_opening_steps_order_idx" ON "pages_blocks_account_opening_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_account_opening_steps_parent_id_idx" ON "pages_blocks_account_opening_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_account_opening_steps_path_idx" ON "pages_blocks_account_opening_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_consultation_qualifier_order_idx" ON "pages_blocks_consultation_qualifier" USING btree ("_order");
  CREATE INDEX "pages_blocks_consultation_qualifier_parent_id_idx" ON "pages_blocks_consultation_qualifier" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_consultation_qualifier_path_idx" ON "pages_blocks_consultation_qualifier" USING btree ("_path");
  CREATE INDEX "pages_blocks_market_research_cards_cards_order_idx" ON "pages_blocks_market_research_cards_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_market_research_cards_cards_parent_id_idx" ON "pages_blocks_market_research_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_market_research_cards_cards_image_idx" ON "pages_blocks_market_research_cards_cards" USING btree ("image_id");
  CREATE INDEX "pages_blocks_market_research_cards_order_idx" ON "pages_blocks_market_research_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_market_research_cards_parent_id_idx" ON "pages_blocks_market_research_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_market_research_cards_path_idx" ON "pages_blocks_market_research_cards" USING btree ("_path");
  CREATE INDEX "pages_blocks_group_business_explorer_items_order_idx" ON "pages_blocks_group_business_explorer_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_group_business_explorer_items_parent_id_idx" ON "pages_blocks_group_business_explorer_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_group_business_explorer_order_idx" ON "pages_blocks_group_business_explorer" USING btree ("_order");
  CREATE INDEX "pages_blocks_group_business_explorer_parent_id_idx" ON "pages_blocks_group_business_explorer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_group_business_explorer_path_idx" ON "pages_blocks_group_business_explorer" USING btree ("_path");
  CREATE INDEX "pages_blocks_skardu_hotel_feature_facts_order_idx" ON "pages_blocks_skardu_hotel_feature_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_skardu_hotel_feature_facts_parent_id_idx" ON "pages_blocks_skardu_hotel_feature_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_skardu_hotel_feature_order_idx" ON "pages_blocks_skardu_hotel_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_skardu_hotel_feature_parent_id_idx" ON "pages_blocks_skardu_hotel_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_skardu_hotel_feature_path_idx" ON "pages_blocks_skardu_hotel_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_skardu_hotel_feature_image_idx" ON "pages_blocks_skardu_hotel_feature" USING btree ("image_id");
  CREATE INDEX "pages_blocks_account_faq_categories_items_order_idx" ON "pages_blocks_account_faq_categories_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_account_faq_categories_items_parent_id_idx" ON "pages_blocks_account_faq_categories_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_account_faq_categories_order_idx" ON "pages_blocks_account_faq_categories" USING btree ("_order");
  CREATE INDEX "pages_blocks_account_faq_categories_parent_id_idx" ON "pages_blocks_account_faq_categories" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_account_faq_order_idx" ON "pages_blocks_account_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_account_faq_parent_id_idx" ON "pages_blocks_account_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_account_faq_path_idx" ON "pages_blocks_account_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_ready_when_you_are_order_idx" ON "pages_blocks_ready_when_you_are" USING btree ("_order");
  CREATE INDEX "pages_blocks_ready_when_you_are_parent_id_idx" ON "pages_blocks_ready_when_you_are" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_ready_when_you_are_path_idx" ON "pages_blocks_ready_when_you_are" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_market_hero_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_market_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_licensing_credentials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_licensing_credentials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_investment_path_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_investment_path_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_client_services_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_client_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_account_opening_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_account_opening_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_consultation_qualifier" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_market_research_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_market_research_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_group_business_explorer_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_group_business_explorer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_skardu_hotel_feature_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_skardu_hotel_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_account_faq_categories_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_account_faq_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_account_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_ready_when_you_are" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_market_hero_badges" CASCADE;
  DROP TABLE "pages_blocks_market_hero" CASCADE;
  DROP TABLE "pages_blocks_licensing_credentials_items" CASCADE;
  DROP TABLE "pages_blocks_licensing_credentials" CASCADE;
  DROP TABLE "pages_blocks_investment_path_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_investment_path_cards" CASCADE;
  DROP TABLE "pages_blocks_client_services_items" CASCADE;
  DROP TABLE "pages_blocks_client_services" CASCADE;
  DROP TABLE "pages_blocks_account_opening_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_account_opening_steps" CASCADE;
  DROP TABLE "pages_blocks_consultation_qualifier" CASCADE;
  DROP TABLE "pages_blocks_market_research_cards_cards" CASCADE;
  DROP TABLE "pages_blocks_market_research_cards" CASCADE;
  DROP TABLE "pages_blocks_group_business_explorer_items" CASCADE;
  DROP TABLE "pages_blocks_group_business_explorer" CASCADE;
  DROP TABLE "pages_blocks_skardu_hotel_feature_facts" CASCADE;
  DROP TABLE "pages_blocks_skardu_hotel_feature" CASCADE;
  DROP TABLE "pages_blocks_account_faq_categories_items" CASCADE;
  DROP TABLE "pages_blocks_account_faq_categories" CASCADE;
  DROP TABLE "pages_blocks_account_faq" CASCADE;
  DROP TABLE "pages_blocks_ready_when_you_are" CASCADE;
  DROP TABLE "pages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";`)
}
