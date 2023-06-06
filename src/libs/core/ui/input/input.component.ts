import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor } from '@core/base';
import { capitalizeFirstLetter } from '@core/until';

@Component({
  selector: 'iworkspace-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends BaseControlValueAccessor<string> {
  @Input() className!: string;
  @Input() label!: string;
  @Input() labelClass!: string;
  @Input() type: 'text' | 'password' = 'text';
  @Input() placeholder!: string;
  @Input() readonly!: boolean;
  @Input() suffix!: string;
  @Input() error!: string;
  @Input() hint!: string;
  @Input() required!: string;
  @Input() isStrongPassword!: boolean;
  @Input() isCapitalizeFirstLetter = false;
  @Input() willBreakHintWords = false;
  @Input() set isDisabled(boolean: boolean) {
    this.disabled = boolean;
  }
  @Input() set clearInput(boolean: boolean) {
    if (boolean) {
      this.writeValue('');
      this.onChange('');
    }
  }
  @Input() multiple = false;

  isPasswordShown = false;

  get isTypePassword(): boolean {
    return this.type === 'password';
  }

  onInput(e: Event) {
    const { value } = (e.target as HTMLInputElement) || {};

    this.writeValue(
      this.isCapitalizeFirstLetter ? capitalizeFirstLetter(value) : value
    );
    this.onChange(this.value);
  }

  togglePassword() {
    this.isPasswordShown = !this.isPasswordShown;
  }

  blockSpace(e: Event) {
    (this.isTypePassword || !this.value) && e.preventDefault();
  }

  onBlur(e: Event) {
    const { value } = (e.target as HTMLInputElement) || {};
    if (!value) return;

    // Auto trim white space when blur input
    this.value = value.trim();
    this.onChange(value.trim());
  }

  matchRegex(regex: RegExp): boolean {
    return !!this.value.match(regex);
  }
}
