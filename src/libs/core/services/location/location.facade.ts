import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
} from '@ngneat/elf-entities';
import { store } from './location.store';
import { filter, tap } from 'rxjs';
import { LocationService } from './location.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocationFacade {
  locations$ = store.pipe(selectAllEntities());
  location$ = store.pipe(
    selectActiveEntity(),
    filter((location) => !!location)
  );
  constructor(private locationService: LocationService) {}
  getAllLocation() {
    return this.locationService
      .getAllLocation()
      .pipe(tap((location) => store.update(setEntities(location))));
  }
}
