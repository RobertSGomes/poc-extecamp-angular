import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseModel } from '../../../models/course.model';
import { HistoryStep } from '../../../types/history.type';

@Component({
  selector: 'app-step-one-form-four',
  templateUrl: './step-one-form-four.component.html',
  styleUrls: ['./step-one-form-four.component.css'],
})
export class StepOneFormFourComponent {
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

  @Input() course!: CourseModel;
}
