import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControlValueAccessor } from '@core/base';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFileComponent),
      multi: true,
    },
  ],
})
export class InputFileComponent extends BaseControlValueAccessor<File | null> {
  @Input() className!: string;
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() readonly!: boolean;
  @Input() error!: string;
  @Input() hint!: string;
  @Input() fileFormat = '*';
  @Input() override disabled = false;
  @Input() onlyInput = false;
  @Input() multiple = false;

  @Output() valueChanges = new EventEmitter<File>();

  @ViewChild('inputFileElement', { read: ElementRef })
  inputFileElement!: ElementRef;

  onInput(e: Event) {
    const files = (e.target as HTMLInputElement).files as FileList;

    if (!files || !Object.keys(files)?.length) {
      return;
    }
    //Currently, We can't choose multi file, so length is 1 => index = 0

    this.value = files[0];
    this.onChange(this.value);
    this.valueChanges.emit(this.value);
  }

  clearInput() {
    this.writeValue(null);
    this.onChange(null);
    this.inputFileElement.nativeElement.value = null;
  }

  selectFile(): void {
    this.inputFileElement?.nativeElement.click();
  }
}
