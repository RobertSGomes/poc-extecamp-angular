import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-course-subscription-step-three',
  templateUrl: './course-subscription-step-three.component.html',
  styleUrls: ['./course-subscription-step-three.component.css'],
})
export class CourseSubscriptionStepThreeComponent {
  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
}
