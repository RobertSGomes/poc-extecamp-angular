import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getAccessToken } from 'src/app/shared/utils/access-token.util';
import { Router } from '@angular/router';
import { ProfessorModel } from './models/professor.model';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private apiURL: string = 'http://localhost:3000/professores';
  private accessToken: string | null = getAccessToken('professor');

  constructor(private readonly http: HttpClient, private router: Router) {}

  async getOne(professorId: string | null): Promise<ProfessorModel> {
    this.verifyAccess();

    return new Promise((resolve, reject) => {
      this.http
        .get<ProfessorModel>(`${this.apiURL}/${professorId}`, {
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

  getAll() {
    return this.http.get<{ result: ProfessorModel[]; total: number }>(
      `${this.apiURL}/`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );
  }

  verifyAccess(): void {
    if (!this.accessToken) {
      this.router.navigate(['']);
    }
  }
}
