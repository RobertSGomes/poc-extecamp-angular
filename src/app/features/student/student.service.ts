import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpDTO } from '../auth/dtos/signup.dto';
import { Router } from '@angular/router';
import { StudentModel } from './models/student.model';
import { Observable } from 'rxjs';
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

  signUp(sigupDTO: SignUpDTO): Observable<Object> {
    return this.http.post(`${this.apiURL}/cadastrar`, sigupDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getOne(studentId: string | null | undefined): Observable<StudentModel> {
    this.verifyAccess();

    return this.http.get<StudentModel>(`${this.apiURL}/${studentId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  verifyAccess(): void {
    if (!this.accessToken) {
      this.router.navigate(['']);
    }
  }
}
