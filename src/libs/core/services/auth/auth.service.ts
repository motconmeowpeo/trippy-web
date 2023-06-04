import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuth, ICreateUser, ILogin, IToken, IUser } from '@core/model';
import { API_USER } from '@core/constants';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private jwtService: JwtHelperService) {}
  loginByEmail(payload: Partial<ILogin>) {
    return this.http
      .post<IToken>(`${API_USER}/login`, payload)
      .pipe(map((token) => this.authenticate(token)));
  }

  isTokenExpired(token: string): boolean {
    return this.jwtService.isTokenExpired(token);
  }

  private authenticate(authToken: IToken): IAuth {
    return {
      ...authToken,
      user: this.jwtService.decodeToken(String(authToken.accessToken)),
    };
  }
}
