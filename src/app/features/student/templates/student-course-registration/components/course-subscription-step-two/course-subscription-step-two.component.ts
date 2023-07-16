import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-subscription-step-two',
  templateUrl: './course-subscription-step-two.component.html',
  styleUrls: ['./course-subscription-step-two.component.css'],
})
export class CourseSubscriptionStepTwoComponent {
  @Input() stepTwoForm!: FormGroup;

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
}
