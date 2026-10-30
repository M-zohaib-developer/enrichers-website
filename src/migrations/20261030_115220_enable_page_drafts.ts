import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_business_group_cards_items_icon" AS ENUM('document', 'development', 'agriculture', 'hospitality');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_hero_benefits_icon" AS ENUM('fast', 'secure', 'devices', 'markets');
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_theme" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_hero_variant" AS ENUM('standard', 'platform');
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_breadcrumb_position" AS ENUM('top', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_primary_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_service_hero_secondary_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_process_steps_layout_variant" AS ENUM('grid', 'timeline', 'editorial');
  CREATE TYPE "public"."enum__pages_v_blocks_licensing_credentials_items_variant" AS ENUM('entity', 'documents');
  CREATE TYPE "public"."enum__pages_v_blocks_licensing_credentials_layout_variant" AS ENUM('cards', 'split');
  CREATE TYPE "public"."enum__pages_v_blocks_client_services_items_icon" AS ENUM('people', 'chart', 'scale', 'globe', 'compass', 'ledger');
  CREATE TYPE "public"."enum__pages_v_blocks_client_services_layout_variant" AS ENUM('grid', 'featureList');
  CREATE TYPE "public"."enum__pages_v_blocks_consultation_qualifier_form_mode" AS ENUM('wizard', 'singlePage');
  CREATE TYPE "public"."enum__pages_v_blocks_group_business_explorer_items_icon" AS ENUM('document', 'development', 'agriculture', 'research', 'hospitality');
  CREATE TYPE "public"."enum__pages_v_blocks_business_group_cards_items_icon" AS ENUM('document', 'development', 'agriculture', 'hospitality');
  CREATE TYPE "public"."enum__pages_v_blocks_ready_when_you_are_variant" AS ENUM('darkCard', 'compact');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_details_channels_icon" AS ENUM('phone', 'message', 'mail', 'mapPin', 'building');
  CREATE TYPE "public"."enum__pages_v_blocks_consultation_showcase_form_mode" AS ENUM('wizard', 'singlePage');
  CREATE TYPE "public"."enum__pages_v_blocks_service_offerings_background" AS ENUM('light', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_service_offerings_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum__pages_v_blocks_benefits_grid_background" AS ENUM('surface', 'sunken', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_rich_text_block_background" AS ENUM('white', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_feature_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_image_text_feature_background" AS ENUM('surface', 'sunken');
  CREATE TYPE "public"."enum__pages_v_blocks_agriculture_feature_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_immersive_media_gallery_interval" AS ENUM('4000', '5000', '6000');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_band_background" AS ENUM('inverse', 'surface', 'sunken');
  CREATE TYPE "public"."enum__pages_v_blocks_team_grid_display_variant" AS ENUM('legacy', 'candidate');
  CREATE TYPE "public"."enum__pages_v_blocks_founder_statement_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_pages_blocks_benefits_grid_background" ADD VALUE 'surface' BEFORE 'sunken';
  CREATE TABLE "pages_blocks_business_group_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"body" varchar,
  	"url" varchar,
  	"icon" "enum_pages_blocks_business_group_cards_items_icon" DEFAULT 'document'
  );
  
  CREATE TABLE "pages_blocks_business_group_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Enrichers Investment Group',
  	"heading" varchar DEFAULT 'The rest of the group',
  	"body" varchar DEFAULT 'Brokerage, real assets, agriculture and hospitality under one group.',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero_hero_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_service_hero_hero_benefits_icon" DEFAULT 'fast',
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"theme" "enum__pages_v_blocks_service_hero_theme" DEFAULT 'dark',
  	"hero_variant" "enum__pages_v_blocks_service_hero_hero_variant" DEFAULT 'standard',
  	"breadcrumb_position" "enum__pages_v_blocks_service_hero_breadcrumb_position" DEFAULT 'top',
  	"show_bottom_border" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"heading_accent" varchar,
  	"body" varchar,
  	"hero_image_id" integer,
  	"primary_label" varchar,
  	"primary_url" varchar,
  	"primary_variant" "enum__pages_v_blocks_service_hero_primary_variant" DEFAULT 'primary',
  	"secondary_label" varchar,
  	"secondary_url" varchar,
  	"secondary_variant" "enum__pages_v_blocks_service_hero_secondary_variant" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"anchor" varchar,
  	"active" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"aria_label" varchar DEFAULT 'On this page',
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_range_tabs_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"term" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_range_tabs_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_range_tabs_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_range_tabs_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_range_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"quote" varchar,
  	"table_caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_range" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'products',
  	"eyebrow" varchar DEFAULT 'Product range',
  	"heading" varchar,
  	"body" varchar,
  	"disclosure_text" varchar,
  	"disclosure_label" varchar DEFAULT 'Read the disclosures',
  	"disclosure_url" varchar DEFAULT '/regulation',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabbed_content_tabs_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabbed_content_tabs_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabbed_content_tabs_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabbed_content_tabs_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabbed_content_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"body" varchar,
  	"quote" varchar,
  	"table_caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_tabbed_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'products',
  	"eyebrow" varchar DEFAULT 'What you can do',
  	"heading" varchar,
  	"body" varchar,
  	"default_tab" numeric DEFAULT 0,
  	"disclosure_text" varchar,
  	"disclosure_label" varchar DEFAULT 'Read the disclosures',
  	"disclosure_url" varchar DEFAULT '/regulation',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_primary_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_secondary_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'process',
  	"eyebrow" varchar DEFAULT 'Account opening',
  	"heading" varchar,
  	"intro" varchar,
  	"layout_variant" "enum__pages_v_blocks_process_steps_layout_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_requirements_checklist_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_requirements_checklist_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_requirements_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'documents',
  	"eyebrow" varchar DEFAULT 'Documentation',
  	"heading" varchar DEFAULT 'What you''ll need',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_guide_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_guide_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'guide',
  	"eyebrow" varchar DEFAULT 'Commodity trading guide',
  	"heading" varchar,
  	"intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'faq',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_market_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_market_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'SECP-regulated broker · Lahore, since 2011',
  	"heading" varchar DEFAULT 'Trade Pakistan''s markets with a licensed broker beside you.',
  	"heading_accent" varchar DEFAULT 'with a licensed broker beside you.',
  	"heading_line_one" varchar DEFAULT 'Trade Pakistan''s',
  	"heading_line_two" varchar DEFAULT 'markets with a licensed',
  	"heading_line_three" varchar DEFAULT 'broker beside you.',
  	"body" varchar DEFAULT 'Invest in PSX equities, or trade gold, oil, currencies and US index futures on PMEX — with research, risk management and client support 24/5.',
  	"show_buttons" boolean DEFAULT true,
  	"hero_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_licensing_credentials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"note" varchar,
  	"url" varchar,
  	"file_id" integer,
  	"link_label" varchar DEFAULT 'View documents',
  	"variant" "enum__pages_v_blocks_licensing_credentials_items_variant" DEFAULT 'entity',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_licensing_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar DEFAULT 'Licensed, and published openly',
  	"heading" varchar,
  	"body" varchar,
  	"layout_variant" "enum__pages_v_blocks_licensing_credentials_layout_variant" DEFAULT 'cards',
  	"disclosure_text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_investment_path_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"supporting_label" varchar,
  	"action_label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_investment_path_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Three ways to start',
  	"heading" varchar DEFAULT 'What would you like to do?',
  	"card_action_label" varchar DEFAULT 'Explore →',
  	"body" varchar DEFAULT 'Choose the market you want to trade — or tell us your goals and we''ll recommend a path.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_client_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"icon" "enum__pages_v_blocks_client_services_items_icon" DEFAULT 'people',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_client_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Client services',
  	"heading" varchar DEFAULT 'What you get with Enrichers',
  	"layout_variant" "enum__pages_v_blocks_client_services_layout_variant" DEFAULT 'grid',
  	"body" varchar DEFAULT 'More than order execution — our team helps you understand why a trade makes sense.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_account_opening_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_account_opening_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Open an account',
  	"heading" varchar DEFAULT 'Four steps to your first trade',
  	"note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_consultation_qualifier" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Investor enquiries',
  	"heading" varchar DEFAULT 'Talk to us about the project',
  	"subheading" varchar,
  	"phone" varchar DEFAULT '(042) 111 111 333',
  	"phone_href" varchar DEFAULT 'tel:+9242111111333',
  	"whatsapp_url" varchar DEFAULT 'https://api.whatsapp.com/send?phone=9242111111333',
  	"whatsapp_label" varchar DEFAULT 'WhatsApp our client support',
  	"hours" varchar DEFAULT 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
  	"form_mode" "enum__pages_v_blocks_consultation_qualifier_form_mode" DEFAULT 'wizard',
  	"form_step_label" varchar DEFAULT 'Step 1 of 4 · Demo — nothing is submitted',
  	"form_heading" varchar DEFAULT 'Let''s find the right investment path for you',
  	"form_intro" varchar DEFAULT 'Just a few quick questions, so we don''t waste your time.',
  	"terms_url" varchar,
  	"terms_label" varchar DEFAULT 'Terms & Conditions',
  	"form_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_market_research_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"date" varchar,
  	"title" varchar,
  	"url" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_market_research_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Enrichers research',
  	"heading" varchar DEFAULT 'Market insight, every week',
  	"body" varchar DEFAULT 'Notes from our research team on Pakistan''s equity market, commodities and the global macro picture.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_group_business_explorer_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"quote" varchar,
  	"body" varchar,
  	"url" varchar,
  	"icon" "enum__pages_v_blocks_group_business_explorer_items_icon" DEFAULT 'document',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_group_business_explorer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Beyond brokerage',
  	"heading" varchar DEFAULT 'Part of a diversified investment group',
  	"body" varchar DEFAULT 'Enrichers also builds real assets — land, farms and hospitality — and advises on buying and selling businesses.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_business_group_cards_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"body" varchar,
  	"url" varchar,
  	"icon" "enum__pages_v_blocks_business_group_cards_items_icon" DEFAULT 'document',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_business_group_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Enrichers Investment Group',
  	"heading" varchar DEFAULT 'The rest of the group',
  	"body" varchar DEFAULT 'Brokerage, real assets, agriculture and hospitality under one group.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_skardu_hotel_feature_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_skardu_hotel_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Flagship project',
  	"heading" varchar DEFAULT 'Skardu Riverside Hotel',
  	"body" varchar DEFAULT 'A purpose-built 5-star luxury hotel on 40 kanals of riverside land in Skardu, Gilgit-Baltistan.',
  	"image_id" integer,
  	"image_caption" varchar DEFAULT 'Architectural visualisation',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_account_faq_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_account_faq_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_account_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Questions',
  	"heading" varchar DEFAULT 'Before you open an account',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_ready_when_you_are" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Ready when you are.',
  	"variant" "enum__pages_v_blocks_ready_when_you_are_variant" DEFAULT 'darkCard',
  	"body" varchar DEFAULT 'Open a PSX or PMEX account online, or speak to our team first.',
  	"risk_notice" varchar DEFAULT 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_details_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pages_v_blocks_contact_details_channels_icon" DEFAULT 'phone',
  	"label" varchar,
  	"description" varchar,
  	"meta" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_details_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"address" varchar,
  	"phone" varchar,
  	"hours" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'contact',
  	"heading" varchar DEFAULT 'Ways to reach us',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_platform_downloads_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" varchar,
  	"title" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_platform_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'downloads',
  	"eyebrow" varchar DEFAULT 'Download MetaTrader 5',
  	"heading" varchar DEFAULT 'Trade on the device that suits you',
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_knowledge_hero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_knowledge_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Knowledge center',
  	"heading" varchar DEFAULT 'Frequently Asked Questions',
  	"body" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_consultation_showcase_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_consultation_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'consultation',
  	"eyebrow" varchar DEFAULT 'Free consultation',
  	"heading" varchar DEFAULT 'Get free consultation today',
  	"subheading" varchar,
  	"phone" varchar DEFAULT '(042) 111 111 333',
  	"phone_href" varchar DEFAULT 'tel:+9242111111333',
  	"whatsapp_url" varchar DEFAULT 'https://api.whatsapp.com/send?phone=9242111111333',
  	"whatsapp_label" varchar DEFAULT 'WhatsApp our client support',
  	"hours" varchar DEFAULT 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
  	"form_step_label" varchar DEFAULT 'Step 1 of 4 · Demo — nothing is submitted',
  	"form_heading" varchar DEFAULT 'Let''s find the right investment path for you',
  	"form_intro" varchar DEFAULT 'Just a few quick questions, so we don''t waste your time.',
  	"form_mode" "enum__pages_v_blocks_consultation_showcase_form_mode" DEFAULT 'wizard',
  	"reassurance" varchar,
  	"form_id" integer,
  	"interval_seconds" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_business_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Business Brokerage',
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_offerings_items_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_offerings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_service_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar DEFAULT 'EIG Offerings',
  	"heading" varchar DEFAULT 'Services for every stage of a business journey',
  	"body" varchar,
  	"background" "enum__pages_v_blocks_service_offerings_background" DEFAULT 'light',
  	"columns" "enum__pages_v_blocks_service_offerings_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefits_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_benefits_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Benefits of Working with Enrichers',
  	"show_header" boolean DEFAULT true,
  	"body" varchar,
  	"background" "enum__pages_v_blocks_benefits_grid_background" DEFAULT 'sunken',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'guide',
  	"heading" varchar,
  	"background" "enum__pages_v_blocks_rich_text_block_background" DEFAULT 'white',
  	"show_accent_bar" boolean DEFAULT true,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_feature_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_text_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Turning barren landscapes into flourishing fields',
  	"body" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"image_position" "enum__pages_v_blocks_image_text_feature_image_position" DEFAULT 'right',
  	"attribution_name" varchar,
  	"attribution_role" varchar,
  	"portrait" boolean DEFAULT false,
  	"background" "enum__pages_v_blocks_image_text_feature_background" DEFAULT 'surface',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_content_list_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_split_content_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"left_heading" varchar,
  	"left_body" varchar,
  	"right_heading" varchar,
  	"right_body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_agriculture_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"image_position" "enum__pages_v_blocks_agriculture_feature_image_position" DEFAULT 'right',
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_focus_areas_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_focus_areas_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Key Focus Areas',
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hospitality_experience_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hospitality_experience_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Designed around the destination experience',
  	"body" varchar,
  	"closing_line" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_destination_location_showcase_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_destination_location_showcase_attractions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"title" varchar,
  	"body" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_destination_location_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'A location defined by nature',
  	"body" varchar,
  	"supporting_text" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"image_caption" varchar,
  	"image_caption_detail" varchar,
  	"attractions_intro" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_text_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"video_url" varchar,
  	"thumbnail_id" integer,
  	"thumbnail_alt" varchar,
  	"video_label" varchar DEFAULT 'Watch project video',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_immersive_media_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_immersive_media_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"autoplay" boolean DEFAULT true,
  	"interval" "enum__pages_v_blocks_immersive_media_gallery_interval" DEFAULT '5000',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_band_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"background" "enum__pages_v_blocks_stats_band_background" DEFAULT 'inverse',
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_grid_leaders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"profile_url" varchar,
  	"bio" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_grid_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"photo_id" integer,
  	"profile_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Meet the team',
  	"body" varchar,
  	"display_variant" "enum__pages_v_blocks_team_grid_display_variant" DEFAULT 'legacy',
  	"leadership_eyebrow" varchar,
  	"leadership_heading" varchar,
  	"leadership_body" varchar,
  	"leadership_cta_label" varchar,
  	"leadership_cta_url" varchar,
  	"management_eyebrow" varchar,
  	"management_heading" varchar,
  	"management_body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_research_library_notes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category" varchar,
  	"date" varchar,
  	"title" varchar,
  	"summary" varchar,
  	"image_id" integer,
  	"file_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_research_library" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'notes',
  	"eyebrow" varchar DEFAULT 'Research library',
  	"heading" varchar DEFAULT 'All research notes',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_article_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_article_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'articles',
  	"heading" varchar DEFAULT 'Articles',
  	"link_label" varchar DEFAULT 'All articles',
  	"link_url" varchar DEFAULT '/blogs/',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_member_profile_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"link_label" varchar,
  	"link_url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_member_profile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'profile',
  	"eyebrow" varchar DEFAULT 'Team details',
  	"heading" varchar,
  	"photo_id" integer,
  	"role" varchar,
  	"company_label" varchar,
  	"company_url" varchar,
  	"body" jsonb,
  	"back_link_label" varchar DEFAULT 'Back to our team',
  	"back_link_url" varchar DEFAULT '/enrichers-team/',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_founder_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"quote" varchar,
  	"body" varchar,
  	"author_name" varchar,
  	"author_role" varchar,
  	"portrait_id" integer,
  	"image_position" "enum__pages_v_blocks_founder_statement_image_position",
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "pages_blocks_service_hero_breadcrumbs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_service_hero_badges" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_service_hero_hero_benefits" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_service_hero_hero_benefits" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_service_hero" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_section_navigation_links" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_section_navigation_links" ALTER COLUMN "anchor" DROP NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs_features" ALTER COLUMN "term" DROP NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs_features" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs_table_columns" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs_table_rows_cells" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_product_range" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_feature_cards" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_feature_cards" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_table_columns" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_table_rows_cells" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_process_steps_steps" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_primary_button" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_primary_button" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "pages_blocks_secondary_button" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_secondary_button" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "pages_blocks_process_steps" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_requirements_checklist_groups_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_requirements_checklist_groups" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_requirements_checklist" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_guide_accordion_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "pages_blocks_guide_accordion_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "pages_blocks_guide_accordion" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_faq_accordion_items" ALTER COLUMN "question" DROP NOT NULL;
  ALTER TABLE "pages_blocks_faq_accordion_items" ALTER COLUMN "answer" DROP NOT NULL;
  ALTER TABLE "pages_blocks_faq_accordion" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_market_hero" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_consultation_qualifier" ALTER COLUMN "form_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "icon" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "meta" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_offices" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_offices" ALTER COLUMN "address" DROP NOT NULL;
  ALTER TABLE "pages_blocks_contact_details" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ALTER COLUMN "platform" DROP NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_knowledge_hero_breadcrumbs" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_knowledge_hero" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_consultation_showcase_images" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_consultation_showcase_images" ALTER COLUMN "alt" DROP NOT NULL;
  ALTER TABLE "pages_blocks_consultation_showcase" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_consultation_showcase" ALTER COLUMN "form_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_business_intro" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_business_intro" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_service_offerings_items_details" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_service_offerings_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_service_offerings" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_benefits_grid_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_benefits_grid_items" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_benefits_grid" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_rich_text_block" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_image_text_feature_highlights" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_image_text_feature" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_image_text_feature" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_image_text_feature" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list_right_items" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list" ALTER COLUMN "left_heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list" ALTER COLUMN "left_body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list" ALTER COLUMN "right_heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list" ALTER COLUMN "right_body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_agriculture_feature" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_agriculture_feature" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_agriculture_feature" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_rich_intro" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_rich_intro" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_focus_areas_grid" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_hospitality_experience_grid" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase_facts" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase_facts" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase_attractions" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase_attractions" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_video_text_feature" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_video_text_feature" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_video_text_feature" ALTER COLUMN "video_url" DROP NOT NULL;
  ALTER TABLE "pages_blocks_video_text_feature" ALTER COLUMN "thumbnail_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_immersive_media_gallery_items" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_stats_band_stats" ALTER COLUMN "value" DROP NOT NULL;
  ALTER TABLE "pages_blocks_stats_band_stats" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_grid_leaders" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_grid_leaders" ALTER COLUMN "role" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_grid_members" ALTER COLUMN "name" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_grid_members" ALTER COLUMN "role" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_grid" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_research_library_notes" ALTER COLUMN "category" DROP NOT NULL;
  ALTER TABLE "pages_blocks_research_library_notes" ALTER COLUMN "date" DROP NOT NULL;
  ALTER TABLE "pages_blocks_research_library_notes" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_research_library_notes" ALTER COLUMN "summary" DROP NOT NULL;
  ALTER TABLE "pages_blocks_article_list_items" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages_blocks_article_list_items" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile_credentials" ALTER COLUMN "text" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile" ALTER COLUMN "photo_id" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile" ALTER COLUMN "role" DROP NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile" ALTER COLUMN "body" DROP NOT NULL;
  ALTER TABLE "pages_blocks_founder_statement" ALTER COLUMN "quote" DROP NOT NULL;
  ALTER TABLE "pages_blocks_founder_statement" ALTER COLUMN "author_name" DROP NOT NULL;
  ALTER TABLE "pages_blocks_founder_statement" ALTER COLUMN "author_role" DROP NOT NULL;
  ALTER TABLE "pages_blocks_founder_statement" ALTER COLUMN "portrait_id" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "_status" "enum_pages_status" DEFAULT 'draft';
  ALTER TABLE "pages_blocks_business_group_cards_items" ADD CONSTRAINT "pages_blocks_business_group_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_business_group_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_business_group_cards" ADD CONSTRAINT "pages_blocks_business_group_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero_breadcrumbs" ADD CONSTRAINT "_pages_v_blocks_service_hero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero_badges" ADD CONSTRAINT "_pages_v_blocks_service_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero_hero_benefits" ADD CONSTRAINT "_pages_v_blocks_service_hero_hero_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero" ADD CONSTRAINT "_pages_v_blocks_service_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_hero" ADD CONSTRAINT "_pages_v_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_navigation_links" ADD CONSTRAINT "_pages_v_blocks_section_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_section_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_navigation" ADD CONSTRAINT "_pages_v_blocks_section_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_range_tabs_features" ADD CONSTRAINT "_pages_v_blocks_product_range_tabs_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_range_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_range_tabs_table_columns" ADD CONSTRAINT "_pages_v_blocks_product_range_tabs_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_range_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_range_tabs_table_rows_cells" ADD CONSTRAINT "_pages_v_blocks_product_range_tabs_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_range_tabs_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_range_tabs_table_rows" ADD CONSTRAINT "_pages_v_blocks_product_range_tabs_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_range_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_range_tabs" ADD CONSTRAINT "_pages_v_blocks_product_range_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_range"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_range" ADD CONSTRAINT "_pages_v_blocks_product_range_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs_feature_cards" ADD CONSTRAINT "_pages_v_blocks_tabbed_content_tabs_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabbed_content_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs_table_columns" ADD CONSTRAINT "_pages_v_blocks_tabbed_content_tabs_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabbed_content_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs_table_rows_cells" ADD CONSTRAINT "_pages_v_blocks_tabbed_content_tabs_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabbed_content_tabs_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs_table_rows" ADD CONSTRAINT "_pages_v_blocks_tabbed_content_tabs_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabbed_content_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs" ADD CONSTRAINT "_pages_v_blocks_tabbed_content_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_tabbed_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_tabbed_content" ADD CONSTRAINT "_pages_v_blocks_tabbed_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_primary_button" ADD CONSTRAINT "_pages_v_blocks_primary_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_secondary_button" ADD CONSTRAINT "_pages_v_blocks_secondary_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_process_steps" ADD CONSTRAINT "_pages_v_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_requirements_checklist_groups_items" ADD CONSTRAINT "_pages_v_blocks_requirements_checklist_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_requirements_checklist_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_requirements_checklist_groups" ADD CONSTRAINT "_pages_v_blocks_requirements_checklist_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_requirements_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_requirements_checklist" ADD CONSTRAINT "_pages_v_blocks_requirements_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guide_accordion_items" ADD CONSTRAINT "_pages_v_blocks_guide_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_guide_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guide_accordion" ADD CONSTRAINT "_pages_v_blocks_guide_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion_items" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_accordion" ADD CONSTRAINT "_pages_v_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_market_hero_badges" ADD CONSTRAINT "_pages_v_blocks_market_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_market_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_market_hero" ADD CONSTRAINT "_pages_v_blocks_market_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_market_hero" ADD CONSTRAINT "_pages_v_blocks_market_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_licensing_credentials_items" ADD CONSTRAINT "_pages_v_blocks_licensing_credentials_items_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_licensing_credentials_items" ADD CONSTRAINT "_pages_v_blocks_licensing_credentials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_licensing_credentials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_licensing_credentials" ADD CONSTRAINT "_pages_v_blocks_licensing_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_investment_path_cards_cards" ADD CONSTRAINT "_pages_v_blocks_investment_path_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_investment_path_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_investment_path_cards" ADD CONSTRAINT "_pages_v_blocks_investment_path_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_client_services_items" ADD CONSTRAINT "_pages_v_blocks_client_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_client_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_client_services" ADD CONSTRAINT "_pages_v_blocks_client_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_account_opening_steps_steps" ADD CONSTRAINT "_pages_v_blocks_account_opening_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_account_opening_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_account_opening_steps" ADD CONSTRAINT "_pages_v_blocks_account_opening_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_consultation_qualifier" ADD CONSTRAINT "_pages_v_blocks_consultation_qualifier_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_consultation_qualifier" ADD CONSTRAINT "_pages_v_blocks_consultation_qualifier_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_market_research_cards_cards" ADD CONSTRAINT "_pages_v_blocks_market_research_cards_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_market_research_cards_cards" ADD CONSTRAINT "_pages_v_blocks_market_research_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_market_research_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_market_research_cards" ADD CONSTRAINT "_pages_v_blocks_market_research_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group_business_explorer_items" ADD CONSTRAINT "_pages_v_blocks_group_business_explorer_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_group_business_explorer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_group_business_explorer" ADD CONSTRAINT "_pages_v_blocks_group_business_explorer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_business_group_cards_items" ADD CONSTRAINT "_pages_v_blocks_business_group_cards_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_business_group_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_business_group_cards" ADD CONSTRAINT "_pages_v_blocks_business_group_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_skardu_hotel_feature_facts" ADD CONSTRAINT "_pages_v_blocks_skardu_hotel_feature_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_skardu_hotel_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_skardu_hotel_feature" ADD CONSTRAINT "_pages_v_blocks_skardu_hotel_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_skardu_hotel_feature" ADD CONSTRAINT "_pages_v_blocks_skardu_hotel_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_account_faq_categories_items" ADD CONSTRAINT "_pages_v_blocks_account_faq_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_account_faq_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_account_faq_categories" ADD CONSTRAINT "_pages_v_blocks_account_faq_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_account_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_account_faq" ADD CONSTRAINT "_pages_v_blocks_account_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_ready_when_you_are" ADD CONSTRAINT "_pages_v_blocks_ready_when_you_are_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_details_channels" ADD CONSTRAINT "_pages_v_blocks_contact_details_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_details_offices" ADD CONSTRAINT "_pages_v_blocks_contact_details_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_details" ADD CONSTRAINT "_pages_v_blocks_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_platform_downloads_platforms" ADD CONSTRAINT "_pages_v_blocks_platform_downloads_platforms_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_platform_downloads_platforms" ADD CONSTRAINT "_pages_v_blocks_platform_downloads_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_platform_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_platform_downloads" ADD CONSTRAINT "_pages_v_blocks_platform_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_knowledge_hero_breadcrumbs" ADD CONSTRAINT "_pages_v_blocks_knowledge_hero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_knowledge_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_knowledge_hero" ADD CONSTRAINT "_pages_v_blocks_knowledge_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_knowledge_hero" ADD CONSTRAINT "_pages_v_blocks_knowledge_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_consultation_showcase_images" ADD CONSTRAINT "_pages_v_blocks_consultation_showcase_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_consultation_showcase_images" ADD CONSTRAINT "_pages_v_blocks_consultation_showcase_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_consultation_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_consultation_showcase" ADD CONSTRAINT "_pages_v_blocks_consultation_showcase_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_consultation_showcase" ADD CONSTRAINT "_pages_v_blocks_consultation_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_business_intro" ADD CONSTRAINT "_pages_v_blocks_business_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_offerings_items_details" ADD CONSTRAINT "_pages_v_blocks_service_offerings_items_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_offerings_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_offerings_items" ADD CONSTRAINT "_pages_v_blocks_service_offerings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_service_offerings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_service_offerings" ADD CONSTRAINT "_pages_v_blocks_service_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_grid_items" ADD CONSTRAINT "_pages_v_blocks_benefits_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_benefits_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_benefits_grid" ADD CONSTRAINT "_pages_v_blocks_benefits_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_block" ADD CONSTRAINT "_pages_v_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_feature_highlights" ADD CONSTRAINT "_pages_v_blocks_image_text_feature_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_text_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_feature" ADD CONSTRAINT "_pages_v_blocks_image_text_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_text_feature" ADD CONSTRAINT "_pages_v_blocks_image_text_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_list_right_items" ADD CONSTRAINT "_pages_v_blocks_split_content_list_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_split_content_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_split_content_list" ADD CONSTRAINT "_pages_v_blocks_split_content_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agriculture_feature" ADD CONSTRAINT "_pages_v_blocks_agriculture_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agriculture_feature" ADD CONSTRAINT "_pages_v_blocks_agriculture_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_intro" ADD CONSTRAINT "_pages_v_blocks_rich_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_focus_areas_grid_items" ADD CONSTRAINT "_pages_v_blocks_focus_areas_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_focus_areas_grid_items" ADD CONSTRAINT "_pages_v_blocks_focus_areas_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_focus_areas_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_focus_areas_grid" ADD CONSTRAINT "_pages_v_blocks_focus_areas_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hospitality_experience_grid_items" ADD CONSTRAINT "_pages_v_blocks_hospitality_experience_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hospitality_experience_grid_items" ADD CONSTRAINT "_pages_v_blocks_hospitality_experience_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hospitality_experience_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hospitality_experience_grid" ADD CONSTRAINT "_pages_v_blocks_hospitality_experience_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destination_location_showcase_facts" ADD CONSTRAINT "_pages_v_blocks_destination_location_showcase_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_destination_location_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destination_location_showcase_attractions" ADD CONSTRAINT "_pages_v_blocks_destination_location_showcase_attractions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destination_location_showcase_attractions" ADD CONSTRAINT "_pages_v_blocks_destination_location_showcase_attractions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_destination_location_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destination_location_showcase" ADD CONSTRAINT "_pages_v_blocks_destination_location_showcase_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_destination_location_showcase" ADD CONSTRAINT "_pages_v_blocks_destination_location_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_text_feature" ADD CONSTRAINT "_pages_v_blocks_video_text_feature_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_text_feature" ADD CONSTRAINT "_pages_v_blocks_video_text_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_immersive_media_gallery_items" ADD CONSTRAINT "_pages_v_blocks_immersive_media_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_immersive_media_gallery_items" ADD CONSTRAINT "_pages_v_blocks_immersive_media_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_immersive_media_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_immersive_media_gallery" ADD CONSTRAINT "_pages_v_blocks_immersive_media_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_band_stats" ADD CONSTRAINT "_pages_v_blocks_stats_band_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_band" ADD CONSTRAINT "_pages_v_blocks_stats_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid_leaders" ADD CONSTRAINT "_pages_v_blocks_team_grid_leaders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid_leaders" ADD CONSTRAINT "_pages_v_blocks_team_grid_leaders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid_members" ADD CONSTRAINT "_pages_v_blocks_team_grid_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid_members" ADD CONSTRAINT "_pages_v_blocks_team_grid_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_grid" ADD CONSTRAINT "_pages_v_blocks_team_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_research_library_notes" ADD CONSTRAINT "_pages_v_blocks_research_library_notes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_research_library_notes" ADD CONSTRAINT "_pages_v_blocks_research_library_notes_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_research_library_notes" ADD CONSTRAINT "_pages_v_blocks_research_library_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_research_library"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_research_library" ADD CONSTRAINT "_pages_v_blocks_research_library_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_list_items" ADD CONSTRAINT "_pages_v_blocks_article_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_article_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_article_list" ADD CONSTRAINT "_pages_v_blocks_article_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_member_profile_credentials" ADD CONSTRAINT "_pages_v_blocks_team_member_profile_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_member_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_member_profile" ADD CONSTRAINT "_pages_v_blocks_team_member_profile_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_member_profile" ADD CONSTRAINT "_pages_v_blocks_team_member_profile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_statement" ADD CONSTRAINT "_pages_v_blocks_founder_statement_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_founder_statement" ADD CONSTRAINT "_pages_v_blocks_founder_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_business_group_cards_items_order_idx" ON "pages_blocks_business_group_cards_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_business_group_cards_items_parent_id_idx" ON "pages_blocks_business_group_cards_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_business_group_cards_order_idx" ON "pages_blocks_business_group_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_business_group_cards_parent_id_idx" ON "pages_blocks_business_group_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_business_group_cards_path_idx" ON "pages_blocks_business_group_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_hero_breadcrumbs_order_idx" ON "_pages_v_blocks_service_hero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_hero_breadcrumbs_parent_id_idx" ON "_pages_v_blocks_service_hero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_badges_order_idx" ON "_pages_v_blocks_service_hero_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_hero_badges_parent_id_idx" ON "_pages_v_blocks_service_hero_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_hero_benefits_order_idx" ON "_pages_v_blocks_service_hero_hero_benefits" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_hero_hero_benefits_parent_id_idx" ON "_pages_v_blocks_service_hero_hero_benefits" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_order_idx" ON "_pages_v_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_hero_parent_id_idx" ON "_pages_v_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_hero_path_idx" ON "_pages_v_blocks_service_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_hero_hero_image_idx" ON "_pages_v_blocks_service_hero" USING btree ("hero_image_id");
  CREATE INDEX "_pages_v_blocks_section_navigation_links_order_idx" ON "_pages_v_blocks_section_navigation_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_navigation_links_parent_id_idx" ON "_pages_v_blocks_section_navigation_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_navigation_order_idx" ON "_pages_v_blocks_section_navigation" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_navigation_parent_id_idx" ON "_pages_v_blocks_section_navigation" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_navigation_path_idx" ON "_pages_v_blocks_section_navigation" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_features_order_idx" ON "_pages_v_blocks_product_range_tabs_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_features_parent_id_idx" ON "_pages_v_blocks_product_range_tabs_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_table_columns_order_idx" ON "_pages_v_blocks_product_range_tabs_table_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_table_columns_parent_id_idx" ON "_pages_v_blocks_product_range_tabs_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_table_rows_cells_order_idx" ON "_pages_v_blocks_product_range_tabs_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_table_rows_cells_parent_id_idx" ON "_pages_v_blocks_product_range_tabs_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_table_rows_order_idx" ON "_pages_v_blocks_product_range_tabs_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_table_rows_parent_id_idx" ON "_pages_v_blocks_product_range_tabs_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_order_idx" ON "_pages_v_blocks_product_range_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_range_tabs_parent_id_idx" ON "_pages_v_blocks_product_range_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_range_order_idx" ON "_pages_v_blocks_product_range" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_range_parent_id_idx" ON "_pages_v_blocks_product_range" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_range_path_idx" ON "_pages_v_blocks_product_range" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_feature_cards_order_idx" ON "_pages_v_blocks_tabbed_content_tabs_feature_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_feature_cards_parent_id_idx" ON "_pages_v_blocks_tabbed_content_tabs_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_table_columns_order_idx" ON "_pages_v_blocks_tabbed_content_tabs_table_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_table_columns_parent_id_idx" ON "_pages_v_blocks_tabbed_content_tabs_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_table_rows_cells_order_idx" ON "_pages_v_blocks_tabbed_content_tabs_table_rows_cells" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_table_rows_cells_parent_id_idx" ON "_pages_v_blocks_tabbed_content_tabs_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_table_rows_order_idx" ON "_pages_v_blocks_tabbed_content_tabs_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_table_rows_parent_id_idx" ON "_pages_v_blocks_tabbed_content_tabs_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_order_idx" ON "_pages_v_blocks_tabbed_content_tabs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabbed_content_tabs_parent_id_idx" ON "_pages_v_blocks_tabbed_content_tabs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabbed_content_order_idx" ON "_pages_v_blocks_tabbed_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_tabbed_content_parent_id_idx" ON "_pages_v_blocks_tabbed_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_tabbed_content_path_idx" ON "_pages_v_blocks_tabbed_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_order_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_steps_parent_id_idx" ON "_pages_v_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_primary_button_order_idx" ON "_pages_v_blocks_primary_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_primary_button_parent_id_idx" ON "_pages_v_blocks_primary_button" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_primary_button_path_idx" ON "_pages_v_blocks_primary_button" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_secondary_button_order_idx" ON "_pages_v_blocks_secondary_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_secondary_button_parent_id_idx" ON "_pages_v_blocks_secondary_button" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_secondary_button_path_idx" ON "_pages_v_blocks_secondary_button" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_process_steps_order_idx" ON "_pages_v_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_process_steps_parent_id_idx" ON "_pages_v_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_process_steps_path_idx" ON "_pages_v_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_requirements_checklist_groups_items_order_idx" ON "_pages_v_blocks_requirements_checklist_groups_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_requirements_checklist_groups_items_parent_id_idx" ON "_pages_v_blocks_requirements_checklist_groups_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_requirements_checklist_groups_order_idx" ON "_pages_v_blocks_requirements_checklist_groups" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_requirements_checklist_groups_parent_id_idx" ON "_pages_v_blocks_requirements_checklist_groups" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_requirements_checklist_order_idx" ON "_pages_v_blocks_requirements_checklist" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_requirements_checklist_parent_id_idx" ON "_pages_v_blocks_requirements_checklist" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_requirements_checklist_path_idx" ON "_pages_v_blocks_requirements_checklist" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_guide_accordion_items_order_idx" ON "_pages_v_blocks_guide_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_guide_accordion_items_parent_id_idx" ON "_pages_v_blocks_guide_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_guide_accordion_order_idx" ON "_pages_v_blocks_guide_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_guide_accordion_parent_id_idx" ON "_pages_v_blocks_guide_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_guide_accordion_path_idx" ON "_pages_v_blocks_guide_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_order_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_items_parent_id_idx" ON "_pages_v_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_order_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_accordion_parent_id_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_accordion_path_idx" ON "_pages_v_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_market_hero_badges_order_idx" ON "_pages_v_blocks_market_hero_badges" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_market_hero_badges_parent_id_idx" ON "_pages_v_blocks_market_hero_badges" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_market_hero_order_idx" ON "_pages_v_blocks_market_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_market_hero_parent_id_idx" ON "_pages_v_blocks_market_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_market_hero_path_idx" ON "_pages_v_blocks_market_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_market_hero_hero_image_idx" ON "_pages_v_blocks_market_hero" USING btree ("hero_image_id");
  CREATE INDEX "_pages_v_blocks_licensing_credentials_items_order_idx" ON "_pages_v_blocks_licensing_credentials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_licensing_credentials_items_parent_id_idx" ON "_pages_v_blocks_licensing_credentials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_licensing_credentials_items_file_idx" ON "_pages_v_blocks_licensing_credentials_items" USING btree ("file_id");
  CREATE INDEX "_pages_v_blocks_licensing_credentials_order_idx" ON "_pages_v_blocks_licensing_credentials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_licensing_credentials_parent_id_idx" ON "_pages_v_blocks_licensing_credentials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_licensing_credentials_path_idx" ON "_pages_v_blocks_licensing_credentials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_investment_path_cards_cards_order_idx" ON "_pages_v_blocks_investment_path_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_investment_path_cards_cards_parent_id_idx" ON "_pages_v_blocks_investment_path_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_investment_path_cards_order_idx" ON "_pages_v_blocks_investment_path_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_investment_path_cards_parent_id_idx" ON "_pages_v_blocks_investment_path_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_investment_path_cards_path_idx" ON "_pages_v_blocks_investment_path_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_client_services_items_order_idx" ON "_pages_v_blocks_client_services_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_client_services_items_parent_id_idx" ON "_pages_v_blocks_client_services_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_client_services_order_idx" ON "_pages_v_blocks_client_services" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_client_services_parent_id_idx" ON "_pages_v_blocks_client_services" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_client_services_path_idx" ON "_pages_v_blocks_client_services" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_account_opening_steps_steps_order_idx" ON "_pages_v_blocks_account_opening_steps_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_account_opening_steps_steps_parent_id_idx" ON "_pages_v_blocks_account_opening_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_account_opening_steps_order_idx" ON "_pages_v_blocks_account_opening_steps" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_account_opening_steps_parent_id_idx" ON "_pages_v_blocks_account_opening_steps" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_account_opening_steps_path_idx" ON "_pages_v_blocks_account_opening_steps" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_consultation_qualifier_order_idx" ON "_pages_v_blocks_consultation_qualifier" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_consultation_qualifier_parent_id_idx" ON "_pages_v_blocks_consultation_qualifier" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_consultation_qualifier_path_idx" ON "_pages_v_blocks_consultation_qualifier" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_consultation_qualifier_form_idx" ON "_pages_v_blocks_consultation_qualifier" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_market_research_cards_cards_order_idx" ON "_pages_v_blocks_market_research_cards_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_market_research_cards_cards_parent_id_idx" ON "_pages_v_blocks_market_research_cards_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_market_research_cards_cards_image_idx" ON "_pages_v_blocks_market_research_cards_cards" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_market_research_cards_order_idx" ON "_pages_v_blocks_market_research_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_market_research_cards_parent_id_idx" ON "_pages_v_blocks_market_research_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_market_research_cards_path_idx" ON "_pages_v_blocks_market_research_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_group_business_explorer_items_order_idx" ON "_pages_v_blocks_group_business_explorer_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_group_business_explorer_items_parent_id_idx" ON "_pages_v_blocks_group_business_explorer_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_group_business_explorer_order_idx" ON "_pages_v_blocks_group_business_explorer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_group_business_explorer_parent_id_idx" ON "_pages_v_blocks_group_business_explorer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_group_business_explorer_path_idx" ON "_pages_v_blocks_group_business_explorer" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_business_group_cards_items_order_idx" ON "_pages_v_blocks_business_group_cards_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_business_group_cards_items_parent_id_idx" ON "_pages_v_blocks_business_group_cards_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_business_group_cards_order_idx" ON "_pages_v_blocks_business_group_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_business_group_cards_parent_id_idx" ON "_pages_v_blocks_business_group_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_business_group_cards_path_idx" ON "_pages_v_blocks_business_group_cards" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_skardu_hotel_feature_facts_order_idx" ON "_pages_v_blocks_skardu_hotel_feature_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_skardu_hotel_feature_facts_parent_id_idx" ON "_pages_v_blocks_skardu_hotel_feature_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_skardu_hotel_feature_order_idx" ON "_pages_v_blocks_skardu_hotel_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_skardu_hotel_feature_parent_id_idx" ON "_pages_v_blocks_skardu_hotel_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_skardu_hotel_feature_path_idx" ON "_pages_v_blocks_skardu_hotel_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_skardu_hotel_feature_image_idx" ON "_pages_v_blocks_skardu_hotel_feature" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_account_faq_categories_items_order_idx" ON "_pages_v_blocks_account_faq_categories_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_account_faq_categories_items_parent_id_idx" ON "_pages_v_blocks_account_faq_categories_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_account_faq_categories_order_idx" ON "_pages_v_blocks_account_faq_categories" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_account_faq_categories_parent_id_idx" ON "_pages_v_blocks_account_faq_categories" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_account_faq_order_idx" ON "_pages_v_blocks_account_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_account_faq_parent_id_idx" ON "_pages_v_blocks_account_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_account_faq_path_idx" ON "_pages_v_blocks_account_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_ready_when_you_are_order_idx" ON "_pages_v_blocks_ready_when_you_are" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_ready_when_you_are_parent_id_idx" ON "_pages_v_blocks_ready_when_you_are" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_ready_when_you_are_path_idx" ON "_pages_v_blocks_ready_when_you_are" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_details_channels_order_idx" ON "_pages_v_blocks_contact_details_channels" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_details_channels_parent_id_idx" ON "_pages_v_blocks_contact_details_channels" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_details_offices_order_idx" ON "_pages_v_blocks_contact_details_offices" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_details_offices_parent_id_idx" ON "_pages_v_blocks_contact_details_offices" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_details_order_idx" ON "_pages_v_blocks_contact_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_details_parent_id_idx" ON "_pages_v_blocks_contact_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_details_path_idx" ON "_pages_v_blocks_contact_details" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_platform_downloads_platforms_order_idx" ON "_pages_v_blocks_platform_downloads_platforms" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_platform_downloads_platforms_parent_id_idx" ON "_pages_v_blocks_platform_downloads_platforms" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_platform_downloads_platforms_image_idx" ON "_pages_v_blocks_platform_downloads_platforms" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_platform_downloads_order_idx" ON "_pages_v_blocks_platform_downloads" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_platform_downloads_parent_id_idx" ON "_pages_v_blocks_platform_downloads" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_platform_downloads_path_idx" ON "_pages_v_blocks_platform_downloads" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_knowledge_hero_breadcrumbs_order_idx" ON "_pages_v_blocks_knowledge_hero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_knowledge_hero_breadcrumbs_parent_id_idx" ON "_pages_v_blocks_knowledge_hero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_knowledge_hero_order_idx" ON "_pages_v_blocks_knowledge_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_knowledge_hero_parent_id_idx" ON "_pages_v_blocks_knowledge_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_knowledge_hero_path_idx" ON "_pages_v_blocks_knowledge_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_knowledge_hero_image_idx" ON "_pages_v_blocks_knowledge_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_consultation_showcase_images_order_idx" ON "_pages_v_blocks_consultation_showcase_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_consultation_showcase_images_parent_id_idx" ON "_pages_v_blocks_consultation_showcase_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_consultation_showcase_images_image_idx" ON "_pages_v_blocks_consultation_showcase_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_consultation_showcase_order_idx" ON "_pages_v_blocks_consultation_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_consultation_showcase_parent_id_idx" ON "_pages_v_blocks_consultation_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_consultation_showcase_path_idx" ON "_pages_v_blocks_consultation_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_consultation_showcase_form_idx" ON "_pages_v_blocks_consultation_showcase" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_business_intro_order_idx" ON "_pages_v_blocks_business_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_business_intro_parent_id_idx" ON "_pages_v_blocks_business_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_business_intro_path_idx" ON "_pages_v_blocks_business_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_service_offerings_items_details_order_idx" ON "_pages_v_blocks_service_offerings_items_details" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_offerings_items_details_parent_id_idx" ON "_pages_v_blocks_service_offerings_items_details" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_offerings_items_order_idx" ON "_pages_v_blocks_service_offerings_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_offerings_items_parent_id_idx" ON "_pages_v_blocks_service_offerings_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_offerings_order_idx" ON "_pages_v_blocks_service_offerings" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_service_offerings_parent_id_idx" ON "_pages_v_blocks_service_offerings" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_service_offerings_path_idx" ON "_pages_v_blocks_service_offerings" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_benefits_grid_items_order_idx" ON "_pages_v_blocks_benefits_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_grid_items_parent_id_idx" ON "_pages_v_blocks_benefits_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_grid_order_idx" ON "_pages_v_blocks_benefits_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_benefits_grid_parent_id_idx" ON "_pages_v_blocks_benefits_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_benefits_grid_path_idx" ON "_pages_v_blocks_benefits_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_rich_text_block_order_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_block_parent_id_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_block_path_idx" ON "_pages_v_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_feature_highlights_order_idx" ON "_pages_v_blocks_image_text_feature_highlights" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_feature_highlights_parent_id_idx" ON "_pages_v_blocks_image_text_feature_highlights" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_feature_order_idx" ON "_pages_v_blocks_image_text_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_text_feature_parent_id_idx" ON "_pages_v_blocks_image_text_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_text_feature_path_idx" ON "_pages_v_blocks_image_text_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_text_feature_image_idx" ON "_pages_v_blocks_image_text_feature" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_split_content_list_right_items_order_idx" ON "_pages_v_blocks_split_content_list_right_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_list_right_items_parent_id_idx" ON "_pages_v_blocks_split_content_list_right_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_list_order_idx" ON "_pages_v_blocks_split_content_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_split_content_list_parent_id_idx" ON "_pages_v_blocks_split_content_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_split_content_list_path_idx" ON "_pages_v_blocks_split_content_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_agriculture_feature_order_idx" ON "_pages_v_blocks_agriculture_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_agriculture_feature_parent_id_idx" ON "_pages_v_blocks_agriculture_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_agriculture_feature_path_idx" ON "_pages_v_blocks_agriculture_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_agriculture_feature_image_idx" ON "_pages_v_blocks_agriculture_feature" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_rich_intro_order_idx" ON "_pages_v_blocks_rich_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_intro_parent_id_idx" ON "_pages_v_blocks_rich_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_intro_path_idx" ON "_pages_v_blocks_rich_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_focus_areas_grid_items_order_idx" ON "_pages_v_blocks_focus_areas_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_focus_areas_grid_items_parent_id_idx" ON "_pages_v_blocks_focus_areas_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_focus_areas_grid_items_image_idx" ON "_pages_v_blocks_focus_areas_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_focus_areas_grid_order_idx" ON "_pages_v_blocks_focus_areas_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_focus_areas_grid_parent_id_idx" ON "_pages_v_blocks_focus_areas_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_focus_areas_grid_path_idx" ON "_pages_v_blocks_focus_areas_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hospitality_experience_grid_items_order_idx" ON "_pages_v_blocks_hospitality_experience_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hospitality_experience_grid_items_parent_id_idx" ON "_pages_v_blocks_hospitality_experience_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hospitality_experience_grid_items_image_idx" ON "_pages_v_blocks_hospitality_experience_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_hospitality_experience_grid_order_idx" ON "_pages_v_blocks_hospitality_experience_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hospitality_experience_grid_parent_id_idx" ON "_pages_v_blocks_hospitality_experience_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hospitality_experience_grid_path_idx" ON "_pages_v_blocks_hospitality_experience_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_destination_location_showcase_facts_order_idx" ON "_pages_v_blocks_destination_location_showcase_facts" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_destination_location_showcase_facts_parent_id_idx" ON "_pages_v_blocks_destination_location_showcase_facts" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destination_location_showcase_attractions_order_idx" ON "_pages_v_blocks_destination_location_showcase_attractions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_destination_location_showcase_attractions_parent_id_idx" ON "_pages_v_blocks_destination_location_showcase_attractions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destination_location_showcase_attraction_idx" ON "_pages_v_blocks_destination_location_showcase_attractions" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_destination_location_showcase_order_idx" ON "_pages_v_blocks_destination_location_showcase" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_destination_location_showcase_parent_id_idx" ON "_pages_v_blocks_destination_location_showcase" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_destination_location_showcase_path_idx" ON "_pages_v_blocks_destination_location_showcase" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_destination_location_showcase_image_idx" ON "_pages_v_blocks_destination_location_showcase" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_video_text_feature_order_idx" ON "_pages_v_blocks_video_text_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_text_feature_parent_id_idx" ON "_pages_v_blocks_video_text_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_text_feature_path_idx" ON "_pages_v_blocks_video_text_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_text_feature_thumbnail_idx" ON "_pages_v_blocks_video_text_feature" USING btree ("thumbnail_id");
  CREATE INDEX "_pages_v_blocks_immersive_media_gallery_items_order_idx" ON "_pages_v_blocks_immersive_media_gallery_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_immersive_media_gallery_items_parent_id_idx" ON "_pages_v_blocks_immersive_media_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_immersive_media_gallery_items_image_idx" ON "_pages_v_blocks_immersive_media_gallery_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_immersive_media_gallery_order_idx" ON "_pages_v_blocks_immersive_media_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_immersive_media_gallery_parent_id_idx" ON "_pages_v_blocks_immersive_media_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_immersive_media_gallery_path_idx" ON "_pages_v_blocks_immersive_media_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_band_stats_order_idx" ON "_pages_v_blocks_stats_band_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_band_stats_parent_id_idx" ON "_pages_v_blocks_stats_band_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_band_order_idx" ON "_pages_v_blocks_stats_band" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_band_parent_id_idx" ON "_pages_v_blocks_stats_band" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_band_path_idx" ON "_pages_v_blocks_stats_band" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_grid_leaders_order_idx" ON "_pages_v_blocks_team_grid_leaders" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_grid_leaders_parent_id_idx" ON "_pages_v_blocks_team_grid_leaders" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_grid_leaders_photo_idx" ON "_pages_v_blocks_team_grid_leaders" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_grid_members_order_idx" ON "_pages_v_blocks_team_grid_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_grid_members_parent_id_idx" ON "_pages_v_blocks_team_grid_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_grid_members_photo_idx" ON "_pages_v_blocks_team_grid_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_grid_order_idx" ON "_pages_v_blocks_team_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_grid_parent_id_idx" ON "_pages_v_blocks_team_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_grid_path_idx" ON "_pages_v_blocks_team_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_research_library_notes_order_idx" ON "_pages_v_blocks_research_library_notes" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_research_library_notes_parent_id_idx" ON "_pages_v_blocks_research_library_notes" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_research_library_notes_image_idx" ON "_pages_v_blocks_research_library_notes" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_research_library_notes_file_idx" ON "_pages_v_blocks_research_library_notes" USING btree ("file_id");
  CREATE INDEX "_pages_v_blocks_research_library_order_idx" ON "_pages_v_blocks_research_library" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_research_library_parent_id_idx" ON "_pages_v_blocks_research_library" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_research_library_path_idx" ON "_pages_v_blocks_research_library" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_article_list_items_order_idx" ON "_pages_v_blocks_article_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_article_list_items_parent_id_idx" ON "_pages_v_blocks_article_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_article_list_order_idx" ON "_pages_v_blocks_article_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_article_list_parent_id_idx" ON "_pages_v_blocks_article_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_article_list_path_idx" ON "_pages_v_blocks_article_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_member_profile_credentials_order_idx" ON "_pages_v_blocks_team_member_profile_credentials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_member_profile_credentials_parent_id_idx" ON "_pages_v_blocks_team_member_profile_credentials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_member_profile_order_idx" ON "_pages_v_blocks_team_member_profile" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_member_profile_parent_id_idx" ON "_pages_v_blocks_team_member_profile" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_member_profile_path_idx" ON "_pages_v_blocks_team_member_profile" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_member_profile_photo_idx" ON "_pages_v_blocks_team_member_profile" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_founder_statement_order_idx" ON "_pages_v_blocks_founder_statement" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_founder_statement_parent_id_idx" ON "_pages_v_blocks_founder_statement" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_founder_statement_path_idx" ON "_pages_v_blocks_founder_statement" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_founder_statement_portrait_idx" ON "_pages_v_blocks_founder_statement" USING btree ("portrait_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_business_group_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_business_group_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_hero_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_hero_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_hero_hero_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_section_navigation_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_section_navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_range_tabs_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_range_tabs_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_range_tabs_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_range_tabs_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_range_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_range" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs_feature_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs_table_rows_cells" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabbed_content_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_tabbed_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_primary_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_secondary_button" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_process_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_requirements_checklist_groups_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_requirements_checklist_groups" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_requirements_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_guide_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_guide_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_accordion_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_market_hero_badges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_market_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_licensing_credentials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_licensing_credentials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_investment_path_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_investment_path_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_client_services_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_client_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_account_opening_steps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_account_opening_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_consultation_qualifier" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_market_research_cards_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_market_research_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_group_business_explorer_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_group_business_explorer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_business_group_cards_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_business_group_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_skardu_hotel_feature_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_skardu_hotel_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_account_faq_categories_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_account_faq_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_account_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_ready_when_you_are" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_details_channels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_details_offices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_platform_downloads_platforms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_platform_downloads" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_knowledge_hero_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_knowledge_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_consultation_showcase_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_consultation_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_business_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_offerings_items_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_offerings_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_service_offerings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_benefits_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_benefits_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text_feature_highlights" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_image_text_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_split_content_list_right_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_split_content_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_agriculture_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_focus_areas_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_focus_areas_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hospitality_experience_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hospitality_experience_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_destination_location_showcase_facts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_destination_location_showcase_attractions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_destination_location_showcase" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_text_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_immersive_media_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_immersive_media_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_band_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_band" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_grid_leaders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_grid_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_research_library_notes" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_research_library" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_article_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_article_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_member_profile_credentials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_team_member_profile" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_founder_statement" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_business_group_cards_items" CASCADE;
  DROP TABLE "pages_blocks_business_group_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero_hero_benefits" CASCADE;
  DROP TABLE "_pages_v_blocks_service_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_section_navigation_links" CASCADE;
  DROP TABLE "_pages_v_blocks_section_navigation" CASCADE;
  DROP TABLE "_pages_v_blocks_product_range_tabs_features" CASCADE;
  DROP TABLE "_pages_v_blocks_product_range_tabs_table_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_product_range_tabs_table_rows_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_product_range_tabs_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_product_range_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_product_range" CASCADE;
  DROP TABLE "_pages_v_blocks_tabbed_content_tabs_feature_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_tabbed_content_tabs_table_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_tabbed_content_tabs_table_rows_cells" CASCADE;
  DROP TABLE "_pages_v_blocks_tabbed_content_tabs_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_tabbed_content_tabs" CASCADE;
  DROP TABLE "_pages_v_blocks_tabbed_content" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_primary_button" CASCADE;
  DROP TABLE "_pages_v_blocks_secondary_button" CASCADE;
  DROP TABLE "_pages_v_blocks_process_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_requirements_checklist_groups_items" CASCADE;
  DROP TABLE "_pages_v_blocks_requirements_checklist_groups" CASCADE;
  DROP TABLE "_pages_v_blocks_requirements_checklist" CASCADE;
  DROP TABLE "_pages_v_blocks_guide_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_guide_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_accordion" CASCADE;
  DROP TABLE "_pages_v_blocks_market_hero_badges" CASCADE;
  DROP TABLE "_pages_v_blocks_market_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_licensing_credentials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_licensing_credentials" CASCADE;
  DROP TABLE "_pages_v_blocks_investment_path_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_investment_path_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_client_services_items" CASCADE;
  DROP TABLE "_pages_v_blocks_client_services" CASCADE;
  DROP TABLE "_pages_v_blocks_account_opening_steps_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_account_opening_steps" CASCADE;
  DROP TABLE "_pages_v_blocks_consultation_qualifier" CASCADE;
  DROP TABLE "_pages_v_blocks_market_research_cards_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_market_research_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_group_business_explorer_items" CASCADE;
  DROP TABLE "_pages_v_blocks_group_business_explorer" CASCADE;
  DROP TABLE "_pages_v_blocks_business_group_cards_items" CASCADE;
  DROP TABLE "_pages_v_blocks_business_group_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_skardu_hotel_feature_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_skardu_hotel_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_account_faq_categories_items" CASCADE;
  DROP TABLE "_pages_v_blocks_account_faq_categories" CASCADE;
  DROP TABLE "_pages_v_blocks_account_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_ready_when_you_are" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_details_channels" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_details_offices" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_details" CASCADE;
  DROP TABLE "_pages_v_blocks_platform_downloads_platforms" CASCADE;
  DROP TABLE "_pages_v_blocks_platform_downloads" CASCADE;
  DROP TABLE "_pages_v_blocks_knowledge_hero_breadcrumbs" CASCADE;
  DROP TABLE "_pages_v_blocks_knowledge_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_consultation_showcase_images" CASCADE;
  DROP TABLE "_pages_v_blocks_consultation_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_business_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_service_offerings_items_details" CASCADE;
  DROP TABLE "_pages_v_blocks_service_offerings_items" CASCADE;
  DROP TABLE "_pages_v_blocks_service_offerings" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_benefits_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_block" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_feature_highlights" CASCADE;
  DROP TABLE "_pages_v_blocks_image_text_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content_list_right_items" CASCADE;
  DROP TABLE "_pages_v_blocks_split_content_list" CASCADE;
  DROP TABLE "_pages_v_blocks_agriculture_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_focus_areas_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_focus_areas_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_hospitality_experience_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_hospitality_experience_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_destination_location_showcase_facts" CASCADE;
  DROP TABLE "_pages_v_blocks_destination_location_showcase_attractions" CASCADE;
  DROP TABLE "_pages_v_blocks_destination_location_showcase" CASCADE;
  DROP TABLE "_pages_v_blocks_video_text_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_immersive_media_gallery_items" CASCADE;
  DROP TABLE "_pages_v_blocks_immersive_media_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_band_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_band" CASCADE;
  DROP TABLE "_pages_v_blocks_team_grid_leaders" CASCADE;
  DROP TABLE "_pages_v_blocks_team_grid_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_research_library_notes" CASCADE;
  DROP TABLE "_pages_v_blocks_research_library" CASCADE;
  DROP TABLE "_pages_v_blocks_article_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_article_list" CASCADE;
  DROP TABLE "_pages_v_blocks_team_member_profile_credentials" CASCADE;
  DROP TABLE "_pages_v_blocks_team_member_profile" CASCADE;
  DROP TABLE "_pages_v_blocks_founder_statement" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  ALTER TABLE "pages_blocks_benefits_grid" ALTER COLUMN "background" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_benefits_grid" ALTER COLUMN "background" SET DEFAULT 'sunken'::text;
  DROP TYPE "public"."enum_pages_blocks_benefits_grid_background";
  CREATE TYPE "public"."enum_pages_blocks_benefits_grid_background" AS ENUM('sunken', 'gradient');
  ALTER TABLE "pages_blocks_benefits_grid" ALTER COLUMN "background" SET DEFAULT 'sunken'::"public"."enum_pages_blocks_benefits_grid_background";
  ALTER TABLE "pages_blocks_benefits_grid" ALTER COLUMN "background" SET DATA TYPE "public"."enum_pages_blocks_benefits_grid_background" USING "background"::"public"."enum_pages_blocks_benefits_grid_background";
  DROP INDEX "pages__status_idx";
  ALTER TABLE "pages_blocks_service_hero_breadcrumbs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_service_hero_badges" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_service_hero_hero_benefits" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_service_hero_hero_benefits" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_service_hero" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_section_navigation_links" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_section_navigation_links" ALTER COLUMN "anchor" SET NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs_features" ALTER COLUMN "term" SET NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs_features" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs_table_columns" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs_table_rows_cells" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "pages_blocks_product_range_tabs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_product_range" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_feature_cards" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_feature_cards" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_table_columns" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_table_rows_cells" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content_tabs" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_tabbed_content" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_process_steps_steps" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_primary_button" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_primary_button" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "pages_blocks_secondary_button" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_secondary_button" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "pages_blocks_process_steps" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_requirements_checklist_groups_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_requirements_checklist_groups" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_requirements_checklist" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_guide_accordion_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "pages_blocks_guide_accordion_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "pages_blocks_guide_accordion" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_faq_accordion_items" ALTER COLUMN "question" SET NOT NULL;
  ALTER TABLE "pages_blocks_faq_accordion_items" ALTER COLUMN "answer" SET NOT NULL;
  ALTER TABLE "pages_blocks_faq_accordion" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_market_hero" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_consultation_qualifier" ALTER COLUMN "form_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "icon" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "meta" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_channels" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_offices" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_details_offices" ALTER COLUMN "address" SET NOT NULL;
  ALTER TABLE "pages_blocks_contact_details" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ALTER COLUMN "platform" SET NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_platform_downloads" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_knowledge_hero_breadcrumbs" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_knowledge_hero" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_consultation_showcase_images" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_consultation_showcase_images" ALTER COLUMN "alt" SET NOT NULL;
  ALTER TABLE "pages_blocks_consultation_showcase" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_consultation_showcase" ALTER COLUMN "form_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_business_intro" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_business_intro" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_service_offerings_items_details" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_service_offerings_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_service_offerings" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_benefits_grid_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_benefits_grid_items" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_benefits_grid" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_rich_text_block" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_image_text_feature_highlights" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_image_text_feature" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_image_text_feature" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_image_text_feature" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list_right_items" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list" ALTER COLUMN "left_heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list" ALTER COLUMN "left_body" SET NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list" ALTER COLUMN "right_heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_split_content_list" ALTER COLUMN "right_body" SET NOT NULL;
  ALTER TABLE "pages_blocks_agriculture_feature" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_agriculture_feature" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_agriculture_feature" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_rich_intro" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_rich_intro" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_focus_areas_grid" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_hospitality_experience_grid" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase_facts" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase_facts" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase_attractions" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase_attractions" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_destination_location_showcase" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_video_text_feature" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_video_text_feature" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_video_text_feature" ALTER COLUMN "video_url" SET NOT NULL;
  ALTER TABLE "pages_blocks_video_text_feature" ALTER COLUMN "thumbnail_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_immersive_media_gallery_items" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_stats_band_stats" ALTER COLUMN "value" SET NOT NULL;
  ALTER TABLE "pages_blocks_stats_band_stats" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_grid_leaders" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_grid_leaders" ALTER COLUMN "role" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_grid_members" ALTER COLUMN "name" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_grid_members" ALTER COLUMN "role" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_grid" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_research_library_notes" ALTER COLUMN "category" SET NOT NULL;
  ALTER TABLE "pages_blocks_research_library_notes" ALTER COLUMN "date" SET NOT NULL;
  ALTER TABLE "pages_blocks_research_library_notes" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_research_library_notes" ALTER COLUMN "summary" SET NOT NULL;
  ALTER TABLE "pages_blocks_article_list_items" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages_blocks_article_list_items" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile_credentials" ALTER COLUMN "text" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile" ALTER COLUMN "photo_id" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile" ALTER COLUMN "role" SET NOT NULL;
  ALTER TABLE "pages_blocks_team_member_profile" ALTER COLUMN "body" SET NOT NULL;
  ALTER TABLE "pages_blocks_founder_statement" ALTER COLUMN "quote" SET NOT NULL;
  ALTER TABLE "pages_blocks_founder_statement" ALTER COLUMN "author_name" SET NOT NULL;
  ALTER TABLE "pages_blocks_founder_statement" ALTER COLUMN "author_role" SET NOT NULL;
  ALTER TABLE "pages_blocks_founder_statement" ALTER COLUMN "portrait_id" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  ALTER TABLE "pages" DROP COLUMN "_status";
  DROP TYPE "public"."enum_pages_blocks_business_group_cards_items_icon";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_hero_benefits_icon";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_theme";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_breadcrumb_position";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_primary_variant";
  DROP TYPE "public"."enum__pages_v_blocks_service_hero_secondary_variant";
  DROP TYPE "public"."enum__pages_v_blocks_process_steps_layout_variant";
  DROP TYPE "public"."enum__pages_v_blocks_licensing_credentials_items_variant";
  DROP TYPE "public"."enum__pages_v_blocks_licensing_credentials_layout_variant";
  DROP TYPE "public"."enum__pages_v_blocks_client_services_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_client_services_layout_variant";
  DROP TYPE "public"."enum__pages_v_blocks_consultation_qualifier_form_mode";
  DROP TYPE "public"."enum__pages_v_blocks_group_business_explorer_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_business_group_cards_items_icon";
  DROP TYPE "public"."enum__pages_v_blocks_ready_when_you_are_variant";
  DROP TYPE "public"."enum__pages_v_blocks_contact_details_channels_icon";
  DROP TYPE "public"."enum__pages_v_blocks_consultation_showcase_form_mode";
  DROP TYPE "public"."enum__pages_v_blocks_service_offerings_background";
  DROP TYPE "public"."enum__pages_v_blocks_service_offerings_columns";
  DROP TYPE "public"."enum__pages_v_blocks_benefits_grid_background";
  DROP TYPE "public"."enum__pages_v_blocks_rich_text_block_background";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_feature_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_image_text_feature_background";
  DROP TYPE "public"."enum__pages_v_blocks_agriculture_feature_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_immersive_media_gallery_interval";
  DROP TYPE "public"."enum__pages_v_blocks_stats_band_background";
  DROP TYPE "public"."enum__pages_v_blocks_team_grid_display_variant";
  DROP TYPE "public"."enum__pages_v_blocks_founder_statement_image_position";
  DROP TYPE "public"."enum__pages_v_version_status";`)
}
