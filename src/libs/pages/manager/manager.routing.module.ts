import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';

import { URL_CUSTOMER, URL_INVOICE, URL_TOUR } from './manager.constants';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: URL_TOUR,

        loadChildren: async () =>
          (await import('./management-tour/management-tour.module'))
            .ManagementTourModule,
      },
      {
        path: URL_INVOICE,
        loadChildren: async () =>
          (await import('./management-invoice/management-invoice.module'))
            .ManagementInvoiceModule,
      },
      {
        path: URL_CUSTOMER,
        loadChildren: async () =>
          (await import('./management-customer/management-customer.module'))
            .ManagementCustomerModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
