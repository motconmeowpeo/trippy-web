import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { ITour } from '@core/model';

const STORE_NAME = 'tours';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<ITour>(),
  withActiveId()
);
