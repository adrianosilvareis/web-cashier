import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LocalStorageService } from '../storage/local-storage.service';

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public http: HttpClient,
    public router: Router,
    public storage: LocalStorageService
  ) {}

  login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Observable<void> {
    this.storage.set('rememberMe', rememberMe);

    return this.http
      .post<LoginResponse>('/api/login', { email, password })
      .pipe(
        map((res) => {
          this.storage.set('token', res.token);
          this.router.navigate(['/home']);
        }),
        catchError((err) => {
          return throwError(() => err.error);
        })
      );
  }
}
