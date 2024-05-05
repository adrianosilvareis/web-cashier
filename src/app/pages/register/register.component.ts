import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimeModule } from '../../share/prime/prime.module';
import { RegisterFormService } from './services/register-form/register-form.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [PrimeModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(public registerForm: RegisterFormService) {}

  save() {}
}
