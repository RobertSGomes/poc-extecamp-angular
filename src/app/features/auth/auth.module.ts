import { NgModule } from '@angular/core';
import { SigninComponent } from './templates/signin/signin.component';
import { SignupComponent } from './templates/signup/signup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [AppRoutingModule, FormsModule, CommonModule, SharedModule],
})
export class AuthModule {}
