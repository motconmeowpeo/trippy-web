import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';
import { PermissionsDirectiveModule } from '../../directive/permission.directive.module';
import { IconsModule } from '@core/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    // UI

    // Directives
    PermissionsDirectiveModule,

    // Icons
    IconsModule,
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class SidebarModule {}
