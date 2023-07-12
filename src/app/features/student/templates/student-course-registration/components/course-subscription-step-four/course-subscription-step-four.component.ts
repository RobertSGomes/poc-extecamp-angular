import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-course-subscription-step-four',
  templateUrl: './course-subscription-step-four.component.html',
  styleUrls: ['./course-subscription-step-four.component.css'],
})
export class CourseSubscriptionStepFourComponent {
  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
}
