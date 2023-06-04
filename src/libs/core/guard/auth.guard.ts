import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable, of, tap, map } from 'rxjs';
import { AuthFacade } from '../services/auth/auth.facade';
import { URL_HOME, URL_LOGIN } from '../constants/route.constant';
import { ToastNotificationService } from '../services/toast-notification/toast-notification.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authFacade: AuthFacade,
    private notificationService: ToastNotificationService
  ) {}

  private _redirectUrl!: string;

  canActivate(route: ActivatedRouteSnapshot) {
    return this.isValid(route);
    // return of(true);
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    return this.isValid(route);
    // return of(true);
  }

  private isValid(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.validateAccount();
  }

  private validateToken(accessToken: string): Observable<boolean> {
    return of(this.authFacade.isTokenExpired(accessToken)).pipe(
      tap((isTokenExpired) => {
        if (!isTokenExpired) {
          return this.router.navigate([URL_HOME]);
        }

        this.router.navigate([URL_LOGIN], {
          queryParams: { redirect: this._redirectUrl },
        });
        return this.throwSessionExpiredError();
      })
    );
  }

  private validateAccount(): Observable<boolean> {
    return this.authFacade.isAuthenticated().pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate([URL_HOME]);
        }
        return true;
      })
    );
  }

  private throwSessionExpiredError(): void {
    this.notificationService.error('error', 'session_expired');
  }
}
