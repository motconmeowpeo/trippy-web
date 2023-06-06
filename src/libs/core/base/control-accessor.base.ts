/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BaseComponent } from './component.base';

export class BaseControlValueAccessor<T>
  extends BaseComponent
  implements ControlValueAccessor
{
  disabled = false;
  value!: T;

  onChange(newVal: T) {}

  onTouched(_?: any) {}

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
