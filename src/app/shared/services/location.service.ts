import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  baseUrlRestCountries = 'https://restcountries.com/v3.1/';
  baseUrlCountriesNow = 'https://countriesnow.space/api/v0.1';

  constructor(private readonly http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(`${this.baseUrlRestCountries}/all`);
  }

  getStates(country: string): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrlCountriesNow}/countries/states`,
      {
        country,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  getCities(country: string, state: string) {
    return this.http.post<{ error: boolean; msg: string; data: Array<string> }>(
      `${this.baseUrlCountriesNow}/countries/state/cities`,
      {
        country,
        state,
      }
    );
  }
}
