import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CourseModel } from '../../../models/course.model';

@Component({
  selector: 'app-step-five-form-one',
  templateUrl: './step-five-form-one.component.html',
  styleUrls: ['./step-five-form-one.component.css'],
})
export class StepFiveFormOneComponent {
  @Input() course!: CourseModel;

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
}
