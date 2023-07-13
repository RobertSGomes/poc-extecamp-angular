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
    private formBuilder: FormBuilder,
    private readonly authService: AuthService,
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

  handleSignIn(): void {
    const response = this.authService.signIn(this.signInForm.value);

    response.subscribe(
      (response) => {
        setAccessToken(response.access_token, response.path);
        setUserId(response.user_id);

        this.router.navigate([`/${response.path}`]);
      },
      ({ error }) => {
        alert(error.error);
      }
    );
  }
}
