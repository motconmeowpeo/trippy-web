import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IContact } from '@core/model';

const STORE_NAME = 'contacts';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<IContact>(),
  withActiveId()
);
