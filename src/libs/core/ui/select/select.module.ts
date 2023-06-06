import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select.component';
import { MenuModule } from '../menu';
import { LoadingModule } from '@core/component/loading';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    LoadingModule,
    SvgIconsModule,
    FontAwesomeModule,
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent],
})
export class SelectModule {}
