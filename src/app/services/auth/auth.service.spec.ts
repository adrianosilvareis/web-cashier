import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { LoginComponent } from '../../pages/login/login.component';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([
          { path: '', component: LoginComponent },
          { path: 'home', component: HomeComponent },
        ]),
      ],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set rememberMe in storage', () => {
    const storageSpy = jest.spyOn(authService.storage, 'set');

    authService.login('test@example.com', 'password', true).subscribe(() => {
      expect(storageSpy).toHaveBeenCalledWith('rememberMe', true);
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'test-token' });
  });

  it('should set token in storage and navigate to home', () => {
    const storageSpy = jest.spyOn(authService.storage, 'set');
    const routerSpy = jest.spyOn(authService.router, 'navigate');

    authService.login('test@example.com', 'password', false).subscribe(() => {
      expect(storageSpy).toHaveBeenCalledWith('token', 'test-token');
      expect(routerSpy).toHaveBeenCalledWith(['/home']);
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'test-token' });
  });

  it('should handle error and return error message', () => {
    const errorResponse = { error: 'Invalid credentials' };

    authService.login('test@example.com', 'password', false).subscribe(
      () => {
        fail('Expected error to be thrown');
      },
      (error) => {
        expect(error).toBe('Invalid credentials');
      }
    );

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse, { status: 401, statusText: 'Unauthorized' });
  });

  it('should re-throw error if catchError is not used', () => {
    const errorResponse = { error: 'Internal server error' };

    authService.login('test@example.com', 'password', false).subscribe({
      error: (error) => {
        expect(error).toBe(errorResponse);
      },
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    req.flush(errorResponse, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
