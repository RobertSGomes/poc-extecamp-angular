import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDTO } from './dtos/signin.dto';
import { AccessModel } from 'src/app/shared/models/access.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL?: string;

  constructor(private readonly http: HttpClient) {
    this.apiURL = environment.baseURLAuth;
  }

  signIn(signinDTO: SignInDTO): Observable<any> {
    return this.http.post<AccessModel>(`${this.apiURL}/entrar`, signinDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
