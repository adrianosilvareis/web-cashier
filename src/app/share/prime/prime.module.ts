import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [InputTextModule, CheckboxModule, ButtonModule, ReactiveFormsModule],
})
export class PrimeModule {}
