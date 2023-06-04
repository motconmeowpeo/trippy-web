import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementCustomerComponent } from './management-customer.component';
import { ManagementCustomerRoutingModule } from './management-customer.routing.module';

@NgModule({
  imports: [CommonModule, ManagementCustomerRoutingModule],
  declarations: [ManagementCustomerComponent],
})
export class ManagementCustomerModule {}
