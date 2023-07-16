import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpDTO } from '../auth/dtos/signup.dto';
import { Router } from '@angular/router';
import { StudentModel } from './models/student.model';
import { getAccessToken } from 'src/app/shared/utils/access-token.util';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiURL: string = 'http://localhost:3001/alunos';
  private accessToken: string | null = getAccessToken('student');

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  async signUp(sigupDTO: SignUpDTO): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.apiURL}/cadastrar`, sigupDTO, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .subscribe(
          (response) => {
            resolve(response);
          },
          ({ error }) => {
            reject(error);
          }
        );
    });
  }

  async getOne(studentId: string | null | undefined): Promise<StudentModel> {
    this.verifyAccess();

    return new Promise((resolve, reject) => {
      this.http
        .get<StudentModel>(`${this.apiURL}/${studentId}`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        })
        .subscribe(
          (response) => {
            resolve(response);
          },
          ({ error }) => {
            reject(error);
          }
        );
    });
  }

  verifyAccess(): void {
    if (!this.accessToken) {
      this.router.navigate(['']);
    }
  }
}
