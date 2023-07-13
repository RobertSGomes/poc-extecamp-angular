import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from './../../../student/student.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessorService } from 'src/app/features/professor/professor.service';
import {
  removeStudentAccessToken,
  removeProfessorAccessToken,
  setStudentAccessToken,
  setProfessorAccessToken,
} from 'src/app/shared/utils/access-token.util';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly studentServive: StudentService,
    private readonly professorService: ProfessorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    removeProfessorAccessToken();
    removeStudentAccessToken();

    this.signInForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  handleSignIn(): void {
    const response = this.studentServive.signIn(this.signInForm.value);

    response.subscribe(
      (response) => {
        setStudentAccessToken(response.access_token);

        this.router.navigate(['/student']);
      },
      () => {
        this.handleSecondSignIn();
      }
    );
  }

  private handleSecondSignIn(): void {
    const response = this.professorService.signIn(this.signInForm.value);

    response.subscribe(
      (response) => {
        setProfessorAccessToken(response.access_token);

        this.router.navigate(['/professor']);
      },
      ({ error }) => {
        alert(error.error);
      }
    );
  }
}
