import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  baseUrlRestCountries = 'https://restcountries.com/v3.1/';
  baseUrlCountriesNow = 'https://countriesnow.space/api/v0.1';

  constructor(private readonly http: HttpClient) {}

  getCountries(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${this.baseUrlRestCountries}/all`).subscribe(
        (response) => {
          resolve(response);
        },
        ({ error }) => {
          reject(error);
        }
      );
    });
  }

  getStates(country: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .post<any>(
          `${this.baseUrlCountriesNow}/countries/states`,
          {
            country,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .subscribe(
          (response) => {
            resolve(response.data.states);
          },
          ({ error }) => {
            reject(error);
          }
        );
    });
  }

  getCities() {}
}
