import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../../login/services/auth/auth.service';
import { RegisterApiService } from './register-api.service';

describe('RegisterApiService', () => {
  let service: RegisterApiService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(RegisterApiService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a POST request to /api/register', () => {
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = 'password';

    service.register(name, email, password).subscribe();

    const reqRegister = httpMock.expectOne('/api/register');
    expect(reqRegister.request.method).toBe('POST');
    expect(reqRegister.request.body).toEqual({ name, email, password });
    reqRegister.flush({});

    const reqLogin = httpMock.expectOne('/api/login');
    expect(reqLogin.request.method).toBe('POST');
    expect(reqLogin.request.body).toEqual({ email, password, remember: true });
    reqLogin.flush({});
  });

  it('should call AuthService login method after successful registration', () => {
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = 'password';

    jest.spyOn(authService, 'login').mockImplementation();

    service.register(name, email, password).subscribe();

    const req = httpMock.expectOne('/api/register');
    req.flush({});

    expect(authService.login).toHaveBeenCalledWith(email, password, true);
  });

  it('should handle error response', () => {
    const name = 'John Doe';
    const email = 'john@example.com';
    const password = 'password';
    const errorMessage = 'Registration failed';

    service.register(name, email, password).subscribe(
      () => fail('Expected error to be thrown'),
      (error) => {
        expect(error).toBe(errorMessage);
      }
    );

    const req = httpMock.expectOne('/api/register');
    req.flush(
      { error: errorMessage },
      { status: 500, statusText: 'Internal Server Error' }
    );
  });
});
