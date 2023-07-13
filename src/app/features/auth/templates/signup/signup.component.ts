import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/features/student/student.service';
import { removeAccessToken } from 'src/app/shared/utils/access-token.util';
import { removeUserId } from 'src/app/shared/utils/user-id.util';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly studentServive: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    removeAccessToken();
    removeUserId();

    this.signUpForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      matricula: [
        '',
        [Validators.required, Validators.minLength, Validators.maxLength],
      ],
      senha: ['', [Validators.required]],
      confirma_senha: ['', [Validators.required]],
    });
  }

  handleSignUp(): void {
    const response = this.studentServive.signUp(this.signUpForm.value);

    response.subscribe(
      (response) => {
        this.router.navigate(['/signin']);
      },
      ({ error }) => {
        alert(JSON.stringify(error.error));
      }
    );
  }
}
