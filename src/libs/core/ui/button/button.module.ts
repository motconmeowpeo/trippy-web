import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';
import { LoadingSmallModule } from '@core/component/loading-small';
import { IconsModule } from '@core/ui';

@NgModule({
  imports: [CommonModule, IconsModule, LoadingSmallModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonModule { }
