import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/shared/services/location.service';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-step-three-form-three',
  templateUrl: './step-three-form-three.component.html',
  styleUrls: ['./step-three-form-three.component.css'],
})
export class StepThreeFormThreeComponent implements OnInit {
  numericInputMask = createMask({
    alias: 'numeric',
    rightAlign: false,
  });

  historySteps: HistoryStep[] = [
    {
      title: 'Divulgação do curso',
      stepIndex: 0,
    },
    {
      title: 'Inscrição',
      stepIndex: 1,
    },
    {
      title: 'Oferecimento e outras informações',
      stepIndex: 2,
    },
    {
      title: 'Critérios de admissão',
      stepIndex: 3,
    },
  ];

  states: Array<any> = [];
  cities: Array<any> = [];

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() stepThreeFormThree!: FormGroup;

  constructor(private readonly locationService: LocationService) {}

  ngOnInit(): void {
    this.loadStates();
  }

  get selectedState() {
    return this.states.find(
      (state) => state.state_code === this.stepThreeFormThree.get('uf')?.value
    );
  }

  loadStates() {
    this.locationService.getStates('Brazil').subscribe({
      next: (value) => {
        this.states = value.data.states;

        this.loadCities();
      },
      error: () => {
        this.stepThreeFormThree.get('uf')?.setValue('');

        this.states = [];
      },
    });
  }

  loadCities() {
    this.locationService
      .getCities('Brazil', this.selectedState?.name)
      .subscribe({
        next: (value) => {
          this.cities = value.data;
        },
        error: () => {
          this.stepThreeFormThree.get('uf')?.setValue('');
          this.stepThreeFormThree.get('cidade')?.setValue('');

          this.cities = [];
        },
      });
  }

  handleChangeState() {
    this.cities = [];

    this.stepThreeFormThree.get('cidade')?.setValue('');

    this.loadCities();
  }
}
