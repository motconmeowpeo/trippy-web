import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, first, Observable, switchMap, throwError } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { AuthFacade } from '../auth';
import { URL_LOGIN } from '../../constants/route.constant';
import { HttpStatusCode } from '../../enum/http.enum';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authFacade: AuthFacade, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authFacade.accessToken$.pipe(
      first(),
      switchMap((accessToken) => {
        const setHeaders: Record<string, string | string[]> = {
          // ['x-request-id']: uuid(),
        };

        if (accessToken) {
          setHeaders['Authorization'] = `Bearer ${accessToken}`;
        }

        return next
          .handle(
            request.clone({
              setHeaders,
            })
          )
          .pipe(
            catchError((err) => {
              if (err.status === HttpStatusCode.UNAUTHORIZED) {
                this.authFacade.logout();
                this.router.navigateByUrl(URL_LOGIN);
              }
              return throwError(() => err);
            })
          );
      })
    );
  }
}
