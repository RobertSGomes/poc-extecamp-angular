import { Component } from '@angular/core';
import { CourseRegistrationModel } from './models/course-registration.model';

@Component({
  selector: 'app-student-course-registration',
  templateUrl: './student-course-registration.component.html',
  styleUrls: ['./student-course-registration.component.css'],
})
export class StudentCourseRegistrationComponent {
  courseRegistration = new CourseRegistrationModel();
  currentStep: number = 1;

  nextStep(): void {
    this.currentStep++;
  }

  backStep(): void {
    this.currentStep--;
  }
}
