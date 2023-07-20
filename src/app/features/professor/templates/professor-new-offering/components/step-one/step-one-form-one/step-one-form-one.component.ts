import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-step-one-form-one',
  templateUrl: './step-one-form-one.component.html',
  styleUrls: ['./step-one-form-one.component.css'],
})
export class StepOneFormOneComponent {
  historySteps: HistoryStep[] = [
    {
      title: 'Dados iniciais',
      stepIndex: 0,
    },
    {
      title: 'Palavras-chave e área',
      stepIndex: 1,
    },
    {
      title: 'Carga horária',
      stepIndex: 2,
    },
    {
      title: 'Conteúdo do curso',
      stepIndex: 3,
    },
    {
      title: 'Critérios de avaliação',
      stepIndex: 4,
    },
  ];

  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() stepOneFormOne!: FormGroup;

  constructor(private readonly locationNavigation: Location) {}

  get location() {
    return this.locationNavigation;
  }
}
