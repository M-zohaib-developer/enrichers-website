import * as migration_20261027_115557_init from './20261027_115557_init';
import * as migration_20261027_120621_deprecated_global_columns from './20261027_120621_deprecated_global_columns';

export const migrations = [
  {
    up: migration_20261027_115557_init.up,
    down: migration_20261027_115557_init.down,
    name: '20261027_115557_init',
  },
  {
    up: migration_20261027_120621_deprecated_global_columns.up,
    down: migration_20261027_120621_deprecated_global_columns.down,
    name: '20261027_120621_deprecated_global_columns'
  },
];
