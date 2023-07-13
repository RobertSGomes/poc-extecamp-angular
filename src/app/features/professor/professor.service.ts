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
  private accessToken: string | null = getAccessToken('professor');

  constructor(private readonly http: HttpClient, private router: Router) {}

  getOne(professorId: string | null): Observable<ProfessorModel> {
    return this.http.get<ProfessorModel>(`${this.apiURL}/${professorId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  verifyAccess(): void {
    console.log('OIOI');
    if (!this.accessToken) {
      this.router.navigate(['']);
    }
  }
}
