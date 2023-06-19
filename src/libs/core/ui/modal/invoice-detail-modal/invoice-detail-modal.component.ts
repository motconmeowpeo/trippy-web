import { Component, OnInit, Input } from '@angular/core';
import { FormModalComponent } from '../base/form-modal';

@Component({
  selector: 'app-invoice-detail-modal',
  templateUrl: './invoice-detail-modal.component.html',
})
export class InvoiceDetailModalComponent
  extends FormModalComponent<any>
  implements OnInit
{

  constructor() {
    super();
  }

  get invoice() {
    return this.data?.invoice;
  }
  ngOnInit(): void {}
}
