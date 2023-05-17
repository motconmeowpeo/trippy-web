import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
} from '@ngneat/elf-entities';
import { store } from './role.store';
import { filter, tap } from 'rxjs';
import { RoleService } from './role.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoleFacade {
  roles$ = store.pipe(selectAllEntities());
  role$ = store.pipe(
    selectActiveEntity(),
    filter((role) => !!role)
  );
  constructor(private roleService: RoleService) {}
  getAllRole() {
    return this.roleService
      .getAllRole()
      .pipe(tap((roles) => store.update(setEntities(roles))));
  }
}
