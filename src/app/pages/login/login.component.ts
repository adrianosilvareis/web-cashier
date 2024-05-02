import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { PrimeModule } from '../../share/prime/prime.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private auth: AuthService) {}

  invalidLogin = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    rememberMe: new FormControl(false),
  });

  login() {
    const { email, password, rememberMe } = this.form.value as {
      email: string;
      password: string;
      rememberMe: boolean;
    };

    this.auth
      .login(email, password, rememberMe)
      .pipe(take(1))
      .subscribe({
        error: () => {
          this.invalidLogin = true;
          this.form.controls['email'].setErrors({ invalid: true });
          this.form.controls['password'].setErrors({ invalid: true });
          this.clearValidator();
        },
      });
  }

  private clearValidator() {
    this.form.valueChanges.pipe(take(1)).subscribe(() => {
      this.form.controls['email'].updateValueAndValidity();
      this.form.controls['password'].updateValueAndValidity();
    });
  }
}
