import { Component, OnInit } from '@angular/core';

import { DialogService } from '@ngneat/dialog';
import { InvoiceDetailModalComponent } from '@core/ui/modal/invoice-detail-modal';
import { Observable, map, of, tap } from 'rxjs';
import { InvoiceFacade } from '@core/services/invoice';
import { AuthFacade } from '@core/services';
import { PayStatus } from '@core/enum';
import { IInvoice } from '@core/model';
export interface Invoice {
  name: string;
  tourName: string;
  startDate: string;
  totals: number;
}
@Component({
  selector: 'app-management-invoice',
  templateUrl: './management-invoice.component.html',
})
export class ManagementInvoiceComponent implements OnInit {
  isLoading = false;
  invoices$ = this.invoiceFacade.invoices$;
  user$ = this.authFacade.user$;
  PayStatus = PayStatus;
  constructor(
    private dialog: DialogService,
    private invoiceFacade: InvoiceFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.user$.subscribe((user) => {
      if (user) {
        this.invoiceFacade
          .getAllInvoiceByAuthor(user.id)
          .subscribe(() => (this.isLoading = false));
      }
    });
  }

  openInvoiceDetail(invoice: IInvoice) {
    this.dialog.open(InvoiceDetailModalComponent, {
      data: {
        title: 'Invoice detail',
        invoice: invoice,
      },
      size: 'lg',
    });
  }
}
