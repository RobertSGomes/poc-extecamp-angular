import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDTO } from '../student/dtos/signin.dto';
import { getProfessorAccessToken } from 'src/app/shared/utils/access-token.util';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { ProfessorModel } from './models/professor.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private apiURL: string = 'http://localhost:3000/professores';

  constructor(private readonly http: HttpClient, private router: Router) {}

  signIn(signinDTO: SignInDTO) {
    return this.http.post<{ access_token: string }>(
      `${this.apiURL}/entrar`,
      signinDTO,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getOne(professorId: string) {
    const accessToken = getProfessorAccessToken();

    this.hasAccessToken(accessToken);

    return this.http.get<ProfessorModel>(`${this.apiURL}/${professorId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getProfessorId() {
    const accessToken = getProfessorAccessToken();

    this.hasAccessToken(accessToken);

    try {
      const jwtDecoded = jwtDecode<{ sub: string }>(accessToken as string);

      return jwtDecoded.sub;
    } catch (Error) {
      return '';
    }
  }

  hasAccessToken(access_token: string | null) {
    if (!access_token) {
      this.router.navigate(['']);
    }
  }
}
