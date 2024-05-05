import { TestBed } from '@angular/core/testing';

import { RegisterFormService } from './register-form.service';

describe('RegisterFormService', () => {
  let service: RegisterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
describe('RegisterFormService', () => {
  let service: RegisterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterFormService);
  });

  it('should create the form with a password control', () => {
    expect(service.password).toBeTruthy();
  });

  it('should set the password control as required', () => {
    const passwordControl = service.password;
    expect(passwordControl?.getError('required')).toBe(true);
  });

  it('should set the password control with a minimum length of 6 characters', () => {
    const passwordControl = service.password;
    passwordControl.setValue('12345');
    expect(passwordControl?.getError('minlength')).toEqual({
      actualLength: 5,
      requiredLength: 6,
    });
  });
});
