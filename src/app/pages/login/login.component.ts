import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { PrimeModule } from '../../share/prime/prime.module';
import { AuthService } from './services/auth/auth.service';
import { FormLoginService } from './services/form/form-login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private authAPI: AuthService,
    public formLogin: FormLoginService
  ) {}

  login() {
    const { email, password, rememberMe } = this.formLogin.payload;

    this.authAPI
      .login(email, password, rememberMe)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.formLogin.form.reset();
        },
        error: () => {
          this.formLogin.serverError = true;
        },
      });
  }
}
