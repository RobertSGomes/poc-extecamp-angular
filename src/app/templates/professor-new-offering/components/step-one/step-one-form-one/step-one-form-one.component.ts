import { Component, EventEmitter, Output, Input } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { CourseModel } from '../../../models/course.model';

@Component({
  selector: 'app-step-one-form-one',
  templateUrl: './step-one-form-one.component.html',
  styleUrls: ['./step-one-form-one.component.css'],
})
export class StepOneFormOneComponent {
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

  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();

  @Input() course!: CourseModel;
}
