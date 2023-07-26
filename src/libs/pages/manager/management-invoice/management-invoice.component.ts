import { Component, OnInit } from '@angular/core';

import { DialogService } from '@ngneat/dialog';
import { InvoiceDetailModalComponent } from '@core/ui/modal/invoice-detail-modal';
import { Observable, map, of, tap } from 'rxjs';
import { InvoiceFacade } from '@core/services/invoice';
import { AuthFacade, ToastNotificationService } from '@core/services';
import { PayStatus, InvoiceStatus, ModalCloseStatus } from '@core/enum';
import { IInvoice, IUpdateInvoiceCommand } from '@core/model';
import { format, add, compareAsc } from 'date-fns';
import { DEFAULT_FORMAT_DATE } from '@core/constants';
import { ConfirmModalComponent } from '@core/ui/modal';
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
  InvoiceStatus = InvoiceStatus;
  constructor(
    private dialog: DialogService,
    private invoiceFacade: InvoiceFacade,
    private authFacade: AuthFacade,
    private toast: ToastNotificationService
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

  compareDate(date: string | Date, step: number) {
    const today = new Date(format(new Date(), DEFAULT_FORMAT_DATE));
    const createDate = new Date(format(new Date(date), DEFAULT_FORMAT_DATE));
    return compareAsc(add(createDate, { days: step }), today);
  }

  openCancelInvoie(id: string, invoiceStatus: InvoiceStatus) {
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
            this.cancelInvoice(id, invoiceStatus);
          }
        })
      )
      .subscribe();
  }
  cancelInvoice(id: string, status: InvoiceStatus) {
    this.invoiceFacade
      .cancel(id, status)
      .pipe(
        tap(() => {
          this.toast.success(
            'Success',
            status === InvoiceStatus.CANCELED
              ? 'Canceled invoice'
              : 'Invoice has done'
          );
        })
      )
      .subscribe();
  }

  changePayStatusInvoice(invoice: IInvoice, payStatus: PayStatus) {
    this.dialog
      .open(ConfirmModalComponent, {
        data: {
          title: 'Update invoice',
          description: `This invoice paid $${
            payStatus === PayStatus.ONE_THIRD
              ? Math.floor(invoice.total / 3)
              : invoice.total
          } and can't revert this change`,
          textSubmit: 'Submit',
          textCancel: 'Cancel',
        },
      })
      .afterClosed$.pipe(
        tap((status: any) => {
          if (status?.status === ModalCloseStatus.COMPLETE) {
            const invoiceDto: IUpdateInvoiceCommand = {
              id: invoice.id,
              payStatus,
              paid:
                payStatus === PayStatus.ONE_THIRD
                  ? Math.floor(invoice.total / 3)
                  : invoice.total,
            };
            this.update(invoiceDto);
          }
        })
      )
      .subscribe();
  }

  update(invoice: IUpdateInvoiceCommand) {
    this.invoiceFacade
      .update(invoice.id, invoice)
      .pipe(
        tap(() => {
          this.toast.success('Success', 'Updated invoice');
        })
      )
      .subscribe();
  }

  formatDate(date: Date | string) {
    return format(new Date(date), DEFAULT_FORMAT_DATE);
  }
}
