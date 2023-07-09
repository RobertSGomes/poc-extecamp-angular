import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseRegistrationModel } from '../../models/course-registration.model';

@Component({
  selector: 'app-course-subscription-step-one',
  templateUrl: './course-subscription-step-one.component.html',
  styleUrls: ['./course-subscription-step-one.component.css'],
})
export class CourseSubscriptionStepOneComponent {
  @Input() courseRegistrationModel!: CourseRegistrationModel;

  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
}
