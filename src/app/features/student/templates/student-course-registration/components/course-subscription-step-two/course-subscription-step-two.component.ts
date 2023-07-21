import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-course-subscription-step-two',
  templateUrl: './course-subscription-step-two.component.html',
  styleUrls: ['./course-subscription-step-two.component.css'],
})
export class CourseSubscriptionStepTwoComponent {
  cepMask = createMask({
    mask: '99999-999',
  });
  numeric = createMask({
    alias: 'numeric',
    allowMinus: false,
    rightAlign: false,
  });

  countries: Array<any> = [];
  states: Array<any> = [];
  cities: Array<any> = [];

  @Input() stepTwoForm!: FormGroup;

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleOpenCancelModal: EventEmitter<void> =
    new EventEmitter<void>();

  constructor(private readonly locationService: LocationService) {}

  ngOnInit(): void {
    this.loadCountries();
  }

  get selectedCountry() {
    return this.countries.find(
      (country) =>
        country.translations['por'].common ==
        this.stepTwoForm.get('pais')?.value
    );
  }

  get selectedState() {
    return this.states.find(
      (state) => state.state_code === this.stepTwoForm.get('estado')?.value
    );
  }

  loadCountries() {
    this.locationService.getCountries().subscribe({
      next: (value) => {
        this.countries = value;
        this.loadStates();
      },
      error: () => {
        this.stepTwoForm.get('pais')?.setValue('');

        this.countries = [];
      },
    });
  }

  loadStates() {
    if (!this.selectedCountry) return;

    this.locationService.getStates(this.selectedCountry.name.common).subscribe({
      next: (value) => {
        this.states = value.data.states;

        this.loadCities();
      },
      error: () => {
        this.stepTwoForm.get('pais')?.setValue('');
        this.stepTwoForm.get('estado')?.setValue('');

        this.states = [];
      },
    });
  }

  loadCities() {
    if (!this.selectedCountry || !this.selectedState) return;

    this.locationService
      .getCities(this.selectedCountry.name.common, this.selectedState.name)
      .subscribe({
        next: (value) => {
          this.cities = value.data;
        },
        error: () => {
          this.stepTwoForm.get('estado')?.setValue('');
          this.stepTwoForm.get('cidade')?.setValue('');

          this.cities = [];
        },
      });
  }

  handleChangeCountry() {
    this.cities = [];
    this.states = [];

    this.stepTwoForm.get('estado')?.setValue('');
    this.stepTwoForm.get('cidade')?.setValue('');

    this.loadStates();
  }

  handleChangeState() {
    this.cities = [];

    this.stepTwoForm.get('cidade')?.setValue('');

    this.loadCities();
  }

  handleChangeCep() {
    Object.keys(this.stepTwoForm.controls).forEach((key) => {
      if (key !== 'cep' && key !== 'pais') {
        this.stepTwoForm.get(key)?.setValue('');
      }
    });

    this.locationService.fetchCep(this.stepTwoForm.value['cep']).subscribe({
      next: (value) => {
        if (value) {
          this.stepTwoForm.get('logradouro')?.setValue(value.logradouro);
          this.stepTwoForm.get('bairro')?.setValue(value.bairro);
          this.stepTwoForm.get('estado')?.setValue(value.uf);
          this.stepTwoForm.get('cidade')?.setValue(value.localidade);
          this.stepTwoForm.get('pais')?.setValue('Brasil');
        }

        this.loadStates();
      },
    });
  }
}
