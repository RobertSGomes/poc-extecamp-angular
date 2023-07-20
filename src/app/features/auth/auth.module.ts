import { NgModule } from '@angular/core';
import { SigninComponent } from './templates/signin/signin.component';
import { SignupComponent } from './templates/signup/signup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from '@ngneat/input-mask';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    InputMaskModule,
  ],
  exports: [SigninComponent, SignupComponent],
})
export class AuthModule {}
