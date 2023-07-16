import { AuthService } from './../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  removeAccessToken,
  setAccessToken,
} from 'src/app/shared/utils/access-token.util';
import { removeUserId, setUserId } from 'src/app/shared/utils/user-id.util';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    removeAccessToken();
    removeUserId();

    this.signInForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  async handleSignIn(): Promise<void> {
    try {
      const response = await this.authService.signIn(this.signInForm.value);

      setUserId(response.user_id);
      setAccessToken(response.access_token, response.path);

      this.router.navigate([`/${response.path}`]);
    } catch (error: any) {
      alert(error.error);
    }
  }
}
