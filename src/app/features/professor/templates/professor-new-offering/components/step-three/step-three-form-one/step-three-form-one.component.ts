import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { CourseModel } from '../../../models/course.model';

@Component({
  selector: 'app-step-three-form-one',
  templateUrl: './step-three-form-one.component.html',
  styleUrls: ['./step-three-form-one.component.css'],
})
export class StepThreeFormOneComponent {
  history_steps: HistoryStep[] = [
    {
      title: 'Divulgação do curso',
      step_index: 0,
    },
    {
      title: 'Inscrição',
      step_index: 1,
    },
    {
      title: 'Oferecimento e outras informações',
      step_index: 2,
    },
    {
      title: 'Critérios de admissão',
      step_index: 3,
    },
  ];

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() course!: CourseModel;
}
