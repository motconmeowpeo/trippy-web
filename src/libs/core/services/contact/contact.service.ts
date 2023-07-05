import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IBaseParams,
  IContact,
  ICreateContact,
  ICreateUser,
  IUser,
} from '@core/model';
import { API_CONTACT, API_USER } from '@core/constants';
import { HttpService } from '../http';
import { ContactStatus } from '../../enum/contact.enum';

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private http: HttpService) {}
  createContact(payload: Partial<ICreateContact>) {
    return this.http.post<IContact>(API_CONTACT, payload);
  }

  getAllContactByManager(params?: IBaseParams) {
    return this.http.get<IContact[]>(`${API_CONTACT}`, { params });
  }

  changeStatusCOntact(id: string, status: ContactStatus) {
    return this.http.put<IContact>(`${API_CONTACT}/${id}`, { status });
  }
}
