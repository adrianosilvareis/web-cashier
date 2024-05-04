import { TestBed } from '@angular/core/testing';

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
