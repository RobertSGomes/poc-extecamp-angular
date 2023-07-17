import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-course-subscription-step-one',
  templateUrl: './course-subscription-step-one.component.html',
  styleUrls: ['./course-subscription-step-one.component.css'],
})
export class CourseSubscriptionStepOneComponent implements OnInit {
  countries: Array<any> = [];
  states: Array<any> = [];
  cities: Array<any> = [];

  @Input() stepOneForm!: FormGroup;
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly locationService: LocationService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    this.locationService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;

        this.loadStates();
      },
      error: () => {
        this.countries = [];
      },
    });
  }

  loadStates() {
    const selectedCountry = this.getSelectedCountry();

    this.locationService.getStates(selectedCountry.name.common).subscribe({
      next: (response) => {
        this.states = response.data.states;

        this.loadCities();
      },
      error: () => {
        this.states = [];
      },
    });
  }

  loadCities() {
    const selectedCountry = this.getSelectedCountry();
    const selectedState = this.getSelectedState();

    this.locationService
      .getCities(selectedCountry.name.common, selectedState.name)
      .subscribe({
        next: (response) => {
          this.cities = response.data;
        },
        error: () => {
          this.cities = [];
        },
      });
  }

  handleChangeCountry() {
    this.cities = [];
    this.states = [];

    this.stepOneForm.get('naturalidade_estado')?.setValue('');
    this.stepOneForm.get('naturalidade_cidade')?.setValue('');

    this.loadStates();
  }

  handleChangeState() {
    this.cities = [];

    this.stepOneForm.get('naturalidade_cidade')?.setValue('');

    this.loadCities();
  }

  getSelectedCountry() {
    return this.countries.find(
      (country) =>
        country.translations['por'].common ==
        this.stepOneForm.get('naturalidade_pais')?.value
    );
  }

  getSelectedState() {
    return this.states.find(
      (state) =>
        state.state_code === this.stepOneForm.get('naturalidade_estado')?.value
    );
  }
}
