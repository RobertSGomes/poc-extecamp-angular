import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDTO } from './dtos/signin.dto';
import { AccessModel } from 'src/app/shared/models/access.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL: string = 'http://localhost:3002/auth';

  constructor(private readonly http: HttpClient) {}

  signIn(signinDTO: SignInDTO): Observable<AccessModel> {
    return this.http.post<AccessModel>(`${this.apiURL}/entrar`, signinDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
