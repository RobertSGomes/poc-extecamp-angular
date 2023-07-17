import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-course-subscription-step-one',
  templateUrl: './course-subscription-step-one.component.html',
  styleUrls: ['./course-subscription-step-one.component.css'],
})
export class CourseSubscriptionStepOneComponent implements OnInit {
  cpfMask = createMask({
    mask: '999.999.999-99',
  });

  countries: Array<any> = [];
  states: Array<any> = [];
  cities: Array<any> = [];

  @Input() stepOneForm!: FormGroup;
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly locationService: LocationService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  get selectedCountry() {
    return this.countries.find(
      (country) =>
        country.translations['por'].common ==
        this.stepOneForm.get('naturalidade_pais')?.value
    );
  }

  get selectedState() {
    return this.states.find(
      (state) =>
        state.state_code === this.stepOneForm.get('naturalidade_estado')?.value
    );
  }

  loadCountries() {
    this.locationService.getCountries().subscribe({
      next: (value) => {
        this.countries = value;

        this.loadStates();
      },
      error: () => {
        this.stepOneForm.get('naturalidade_pais')?.setValue('');

        this.countries = [];
      },
    });
  }

  loadStates() {
    this.locationService
      .getStates(this.selectedCountry?.name.common)
      .subscribe({
        next: (value) => {
          this.states = value.data.states;

          this.loadCities();
        },
        error: () => {
          this.stepOneForm.get('naturalidade_pais')?.setValue('');
          this.stepOneForm.get('naturalidade_estado')?.setValue('');

          this.states = [];
        },
      });
  }

  loadCities() {
    this.locationService
      .getCities(this.selectedCountry?.name.common, this.selectedState?.name)
      .subscribe({
        next: (value) => {
          this.cities = value.data;
        },
        error: () => {
          this.stepOneForm.get('naturalidade_estado')?.setValue('');
          this.stepOneForm.get('naturalidade_cidade')?.setValue('');

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
}
