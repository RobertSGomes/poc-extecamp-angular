import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAccessToken } from 'src/app/shared/utils/access-token.util';
import { Router } from '@angular/router';
import { ProfessorModel } from './models/professor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private apiURL: string = 'http://localhost:3000/professores';
  private accessTokenProfessor: string | null = getAccessToken('professor');
  private accessTokenStudent: string | null = getAccessToken('student');

  constructor(private readonly http: HttpClient, private router: Router) {}

  getOne(professorId: string | null): Observable<ProfessorModel> {
    const accessToken = this.verifyAccess();

    return this.http.get<ProfessorModel>(`${this.apiURL}/${professorId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getAll(): Observable<{ result: ProfessorModel[]; total: number }> {
    const accessToken = this.verifyAccess();

    return this.http.get<{ result: ProfessorModel[]; total: number }>(
      `${this.apiURL}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }

  verifyAccess(): string {
    if (!this.accessTokenProfessor && !this.accessTokenStudent) {
      this.router.navigate(['']);
    }

    return (
      (this.accessTokenProfessor as string) ??
      (this.accessTokenStudent as string)
    );
  }
}
