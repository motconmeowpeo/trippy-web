import {
  addEntities,
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  updateEntities,
} from '@ngneat/elf-entities';
import { store } from './user.store';
import { filter, tap } from 'rxjs';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { IBaseParams, ICreateUser } from '@core/model';

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

  getAllUserByManager(authorId: string, params?: IBaseParams) {
    return this.userService
      .getAllUserByManager(authorId, params)
      .pipe(tap((users) => store.update(setEntities(users))));
  }

  changeStatus(id: string) {
    return this.userService
      .changeStatus(id)
      .pipe(tap((user) => store.update(updateEntities(user.id, user))));
  }
}
