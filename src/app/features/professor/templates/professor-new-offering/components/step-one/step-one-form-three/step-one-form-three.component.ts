import { Component, Output, Input, EventEmitter } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';

@Component({
  selector: 'app-step-one-form-three',
  templateUrl: './step-one-form-three.component.html',
  styleUrls: ['./step-one-form-three.component.css'],
})
export class StepOneFormThreeComponent {
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
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();
}
