import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseControlValueAccessor } from '@core/base';
import { InputFileComponent } from '../input-file';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true,
    },
  ],
})
export class UploadFileComponent extends BaseControlValueAccessor<File[]> {
  @Input() className!: string;
  @Input() inputClassName!: string;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() error!: string;
  @Input() hint!: string;
  @Input() multipleSelect = true;
  @Input() fileFormat = '*';
  @Input() multiFile = false;
  @Input() classNameChip!: string;

  @ViewChild('inputFile') inputFileElement!: InputFileComponent;

  get arrayName(): string[] {
    return this.value.map((item) => item.name);
  }

  get disabledInput(): boolean {
    return !this.multipleSelect && !!this.value.length;
  }

  constructor() {
    super();
  }

  onAdd(file: File) {
    if (!file) return;

    if (!this.arrayName.includes(file.name)) {
      this.value.push(file);
      this.onChange(this.value);
    }
  }

  onRemove(index: number) {
    this.value.splice(index, 1);
    this.onChange(this.value);
    this.inputFileElement.clearInput();
  }
}
