import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { PrimeModule } from '../../share/prime/prime.module';
import { RegisterApiService } from './services/api/register-api.service';
import { RegisterFormService } from './services/register-form/register-form.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PrimeModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    public registerForm: RegisterFormService,
    private registerAPI: RegisterApiService
  ) {}

  save() {
    const { name, email, password } = this.registerForm.payload;
    this.registerAPI
      .register(name, email, password)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.registerForm.form.reset();
        },
        error: () => {
          this.registerForm.serverError = true;
        },
      });
  }
}
