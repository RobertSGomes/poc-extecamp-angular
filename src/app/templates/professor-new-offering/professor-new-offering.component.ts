import { Component } from '@angular/core';
import { CourseModel } from './models/course.model';

@Component({
  selector: 'app-professor-new-offering',
  templateUrl: './professor-new-offering.component.html',
  styleUrls: ['./professor-new-offering.component.css'],
})
export class ProfessorNewOfferingComponent {
  current_step: number = 4;
  current_inside_step: number = 0;

  course: CourseModel = new CourseModel();

  backInsideStep(): void {
    this.current_inside_step--;
  }

  nextInsideStep(): void {
    this.current_inside_step++;
  }

  nextStep(): void {
    this.current_step++;
    this.current_inside_step = 0;
  }

  backStep(inside_step: number): void {
    this.current_step--;
    this.current_inside_step = inside_step;
  }
}
