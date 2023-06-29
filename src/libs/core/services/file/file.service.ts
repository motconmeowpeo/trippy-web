import { Injectable } from '@angular/core';
import { HttpService } from '../http';
import { API_UPLOAD } from '../../constants/url.constant';
import { combineLatest } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpService) {}

  upload(files: File[]) {
    return combineLatest(files.map((file) => this.uploadFile(file)));
  }

  private uploadFile(file: File) {
    return this.http.put<File>(`${API_UPLOAD}${file.name}`, file);
  }
}
