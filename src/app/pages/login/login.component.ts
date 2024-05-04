import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { PrimeModule } from '../../share/prime/prime.module';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [PrimeModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private authAPI: AuthService,
    public loginService: LoginService
  ) {}

  login() {
    const { email, password, rememberMe } = this.loginService.payload;

    this.authAPI
      .login(email, password, rememberMe)
      .pipe(take(1))
      .subscribe({
        error: () => {
          this.loginService.serverError = true;
        },
      });
  }
}
