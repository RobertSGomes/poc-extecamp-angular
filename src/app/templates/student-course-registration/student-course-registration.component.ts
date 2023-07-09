import { Component } from '@angular/core';
import { CourseRegistrationModel } from './models/course-registration.model';

@Component({
  selector: 'app-student-course-registration',
  templateUrl: './student-course-registration.component.html',
  styleUrls: ['./student-course-registration.component.css'],
})
export class StudentCourseRegistrationComponent {
  courseRegistrationModel = new CourseRegistrationModel();
  currentStep: number = 0;

  nextStep(): void {
    this.currentStep++;
  }

  backStep(): void {
    this.currentStep--;
  }
}
