import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { EMPTY, of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { PrimeModule } from '../../share/prime/prime.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let loginServiceSpy = jest.fn(() => of(EMPTY));
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent, PrimeModule, CommonModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: loginServiceSpy,
          },
        },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(AuthService);
        el = fixture.debugElement;
      });
  });

  beforeEach(() => {
    fixture.detectChanges();
  });

  it('should invalidate form if email is not provided or is not a valid email', () => {
    const email = component.form.controls['email'];
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
    const password = component.form.controls['password'];
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
    const email = component.form.controls['email'];
    const password = component.form.controls['password'];
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
    const email = component.form.controls['email'];
    const password = component.form.controls['password'];
    const button = el.query(By.css("button[type='submit']")).nativeElement;
    service.login = jest
      .fn()
      .mockImplementation(() => throwError(() => 'error'));

    email.setValue('test@example.com');
    password.setValue('password');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      console.log('chegou');
      expect(component.invalidLogin).toBeTruthy();
    });
  });

  it('should hide error message before run login', () => {
    const spanHided = el.query(By.css('#message'))?.nativeElement;

    expect(spanHided).toBeUndefined();

    component.invalidLogin = true;
    fixture.detectChanges();

    const spanMessage = el.query(By.css('#message'))?.nativeElement;

    expect(spanMessage.textContent).toBe('Login invalido');
  });
});
