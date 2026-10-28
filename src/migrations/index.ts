import * as migration_20261027_115557_init from './20261027_115557_init';
import * as migration_20261027_120621_deprecated_global_columns from './20261027_120621_deprecated_global_columns';
import * as migration_20261027_135229_add_pages from './20261027_135229_add_pages';
import * as migration_20261027_135537_add_risk_notice from './20261027_135537_add_risk_notice';
import * as migration_20261027_141633_candidate_a_content_alignment from './20261027_141633_candidate_a_content_alignment';
import * as migration_20261027_141743_hero_heading_lines from './20261027_141743_hero_heading_lines';
import * as migration_20261027_141841_group_explorer_cta from './20261027_141841_group_explorer_cta';
import * as migration_20261027_143006_split_home_block_schemas from './20261027_143006_split_home_block_schemas';
import * as migration_20261027_144420_add_credential_variant from './20261027_144420_add_credential_variant';
import * as migration_20261027_145716_add_image_caption from './20261027_145716_add_image_caption';
import * as migration_20261027_161931_add_hero_button_variant from './20261027_161931_add_hero_button_variant';
import * as migration_20261028_034612_add_client_services_icons_buttons from './20261028_034612_add_client_services_icons_buttons';
import * as migration_20261028_041607_consultation_form_builder from './20261028_041607_consultation_form_builder';
import * as migration_20261028_042146_consultation_wizard_fields from './20261028_042146_consultation_wizard_fields';
import * as migration_20261028_042800_button_blocks_editor from './20261028_042800_button_blocks_editor';
import * as migration_20261028_043122_group_business_explorer_visual from './20261028_043122_group_business_explorer_visual';

export const migrations = [
  {
    up: migration_20261027_115557_init.up,
    down: migration_20261027_115557_init.down,
    name: '20261027_115557_init',
  },
  {
    up: migration_20261027_120621_deprecated_global_columns.up,
    down: migration_20261027_120621_deprecated_global_columns.down,
    name: '20261027_120621_deprecated_global_columns',
  },
  {
    up: migration_20261027_135229_add_pages.up,
    down: migration_20261027_135229_add_pages.down,
    name: '20261027_135229_add_pages',
  },
  {
    up: migration_20261027_135537_add_risk_notice.up,
    down: migration_20261027_135537_add_risk_notice.down,
    name: '20261027_135537_add_risk_notice',
  },
  {
    up: migration_20261027_141633_candidate_a_content_alignment.up,
    down: migration_20261027_141633_candidate_a_content_alignment.down,
    name: '20261027_141633_candidate_a_content_alignment',
  },
  {
    up: migration_20261027_141743_hero_heading_lines.up,
    down: migration_20261027_141743_hero_heading_lines.down,
    name: '20261027_141743_hero_heading_lines',
  },
  {
    up: migration_20261027_141841_group_explorer_cta.up,
    down: migration_20261027_141841_group_explorer_cta.down,
    name: '20261027_141841_group_explorer_cta',
  },
  {
    up: migration_20261027_143006_split_home_block_schemas.up,
    down: migration_20261027_143006_split_home_block_schemas.down,
    name: '20261027_143006_split_home_block_schemas',
  },
  {
    up: migration_20261027_144420_add_credential_variant.up,
    down: migration_20261027_144420_add_credential_variant.down,
    name: '20261027_144420_add_credential_variant',
  },
  {
    up: migration_20261027_145716_add_image_caption.up,
    down: migration_20261027_145716_add_image_caption.down,
    name: '20261027_145716_add_image_caption',
  },
  {
    up: migration_20261027_161931_add_hero_button_variant.up,
    down: migration_20261027_161931_add_hero_button_variant.down,
    name: '20261027_161931_add_hero_button_variant',
  },
  {
    up: migration_20261028_034612_add_client_services_icons_buttons.up,
    down: migration_20261028_034612_add_client_services_icons_buttons.down,
    name: '20261028_034612_add_client_services_icons_buttons',
  },
  {
    up: migration_20261028_041607_consultation_form_builder.up,
    down: migration_20261028_041607_consultation_form_builder.down,
    name: '20261028_041607_consultation_form_builder',
  },
  {
    up: migration_20261028_042146_consultation_wizard_fields.up,
    down: migration_20261028_042146_consultation_wizard_fields.down,
    name: '20261028_042146_consultation_wizard_fields',
  },
  {
    up: migration_20261028_042800_button_blocks_editor.up,
    down: migration_20261028_042800_button_blocks_editor.down,
    name: '20261028_042800_button_blocks_editor',
  },
  {
    up: migration_20261028_043122_group_business_explorer_visual.up,
    down: migration_20261028_043122_group_business_explorer_visual.down,
    name: '20261028_043122_group_business_explorer_visual'
  },
];
