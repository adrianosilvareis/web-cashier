import { TestBed } from '@angular/core/testing';

import { FormControl } from '@angular/forms';
import { FormLoginService } from './form-login.service';

describe('LoginService', () => {
  let service: FormLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('LoginService', () => {
  let service: FormLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the value of _serverInvalid', () => {
    const serverInvalid = true;
    service['_serverInvalid'] = serverInvalid;
    expect(service.invalidServer).toEqual(serverInvalid);
  });
});
describe('FormLoginService', () => {
  let service: FormLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormLoginService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('email', () => {
    it('should return the email form control', () => {
      expect(service.email).toBeInstanceOf(FormControl);
    });

    it('should have required validator', () => {
      const validators = service.email.getError('required');
      expect(validators).toBeTruthy();
    });

    it('should have email validator', () => {
      service.email.setValue('invalid email');
      const validators = service.email.getError('email');
      expect(validators).toBeTruthy();
    });
  });

  describe('password', () => {
    it('should return the password form control', () => {
      expect(service.password).toBeInstanceOf(FormControl);
    });

    it('should have required validator', () => {
      const validators = service.password.getError('required');
      expect(validators).toBeTruthy();
    });

    it('should have password validator', () => {
      service.password.setValue('small');
      const validators = service.password.getError('minlength');
      expect(validators).toBeTruthy();
    });
  });
});
