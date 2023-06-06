import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor } from '@core/base';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaginationComponent),
      multi: true,
    },
  ],
})
export class PaginationComponent
  extends BaseControlValueAccessor<string>
  implements OnChanges
{
  @Input() pageLimitOptions!: number[];
  @Input() currentPage!: number;
  @Input() total!: number;
  @Input() limit!: number;
  @Input() canNext!: boolean;
  @Input() canPrev!: boolean;
  @Input() widthOffset!: number;
  @Input() className!: string;

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>();
  @Output() next: EventEmitter<number> = new EventEmitter<number>();
  @Output() previous: EventEmitter<number> = new EventEmitter<number>();
  @Output() limitChange: EventEmitter<number> = new EventEmitter<number>();

  pages: (number | string)[] = [];

  ngOnChanges(): void {
    this.generatePages();
  }

  onNext(): void {
    if (!this.canNext) {
      return;
    }
    this.next.emit(this.currentPage);
  }

  onPrev(): void {
    if (!this.canPrev) {
      return;
    }
    this.previous.emit(this.currentPage);
  }

  onGoTo(page: any): void {
    if (isNaN(page)) {
      return;
    }
    this.currentPage = page;
    this.goTo.emit(page);
  }

  isSelected(currentLimit: number): boolean {
    return currentLimit === this.limit;
  }

  generatePages(): void {
    this.pages = [];

    const lastPage = Math.ceil(this.total / this.limit);
    const mostLeft = this.currentPage - this.widthOffset;
    const mostRight = this.currentPage + this.widthOffset + 1;
    const range: number[] = [];
    let offset: number;

    for (let page = 1; page <= lastPage; page += 1) {
      if (
        page === 1 ||
        page === lastPage ||
        (page >= mostLeft && page <= mostRight)
      ) {
        range.push(page);
      } else if (page < mostLeft) {
        page = mostLeft - 1;
      } else if (page > mostRight) {
        range.push(lastPage);
        break;
      }
    }

    range.forEach((page) => {
      if (offset) {
        if (page - offset !== 1) {
          this.pages.push('...');
        }
      }
      this.pages.push(page);
      offset = page;
    });
  }
}
