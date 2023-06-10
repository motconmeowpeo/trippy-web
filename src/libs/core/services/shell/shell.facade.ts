import { Injectable } from '@angular/core';
import { select } from '@ngneat/elf';
import { store } from './shell.store';
import { IShellProps } from './shell.model';

@Injectable({ providedIn: 'root' })
export class ShellFacade {
  isSidebarExpanded$ = store.pipe(select((state) => state.isSidebarExpanded));
  isCardViewEmployee$ = store.pipe(select((state) => state.isCardViewEmployee));
  isSidebarSwitched$ = store.pipe(select((state) => state.isSidebarSwitched));

  toggleSidebarState(): void {
    this.update({
      isSidebarExpanded: !store.state.isSidebarExpanded,
    });
  }

  setIsSidebarExpanded(isExpanded: boolean): void {
    this.update({
      isSidebarExpanded: isExpanded,
    });
  }

  toggleCardView(): void {
    this.update({
      isCardViewEmployee: !store.state.isCardViewEmployee,
    });
  }

  setIsCardViewEmployee(isCardViewEmployee: boolean): void {
    this.update({
      isCardViewEmployee: isCardViewEmployee,
    });
  }

  setIsSidebarSwitched(isSwitched: boolean): void {
    this.update({
      isSidebarSwitched: isSwitched,
    });
  }

  private update(data: Partial<IShellProps>) {
    store.update((state) => ({
      ...state,
      ...data,
    }));
  }
}
