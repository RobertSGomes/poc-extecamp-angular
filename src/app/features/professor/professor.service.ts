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

  getOne(professorId: string | null): ProfessorModel | undefined {
    this.verifyAccess();

    let professor: ProfessorModel | undefined = undefined;

    this.http
      .get<ProfessorModel>(`${this.apiURL}/${professorId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .subscribe((response) => {
        professor = response;
      });

    return professor;
  }

  getAll(): ProfessorModel[] {
    this.verifyAccess();

    const professors: ProfessorModel[] = [];

    this.http
      .get<{ result: ProfessorModel[]; total: number }>(`${this.apiURL}/`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
      .subscribe((response) => {
        professors.push(...response.result);
      });

    return professors;
  }

  verifyAccess(): void {
    if (!this.accessToken) {
      this.router.navigate(['']);
    }
  }
}
