import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ViewChild, ElementRef } from '@angular/core';
import { fromEvent, takeWhile, map, tap } from 'rxjs';
import { BaseControlValueAccessor } from '@core/base';
import { EMPTY_STRING } from '@core/constants';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
})
export class SearchComponent extends BaseControlValueAccessor<string> {
  readonly document = document;
  @ViewChild('search') searchElement!: ElementRef;

  @Input() placeholder = 'Search...';
  @Input() className!: string;
  @Input() hasBoxValue = false;

  isPopupShown = false;

  @Output() focusInput: EventEmitter<string> = new EventEmitter<string>();

  onInput(e: Event) {
    const { value } = (e.target as HTMLInputElement) || {};
    this.writeValue(value);
    this.onChange(value);
  }

  clearInput() {
    this.writeValue(EMPTY_STRING);
    this.onChange(EMPTY_STRING);
  }

  onFocus() {
    this.isPopupShown = true;
    this.handleClickOutside();
    this.focusInput.emit(this.value);
  }

  private handleClickOutside() {
    const employeeListEl = this.searchElement?.nativeElement;

    fromEvent(document, 'click')
      .pipe(
        takeWhile(() => this.isPopupShown),
        map((event) => event.target as HTMLElement),
        tap((target) => {
          this.isPopupShown = employeeListEl?.contains(target);
        })
      )
      .subscribe();
  }
}
