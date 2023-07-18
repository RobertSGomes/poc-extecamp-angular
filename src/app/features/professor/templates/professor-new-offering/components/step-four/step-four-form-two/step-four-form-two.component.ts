import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { FormGroup } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-step-four-form-two',
  templateUrl: './step-four-form-two.component.html',
  styleUrls: ['./step-four-form-two.component.css'],
})
export class StepFourFormTwoComponent {
  percentageInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    max: 100,
    rightAlign: false,
  });

  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
    rightAlign: false,
  });

  historySteps: HistoryStep[] = [
    { stepIndex: 0, title: 'Custos do oferecimento' },
    { stepIndex: 1, title: 'Taxas' },
    { stepIndex: 2, title: 'Formas de pagamento' },
    { stepIndex: 3, title: 'Condições' },
  ];

  alertClosed: boolean = false;

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleCreateOfferingCostTax: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() stepFourFormTwo!: FormGroup;
}
