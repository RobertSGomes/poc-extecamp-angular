import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';

@Component({
  selector: 'app-step-two-form-one',
  templateUrl: './step-two-form-one.component.html',
  styleUrls: ['./step-two-form-one.component.css'],
})
export class StepTwoFormOneComponent {
  historySteps: HistoryStep[] = [
    {
      title: 'Coordenação do curso',
      stepIndex: 0,
    },
    {
      title: 'Professores docentes da Unicamp',
      stepIndex: 1,
    },
    {
      title: 'Professores com vínculo',
      stepIndex: 2,
    },
    {
      title: 'Professores sem vínculo',
      stepIndex: 3,
    },
    {
      title: 'Palestrantes',
      stepIndex: 4,
    },
    {
      title: 'Validação da carga horaria',
      stepIndex: 5,
    },
  ];

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();
}
