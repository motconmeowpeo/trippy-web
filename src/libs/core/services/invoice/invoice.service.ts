import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { API_INVOICE } from '../../constants/url.constant';
import { IBaseParams, IInvoice, IInvoiceCommand } from '@core/model';
import { HttpService } from '../http';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpService) {}

  getAll(params?: IBaseParams): Observable<IInvoice[]> {
    return this.http.get<IInvoice[]>(API_INVOICE, { params });
  }

  // getTourById(id: string): Observable<IInvoice> {
  //   return this.http.get<IInvoice>(`${API_INVOICE}/${id}`);
  // }

  create(payload: Partial<IInvoiceCommand>): Observable<IInvoice> {
    return this.http.post<IInvoice>(`${API_INVOICE}`, payload);
  }

  delete(id: string) {
    return this.http.delete<IInvoice>(`${API_INVOICE}/${id}`);
  }
}
