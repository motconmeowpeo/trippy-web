import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementContactComponent } from './management-contact.component';
import { ManagementContactRoutingModule } from './management-contact.routing.module';
import { LoadingModule } from '@core/component/loading';
import { SearchModule } from '@core/ui';

@NgModule({
  imports: [
    CommonModule,
    ManagementContactRoutingModule,
    LoadingModule,
    SearchModule,
  ],
  declarations: [ManagementContactComponent]
})
export class ManagementContactModule { }
