import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-course-subscription-step-two',
  templateUrl: './course-subscription-step-two.component.html',
  styleUrls: ['./course-subscription-step-two.component.css'],
})
export class CourseSubscriptionStepTwoComponent {
  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
}
