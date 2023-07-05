import {
  inject,
  Injectable,
  Component,
  HostListener,
  OnDestroy,
} from '@angular/core';
import { IBaseModalResult, IBaseModalData } from '@core/model';
import { getWindowMetric } from '@core/until';
import { DialogRef } from '@ngneat/dialog';
import {
  MonoTypeOperatorFunction,
  Subject,
  debounceTime,
  fromEvent,
  map,
  takeUntil,
} from 'rxjs';

@Injectable()
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnDestroy {
  readonly BACKDROP_CLASS = 'ngneat-dialog-backdrop';
  public ref = inject(DialogRef<IBaseModalData, boolean>);
  destroy$: Subject<boolean> = new Subject();
  metricWindow$ = fromEvent(window, 'resize').pipe(
    debounceTime(300),
    map(() => getWindowMetric())
  );

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  // Handle close by click ESC
  @HostListener('window:keyup.esc', ['$event'])
  handleESC() {
    const dialogList = document.getElementsByTagName('ngneat-dialog');

    if (dialogList.item(dialogList.length - 1)?.id === this.ref.id) {
      this.close();
    }
  }

  // Hanlde backdrop click
  @HostListener('document:click', ['$event.target'])
  handleClick(target: Element) {
    if (
      typeof target.className === 'string' &&
      target.className.includes(this.BACKDROP_CLASS) &&
      target.parentElement?.id.includes(this.ref.id)
    ) {
      this.checkMultipleDialogs(target);
    }
  }

  get data() {
    return this.ref?.data;
  }

  close(result?: IBaseModalResult) {
    return this.ref?.close(result);
  }

  checkMultipleDialogs(target: Element) {
    const idDialogs: string[] = [];
    target.ownerDocument.body
      .querySelectorAll('ngneat-dialog')
      .forEach((modal) => {
        idDialogs.push(modal.id);
      });

    // If the last dialog id is equal to the id of the open dialog, run close().
    if (
      idDialogs[idDialogs.length - 1] === this.ref.id &&
      !target.parentElement?.className.includes('image-modal')
    ) {
      this.close();
    }
  }

  autoCleanUp<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil<T>(this.destroy$);
  }
}
