import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignUpDTO } from '../../shared/dtos/signup.dto';
import { SignInDTO } from '../../shared/dtos/signin.dto';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { StudentModel } from './models/student.model';
import { getStudentAccessToken } from 'src/app/shared/utils/access-token.util';
import { Observable } from 'rxjs';
import { AccessModel } from 'src/app/shared/models/access.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiURL: string = 'http://localhost:3001/alunos';

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

  signIn(signinDTO: SignInDTO): Observable<AccessModel> {
    return this.http.post<AccessModel>(`${this.apiURL}/entrar`, signinDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getOne(studentId: string): Observable<StudentModel> {
    const accessToken = getStudentAccessToken();

    this.hasAccessToken(accessToken);

    return this.http.get<StudentModel>(`${this.apiURL}/${studentId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getStudentId(): string {
    const accessToken = getStudentAccessToken();

    this.hasAccessToken(accessToken);

    try {
      const jwtDecoded = jwtDecode<{ sub: string }>(accessToken as string);

      return jwtDecoded.sub;
    } catch (Error) {
      return '';
    }
  }

  hasAccessToken(accessToken: string | null): void {
    if (!accessToken) {
      this.router.navigate(['']);
    }
  }
}
