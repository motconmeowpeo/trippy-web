import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { PermissionsDirectiveModule } from '../../directive/permission.directive.module';
import { IconsModule } from '@core/ui';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    // UI

    // Directives
    PermissionsDirectiveModule,

    // Icons
    IconsModule,
    FontAwesomeModule,
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class SidebarModule {}
