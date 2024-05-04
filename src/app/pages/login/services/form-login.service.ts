import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormLoginService {
  constructor(private readonly builder: FormBuilder) {}

  private _serverInvalid = false;

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get rememberMe() {
    return this.form.controls.rememberMe;
  }

  get payload() {
    return {
      email: this.email.value as string,
      password: this.password.value as string,
      rememberMe: this.rememberMe.value as boolean,
    };
  }

  form = this.builder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rememberMe: new FormControl(false),
  });

  set serverError(value: boolean) {
    this._serverInvalid = value;
    this.form.valueChanges.pipe(take(1)).subscribe(() => {
      this._serverInvalid = false;
    });
  }

  get invalid() {
    return this._serverInvalid || this.form.invalid;
  }

  get invalidServer() {
    return this._serverInvalid;
  }
}
