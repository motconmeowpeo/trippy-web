import { createStore } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import { IInvoice, ITour } from '@core/model';

const STORE_NAME = 'invoices';

export const store = createStore(
  { name: STORE_NAME },
  withEntities<IInvoice>(),
  withActiveId()
);
