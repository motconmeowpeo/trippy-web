import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFileComponent } from './input-file.component';
import { SvgIconsModule } from '@ngneat/svg-icon';

@NgModule({
  imports: [CommonModule, SvgIconsModule],
  declarations: [InputFileComponent],
  exports: [InputFileComponent],
})
export class InputFileModule {}
