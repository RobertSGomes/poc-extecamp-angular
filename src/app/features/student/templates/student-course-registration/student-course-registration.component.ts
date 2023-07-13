import { Component } from '@angular/core';

@Component({
  selector: 'student-course-registration',
  templateUrl: './student-course-registration.component.html',
  styleUrls: ['./student-course-registration.component.css'],
})
export class StudentCourseRegistrationComponent {
  currentStep: number = 0;

  nextStep(): void {
    document.querySelector('#form-student')!.scrollTo(0, 0);
    this.currentStep++;
  }

  backStep(): void {
    document.querySelector('#form-student')!.scrollTo(0, 0);
    this.currentStep--;
  }
}
