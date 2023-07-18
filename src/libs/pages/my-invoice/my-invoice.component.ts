import { Component, OnInit } from '@angular/core';
import { IInvoice, IInvoiceCommand, IUpdateInvoiceCommand } from '@core/model';
import { AuthFacade, ToastNotificationService } from '@core/services';
import { InvoiceFacade } from '@core/services/invoice';
import { InvoiceDetailModalComponent } from '@core/ui/modal/invoice-detail-modal';
import { DialogService } from '@ngneat/dialog';
import { InvoiceStatus, ModalCloseStatus, PayStatus } from '@core/enum';
import { format, add, compareAsc } from 'date-fns';
import { DEFAULT_FORMAT_DATE, URL_MYINVOICE } from '@core/constants';
import { ConfirmModalComponent } from '@core/ui/modal';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
const stripe = require('stripe')(
  'sk_test_51NUtkGGAiJ1r1jURsmHjNvvUIbAhprIBd7oHTSl1Nfu9ZOuyAJWvwylquqXszQbD1CqxdNYKSmPbWy3sQCT4x7sb00nwIX18D9'
);
@Component({
  selector: 'app-my-invoice',
  templateUrl: './my-invoice.component.html',
})
export class MyInvoiceComponent implements OnInit {
  isLoading = false;
  invoices$ = this.invoiceFacade.invoices$;
  user$ = this.authFacade.user$;
  PayStatus = PayStatus;
  InvoiceStatus = InvoiceStatus;
  constructor(
    private dialog: DialogService,
    private invoiceFacade: InvoiceFacade,
    private authFacade: AuthFacade,
    private toast: ToastNotificationService,
    private navigator: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.user$.subscribe((user) => {
      if (user) {
        this.invoiceFacade
          .getInvoiceByMine(user.id)
          .subscribe((invoice) => (this.isLoading = false));
      }
    });

    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      if (sessionStorage.getItem('invoiceDto')) {
        const invoice: IUpdateInvoiceCommand = JSON.parse(
          sessionStorage.getItem('invoiceDto') || ''
        );
        this.invoiceFacade
          .update(invoice.id, invoice)
          .pipe(
            tap(() => {
              this.toast.success('Success', 'Updated invoice');
              this.navigator.navigate([URL_MYINVOICE]);
            })
          )
          .subscribe();
      }
    }

    if (query.get('canceled')) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
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

  compareDate(date: string | Date, step: number) {
    const today = new Date(format(new Date(), DEFAULT_FORMAT_DATE));
    const createDate = new Date(format(new Date(date), DEFAULT_FORMAT_DATE));
    return compareAsc(add(createDate, { days: step }), today);
  }

  openCancelInvoie(id: string) {
    this.dialog
      .open(ConfirmModalComponent, {
        data: {
          title: 'Cancel invoice',
          description: 'This invoice will be can not revert',
          textSubmit: 'Submit',
          textCancel: 'Cancel',
        },
      })
      .afterClosed$.pipe(
        tap((status: any) => {
          if (status?.status === ModalCloseStatus.COMPLETE) {
            this.cancelInvoice(id);
          }
        })
      )
      .subscribe();
  }
  cancelInvoice(id: string) {
    this.invoiceFacade
      .cancel(id, InvoiceStatus.CANCELED)
      .pipe(
        tap(() => {
          this.toast.success('Success', 'Canceled invoice');
        })
      )
      .subscribe();
  }

  formatDate(date: Date | string) {
    return format(new Date(date), DEFAULT_FORMAT_DATE);
  }

  async payment(invoice: IInvoice, payStatus: PayStatus) {
    const YOUR_DOMAIN = `http://localhost:4200/invoice`;
    const total =
      payStatus === PayStatus.ONE_THIRD
        ? Math.floor(invoice.total / 3)
        : invoice.total - invoice.paid;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: 'usd',
            product_data: {
              name: invoice.tour.name + ` Pay: $${total} / $${invoice.total}`,
              description: invoice.tour.description,
            },
            unit_amount: total * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });
    const invoiceDto: IUpdateInvoiceCommand = {
      id: invoice.id,
      payStatus,
      paid:
        payStatus === PayStatus.ONE_THIRD ? Math.floor(invoice.total / 3) : 0,
    };
    sessionStorage.setItem('invoiceDto', JSON.stringify(invoiceDto));
    window.location.href = session.url;
  }

  makePayment(invoice: IInvoice, payStatus: PayStatus) {
    this.payment(invoice, payStatus);
  }
}
