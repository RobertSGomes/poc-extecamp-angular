import { Component, EventEmitter, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';

@Component({
  selector: 'app-professor-form-step-two',
  templateUrl: './professor-form-step-two.component.html',
  styleUrls: ['./professor-form-step-two.component.css'],
})
export class ProfessorFormStepTwoComponent {
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
}
