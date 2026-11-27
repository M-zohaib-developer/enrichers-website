import * as migration_20261030_044615_baseline_schema from './20261030_044615_baseline_schema';
import * as migration_20261030_115220_enable_page_drafts from './20261030_115220_enable_page_drafts';
import * as migration_20261127_053046_add_landing_page_fields from './20261127_053046_add_landing_page_fields';

export const migrations = [
  {
    up: migration_20261030_044615_baseline_schema.up,
    down: migration_20261030_044615_baseline_schema.down,
    name: '20261030_044615_baseline_schema',
  },
  {
    up: migration_20261030_115220_enable_page_drafts.up,
    down: migration_20261030_115220_enable_page_drafts.down,
    name: '20261030_115220_enable_page_drafts',
  },
  {
    up: migration_20261127_053046_add_landing_page_fields.up,
    down: migration_20261127_053046_add_landing_page_fields.down,
    name: '20261127_053046_add_landing_page_fields'
  },
];
