import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-subscription-step-one',
  templateUrl: './course-subscription-step-one.component.html',
  styleUrls: ['./course-subscription-step-one.component.css'],
})
export class CourseSubscriptionStepOneComponent {
  @Input() stepOneForm!: FormGroup;

  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
}
