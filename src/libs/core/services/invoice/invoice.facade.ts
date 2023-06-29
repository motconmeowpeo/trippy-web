import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  setActiveId,
  addEntities,
  deleteEntities,
} from '@ngneat/elf-entities';
import { filter, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './invoice.store';
import { InvoiceService } from './invoice.service';
import { IBaseParams, IInvoiceCommand } from '@core/model';

@Injectable({ providedIn: 'root' })
export class InvoiceFacade {
  tours$ = store.pipe(selectAllEntities());
  tour$ = store.pipe(
    selectActiveEntity(),
    filter((role) => !!role)
  );
  constructor(private invoiceService: InvoiceService) {}
  getAll(params?: IBaseParams) {
    return this.invoiceService.getAll(params).pipe(
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
      .pipe(tap((tour) => store.update(deleteEntities(tour.id))));
  }
}
