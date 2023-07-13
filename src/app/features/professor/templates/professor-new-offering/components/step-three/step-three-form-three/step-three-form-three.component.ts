import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';

@Component({
  selector: 'app-step-three-form-three',
  templateUrl: './step-three-form-three.component.html',
  styleUrls: ['./step-three-form-three.component.css'],
})
export class StepThreeFormThreeComponent {
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

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();
}
