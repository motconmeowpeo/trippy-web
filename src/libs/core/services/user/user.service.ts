import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBaseParams, ICreateUser, IUser } from '@core/model';
import { API_USER } from '@core/constants';
import { HttpService } from '../http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpService) {}
  createUser(payload: Partial<ICreateUser>) {
    return this.http.post<IUser>(API_USER, payload);
  }

  getAllUserByManager(authorId: string, params?: IBaseParams) {
    return this.http.get<IUser[]>(`${API_USER}/manager/${authorId}`, {
      params,
    });
  }

  changeStatus(id: string) {
    return this.http.put<IUser>(`${API_USER}/status/${id}`, {});
  }
}
