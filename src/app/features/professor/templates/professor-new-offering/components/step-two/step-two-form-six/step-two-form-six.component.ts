import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';

@Component({
  selector: 'app-step-two-form-six',
  templateUrl: './step-two-form-six.component.html',
  styleUrls: ['./step-two-form-six.component.css'],
})
export class StepTwoFormSixComponent {
  history_steps: HistoryStep[] = [
    {
      title: 'Coordenação do curso',
      step_index: 0,
    },
    {
      title: 'Professores docentes da Unicamp',
      step_index: 1,
    },
    {
      title: 'Professores com vínculo',
      step_index: 2,
    },
    {
      title: 'Professores sem vínculo',
      step_index: 3,
    },
    {
      title: 'Palestrantes',
      step_index: 4,
    },
    {
      title: 'Validação da carga horaria',
      step_index: 5,
    },
  ];

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();
}
