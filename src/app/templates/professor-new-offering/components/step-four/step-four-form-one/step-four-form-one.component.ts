import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { CourseModel } from '../../../models/course.model';

@Component({
  selector: 'app-step-four-form-one',
  templateUrl: './step-four-form-one.component.html',
  styleUrls: ['./step-four-form-one.component.css'],
})
export class StepFourFormOneComponent {
  historySteps: HistoryStep[] = [
    { step_index: 0, title: 'Custos do oferecimento' },
    { step_index: 1, title: 'Taxas' },
    { step_index: 2, title: 'Formas de pagamento' },
    { step_index: 3, title: 'Condições' },
  ];

  @Input() course!: CourseModel;

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
}
