import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  setActiveId,
} from '@ngneat/elf-entities';
import { filter, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './tour.store';
import { TourService } from './tour.service';

@Injectable({ providedIn: 'root' })
export class TourFacade {
  tours$ = store.pipe(selectAllEntities());
  tour$ = store.pipe(
    selectActiveEntity(),
    filter((role) => !!role)
  );
  constructor(private tourService: TourService) {}
  getAll() {
    return this.tourService
      .getAll()
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
}
