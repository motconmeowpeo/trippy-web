import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  setActiveId,
  addEntities,
  deleteEntities,
  updateEntities,
} from '@ngneat/elf-entities';
import { filter, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './invoice.store';
import { InvoiceService } from './invoice.service';
import {
  IBaseParams,
  IInvoiceCommand,
  IUpdateInvoiceCommand,
} from '@core/model';
import { InvoiceStatus } from '../../enum/status.enum';

@Injectable({ providedIn: 'root' })
export class InvoiceFacade {
  invoices$ = store.pipe(selectAllEntities());
  invoice$ = store.pipe(
    selectActiveEntity(),
    filter((invoice) => !!invoice)
  );
  constructor(private invoiceService: InvoiceService) {}
  getAllInvoiceByAuthor(authorId: string, params?: IBaseParams) {
    return this.invoiceService.getAll(authorId, params).pipe(
      tap((invoice) => {
        store.update(setEntities(invoice));
      })
    );
  }

  getInvoiceByMine(authorId: string, params?: IBaseParams) {
    return this.invoiceService.getInvoiceByMine(authorId, params).pipe(
      tap((invoice) => {
        store.update(setEntities(invoice));
      })
    );
  }
  // getTourById(id: string) {
  //   return this.invoiceService.getTourById(id).pipe(
  //     tap((tour) => {
  //       const storageRefOverview = tour.overview.map((image) =>
  //         ref(this.storage, image)
  //       );
  //       const overviewPr = storageRefOverview.map((ref) => getDownloadURL(ref));
  //       Promise.all(overviewPr).then((overview) => {
  //         store.update(setEntities([{ ...tour, overview }]));
  //         store.update(setActiveId(tour.id));
  //       });
  //       store.update(setEntities([tour]));
  //     })
  //   );
  // }

  create(payload: Partial<IInvoiceCommand>) {
    return this.invoiceService.create(payload).pipe(
      tap((invoice) => {
        store.update(addEntities(invoice, { prepend: true }));

        store.update(setActiveId(invoice.id));
      })
    );
  }

  delete(id: string) {
    return this.invoiceService
      .delete(id)
      .pipe(tap((invoice) => store.update(deleteEntities(invoice.id))));
  }

  update(id: string, payload: IUpdateInvoiceCommand) {
    return this.invoiceService.update(id, payload).pipe(
      tap((invoice) => {
        store.update(updateEntities(id, invoice));
      })
    );
  }

  cancel(id: string, status: InvoiceStatus) {
    return this.invoiceService
      .cancel(id, status)
      .pipe(
        tap((invoice) => store.update(updateEntities(invoice.id, invoice)))
      );
  }
}
