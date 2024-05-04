import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { PrimeModule } from '../../share/prime/prime.module';
import { FormLoginService } from './services/form-login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeModule, CommonModule],
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
        error: () => {
          this.formLogin.serverError = true;
        },
      });
  }
}
