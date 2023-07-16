import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  baseUrlRestCountries = 'https://restcountries.com/v3.1/';
  baseUrlCountriesNow = 'https://countriesnow.space/api/v0.1';

  constructor(private readonly http: HttpClient) {}

  getCountries(): any {
    const countries: any[] = [];

    this.http
      .get<any>(`${this.baseUrlRestCountries}/all`)
      .subscribe((response) => {
        countries.push(...response);
      });

    return countries;
  }

  getStates(country: string): any {
    const states: any = [];

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
      .subscribe((response) => {
        states.push(...response.data.states);
      });

    return states;
  }

  getCities() {}
}
