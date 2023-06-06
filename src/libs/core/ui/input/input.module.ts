import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@NgModule({
  imports: [CommonModule, SvgIconsModule, NzToolTipModule],
  declarations: [InputComponent],
  exports: [InputComponent],
})
export class InputModule {}
