import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocation } from '@core/model';
import { API_LOCATION } from '@core/constants';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(private http: HttpClient) {}
  getAllLocation() {
    return this.http.get<ILocation[]>(API_LOCATION);
  }
}
