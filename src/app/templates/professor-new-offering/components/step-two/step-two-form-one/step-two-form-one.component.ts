import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { CourseModel } from '../../../models/course.model';

@Component({
  selector: 'app-step-two-form-one',
  templateUrl: './step-two-form-one.component.html',
  styleUrls: ['./step-two-form-one.component.css'],
})
export class StepTwoFormOneComponent {
  history_steps: HistoryStep[] = [
    {
      title: 'Coordenação do curso',
      step_index: 0,
    },
    {
      title: 'Professores docentes da Unicamp',
      step_index: 1,
    },
    {
      title: 'Professores com vínculo',
      step_index: 2,
    },
    {
      title: 'Professores sem vínculo',
      step_index: 3,
    },
    {
      title: 'Palestrantes',
      step_index: 4,
    },
    {
      title: 'Validação da carga horaria',
      step_index: 5,
    },
  ];

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() course!: CourseModel;
}
