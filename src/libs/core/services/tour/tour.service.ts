import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ITour } from '../../model/tour.model';
import { API_TOUR } from '../../constants/url.constant';
import { ITourCommand } from '@core/model';

@Injectable({ providedIn: 'root' })
export class TourService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ITour[]> {
    // return this.http.get<IHero[]>(API_URL);
    return this.http.get<ITour[]>(API_TOUR);
  }

  getTourById(id: string): Observable<ITour> {
    return this.http.get<ITour>(`${API_TOUR}/${id}`);
  }

  create(payload: Partial<ITourCommand>): Observable<ITour> {
    return this.http.post<ITour>(`${API_TOUR}`, payload);
  }

  delete(id: string) {
    return this.http.delete<ITour>(`${API_TOUR}/${id}`);
  }
}
