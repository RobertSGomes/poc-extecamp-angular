import { Component, EventEmitter, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';

@Component({
  selector: 'app-step-four-form-two',
  templateUrl: './step-four-form-two.component.html',
  styleUrls: ['./step-four-form-two.component.css'],
})
export class StepFourFormTwoComponent {
  historySteps: HistoryStep[] = [
    { step_index: 0, title: 'Custos do oferecimento' },
    { step_index: 1, title: 'Taxas' },
    { step_index: 2, title: 'Formas de pagamento' },
    { step_index: 3, title: 'Condições' },
  ];

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();
}
