import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourItemComponent } from './tourItem.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { MenuModule } from '@core/ui';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, RouterModule, NzToolTipModule,MenuModule,SvgIconsModule],
  declarations: [TourItemComponent],
  exports: [TourItemComponent],
})
export class TourItemModule {}
