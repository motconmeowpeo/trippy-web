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
import { store } from './tour.store';
import { TourService } from './tour.service';
import { IBaseParams, ITourCommand } from '@core/model';

@Injectable({ providedIn: 'root' })
export class TourFacade {
  tours$ = store.pipe(selectAllEntities());
  tour$ = store.pipe(
    selectActiveEntity(),
    filter((role) => !!role)
  );
  constructor(private tourService: TourService) {}
  getAll(params?: IBaseParams) {
    return this.tourService.getAll(params).pipe(
      tap((tours) => {
        store.update(setEntities(tours));
      })
    );
  }

  changeStatus(id: string) {
    return this.tourService
      .changeStatus(id)
      .pipe(tap((tour) => store.update(updateEntities(tour.id, tour))));
  }

  getTourByManager(authorId: string, params?: IBaseParams) {
    return this.tourService
      .getTourByManager(authorId, params)
      .pipe(tap((tours) => store.update(setEntities(tours))));
  }

  getTourById(id: string) {
    return this.tourService.getTourById(id).pipe(
      tap((tour) => {
        store.update(setEntities([tour]));
        store.update(setActiveId(tour.id));
      })
    );
  }

  create(payload: Partial<ITourCommand>) {
    return this.tourService.create(payload).pipe(
      tap((tour) => {
        store.update(addEntities(tour));
        store.update(setActiveId(tour.id));
      })
    );
  }

  delete(id: string) {
    return this.tourService
      .delete(id)
      .pipe(tap((tour) => store.update(deleteEntities(tour.id))));
  }
}
