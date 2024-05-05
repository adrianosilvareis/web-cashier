import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { AuthService } from '../../../login/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  register(name: string, email: string, password: string): Observable<void> {
    return this.http.post('/api/register', { name, email, password }).pipe(
      map(() => {
        this.auth.login(email, password, true).pipe(take(1)).subscribe();
      }),
      catchError((err) => {
        return throwError(() => err.error);
      })
    );
  }
}
