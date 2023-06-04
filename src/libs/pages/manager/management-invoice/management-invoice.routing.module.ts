import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementInvoiceComponent } from './management-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementInvoiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementInvoiceRoutingModule {}
