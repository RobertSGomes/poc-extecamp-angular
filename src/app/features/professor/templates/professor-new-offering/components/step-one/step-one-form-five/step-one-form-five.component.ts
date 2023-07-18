import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { FormGroup } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-step-one-form-five',
  templateUrl: './step-one-form-five.component.html',
  styleUrls: ['./step-one-form-five.component.css'],
})
export class StepOneFormFiveComponent {
  percentageInputMask = createMask({
    alias: 'numeric',
    max: 100,
    rightAlign: false,
  });
  notaInputMask = createMask({
    alias: 'numeric',
    max: 1000,
    rightAlign: false,
  });

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

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() stepOneFormFive!: FormGroup;
}
