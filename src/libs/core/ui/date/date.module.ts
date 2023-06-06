import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDateComponent } from './date.component';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, SvgIconsModule, NzDatePickerModule, FormsModule],
  declarations: [InputDateComponent],
  exports: [InputDateComponent],
})
export class InputDateModule {}
