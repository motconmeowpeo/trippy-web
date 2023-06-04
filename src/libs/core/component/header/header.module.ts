import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PermissionsDirectiveModule } from '../../directive/permission.directive.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule,
    NzToolTipModule,
    PermissionsDirectiveModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
