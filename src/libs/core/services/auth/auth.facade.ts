import {
  addEntities,
  selectActiveEntity,
  selectAllEntities,
  setEntities,
} from '@ngneat/elf-entities';
import { Observable, filter, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { IAuth, ICreateUser, ILogin } from '@core/model';
import { store } from './auth.store';
import { select } from '@ngneat/elf';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  accessToken$ = store.pipe(select((state) => state.accessToken));
  user$ = store.pipe(select((state) => state.user));

  constructor(private authService: AuthService) {}
  loginByEmail(payload: Partial<ILogin>) {
    return this.authService
      .loginByEmail(payload)
      .pipe(tap((data) => this.update(data)));
  }

  isAuthenticated(): Observable<boolean> {
    return this.accessToken$.pipe(
      map((accessToken) => {
        return !!accessToken && !this.authService.isTokenExpired(accessToken);
      })
    );
  }

  isTokenExpired(token: string): boolean {
    return this.authService.isTokenExpired(token);
  }

  private update(data: Partial<IAuth>) {
    store.update((state) => ({
      ...state,
      ...data,
    }));
  }

  logout() {
    store.reset();
  }
}
