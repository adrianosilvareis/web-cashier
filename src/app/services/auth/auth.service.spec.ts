import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HomeComponent } from '../../pages/home/home.component';
import { LoginComponent } from '../../pages/login/login.component';
import { LocalStorageService } from '../storage/local-storage.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let storage: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([
          { path: '', component: LoginComponent },
          { path: 'simple', component: HomeComponent },
        ]),
      ],
      providers: [AuthService, LocalStorageService],
    });
    authService = TestBed.inject(AuthService);
    storage = TestBed.inject(LocalStorageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    storage.clear();
  });

  it('should login successfully and navigate to home', () => {
    const email = 'test@example.com';
    const password = 'password';
    const remember = true;
    authService.router.navigate = jest.fn();

    authService.login(email, password, remember).subscribe(() => {});

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password, remember });

    req.flush({ token: 'mockToken', refreshToken: 'mockRefreshToken' });

    expect(authService.router.navigate).toHaveBeenCalledWith(['/home']);
    expect(authService.storage.get('token')).toBe('mockToken');
    expect(authService.storage.get('refreshToken')).toBe('mockRefreshToken');
  });

  it('should not save refresh token if not provided', () => {
    const email = 'test@example.com';
    const password = 'password';
    const remember = false;
    authService.router.navigate = jest.fn();

    authService.login(email, password, remember).subscribe(() => {});

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password, remember });

    req.flush({ token: 'mockToken' });

    expect(authService.router.navigate).toHaveBeenCalledWith(['/home']);
    expect(authService.storage.get('token')).toBe('mockToken');
  });

  it('should handle login error', () => {
    const email = 'test@example.com';
    const password = 'password';
    const remember = true;

    authService.login(email, password, remember).subscribe({
      next: () => {
        fail('Expected an error');
      },
      error: (error) => {
        expect(error).toBe('mockError');
      },
    });

    const req = httpMock.expectOne('/api/login');
    req.flush(
      { error: 'mockError' },
      { status: 400, statusText: 'Bad Request' }
    );
  });
});
