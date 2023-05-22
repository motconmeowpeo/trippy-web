import {
  addEntities,
  selectActiveEntity,
  selectAllEntities,
  setEntities,
} from '@ngneat/elf-entities';
import { store } from './user.store';
import { filter, tap } from 'rxjs';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ICreateUser } from '@core/model';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  users$ = store.pipe(selectAllEntities());
  user$ = store.pipe(
    selectActiveEntity(),
    filter((user) => !!user)
  );
  constructor(private userService: UserService) {}
  createUser(payload: Partial<ICreateUser>) {
    return this.userService
      .createUser(payload)
      .pipe(tap((user) => store.update(addEntities(user))));
  }
}
