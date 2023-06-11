import {
  selectActiveEntity,
  selectAllEntities,
  setEntities,
  setActiveId,
  addEntities,
} from '@ngneat/elf-entities';
import { filter, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { store } from './tour-comment.store';
import { TourComment } from './tour-comment.service';
import { ICreateTourComment } from '@core/model';

@Injectable({ providedIn: 'root' })
export class TourCommentFacade {
  comments$ = store.pipe(selectAllEntities());
  comment$ = store.pipe(
    selectActiveEntity(),
    filter((comment) => !!comment)
  );
  constructor(private tourService: TourComment) {}
  getByTourId(id: string) {
    return this.tourService
      .getByTourId(id)
      .pipe(tap((comments) => store.update(setEntities(comments))));
  }

  create(payload: Partial<ICreateTourComment>) {
    return this.tourService
      .createComment(payload)
      .pipe(tap((comment) => store.update(addEntities(comment))));
  }
}
