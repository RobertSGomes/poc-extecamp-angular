import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-subscription-step-four',
  templateUrl: './course-subscription-step-four.component.html',
  styleUrls: ['./course-subscription-step-four.component.css'],
})
export class CourseSubscriptionStepFourComponent {
  @Input() stepFourForm!: FormGroup;

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleSubscribeToCourse: EventEmitter<void> =
    new EventEmitter<void>();

  get documentos_upload() {
    return this.stepFourForm.get('documentos_upload');
  }

  get cpf_upload() {
    return this.stepFourForm.get('cpf_upload');
  }

  get declaracao_upload() {
    return this.stepFourForm.get('declaracao_upload');
  }
}
