import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  setActiveId,
  addEntities,
  deleteEntities,
  deleteAllEntities,
} from '@ngneat/elf-entities';
import { filter, tap, delay } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './tour.store';
import { TourService } from './tour.service';
import { IBaseParams, ITour, ITourCommand } from '@core/model';
import { getDownloadURL, ref } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class TourFacade {
  tours$ = store.pipe(selectAllEntities());
  tour$ = store.pipe(
    selectActiveEntity(),
    filter((role) => !!role)
  );
  constructor(private tourService: TourService, private storage: Storage) {}
  getAll(params?: IBaseParams) {
    return this.tourService.getAll(params).pipe(
      tap((tours) => {
        store.update(deleteAllEntities());
        tours.map((tour) => {
          const storageRefPreview = ref(this.storage, tour.preview);
          getDownloadURL(storageRefPreview).then((preview) => {
            store.update(addEntities({ ...tour, preview }));
          });
        });
        // store.update(setEntities(tours));
      })
    );
  }
  getTourById(id: string) {
    return this.tourService.getTourById(id).pipe(
      tap((tour) => {
        const storageRefOverview = tour.overview.map((image) =>
          ref(this.storage, image)
        );
        const overviewPr = storageRefOverview.map((ref) => getDownloadURL(ref));
        Promise.all(overviewPr).then((overview) => {
          store.update(setEntities([{ ...tour, overview }]));
          store.update(setActiveId(tour.id));
        });
        // store.update(setEntities([tour]));
      })
    );
  }
  create(payload: Partial<ITourCommand>) {
    return this.tourService.create(payload).pipe(
      delay(2000),
      tap((tour) => {
        const storageRefPreview = ref(this.storage, tour.preview);
        getDownloadURL(storageRefPreview).then((preview) => {
          store.update(addEntities({ ...tour, preview }, { prepend: true }));
          store.update(setActiveId(tour.id));
        });

        // store.update(setActiveId(tour.id));
      })
    );
  }

  delete(id: string) {
    return this.tourService
      .delete(id)
      .pipe(tap((tour) => store.update(deleteEntities(tour.id))));
  }
}
