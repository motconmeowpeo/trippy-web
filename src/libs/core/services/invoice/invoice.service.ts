import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { API_INVOICE } from '../../constants/url.constant';
import {
  IBaseParams,
  IInvoice,
  IInvoiceCommand,
  IUpdateInvoiceCommand,
} from '@core/model';
import { HttpService } from '../http';
import { InvoiceStatus } from '@core/enum';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpService) {}

  getAll(authorId: string, params?: IBaseParams): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${API_INVOICE}/author/${authorId}`, {
      params,
    });
  }

  // getTourById(id: string): Observable<IInvoice> {
  //   return this.http.get<IInvoice>(`${API_INVOICE}/${id}`);
  // }

  getInvoiceByMine(
    authorId: string,
    params?: IBaseParams
  ): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(`${API_INVOICE}/mine/${authorId}`, {
      params,
    });
  }

  create(payload: Partial<IInvoiceCommand>): Observable<IInvoice> {
    return this.http.post<IInvoice>(`${API_INVOICE}`, payload);
  }

  delete(id: string) {
    return this.http.delete<IInvoice>(`${API_INVOICE}/${id}`);
  }

  update(id: string, payload: IUpdateInvoiceCommand) {
    return this.http.put<IInvoice>(`${API_INVOICE}/${id}`, payload);
  }

  cancel(id: string, status: InvoiceStatus) {
    return this.http.put<IInvoice>(`${API_INVOICE}/status/${id}`, { status });
  }
}
