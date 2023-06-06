import { inject, Injectable, OnDestroy } from '@angular/core';
import {
  Subject,
  MonoTypeOperatorFunction,
  takeUntil,
  catchError,
  EMPTY,
  first,
  fromEvent,
  map,
  debounceTime,
} from 'rxjs';
import { getWindowMetric } from '@core/until';

@Injectable()
export abstract class BaseComponent implements OnDestroy {
  protected isLoading = false;
  destroy$: Subject<boolean> = new Subject();
  metricWindow$ = fromEvent(window, 'resize').pipe(
    debounceTime(500),
    map(() => getWindowMetric())
  );

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  autoCleanUp<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil<T>(this.destroy$);
  }
}
