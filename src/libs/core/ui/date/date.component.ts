import {
  Component,
  forwardRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  DEFAULT_FORMAT_DATE,
  SETTING_FORMAT_DATE,
  EMPTY_STRING,
} from '@core/constants';
import { WeekDay } from '@core/enum';
import { differenceInCalendarDays, format, getDay } from 'date-fns';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { BaseControlValueAccessor } from '@core/base';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true,
    },
  ],
})
export class InputDateComponent extends BaseControlValueAccessor<string> {
  @Input() className!: string;
  @Input() inputClassName!: string;
  @Input() label!: string;
  @Input() readonly!: boolean;
  @Input() error!: string;
  @Input() hint!: string;
  @Input() minDate!: Date;
  @Input() required!: string;
  @Input() maxDate!: Date;
  @Input() placeholder!: string;
  @Input() customIcon = 'calendar';
  @Input() formatDate!: string;
  @Input() formatInForm!: string;
  @Input() disabledDayOfWeek!: WeekDay[];
  @Input() allowClear = true;

  readonly PLACEHOLDER_EMPTY = '';
  readonly DEFAULT_FORMAT_DATE = DEFAULT_FORMAT_DATE;
  readonly SETTING_FORMAT_DATE = SETTING_FORMAT_DATE;

  @Input() showDisabledTooltip = true;

  @ViewChild('datePicker') datePicker!: NzDatePickerComponent;

  disabledDate = (current: Date): boolean => {
    //Disabled WeekDay
    const disabledDayOfWeek =
      this.disabledDayOfWeek &&
      this.disabledDayOfWeek.includes(getDay(current));

    // Disabled Specific day

    // Disabled range
    const minDateInvalid =
      this.minDate && differenceInCalendarDays(current, this.minDate) < 0;
    const maxDateInvalid =
      this.maxDate && differenceInCalendarDays(this.maxDate, current) < 0;

    return minDateInvalid || maxDateInvalid || disabledDayOfWeek;
  };

  constructor() {
    super();
  }

  onInput(date: Date) {
    this.writeValue(date ? date.toISOString() : EMPTY_STRING);
    this.onChange(
      date
        ? format(date, this.formatInForm || this.DEFAULT_FORMAT_DATE)
        : EMPTY_STRING
    );
  }

  onTypingDay(e: Event) {
    const inputElement = e.target as HTMLInputElement;
    const { value } = e.target as HTMLInputElement;
    inputElement.value = value.replace(/[^0-9/]*/g, EMPTY_STRING);
  }
}
