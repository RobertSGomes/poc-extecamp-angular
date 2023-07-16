import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-course-subscription-step-one',
  templateUrl: './course-subscription-step-one.component.html',
  styleUrls: ['./course-subscription-step-one.component.css'],
})
export class CourseSubscriptionStepOneComponent implements OnInit {
  countries!: Array<any>;
  states!: Array<any>;

  @Input() stepOneForm!: FormGroup;
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly locationService: LocationService) {}

  async ngOnInit(): Promise<void> {
    this.countries = await this.locationService.getCountries();
    await this.loadStates(this.stepOneForm.value['naturalidade_pais']);
  }

  async loadStates(countryName: string) {
    const countryIndex = this.countries.findIndex((country) => {
      return country.translations['por'].common == countryName;
    });

    this.states = await this.locationService.getStates(
      this.countries[countryIndex]?.name.common
    );
  }
}
