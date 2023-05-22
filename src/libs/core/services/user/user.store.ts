import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IRole, IUser } from '@core/model';

const STORE_NAME = 'users';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<IUser>(),
  withActiveId()
);
