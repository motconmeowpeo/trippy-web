import { Component, OnInit } from '@angular/core';

import { DialogService } from '@ngneat/dialog';
import { InvoiceDetailModalComponent } from '@core/ui/modal/invoice-detail-modal';
import { Observable, map, of, tap } from 'rxjs';
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
  constructor(private dialog: DialogService) {}
  test$ = of([
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
    {
      name: 'KH1',
      tourName: 'Tour`',
      startDate: '1/1/1000',
      totals: 10,
    },
  ]);
  ngOnInit() {}

  openInvoiceDetail(invoice: any) {
    this.dialog.open(InvoiceDetailModalComponent, {
      data: {
        title: 'Invoice detail',
        invoice: invoice,
      },
      size: 'lg',
    });
  }
}
