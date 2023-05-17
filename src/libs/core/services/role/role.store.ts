import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IRole } from '@core/model';

const STORE_NAME = 'roles';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<IRole>(),
  withActiveId()
);
