import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EMPTY, of, throwError } from 'rxjs';
import { PrimeModule } from '../../share/prime/prime.module';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from './login.component';
import { AuthService } from './services/auth/auth.service';
import { FormLoginService } from './services/form/form-login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let loginServiceSpy = jest.fn(() => of(EMPTY));
  let authAPI: AuthService;
  let service: FormLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        PrimeModule,
        CommonModule,
        RouterModule.forRoot([
          { path: '', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'home', component: HomeComponent },
        ]),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: loginServiceSpy,
          },
        },
        FormLoginService,
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authAPI = TestBed.inject(AuthService);
    service = TestBed.inject(FormLoginService);
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should invalidate form if email is not provided or is not a valid email', () => {
    const email = service.email;
    const inputEmail = el.query(By.css('#email')).nativeElement;
    const button = el.query(By.css("button[type='submit']")).nativeElement;

    inputEmail.value = '';
    inputEmail.dispatchEvent(new Event('input'));
    expect(email.invalid).toBe(true);
    expect(email.getError('required')).toBe(true);

    inputEmail.value = 'test';
    inputEmail.dispatchEvent(new Event('input'));
    expect(email.invalid).toBe(true);
    expect(email.getError('email')).toBe(true);

    expect(button.disabled).toBeTruthy();
  });

  it('should invalidate form if password size is less then 6', () => {
    const password = service.password;
    const passwordEmail = el.query(By.css('#password')).nativeElement;
    const button = el.query(By.css("button[type='submit']")).nativeElement;

    passwordEmail.value = '';
    passwordEmail.dispatchEvent(new Event('input'));
    expect(password.invalid).toBe(true);
    expect(password.getError('required')).toBe(true);

    passwordEmail.value = 'test';
    passwordEmail.dispatchEvent(new Event('input'));
    expect(password.invalid).toBe(true);
    expect(password.getError('minlength')).toEqual({
      actualLength: 4,
      requiredLength: 6,
    });

    expect(button.disabled).toBeTruthy();
  });

  it('should allow call login method if form is valid', () => {
    const email = service.email;
    const password = service.password;
    const button = el.query(By.css("button[type='submit']")).nativeElement;

    email.setValue('email@email.com');
    password.setValue('1234567');
    fixture.detectChanges();

    expect(button.disabled).toBeFalsy();

    button.dispatchEvent(new Event('click'));

    expect(loginServiceSpy).toHaveBeenLastCalledWith(
      'email@email.com',
      '1234567',
      false
    );
  });

  it('should handle login failure', () => {
    const email = service.email;
    const password = service.password;
    const button = el.query(By.css("button[type='submit']")).nativeElement;
    authAPI.login = jest
      .fn()
      .mockImplementation(() => throwError(() => 'error'));

    email.setValue('test@example.com');
    password.setValue('password');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(service.invalidServer).toBeTruthy();
    });
  });

  it('should hide error message before run login', () => {
    const spanHided = el.query(By.css('#message'))?.nativeElement;

    expect(spanHided).toBeUndefined();

    service.serverError = true;
    fixture.detectChanges();

    const spanMessage = el.query(By.css('#message'))?.nativeElement;

    expect(spanMessage.textContent).toBe('Invalid data');
  });
});
