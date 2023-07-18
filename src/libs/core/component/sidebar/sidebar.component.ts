import { Component, Input } from '@angular/core';
import { MENU_GROUP } from './sidebar.constant';
import { Observable, Subscription } from 'rxjs';

import { BaseComponent } from '@core/base';
import { ContactFacade } from '@core/services/contact';
import { IContact } from '../../model/contact.model';
import { URL_CONTACT, URL_INVOICE } from '@pages/manager';
import { ContactStatus } from '../../enum/contact.enum';
import { IInvoice } from '../../model/invoice.model';
import { PayStatus } from '../../enum/invoice.enum';
import { Invoice } from '../../../pages/manager/management-invoice/management-invoice.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent extends BaseComponent {
  @Input() contacts!: IContact[] | null;
  @Input() invoices!: IInvoice[] | null;
  MENU_GROUP = MENU_GROUP;

  isSidebarExpanded$!: Observable<boolean>;
  isSidebarSwitched$!: Observable<boolean>;
  sidebarItemsState: Record<string, boolean> = {};
  isComponentFirstLoaded = true;
  changeMenuSubscription!: Subscription;
  isSideBarShown = true;
  URL_CONTACT = URL_CONTACT;
  URL_INVOICE = URL_INVOICE;
  constructor(private contactFacade: ContactFacade) {
    super();
  }

  toggleSidebar() {
    this.isSideBarShown = !this.isSideBarShown;
  }
  ngOnInit(): void {}

  countContactNew(contact: IContact[]) {
    return contact.filter((contact) => contact.status === ContactStatus.PENDING)
      .length;
  }

  countInvoiceNew(invoices: IInvoice[]) {
    return invoices.filter((invoice) => invoice.payStatus === PayStatus.NONE)
      .length;
  }
}
