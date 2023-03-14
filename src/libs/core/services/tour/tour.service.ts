import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ITour } from './tour.interface';

@Injectable({ providedIn: 'root' })
export class TourService {
  constructor() {}

  getAll(): Observable<ITour[]> {
    // return this.http.get<IHero[]>(API_URL);
    return of([
      {
        id: '1',
        name: 'Evan',
        des: 'des1',
      },
      {
        id: '2',
        name: 'Nika',
        des: 'des1',
      },
      {
        id: '3',
        name: 'Evan',
        des: 'des1',
      },
      {
        id: '4',
        name: 'Evan',
        des: 'des1',
      },
      {
        id: '5',
        name: 'Nika',
        des: 'des1',
      },
      {
        id: '6',
        name: 'Evan',
        des: 'des1',
      },
    ] as ITour[]).pipe(delay(1000));
  }
}
