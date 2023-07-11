import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EMPTY_INDEX, EMPTY_STRING } from '@core/constants';
import { MenuComponent } from '../menu';
import { BaseControlValueAccessor } from '@core/base';
import { ISelectItem } from '@core/model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends BaseControlValueAccessor<
  string | number | boolean
> {
  @Input() suffixIcon = 'triangle-down';
  @Input() className!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() readonly!: boolean;
  @Input() error!: string;
  @Input() hint!: boolean;
  @Input() required!: string;
  @Input() icon!: IconProp;
  @Input() classIcon!: string;
  @Input() set selectList(selectList: ISelectItem[]) {
    this._selectList = [...selectList];
  }

  @Input() menuClasses!: string;
  @Input() set defaultValue(selectItem: ISelectItem) {
    this.firstRender && this.onSelect(selectItem);
    this.firstRender = false;
  }
  @Input() loading = false;

  @ViewChild('menu') menuElement!: MenuComponent;
  @ViewChild('inputText') inputElement!: ElementRef<HTMLInputElement>;

  _selectList: ISelectItem[] = [];
  filterInput = EMPTY_STRING;
  firstRender = true;

  keyboardSelect = EMPTY_INDEX;

  get currentSelect() {
    return this._selectList.find((item) => item?.value === this?.value);
  }

  get showSelect() {
    return this._selectList.filter((select) =>
      select.name.toLowerCase().includes(this.filterInput.toLowerCase())
    );
  }

  get text() {
    return this.currentSelect?.name || null;
  }

  constructor() {
    super();
  }

  onSelect(selectItem: ISelectItem) {
    if (selectItem?.disabled) return;
    this.filterInput = EMPTY_STRING;
    this.writeValue(selectItem?.value);
    this.onChange(this.value);
  }

  filterSelect(value: string) {
    if (!this.menuElement.isMenuShown) {
      this.menuElement.openMenu();
      this.filterInput = EMPTY_STRING;
    }
    this.filterInput = value;
  }

  onFocus() {
    this.filterInput = EMPTY_STRING;
    this.keyboardSelect = EMPTY_INDEX;
  }

  onBlur() {
    if (this.currentSelect) {
      this.inputElement.nativeElement.value = this.text
        ? this.text
        : EMPTY_STRING;
    }
  }

  pressArrowUp() {
    if (this.readonly) return;
    this.keyboardSelect = this.keyboardSelect - 1;

    if (this.keyboardSelect < 0) {
      this.keyboardSelect = this.showSelect.length - 1;
    }

    this.menuElement.scrollIntoView(this.keyboardSelect);
  }

  pressArrowDown() {
    if (this.readonly) return;
    this.menuElement.isMenuShown = true;
    this.keyboardSelect = this.keyboardSelect + 1;

    if (this.keyboardSelect > this.showSelect.length - 1) {
      this.keyboardSelect = 0;
    }

    this.menuElement.scrollIntoView(this.keyboardSelect);
  }

  pressEnter() {
    if (this.readonly) return;
    this.keyboardSelect >= 0 &&
      this.onSelect(this.showSelect[this.keyboardSelect]);
    this.menuElement.isMenuShown = false;
    this.keyboardSelect = EMPTY_INDEX;
    this.menuElement.isMenuShown = false;
  }

  pressTab() {
    if (this.readonly) return;
    this.menuElement.isMenuShown = false;
  }
}
