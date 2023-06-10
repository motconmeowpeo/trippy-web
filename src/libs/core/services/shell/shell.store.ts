import { createStore, withProps } from '@ngneat/elf';
import { IShellProps } from './shell.model';
import { localStorageStrategy, persistState } from '@ngneat/elf-persist-state';

const STORE_NAME = 'shell';

export const store = createStore(
  { name: STORE_NAME },
  withProps<IShellProps>({
    isSidebarExpanded: true,
    isCardViewEmployee: false,
    isSidebarSwitched: false,
  })
);

persistState(store, {
  storage: localStorageStrategy,
});
