import { Component, EventEmitter, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';

@Component({
  selector: 'app-step-four-form-four',
  templateUrl: './step-four-form-four.component.html',
  styleUrls: ['./step-four-form-four.component.css'],
})
export class StepFourFormFourComponent {
  historySteps: HistoryStep[] = [
    { step_index: 0, title: 'Custos do oferecimento' },
    { step_index: 1, title: 'Taxas' },
    { step_index: 2, title: 'Formas de pagamento' },
    { step_index: 3, title: 'Condições' },
  ];

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();
}
