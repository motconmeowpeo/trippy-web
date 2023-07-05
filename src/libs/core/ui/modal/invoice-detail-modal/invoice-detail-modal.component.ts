import { Component, OnInit, Input } from '@angular/core';
import { FormModalComponent } from '../base/form-modal';
import { IInvoice } from '@core/model';
import { add, format } from 'date-fns';
import { DEFAULT_FORMAT_DATE } from '@core/constants';
import { InformationModalComponent } from '../base/information-modal/information-modal.component';

@Component({
  selector: 'app-invoice-detail-modal',
  templateUrl: './invoice-detail-modal.component.html',
})
export class InvoiceDetailModalComponent
  extends InformationModalComponent
  implements OnInit
{
  constructor() {
    super();
  }

  get invoice(): IInvoice {
    return this.data?.invoice;
  }

  caculatorDate(date: string | Date, number: number) {
    return format(add(new Date(date), { days: number }), DEFAULT_FORMAT_DATE);
  }
  ngOnInit(): void {}
}
