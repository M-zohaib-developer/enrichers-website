import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_service_hero_hero_benefits_icon" AS ENUM('fast', 'secure', 'devices', 'markets');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_theme" AS ENUM('dark', 'light');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_hero_variant" AS ENUM('standard', 'platform');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_breadcrumb_position" AS ENUM('top', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_primary_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_service_hero_secondary_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_process_steps_layout_variant" AS ENUM('grid', 'timeline', 'editorial');
  CREATE TYPE "public"."enum_pages_blocks_licensing_credentials_items_variant" AS ENUM('entity', 'documents');
  CREATE TYPE "public"."enum_pages_blocks_licensing_credentials_layout_variant" AS ENUM('cards', 'split');
  CREATE TYPE "public"."enum_pages_blocks_client_services_items_icon" AS ENUM('people', 'chart', 'scale', 'globe', 'compass', 'ledger');
  CREATE TYPE "public"."enum_pages_blocks_client_services_layout_variant" AS ENUM('grid', 'featureList');
  CREATE TYPE "public"."enum_pages_blocks_consultation_qualifier_form_mode" AS ENUM('wizard', 'singlePage');
  CREATE TYPE "public"."enum_pages_blocks_group_business_explorer_items_icon" AS ENUM('document', 'development', 'agriculture', 'research', 'hospitality');
  CREATE TYPE "public"."enum_pages_blocks_ready_when_you_are_variant" AS ENUM('darkCard', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_contact_details_channels_icon" AS ENUM('phone', 'message', 'mail', 'mapPin', 'building');
  CREATE TYPE "public"."enum_pages_blocks_consultation_showcase_form_mode" AS ENUM('wizard', 'singlePage');
  CREATE TYPE "public"."enum_pages_blocks_service_offerings_background" AS ENUM('light', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_service_offerings_columns" AS ENUM('2', '3');
  CREATE TYPE "public"."enum_pages_blocks_benefits_grid_background" AS ENUM('sunken', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_rich_text_block_background" AS ENUM('white', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_image_text_feature_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_image_text_feature_background" AS ENUM('surface', 'sunken');
  CREATE TYPE "public"."enum_pages_blocks_agriculture_feature_image_position" AS ENUM('right', 'left');
  CREATE TYPE "public"."enum_pages_blocks_immersive_media_gallery_interval" AS ENUM('4000', '5000', '6000');
  CREATE TYPE "public"."enum_pages_blocks_stats_band_background" AS ENUM('inverse', 'surface', 'sunken');
  CREATE TYPE "public"."enum_pages_blocks_team_grid_display_variant" AS ENUM('legacy', 'candidate');
  CREATE TYPE "public"."enum_pages_blocks_founder_statement_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_forms_submit_button_color" AS ENUM('primary', 'dark', 'outline', 'ghost');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'linkedin', 'instagram', 'threads', 'youtube');
  CREATE TABLE "pages_blocks_service_hero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_service_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_hero_hero_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_service_hero_hero_benefits_icon" DEFAULT 'fast',
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"theme" "enum_pages_blocks_service_hero_theme" DEFAULT 'dark',
  	"hero_variant" "enum_pages_blocks_service_hero_hero_variant" DEFAULT 'standard',
  	"breadcrumb_position" "enum_pages_blocks_service_hero_breadcrumb_position" DEFAULT 'top',
  	"show_bottom_border" boolean DEFAULT true,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"heading_accent" varchar,
  	"body" varchar,
  	"hero_image_id" integer,
  	"primary_label" varchar,
  	"primary_url" varchar,
  	"primary_variant" "enum_pages_blocks_service_hero_primary_variant" DEFAULT 'primary',
  	"secondary_label" varchar,
  	"secondary_url" varchar,
  	"secondary_variant" "enum_pages_blocks_service_hero_secondary_variant" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section_navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"anchor" varchar NOT NULL,
  	"active" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_section_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"aria_label" varchar DEFAULT 'On this page',
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_range_tabs_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"term" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_product_range_tabs_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_product_range_tabs_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_product_range_tabs_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_product_range_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"quote" varchar,
  	"table_caption" varchar
  );
  
  CREATE TABLE "pages_blocks_product_range" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'products',
  	"eyebrow" varchar DEFAULT 'Product range',
  	"heading" varchar NOT NULL,
  	"body" varchar,
  	"disclosure_text" varchar,
  	"disclosure_label" varchar DEFAULT 'Read the disclosures',
  	"disclosure_url" varchar DEFAULT '/regulation',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_tabbed_content_tabs_feature_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tabbed_content_tabs_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tabbed_content_tabs_table_rows_cells" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tabbed_content_tabs_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_tabbed_content_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"quote" varchar,
  	"table_caption" varchar
  );
  
  CREATE TABLE "pages_blocks_tabbed_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'products',
  	"eyebrow" varchar DEFAULT 'What you can do',
  	"heading" varchar NOT NULL,
  	"body" varchar,
  	"default_tab" numeric DEFAULT 0,
  	"disclosure_text" varchar,
  	"disclosure_label" varchar DEFAULT 'Read the disclosures',
  	"disclosure_url" varchar DEFAULT '/regulation',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_primary_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_secondary_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'process',
  	"eyebrow" varchar DEFAULT 'Account opening',
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"layout_variant" "enum_pages_blocks_process_steps_layout_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_requirements_checklist_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_requirements_checklist_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_requirements_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'documents',
  	"eyebrow" varchar DEFAULT 'Documentation',
  	"heading" varchar DEFAULT 'What you''ll need' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_guide_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_guide_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'guide',
  	"eyebrow" varchar DEFAULT 'Commodity trading guide',
  	"heading" varchar NOT NULL,
  	"intro" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_accordion_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'faq',
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"block_name" varchar
  );
  
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
  	"heading_accent" varchar DEFAULT 'with a licensed broker beside you.',
  	"heading_line_one" varchar DEFAULT 'Trade Pakistan''s',
  	"heading_line_two" varchar DEFAULT 'markets with a licensed',
  	"heading_line_three" varchar DEFAULT 'broker beside you.',
  	"body" varchar DEFAULT 'Invest in PSX equities, or trade gold, oil, currencies and US index futures on PMEX — with research, risk management and client support 24/5.',
  	"show_buttons" boolean DEFAULT true,
  	"hero_image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_licensing_credentials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"note" varchar,
  	"url" varchar,
  	"file_id" integer,
  	"link_label" varchar DEFAULT 'View documents',
  	"variant" "enum_pages_blocks_licensing_credentials_items_variant" DEFAULT 'entity'
  );
  
  CREATE TABLE "pages_blocks_licensing_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar DEFAULT 'Licensed, and published openly',
  	"heading" varchar,
  	"body" varchar,
  	"layout_variant" "enum_pages_blocks_licensing_credentials_layout_variant" DEFAULT 'cards',
  	"disclosure_text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_investment_path_cards_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar,
  	"title" varchar,
  	"body" varchar,
  	"supporting_label" varchar,
  	"action_label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_investment_path_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Three ways to start',
  	"heading" varchar DEFAULT 'What would you like to do?',
  	"card_action_label" varchar DEFAULT 'Explore →',
  	"body" varchar DEFAULT 'Choose the market you want to trade — or tell us your goals and we''ll recommend a path.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_client_services_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"icon" "enum_pages_blocks_client_services_items_icon" DEFAULT 'people'
  );
  
  CREATE TABLE "pages_blocks_client_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Client services',
  	"heading" varchar DEFAULT 'What you get with Enrichers',
  	"layout_variant" "enum_pages_blocks_client_services_layout_variant" DEFAULT 'grid',
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
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_consultation_qualifier" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Investor enquiries',
  	"heading" varchar DEFAULT 'Talk to us about the project',
  	"subheading" varchar,
  	"phone" varchar DEFAULT '(042) 111 111 333',
  	"phone_href" varchar DEFAULT 'tel:+9242111111333',
  	"whatsapp_url" varchar DEFAULT 'https://api.whatsapp.com/send?phone=9242111111333',
  	"whatsapp_label" varchar DEFAULT 'WhatsApp our client support',
  	"hours" varchar DEFAULT 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
  	"form_mode" "enum_pages_blocks_consultation_qualifier_form_mode" DEFAULT 'wizard',
  	"form_step_label" varchar DEFAULT 'Step 1 of 4 · Demo — nothing is submitted',
  	"form_heading" varchar DEFAULT 'Let''s find the right investment path for you',
  	"form_intro" varchar DEFAULT 'Just a few quick questions, so we don''t waste your time.',
  	"terms_url" varchar,
  	"terms_label" varchar DEFAULT 'Terms & Conditions',
  	"form_id" integer NOT NULL,
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
  	"url" varchar,
  	"icon" "enum_pages_blocks_group_business_explorer_items_icon" DEFAULT 'document'
  );
  
  CREATE TABLE "pages_blocks_group_business_explorer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Beyond brokerage',
  	"heading" varchar DEFAULT 'Part of a diversified investment group',
  	"body" varchar DEFAULT 'Enrichers also builds real assets — land, farms and hospitality — and advises on buying and selling businesses.',
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
  	"image_caption" varchar DEFAULT 'Architectural visualisation',
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
  	"variant" "enum_pages_blocks_ready_when_you_are_variant" DEFAULT 'darkCard',
  	"body" varchar DEFAULT 'Open a PSX or PMEX account online, or speak to our team first.',
  	"risk_notice" varchar DEFAULT 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Regulated by the SECP.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_details_channels" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pages_blocks_contact_details_channels_icon" DEFAULT 'phone' NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"meta" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_details_offices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"phone" varchar,
  	"hours" varchar
  );
  
  CREATE TABLE "pages_blocks_contact_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'contact',
  	"heading" varchar DEFAULT 'Ways to reach us' NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_platform_downloads_platforms" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_blocks_platform_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'downloads',
  	"eyebrow" varchar DEFAULT 'Download MetaTrader 5',
  	"heading" varchar DEFAULT 'Trade on the device that suits you' NOT NULL,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_knowledge_hero_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_knowledge_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Knowledge center',
  	"heading" varchar DEFAULT 'Frequently Asked Questions' NOT NULL,
  	"body" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_consultation_showcase_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_consultation_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'consultation',
  	"eyebrow" varchar DEFAULT 'Free consultation',
  	"heading" varchar DEFAULT 'Get free consultation today' NOT NULL,
  	"subheading" varchar,
  	"phone" varchar DEFAULT '(042) 111 111 333',
  	"phone_href" varchar DEFAULT 'tel:+9242111111333',
  	"whatsapp_url" varchar DEFAULT 'https://api.whatsapp.com/send?phone=9242111111333',
  	"whatsapp_label" varchar DEFAULT 'WhatsApp our client support',
  	"hours" varchar DEFAULT 'Monday – Friday, 24/5 · Saturday, Sunday & public holidays closed',
  	"form_step_label" varchar DEFAULT 'Step 1 of 4 · Demo — nothing is submitted',
  	"form_heading" varchar DEFAULT 'Let''s find the right investment path for you',
  	"form_intro" varchar DEFAULT 'Just a few quick questions, so we don''t waste your time.',
  	"form_mode" "enum_pages_blocks_consultation_showcase_form_mode" DEFAULT 'wizard',
  	"reassurance" varchar,
  	"form_id" integer NOT NULL,
  	"interval_seconds" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_business_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Business Brokerage' NOT NULL,
  	"body" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_service_offerings_items_details" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_service_offerings_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar
  );
  
  CREATE TABLE "pages_blocks_service_offerings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar DEFAULT 'EIG Offerings',
  	"heading" varchar DEFAULT 'Services for every stage of a business journey' NOT NULL,
  	"body" varchar,
  	"background" "enum_pages_blocks_service_offerings_background" DEFAULT 'light',
  	"columns" "enum_pages_blocks_service_offerings_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_benefits_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_benefits_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Benefits of Working with Enrichers' NOT NULL,
  	"show_header" boolean DEFAULT true,
  	"body" varchar,
  	"background" "enum_pages_blocks_benefits_grid_background" DEFAULT 'sunken',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'guide',
  	"heading" varchar,
  	"background" "enum_pages_blocks_rich_text_block_background" DEFAULT 'white',
  	"show_accent_bar" boolean DEFAULT true,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_image_text_feature_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_image_text_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Turning barren landscapes into flourishing fields' NOT NULL,
  	"body" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"image_position" "enum_pages_blocks_image_text_feature_image_position" DEFAULT 'right',
  	"attribution_name" varchar,
  	"attribution_role" varchar,
  	"portrait" boolean DEFAULT false,
  	"background" "enum_pages_blocks_image_text_feature_background" DEFAULT 'surface',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_split_content_list_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_split_content_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"left_heading" varchar NOT NULL,
  	"left_body" varchar NOT NULL,
  	"right_heading" varchar NOT NULL,
  	"right_body" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_agriculture_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"image_position" "enum_pages_blocks_agriculture_feature_image_position" DEFAULT 'right',
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_rich_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_focus_areas_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_focus_areas_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Key Focus Areas' NOT NULL,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_hospitality_experience_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hospitality_experience_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Designed around the destination experience' NOT NULL,
  	"body" varchar,
  	"closing_line" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_destination_location_showcase_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_destination_location_showcase_attractions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"title" varchar NOT NULL,
  	"body" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_destination_location_showcase" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'A location defined by nature' NOT NULL,
  	"body" varchar NOT NULL,
  	"supporting_text" varchar,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"image_caption" varchar,
  	"image_caption_detail" varchar,
  	"attractions_intro" varchar,
  	"block_name" varchar
  );
  
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
  
  CREATE TABLE "pages_blocks_immersive_media_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_immersive_media_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"autoplay" boolean DEFAULT true,
  	"interval" "enum_pages_blocks_immersive_media_gallery_interval" DEFAULT '5000',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_band_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_stats_band" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"background" "enum_pages_blocks_stats_band_background" DEFAULT 'inverse',
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid_leaders" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"profile_url" varchar,
  	"bio" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"photo_id" integer,
  	"profile_url" varchar
  );
  
  CREATE TABLE "pages_blocks_team_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"heading" varchar DEFAULT 'Meet the team' NOT NULL,
  	"body" varchar,
  	"display_variant" "enum_pages_blocks_team_grid_display_variant" DEFAULT 'legacy',
  	"leadership_eyebrow" varchar,
  	"leadership_heading" varchar,
  	"leadership_body" varchar,
  	"leadership_cta_label" varchar,
  	"leadership_cta_url" varchar,
  	"management_eyebrow" varchar,
  	"management_heading" varchar,
  	"management_body" varchar,
  	"block_name" varchar
  );
  
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
  
  CREATE TABLE "pages_blocks_research_library" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'notes',
  	"eyebrow" varchar DEFAULT 'Research library',
  	"heading" varchar DEFAULT 'All research notes',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_article_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_article_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'articles',
  	"heading" varchar DEFAULT 'Articles',
  	"link_label" varchar DEFAULT 'All articles',
  	"link_url" varchar DEFAULT '/blogs/',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_member_profile_credentials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"link_label" varchar,
  	"link_url" varchar
  );
  
  CREATE TABLE "pages_blocks_team_member_profile" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar DEFAULT 'profile',
  	"eyebrow" varchar DEFAULT 'Team details',
  	"heading" varchar NOT NULL,
  	"photo_id" integer NOT NULL,
  	"role" varchar NOT NULL,
  	"company_label" varchar,
  	"company_url" varchar,
  	"body" jsonb NOT NULL,
  	"back_link_label" varchar DEFAULT 'Back to our team',
  	"back_link_url" varchar DEFAULT '/enrichers-team/',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_founder_statement" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"eyebrow" varchar,
  	"quote" varchar NOT NULL,
  	"body" varchar,
  	"author_name" varchar NOT NULL,
  	"author_role" varchar NOT NULL,
  	"portrait_id" integer NOT NULL,
  	"image_position" "enum_pages_blocks_founder_statement_image_position",
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"submit_button_color" "enum_forms_submit_button_color" DEFAULT 'primary',
  	"submit_button_icon" varchar,
  	"step1_heading" varchar,
  	"step1_intro" varchar,
  	"step2_heading" varchar,
  	"step2_intro" varchar,
  	"step3_heading" varchar,
  	"step3_intro" varchar,
  	"step4_heading" varchar,
  	"step4_intro" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"users_id" integer,
  	"media_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_groups_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar DEFAULT '/' NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "header_nav_items_groups" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar,
  	"feature_enabled" boolean DEFAULT false,
  	"feature_eyebrow" varchar,
  	"feature_title" varchar,
  	"feature_href" varchar DEFAULT '/',
  	"feature_link_label" varchar DEFAULT 'Read more'
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"consultation_link_link_label" varchar,
  	"consultation_link_link_url" varchar DEFAULT '/',
  	"consultation_link_link_file_id" integer,
  	"consultation_link_link_new_tab" boolean DEFAULT false,
  	"cta_button_link_label" varchar,
  	"cta_button_link_url" varchar DEFAULT '/',
  	"cta_button_link_file_id" integer,
  	"cta_button_link_new_tab" boolean DEFAULT false,
  	"contact_phone" varchar DEFAULT '(042) 111 111 333',
  	"contact_phone_href" varchar DEFAULT 'tel:+9242111111333',
  	"contact_whatsapp_url" varchar DEFAULT 'https://api.whatsapp.com/send?phone=9242111111333',
  	"contact_whatsapp_label" varchar DEFAULT 'WhatsApp our client support',
  	"risk_notice_enabled" boolean DEFAULT true,
  	"risk_notice_lead" varchar DEFAULT 'Risk notice:',
  	"risk_notice_body" varchar DEFAULT 'Trading in futures and financial markets carries inherent risk. No guaranteed returns. Enrichers operates under SECP regulatory oversight; content is for information and education, not personalised advice.',
  	"trade_invest_label" varchar,
  	"trade_invest_promo_card_enabled" boolean,
  	"trade_invest_promo_card_title" varchar,
  	"trade_invest_promo_card_description" varchar,
  	"trade_invest_promo_card_link_label" varchar,
  	"trade_invest_promo_card_link_url" varchar,
  	"trade_invest_promo_card_link_new_tab" boolean,
  	"the_group_label" varchar,
  	"about_label" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_trade_invest_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_url" varchar DEFAULT '/',
  	"link_file_id" integer,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_the_group_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_url" varchar DEFAULT '/',
  	"link_file_id" integer,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_insights_learning_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_url" varchar DEFAULT '/',
  	"link_file_id" integer,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_company_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_url" varchar DEFAULT '/',
  	"link_file_id" integer,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_regulation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_url" varchar DEFAULT '/',
  	"link_file_id" integer,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer_legal_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lead" varchar,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE "footer_bottom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_label" varchar NOT NULL,
  	"link_url" varchar DEFAULT '/',
  	"link_file_id" integer,
  	"link_new_tab" boolean DEFAULT false
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"description" varchar DEFAULT 'Enrichers, your trusted partner in financial success.',
  	"phone" varchar DEFAULT '(042) 111 111 333',
  	"phone_href" varchar DEFAULT 'tel:+9242111111333',
  	"email" varchar DEFAULT 'connect@enrichers.com.pk',
  	"whatsapp_url" varchar DEFAULT 'https://api.whatsapp.com/send?phone=9242111111333',
  	"whatsapp_label" varchar DEFAULT 'WhatsApp',
  	"trade_invest_label" varchar DEFAULT 'Trade & invest' NOT NULL,
  	"the_group_label" varchar DEFAULT 'The group' NOT NULL,
  	"insights_learning_label" varchar DEFAULT 'Insights & learning' NOT NULL,
  	"company_label" varchar DEFAULT 'Company' NOT NULL,
  	"regulation_title" varchar DEFAULT 'Regulation & disclosures',
  	"offices_line" varchar DEFAULT 'Head Office: Lahore · Islamabad Office · UAE Office',
  	"copyright_text" varchar DEFAULT '© 2026 Enrichers Investment Group. All rights reserved.',
  	"entity_names" varchar,
  	"disclaimer" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages_blocks_service_hero_breadcrumbs" ADD CONSTRAINT "pages_blocks_service_hero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero_badges" ADD CONSTRAINT "pages_blocks_service_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero_hero_benefits" ADD CONSTRAINT "pages_blocks_service_hero_hero_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero" ADD CONSTRAINT "pages_blocks_service_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_hero" ADD CONSTRAINT "pages_blocks_service_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_navigation_links" ADD CONSTRAINT "pages_blocks_section_navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_section_navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_navigation" ADD CONSTRAINT "pages_blocks_section_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_range_tabs_features" ADD CONSTRAINT "pages_blocks_product_range_tabs_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_range_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_range_tabs_table_columns" ADD CONSTRAINT "pages_blocks_product_range_tabs_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_range_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_range_tabs_table_rows_cells" ADD CONSTRAINT "pages_blocks_product_range_tabs_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_range_tabs_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_range_tabs_table_rows" ADD CONSTRAINT "pages_blocks_product_range_tabs_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_range_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_range_tabs" ADD CONSTRAINT "pages_blocks_product_range_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_range"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_range" ADD CONSTRAINT "pages_blocks_product_range_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_feature_cards" ADD CONSTRAINT "pages_blocks_tabbed_content_tabs_feature_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabbed_content_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_table_columns" ADD CONSTRAINT "pages_blocks_tabbed_content_tabs_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabbed_content_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_table_rows_cells" ADD CONSTRAINT "pages_blocks_tabbed_content_tabs_table_rows_cells_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabbed_content_tabs_table_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabbed_content_tabs_table_rows" ADD CONSTRAINT "pages_blocks_tabbed_content_tabs_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabbed_content_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabbed_content_tabs" ADD CONSTRAINT "pages_blocks_tabbed_content_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_tabbed_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_tabbed_content" ADD CONSTRAINT "pages_blocks_tabbed_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps_steps" ADD CONSTRAINT "pages_blocks_process_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_primary_button" ADD CONSTRAINT "pages_blocks_primary_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_secondary_button" ADD CONSTRAINT "pages_blocks_secondary_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_process_steps" ADD CONSTRAINT "pages_blocks_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_requirements_checklist_groups_items" ADD CONSTRAINT "pages_blocks_requirements_checklist_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_requirements_checklist_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_requirements_checklist_groups" ADD CONSTRAINT "pages_blocks_requirements_checklist_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_requirements_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_requirements_checklist" ADD CONSTRAINT "pages_blocks_requirements_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_guide_accordion_items" ADD CONSTRAINT "pages_blocks_guide_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_guide_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_guide_accordion" ADD CONSTRAINT "pages_blocks_guide_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion_items" ADD CONSTRAINT "pages_blocks_faq_accordion_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_accordion" ADD CONSTRAINT "pages_blocks_faq_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_market_hero_badges" ADD CONSTRAINT "pages_blocks_market_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_market_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_market_hero" ADD CONSTRAINT "pages_blocks_market_hero_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_market_hero" ADD CONSTRAINT "pages_blocks_market_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_licensing_credentials_items" ADD CONSTRAINT "pages_blocks_licensing_credentials_items_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_licensing_credentials_items" ADD CONSTRAINT "pages_blocks_licensing_credentials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_licensing_credentials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_licensing_credentials" ADD CONSTRAINT "pages_blocks_licensing_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_investment_path_cards_cards" ADD CONSTRAINT "pages_blocks_investment_path_cards_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_investment_path_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_investment_path_cards" ADD CONSTRAINT "pages_blocks_investment_path_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_client_services_items" ADD CONSTRAINT "pages_blocks_client_services_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_client_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_client_services" ADD CONSTRAINT "pages_blocks_client_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_account_opening_steps_steps" ADD CONSTRAINT "pages_blocks_account_opening_steps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_account_opening_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_account_opening_steps" ADD CONSTRAINT "pages_blocks_account_opening_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation_qualifier" ADD CONSTRAINT "pages_blocks_consultation_qualifier_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "pages_blocks_contact_details_channels" ADD CONSTRAINT "pages_blocks_contact_details_channels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_details_offices" ADD CONSTRAINT "pages_blocks_contact_details_offices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_details" ADD CONSTRAINT "pages_blocks_contact_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ADD CONSTRAINT "pages_blocks_platform_downloads_platforms_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_platform_downloads_platforms" ADD CONSTRAINT "pages_blocks_platform_downloads_platforms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_platform_downloads"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_platform_downloads" ADD CONSTRAINT "pages_blocks_platform_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_knowledge_hero_breadcrumbs" ADD CONSTRAINT "pages_blocks_knowledge_hero_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_knowledge_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_knowledge_hero" ADD CONSTRAINT "pages_blocks_knowledge_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_knowledge_hero" ADD CONSTRAINT "pages_blocks_knowledge_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation_showcase_images" ADD CONSTRAINT "pages_blocks_consultation_showcase_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation_showcase_images" ADD CONSTRAINT "pages_blocks_consultation_showcase_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_consultation_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation_showcase" ADD CONSTRAINT "pages_blocks_consultation_showcase_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_consultation_showcase" ADD CONSTRAINT "pages_blocks_consultation_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_business_intro" ADD CONSTRAINT "pages_blocks_business_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_offerings_items_details" ADD CONSTRAINT "pages_blocks_service_offerings_items_details_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_offerings_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_offerings_items" ADD CONSTRAINT "pages_blocks_service_offerings_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_service_offerings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_service_offerings" ADD CONSTRAINT "pages_blocks_service_offerings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_grid_items" ADD CONSTRAINT "pages_blocks_benefits_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_benefits_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_benefits_grid" ADD CONSTRAINT "pages_blocks_benefits_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_text_block" ADD CONSTRAINT "pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_feature_highlights" ADD CONSTRAINT "pages_blocks_image_text_feature_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_text_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_feature" ADD CONSTRAINT "pages_blocks_image_text_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_text_feature" ADD CONSTRAINT "pages_blocks_image_text_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_list_right_items" ADD CONSTRAINT "pages_blocks_split_content_list_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_split_content_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_split_content_list" ADD CONSTRAINT "pages_blocks_split_content_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agriculture_feature" ADD CONSTRAINT "pages_blocks_agriculture_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_agriculture_feature" ADD CONSTRAINT "pages_blocks_agriculture_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_rich_intro" ADD CONSTRAINT "pages_blocks_rich_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ADD CONSTRAINT "pages_blocks_focus_areas_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_focus_areas_grid_items" ADD CONSTRAINT "pages_blocks_focus_areas_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_focus_areas_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_focus_areas_grid" ADD CONSTRAINT "pages_blocks_focus_areas_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ADD CONSTRAINT "pages_blocks_hospitality_experience_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hospitality_experience_grid_items" ADD CONSTRAINT "pages_blocks_hospitality_experience_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hospitality_experience_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hospitality_experience_grid" ADD CONSTRAINT "pages_blocks_hospitality_experience_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_location_showcase_facts" ADD CONSTRAINT "pages_blocks_destination_location_showcase_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_destination_location_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_location_showcase_attractions" ADD CONSTRAINT "pages_blocks_destination_location_showcase_attractions_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_location_showcase_attractions" ADD CONSTRAINT "pages_blocks_destination_location_showcase_attractions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_destination_location_showcase"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_location_showcase" ADD CONSTRAINT "pages_blocks_destination_location_showcase_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_destination_location_showcase" ADD CONSTRAINT "pages_blocks_destination_location_showcase_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_text_feature" ADD CONSTRAINT "pages_blocks_video_text_feature_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_text_feature" ADD CONSTRAINT "pages_blocks_video_text_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_immersive_media_gallery_items" ADD CONSTRAINT "pages_blocks_immersive_media_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_immersive_media_gallery_items" ADD CONSTRAINT "pages_blocks_immersive_media_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_immersive_media_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_immersive_media_gallery" ADD CONSTRAINT "pages_blocks_immersive_media_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_band_stats" ADD CONSTRAINT "pages_blocks_stats_band_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_band"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_band" ADD CONSTRAINT "pages_blocks_stats_band_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_leaders" ADD CONSTRAINT "pages_blocks_team_grid_leaders_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_leaders" ADD CONSTRAINT "pages_blocks_team_grid_leaders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_members" ADD CONSTRAINT "pages_blocks_team_grid_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid_members" ADD CONSTRAINT "pages_blocks_team_grid_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_grid" ADD CONSTRAINT "pages_blocks_team_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_library_notes" ADD CONSTRAINT "pages_blocks_research_library_notes_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_library_notes" ADD CONSTRAINT "pages_blocks_research_library_notes_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_library_notes" ADD CONSTRAINT "pages_blocks_research_library_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_research_library"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_research_library" ADD CONSTRAINT "pages_blocks_research_library_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_list_items" ADD CONSTRAINT "pages_blocks_article_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_article_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_article_list" ADD CONSTRAINT "pages_blocks_article_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_member_profile_credentials" ADD CONSTRAINT "pages_blocks_team_member_profile_credentials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_member_profile"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_member_profile" ADD CONSTRAINT "pages_blocks_team_member_profile_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_member_profile" ADD CONSTRAINT "pages_blocks_team_member_profile_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_statement" ADD CONSTRAINT "pages_blocks_founder_statement_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_founder_statement" ADD CONSTRAINT "pages_blocks_founder_statement_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_groups_items" ADD CONSTRAINT "header_nav_items_groups_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_groups" ADD CONSTRAINT "header_nav_items_groups_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_consultation_link_link_file_id_media_id_fk" FOREIGN KEY ("consultation_link_link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_button_link_file_id_media_id_fk" FOREIGN KEY ("cta_button_link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_trade_invest_links" ADD CONSTRAINT "footer_trade_invest_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_trade_invest_links" ADD CONSTRAINT "footer_trade_invest_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_the_group_links" ADD CONSTRAINT "footer_the_group_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_the_group_links" ADD CONSTRAINT "footer_the_group_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_insights_learning_links" ADD CONSTRAINT "footer_insights_learning_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_insights_learning_links" ADD CONSTRAINT "footer_insights_learning_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_company_links" ADD CONSTRAINT "footer_company_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_company_links" ADD CONSTRAINT "footer_company_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_regulation_links" ADD CONSTRAINT "footer_regulation_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_regulation_links" ADD CONSTRAINT "footer_regulation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_paragraphs" ADD CONSTRAINT "footer_legal_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_link_file_id_media_id_fk" FOREIGN KEY ("link_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_bottom_links" ADD CONSTRAINT "footer_bottom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_service_hero_breadcrumbs_order_idx" ON "pages_blocks_service_hero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_breadcrumbs_parent_id_idx" ON "pages_blocks_service_hero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_badges_order_idx" ON "pages_blocks_service_hero_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_badges_parent_id_idx" ON "pages_blocks_service_hero_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_hero_benefits_order_idx" ON "pages_blocks_service_hero_hero_benefits" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_hero_benefits_parent_id_idx" ON "pages_blocks_service_hero_hero_benefits" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_order_idx" ON "pages_blocks_service_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_hero_parent_id_idx" ON "pages_blocks_service_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_hero_path_idx" ON "pages_blocks_service_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_hero_hero_image_idx" ON "pages_blocks_service_hero" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_section_navigation_links_order_idx" ON "pages_blocks_section_navigation_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_navigation_links_parent_id_idx" ON "pages_blocks_section_navigation_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_navigation_order_idx" ON "pages_blocks_section_navigation" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_navigation_parent_id_idx" ON "pages_blocks_section_navigation" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_navigation_path_idx" ON "pages_blocks_section_navigation" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_range_tabs_features_order_idx" ON "pages_blocks_product_range_tabs_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_range_tabs_features_parent_id_idx" ON "pages_blocks_product_range_tabs_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_range_tabs_table_columns_order_idx" ON "pages_blocks_product_range_tabs_table_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_range_tabs_table_columns_parent_id_idx" ON "pages_blocks_product_range_tabs_table_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_range_tabs_table_rows_cells_order_idx" ON "pages_blocks_product_range_tabs_table_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_range_tabs_table_rows_cells_parent_id_idx" ON "pages_blocks_product_range_tabs_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_range_tabs_table_rows_order_idx" ON "pages_blocks_product_range_tabs_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_range_tabs_table_rows_parent_id_idx" ON "pages_blocks_product_range_tabs_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_range_tabs_order_idx" ON "pages_blocks_product_range_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_range_tabs_parent_id_idx" ON "pages_blocks_product_range_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_range_order_idx" ON "pages_blocks_product_range" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_range_parent_id_idx" ON "pages_blocks_product_range" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_range_path_idx" ON "pages_blocks_product_range" USING btree ("_path");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_feature_cards_order_idx" ON "pages_blocks_tabbed_content_tabs_feature_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_feature_cards_parent_id_idx" ON "pages_blocks_tabbed_content_tabs_feature_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_table_columns_order_idx" ON "pages_blocks_tabbed_content_tabs_table_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_table_columns_parent_id_idx" ON "pages_blocks_tabbed_content_tabs_table_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_table_rows_cells_order_idx" ON "pages_blocks_tabbed_content_tabs_table_rows_cells" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_table_rows_cells_parent_id_idx" ON "pages_blocks_tabbed_content_tabs_table_rows_cells" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_table_rows_order_idx" ON "pages_blocks_tabbed_content_tabs_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_table_rows_parent_id_idx" ON "pages_blocks_tabbed_content_tabs_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_order_idx" ON "pages_blocks_tabbed_content_tabs" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabbed_content_tabs_parent_id_idx" ON "pages_blocks_tabbed_content_tabs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabbed_content_order_idx" ON "pages_blocks_tabbed_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_tabbed_content_parent_id_idx" ON "pages_blocks_tabbed_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_tabbed_content_path_idx" ON "pages_blocks_tabbed_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_steps_order_idx" ON "pages_blocks_process_steps_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_steps_parent_id_idx" ON "pages_blocks_process_steps_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_primary_button_order_idx" ON "pages_blocks_primary_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_primary_button_parent_id_idx" ON "pages_blocks_primary_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_primary_button_path_idx" ON "pages_blocks_primary_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_secondary_button_order_idx" ON "pages_blocks_secondary_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_secondary_button_parent_id_idx" ON "pages_blocks_secondary_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_secondary_button_path_idx" ON "pages_blocks_secondary_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_process_steps_order_idx" ON "pages_blocks_process_steps" USING btree ("_order");
  CREATE INDEX "pages_blocks_process_steps_parent_id_idx" ON "pages_blocks_process_steps" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_process_steps_path_idx" ON "pages_blocks_process_steps" USING btree ("_path");
  CREATE INDEX "pages_blocks_requirements_checklist_groups_items_order_idx" ON "pages_blocks_requirements_checklist_groups_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_requirements_checklist_groups_items_parent_id_idx" ON "pages_blocks_requirements_checklist_groups_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_requirements_checklist_groups_order_idx" ON "pages_blocks_requirements_checklist_groups" USING btree ("_order");
  CREATE INDEX "pages_blocks_requirements_checklist_groups_parent_id_idx" ON "pages_blocks_requirements_checklist_groups" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_requirements_checklist_order_idx" ON "pages_blocks_requirements_checklist" USING btree ("_order");
  CREATE INDEX "pages_blocks_requirements_checklist_parent_id_idx" ON "pages_blocks_requirements_checklist" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_requirements_checklist_path_idx" ON "pages_blocks_requirements_checklist" USING btree ("_path");
  CREATE INDEX "pages_blocks_guide_accordion_items_order_idx" ON "pages_blocks_guide_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_guide_accordion_items_parent_id_idx" ON "pages_blocks_guide_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_guide_accordion_order_idx" ON "pages_blocks_guide_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_guide_accordion_parent_id_idx" ON "pages_blocks_guide_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_guide_accordion_path_idx" ON "pages_blocks_guide_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_accordion_items_order_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_items_parent_id_idx" ON "pages_blocks_faq_accordion_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_order_idx" ON "pages_blocks_faq_accordion" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_accordion_parent_id_idx" ON "pages_blocks_faq_accordion" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_accordion_path_idx" ON "pages_blocks_faq_accordion" USING btree ("_path");
  CREATE INDEX "pages_blocks_market_hero_badges_order_idx" ON "pages_blocks_market_hero_badges" USING btree ("_order");
  CREATE INDEX "pages_blocks_market_hero_badges_parent_id_idx" ON "pages_blocks_market_hero_badges" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_market_hero_order_idx" ON "pages_blocks_market_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_market_hero_parent_id_idx" ON "pages_blocks_market_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_market_hero_path_idx" ON "pages_blocks_market_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_market_hero_hero_image_idx" ON "pages_blocks_market_hero" USING btree ("hero_image_id");
  CREATE INDEX "pages_blocks_licensing_credentials_items_order_idx" ON "pages_blocks_licensing_credentials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_licensing_credentials_items_parent_id_idx" ON "pages_blocks_licensing_credentials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_licensing_credentials_items_file_idx" ON "pages_blocks_licensing_credentials_items" USING btree ("file_id");
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
  CREATE INDEX "pages_blocks_consultation_qualifier_form_idx" ON "pages_blocks_consultation_qualifier" USING btree ("form_id");
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
  CREATE INDEX "pages_blocks_contact_details_channels_order_idx" ON "pages_blocks_contact_details_channels" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_channels_parent_id_idx" ON "pages_blocks_contact_details_channels" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_offices_order_idx" ON "pages_blocks_contact_details_offices" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_offices_parent_id_idx" ON "pages_blocks_contact_details_offices" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_order_idx" ON "pages_blocks_contact_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_details_parent_id_idx" ON "pages_blocks_contact_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_details_path_idx" ON "pages_blocks_contact_details" USING btree ("_path");
  CREATE INDEX "pages_blocks_platform_downloads_platforms_order_idx" ON "pages_blocks_platform_downloads_platforms" USING btree ("_order");
  CREATE INDEX "pages_blocks_platform_downloads_platforms_parent_id_idx" ON "pages_blocks_platform_downloads_platforms" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_platform_downloads_platforms_image_idx" ON "pages_blocks_platform_downloads_platforms" USING btree ("image_id");
  CREATE INDEX "pages_blocks_platform_downloads_order_idx" ON "pages_blocks_platform_downloads" USING btree ("_order");
  CREATE INDEX "pages_blocks_platform_downloads_parent_id_idx" ON "pages_blocks_platform_downloads" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_platform_downloads_path_idx" ON "pages_blocks_platform_downloads" USING btree ("_path");
  CREATE INDEX "pages_blocks_knowledge_hero_breadcrumbs_order_idx" ON "pages_blocks_knowledge_hero_breadcrumbs" USING btree ("_order");
  CREATE INDEX "pages_blocks_knowledge_hero_breadcrumbs_parent_id_idx" ON "pages_blocks_knowledge_hero_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_knowledge_hero_order_idx" ON "pages_blocks_knowledge_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_knowledge_hero_parent_id_idx" ON "pages_blocks_knowledge_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_knowledge_hero_path_idx" ON "pages_blocks_knowledge_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_knowledge_hero_image_idx" ON "pages_blocks_knowledge_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_consultation_showcase_images_order_idx" ON "pages_blocks_consultation_showcase_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_consultation_showcase_images_parent_id_idx" ON "pages_blocks_consultation_showcase_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_consultation_showcase_images_image_idx" ON "pages_blocks_consultation_showcase_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_consultation_showcase_order_idx" ON "pages_blocks_consultation_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_consultation_showcase_parent_id_idx" ON "pages_blocks_consultation_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_consultation_showcase_path_idx" ON "pages_blocks_consultation_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_consultation_showcase_form_idx" ON "pages_blocks_consultation_showcase" USING btree ("form_id");
  CREATE INDEX "pages_blocks_business_intro_order_idx" ON "pages_blocks_business_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_business_intro_parent_id_idx" ON "pages_blocks_business_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_business_intro_path_idx" ON "pages_blocks_business_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_service_offerings_items_details_order_idx" ON "pages_blocks_service_offerings_items_details" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_offerings_items_details_parent_id_idx" ON "pages_blocks_service_offerings_items_details" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_offerings_items_order_idx" ON "pages_blocks_service_offerings_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_offerings_items_parent_id_idx" ON "pages_blocks_service_offerings_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_offerings_order_idx" ON "pages_blocks_service_offerings" USING btree ("_order");
  CREATE INDEX "pages_blocks_service_offerings_parent_id_idx" ON "pages_blocks_service_offerings" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_service_offerings_path_idx" ON "pages_blocks_service_offerings" USING btree ("_path");
  CREATE INDEX "pages_blocks_benefits_grid_items_order_idx" ON "pages_blocks_benefits_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_grid_items_parent_id_idx" ON "pages_blocks_benefits_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_grid_order_idx" ON "pages_blocks_benefits_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_benefits_grid_parent_id_idx" ON "pages_blocks_benefits_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_benefits_grid_path_idx" ON "pages_blocks_benefits_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_rich_text_block_order_idx" ON "pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_text_block_parent_id_idx" ON "pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_text_block_path_idx" ON "pages_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_feature_highlights_order_idx" ON "pages_blocks_image_text_feature_highlights" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_feature_highlights_parent_id_idx" ON "pages_blocks_image_text_feature_highlights" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_feature_order_idx" ON "pages_blocks_image_text_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_text_feature_parent_id_idx" ON "pages_blocks_image_text_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_text_feature_path_idx" ON "pages_blocks_image_text_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_image_text_feature_image_idx" ON "pages_blocks_image_text_feature" USING btree ("image_id");
  CREATE INDEX "pages_blocks_split_content_list_right_items_order_idx" ON "pages_blocks_split_content_list_right_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_list_right_items_parent_id_idx" ON "pages_blocks_split_content_list_right_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_list_order_idx" ON "pages_blocks_split_content_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_split_content_list_parent_id_idx" ON "pages_blocks_split_content_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_split_content_list_path_idx" ON "pages_blocks_split_content_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_agriculture_feature_order_idx" ON "pages_blocks_agriculture_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_agriculture_feature_parent_id_idx" ON "pages_blocks_agriculture_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_agriculture_feature_path_idx" ON "pages_blocks_agriculture_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_agriculture_feature_image_idx" ON "pages_blocks_agriculture_feature" USING btree ("image_id");
  CREATE INDEX "pages_blocks_rich_intro_order_idx" ON "pages_blocks_rich_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_rich_intro_parent_id_idx" ON "pages_blocks_rich_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_rich_intro_path_idx" ON "pages_blocks_rich_intro" USING btree ("_path");
  CREATE INDEX "pages_blocks_focus_areas_grid_items_order_idx" ON "pages_blocks_focus_areas_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_focus_areas_grid_items_parent_id_idx" ON "pages_blocks_focus_areas_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_focus_areas_grid_items_image_idx" ON "pages_blocks_focus_areas_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_focus_areas_grid_order_idx" ON "pages_blocks_focus_areas_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_focus_areas_grid_parent_id_idx" ON "pages_blocks_focus_areas_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_focus_areas_grid_path_idx" ON "pages_blocks_focus_areas_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_items_order_idx" ON "pages_blocks_hospitality_experience_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_items_parent_id_idx" ON "pages_blocks_hospitality_experience_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_items_image_idx" ON "pages_blocks_hospitality_experience_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_order_idx" ON "pages_blocks_hospitality_experience_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_parent_id_idx" ON "pages_blocks_hospitality_experience_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hospitality_experience_grid_path_idx" ON "pages_blocks_hospitality_experience_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_destination_location_showcase_facts_order_idx" ON "pages_blocks_destination_location_showcase_facts" USING btree ("_order");
  CREATE INDEX "pages_blocks_destination_location_showcase_facts_parent_id_idx" ON "pages_blocks_destination_location_showcase_facts" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destination_location_showcase_attractions_order_idx" ON "pages_blocks_destination_location_showcase_attractions" USING btree ("_order");
  CREATE INDEX "pages_blocks_destination_location_showcase_attractions_parent_id_idx" ON "pages_blocks_destination_location_showcase_attractions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destination_location_showcase_attractions_i_idx" ON "pages_blocks_destination_location_showcase_attractions" USING btree ("image_id");
  CREATE INDEX "pages_blocks_destination_location_showcase_order_idx" ON "pages_blocks_destination_location_showcase" USING btree ("_order");
  CREATE INDEX "pages_blocks_destination_location_showcase_parent_id_idx" ON "pages_blocks_destination_location_showcase" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_destination_location_showcase_path_idx" ON "pages_blocks_destination_location_showcase" USING btree ("_path");
  CREATE INDEX "pages_blocks_destination_location_showcase_image_idx" ON "pages_blocks_destination_location_showcase" USING btree ("image_id");
  CREATE INDEX "pages_blocks_video_text_feature_order_idx" ON "pages_blocks_video_text_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_text_feature_parent_id_idx" ON "pages_blocks_video_text_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_text_feature_path_idx" ON "pages_blocks_video_text_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_text_feature_thumbnail_idx" ON "pages_blocks_video_text_feature" USING btree ("thumbnail_id");
  CREATE INDEX "pages_blocks_immersive_media_gallery_items_order_idx" ON "pages_blocks_immersive_media_gallery_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_immersive_media_gallery_items_parent_id_idx" ON "pages_blocks_immersive_media_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_immersive_media_gallery_items_image_idx" ON "pages_blocks_immersive_media_gallery_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_immersive_media_gallery_order_idx" ON "pages_blocks_immersive_media_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_immersive_media_gallery_parent_id_idx" ON "pages_blocks_immersive_media_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_immersive_media_gallery_path_idx" ON "pages_blocks_immersive_media_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_band_stats_order_idx" ON "pages_blocks_stats_band_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_band_stats_parent_id_idx" ON "pages_blocks_stats_band_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_band_order_idx" ON "pages_blocks_stats_band" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_band_parent_id_idx" ON "pages_blocks_stats_band" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_band_path_idx" ON "pages_blocks_stats_band" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_grid_leaders_order_idx" ON "pages_blocks_team_grid_leaders" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_leaders_parent_id_idx" ON "pages_blocks_team_grid_leaders" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_leaders_photo_idx" ON "pages_blocks_team_grid_leaders" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_grid_members_order_idx" ON "pages_blocks_team_grid_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_members_parent_id_idx" ON "pages_blocks_team_grid_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_members_photo_idx" ON "pages_blocks_team_grid_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_grid_order_idx" ON "pages_blocks_team_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_grid_parent_id_idx" ON "pages_blocks_team_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_grid_path_idx" ON "pages_blocks_team_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_research_library_notes_order_idx" ON "pages_blocks_research_library_notes" USING btree ("_order");
  CREATE INDEX "pages_blocks_research_library_notes_parent_id_idx" ON "pages_blocks_research_library_notes" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_research_library_notes_image_idx" ON "pages_blocks_research_library_notes" USING btree ("image_id");
  CREATE INDEX "pages_blocks_research_library_notes_file_idx" ON "pages_blocks_research_library_notes" USING btree ("file_id");
  CREATE INDEX "pages_blocks_research_library_order_idx" ON "pages_blocks_research_library" USING btree ("_order");
  CREATE INDEX "pages_blocks_research_library_parent_id_idx" ON "pages_blocks_research_library" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_research_library_path_idx" ON "pages_blocks_research_library" USING btree ("_path");
  CREATE INDEX "pages_blocks_article_list_items_order_idx" ON "pages_blocks_article_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_article_list_items_parent_id_idx" ON "pages_blocks_article_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_article_list_order_idx" ON "pages_blocks_article_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_article_list_parent_id_idx" ON "pages_blocks_article_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_article_list_path_idx" ON "pages_blocks_article_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_member_profile_credentials_order_idx" ON "pages_blocks_team_member_profile_credentials" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_member_profile_credentials_parent_id_idx" ON "pages_blocks_team_member_profile_credentials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_member_profile_order_idx" ON "pages_blocks_team_member_profile" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_member_profile_parent_id_idx" ON "pages_blocks_team_member_profile" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_member_profile_path_idx" ON "pages_blocks_team_member_profile" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_member_profile_photo_idx" ON "pages_blocks_team_member_profile" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_founder_statement_order_idx" ON "pages_blocks_founder_statement" USING btree ("_order");
  CREATE INDEX "pages_blocks_founder_statement_parent_id_idx" ON "pages_blocks_founder_statement" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_founder_statement_path_idx" ON "pages_blocks_founder_statement" USING btree ("_path");
  CREATE INDEX "pages_blocks_founder_statement_portrait_idx" ON "pages_blocks_founder_statement" USING btree ("portrait_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_groups_items_order_idx" ON "header_nav_items_groups_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_groups_items_parent_id_idx" ON "header_nav_items_groups_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_groups_order_idx" ON "header_nav_items_groups" USING btree ("_order");
  CREATE INDEX "header_nav_items_groups_parent_id_idx" ON "header_nav_items_groups" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_consultation_link_link_consultation_link_link_fil_idx" ON "header" USING btree ("consultation_link_link_file_id");
  CREATE INDEX "header_cta_button_link_cta_button_link_file_idx" ON "header" USING btree ("cta_button_link_file_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_trade_invest_links_order_idx" ON "footer_trade_invest_links" USING btree ("_order");
  CREATE INDEX "footer_trade_invest_links_parent_id_idx" ON "footer_trade_invest_links" USING btree ("_parent_id");
  CREATE INDEX "footer_trade_invest_links_link_link_file_idx" ON "footer_trade_invest_links" USING btree ("link_file_id");
  CREATE INDEX "footer_the_group_links_order_idx" ON "footer_the_group_links" USING btree ("_order");
  CREATE INDEX "footer_the_group_links_parent_id_idx" ON "footer_the_group_links" USING btree ("_parent_id");
  CREATE INDEX "footer_the_group_links_link_link_file_idx" ON "footer_the_group_links" USING btree ("link_file_id");
  CREATE INDEX "footer_insights_learning_links_order_idx" ON "footer_insights_learning_links" USING btree ("_order");
  CREATE INDEX "footer_insights_learning_links_parent_id_idx" ON "footer_insights_learning_links" USING btree ("_parent_id");
  CREATE INDEX "footer_insights_learning_links_link_link_file_idx" ON "footer_insights_learning_links" USING btree ("link_file_id");
  CREATE INDEX "footer_company_links_order_idx" ON "footer_company_links" USING btree ("_order");
  CREATE INDEX "footer_company_links_parent_id_idx" ON "footer_company_links" USING btree ("_parent_id");
  CREATE INDEX "footer_company_links_link_link_file_idx" ON "footer_company_links" USING btree ("link_file_id");
  CREATE INDEX "footer_regulation_links_order_idx" ON "footer_regulation_links" USING btree ("_order");
  CREATE INDEX "footer_regulation_links_parent_id_idx" ON "footer_regulation_links" USING btree ("_parent_id");
  CREATE INDEX "footer_regulation_links_link_link_file_idx" ON "footer_regulation_links" USING btree ("link_file_id");
  CREATE INDEX "footer_legal_paragraphs_order_idx" ON "footer_legal_paragraphs" USING btree ("_order");
  CREATE INDEX "footer_legal_paragraphs_parent_id_idx" ON "footer_legal_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_order_idx" ON "footer_bottom_links" USING btree ("_order");
  CREATE INDEX "footer_bottom_links_parent_id_idx" ON "footer_bottom_links" USING btree ("_parent_id");
  CREATE INDEX "footer_bottom_links_link_link_file_idx" ON "footer_bottom_links" USING btree ("link_file_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_service_hero_breadcrumbs" CASCADE;
  DROP TABLE "pages_blocks_service_hero_badges" CASCADE;
  DROP TABLE "pages_blocks_service_hero_hero_benefits" CASCADE;
  DROP TABLE "pages_blocks_service_hero" CASCADE;
  DROP TABLE "pages_blocks_section_navigation_links" CASCADE;
  DROP TABLE "pages_blocks_section_navigation" CASCADE;
  DROP TABLE "pages_blocks_product_range_tabs_features" CASCADE;
  DROP TABLE "pages_blocks_product_range_tabs_table_columns" CASCADE;
  DROP TABLE "pages_blocks_product_range_tabs_table_rows_cells" CASCADE;
  DROP TABLE "pages_blocks_product_range_tabs_table_rows" CASCADE;
  DROP TABLE "pages_blocks_product_range_tabs" CASCADE;
  DROP TABLE "pages_blocks_product_range" CASCADE;
  DROP TABLE "pages_blocks_tabbed_content_tabs_feature_cards" CASCADE;
  DROP TABLE "pages_blocks_tabbed_content_tabs_table_columns" CASCADE;
  DROP TABLE "pages_blocks_tabbed_content_tabs_table_rows_cells" CASCADE;
  DROP TABLE "pages_blocks_tabbed_content_tabs_table_rows" CASCADE;
  DROP TABLE "pages_blocks_tabbed_content_tabs" CASCADE;
  DROP TABLE "pages_blocks_tabbed_content" CASCADE;
  DROP TABLE "pages_blocks_process_steps_steps" CASCADE;
  DROP TABLE "pages_blocks_primary_button" CASCADE;
  DROP TABLE "pages_blocks_secondary_button" CASCADE;
  DROP TABLE "pages_blocks_process_steps" CASCADE;
  DROP TABLE "pages_blocks_requirements_checklist_groups_items" CASCADE;
  DROP TABLE "pages_blocks_requirements_checklist_groups" CASCADE;
  DROP TABLE "pages_blocks_requirements_checklist" CASCADE;
  DROP TABLE "pages_blocks_guide_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_guide_accordion" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion_items" CASCADE;
  DROP TABLE "pages_blocks_faq_accordion" CASCADE;
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
  DROP TABLE "pages_blocks_contact_details_channels" CASCADE;
  DROP TABLE "pages_blocks_contact_details_offices" CASCADE;
  DROP TABLE "pages_blocks_contact_details" CASCADE;
  DROP TABLE "pages_blocks_platform_downloads_platforms" CASCADE;
  DROP TABLE "pages_blocks_platform_downloads" CASCADE;
  DROP TABLE "pages_blocks_knowledge_hero_breadcrumbs" CASCADE;
  DROP TABLE "pages_blocks_knowledge_hero" CASCADE;
  DROP TABLE "pages_blocks_consultation_showcase_images" CASCADE;
  DROP TABLE "pages_blocks_consultation_showcase" CASCADE;
  DROP TABLE "pages_blocks_business_intro" CASCADE;
  DROP TABLE "pages_blocks_service_offerings_items_details" CASCADE;
  DROP TABLE "pages_blocks_service_offerings_items" CASCADE;
  DROP TABLE "pages_blocks_service_offerings" CASCADE;
  DROP TABLE "pages_blocks_benefits_grid_items" CASCADE;
  DROP TABLE "pages_blocks_benefits_grid" CASCADE;
  DROP TABLE "pages_blocks_rich_text_block" CASCADE;
  DROP TABLE "pages_blocks_image_text_feature_highlights" CASCADE;
  DROP TABLE "pages_blocks_image_text_feature" CASCADE;
  DROP TABLE "pages_blocks_split_content_list_right_items" CASCADE;
  DROP TABLE "pages_blocks_split_content_list" CASCADE;
  DROP TABLE "pages_blocks_agriculture_feature" CASCADE;
  DROP TABLE "pages_blocks_rich_intro" CASCADE;
  DROP TABLE "pages_blocks_focus_areas_grid_items" CASCADE;
  DROP TABLE "pages_blocks_focus_areas_grid" CASCADE;
  DROP TABLE "pages_blocks_hospitality_experience_grid_items" CASCADE;
  DROP TABLE "pages_blocks_hospitality_experience_grid" CASCADE;
  DROP TABLE "pages_blocks_destination_location_showcase_facts" CASCADE;
  DROP TABLE "pages_blocks_destination_location_showcase_attractions" CASCADE;
  DROP TABLE "pages_blocks_destination_location_showcase" CASCADE;
  DROP TABLE "pages_blocks_video_text_feature" CASCADE;
  DROP TABLE "pages_blocks_immersive_media_gallery_items" CASCADE;
  DROP TABLE "pages_blocks_immersive_media_gallery" CASCADE;
  DROP TABLE "pages_blocks_stats_band_stats" CASCADE;
  DROP TABLE "pages_blocks_stats_band" CASCADE;
  DROP TABLE "pages_blocks_team_grid_leaders" CASCADE;
  DROP TABLE "pages_blocks_team_grid_members" CASCADE;
  DROP TABLE "pages_blocks_team_grid" CASCADE;
  DROP TABLE "pages_blocks_research_library_notes" CASCADE;
  DROP TABLE "pages_blocks_research_library" CASCADE;
  DROP TABLE "pages_blocks_article_list_items" CASCADE;
  DROP TABLE "pages_blocks_article_list" CASCADE;
  DROP TABLE "pages_blocks_team_member_profile_credentials" CASCADE;
  DROP TABLE "pages_blocks_team_member_profile" CASCADE;
  DROP TABLE "pages_blocks_founder_statement" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_groups_items" CASCADE;
  DROP TABLE "header_nav_items_groups" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_trade_invest_links" CASCADE;
  DROP TABLE "footer_the_group_links" CASCADE;
  DROP TABLE "footer_insights_learning_links" CASCADE;
  DROP TABLE "footer_company_links" CASCADE;
  DROP TABLE "footer_regulation_links" CASCADE;
  DROP TABLE "footer_legal_paragraphs" CASCADE;
  DROP TABLE "footer_bottom_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_service_hero_hero_benefits_icon";
  DROP TYPE "public"."enum_pages_blocks_service_hero_theme";
  DROP TYPE "public"."enum_pages_blocks_service_hero_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_service_hero_breadcrumb_position";
  DROP TYPE "public"."enum_pages_blocks_service_hero_primary_variant";
  DROP TYPE "public"."enum_pages_blocks_service_hero_secondary_variant";
  DROP TYPE "public"."enum_pages_blocks_process_steps_layout_variant";
  DROP TYPE "public"."enum_pages_blocks_licensing_credentials_items_variant";
  DROP TYPE "public"."enum_pages_blocks_licensing_credentials_layout_variant";
  DROP TYPE "public"."enum_pages_blocks_client_services_items_icon";
  DROP TYPE "public"."enum_pages_blocks_client_services_layout_variant";
  DROP TYPE "public"."enum_pages_blocks_consultation_qualifier_form_mode";
  DROP TYPE "public"."enum_pages_blocks_group_business_explorer_items_icon";
  DROP TYPE "public"."enum_pages_blocks_ready_when_you_are_variant";
  DROP TYPE "public"."enum_pages_blocks_contact_details_channels_icon";
  DROP TYPE "public"."enum_pages_blocks_consultation_showcase_form_mode";
  DROP TYPE "public"."enum_pages_blocks_service_offerings_background";
  DROP TYPE "public"."enum_pages_blocks_service_offerings_columns";
  DROP TYPE "public"."enum_pages_blocks_benefits_grid_background";
  DROP TYPE "public"."enum_pages_blocks_rich_text_block_background";
  DROP TYPE "public"."enum_pages_blocks_image_text_feature_image_position";
  DROP TYPE "public"."enum_pages_blocks_image_text_feature_background";
  DROP TYPE "public"."enum_pages_blocks_agriculture_feature_image_position";
  DROP TYPE "public"."enum_pages_blocks_immersive_media_gallery_interval";
  DROP TYPE "public"."enum_pages_blocks_stats_band_background";
  DROP TYPE "public"."enum_pages_blocks_team_grid_display_variant";
  DROP TYPE "public"."enum_pages_blocks_founder_statement_image_position";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_forms_submit_button_color";
  DROP TYPE "public"."enum_footer_social_links_platform";`)
}
