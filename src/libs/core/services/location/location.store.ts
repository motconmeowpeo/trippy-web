import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { ILocation, IRole } from '@core/model';

const STORE_NAME = 'locations';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<ILocation>(),
  withActiveId()
);
