import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PermissionsDirectiveModule } from '../../directive/permission.directive.module';
import { SvgIconsModule } from '@ngneat/svg-icon';
import { MenuModule, IconsModule } from '@core/ui';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NzToolTipModule,
    PermissionsDirectiveModule,
    MenuModule,
    SvgIconsModule,
    IconsModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
