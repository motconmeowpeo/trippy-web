import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementInvoiceComponent } from './management-invoice.component';
import { ManagementInvoiceRoutingModule } from './management-invoice.routing.module';

@NgModule({
  imports: [CommonModule, ManagementInvoiceRoutingModule],
  declarations: [ManagementInvoiceComponent],
})
export class ManagementInvoiceModule {}
