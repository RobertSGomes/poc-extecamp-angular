import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';

@Component({
  selector: 'app-step-one-form-two',
  templateUrl: './step-one-form-two.component.html',
  styleUrls: ['./step-one-form-two.component.css'],
})
export class StepOneFormTwoComponent {
  history_steps: HistoryStep[] = [
    {
      title: 'Dados iniciais',
      step_index: 0,
    },
    {
      title: 'Palavras-chave e área',
      step_index: 1,
    },
    {
      title: 'Carga horária',
      step_index: 2,
    },
    {
      title: 'Conteúdo do curso',
      step_index: 3,
    },
    {
      title: 'Critérios de avaliação',
      step_index: 4,
    },
  ];

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();
}
