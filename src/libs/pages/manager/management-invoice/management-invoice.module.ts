import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementInvoiceComponent } from './management-invoice.component';
import { ManagementInvoiceRoutingModule } from './management-invoice.routing.module';
import { LoadingModule } from '@core/component/loading';
import { SearchModule } from '@core/ui';

@NgModule({
  imports: [CommonModule, ManagementInvoiceRoutingModule, LoadingModule, SearchModule],
  declarations: [ManagementInvoiceComponent],
})
export class ManagementInvoiceModule {}
