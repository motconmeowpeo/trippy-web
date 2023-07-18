import { Component, OnInit } from '@angular/core';
import { AuthFacade, ShellFacade } from '@core/services';
import { ContactFacade } from '@core/services/contact';
import { InvoiceFacade } from '@core/services/invoice';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
})
export class ManagerComponent implements OnInit {
  isSidebarExpanded$ = this.shellFacade.isSidebarExpanded$;
  invoices$ = this.invoiceFacade.invoices$;
  user$ = this.authFacade.user$;
  contacts$ = this.contactFacade.contacts$;

  isLoading = false;

  constructor(
    private shellFacade: ShellFacade,
    private invoiceFacade: InvoiceFacade,
    private authFacade: AuthFacade,
    private contactFacade: ContactFacade
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
    this.getContact();
  }

  private getContact() {
    this.isLoading = true;
    this.contactFacade
      .getAllContactByManager()
      .subscribe(() => (this.isLoading = false));
  }
}
