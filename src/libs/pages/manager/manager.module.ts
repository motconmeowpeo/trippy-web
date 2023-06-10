import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { ManagerRoutingModule } from './manager.routing.module';
import { SidebarModule } from '@core/component/sidebar';

@NgModule({
  imports: [CommonModule, ManagerRoutingModule, SidebarModule],
  declarations: [ManagerComponent],
})
export class ManagerModule {}
