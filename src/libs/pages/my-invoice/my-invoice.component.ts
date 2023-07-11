import { Component, OnInit } from '@angular/core';
import { IInvoice } from '@core/model';
import { AuthFacade } from '@core/services';
import { InvoiceFacade } from '@core/services/invoice';
import { InvoiceDetailModalComponent } from '@core/ui/modal/invoice-detail-modal';
import { DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-my-invoice',
  templateUrl: './my-invoice.component.html',
})
export class MyInvoiceComponent implements OnInit {
  isLoading = false;
  invoices$ = this.invoiceFacade.invoices$;
  user$ = this.authFacade.user$;
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
          .getInvoiceByMine(user.id)
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
