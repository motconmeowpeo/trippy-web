import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole } from '@core/model';
import { API_ROLE } from '@core/constants';

@Injectable({ providedIn: 'root' })
export class RoleService {
  constructor(private http: HttpClient) {}
  getAllRole() {
    return this.http.get<IRole[]>(API_ROLE);
  }
}
