import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateUser, IRole, IUser } from '@core/model';
import { API_ROLE, API_USER } from '@core/constants';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}
  createUser(payload: Partial<ICreateUser>) {
    return this.http.post<IUser>(API_USER, payload);
  }
}
