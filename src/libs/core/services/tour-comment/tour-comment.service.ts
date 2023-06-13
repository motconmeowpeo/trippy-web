import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_TOUR, API_COMMENT } from '../../constants/url.constant';
import { ICreateTourComment, ITourComment } from '@core/model';

@Injectable({ providedIn: 'root' })
export class TourComment {
  constructor(private http: HttpClient) {}

  getByTourId(id: string): Observable<ITourComment[]> {
    // return this.http.get<IHero[]>(API_URL);
    return this.http.get<ITourComment[]>(`${API_COMMENT}/tour/${id}`);
  }

  createComment(payload: Partial<ICreateTourComment>) {
    return this.http.post<ITourComment>(API_COMMENT, payload);
  }

  delete(id: string) {
    return this.http.delete<ITourComment>(`${API_COMMENT}/${id}`);
  }
}
