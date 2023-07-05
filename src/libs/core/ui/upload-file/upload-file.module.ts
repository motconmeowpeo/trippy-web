import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { MenuModule } from '../menu';
import { ChipModule } from '../chip';
import { InputFileModule } from '../input-file';

@NgModule({
  imports: [
    CommonModule,
    SvgIconsModule,

    // UI
    MenuModule,
    ChipModule,
    InputFileModule,
  ],
  declarations: [UploadFileComponent],
  exports: [UploadFileComponent],
})
export class UploadFileModule {}
