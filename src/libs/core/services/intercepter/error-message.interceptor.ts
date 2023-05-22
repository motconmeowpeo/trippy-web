import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastNotificationService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class ErrorMessageInterceptor implements HttpInterceptor {
  constructor(private notificationService: ToastNotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err);
        if (err.status >= 500) {
          this.notificationService.warning('Warning', 'Error');
        } else if (err.status >= 400 && err.status < 500) {
          err.status == 429
            ? this.notificationService.error('Error', 'Many request')
            : this.notificationService.error('Error', err.error.message);
        }

        return throwError(() => err);
      })
    );
  }
}
