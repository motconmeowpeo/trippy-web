import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { ITourComment } from '@core/model';

const STORE_NAME = 'tour-comments';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<ITourComment>(),
  withActiveId()
);
