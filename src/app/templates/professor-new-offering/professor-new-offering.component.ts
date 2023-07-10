import { Component } from '@angular/core';
import { CourseModel } from './models/course.model';

@Component({
  selector: 'app-professor-new-offering',
  templateUrl: './professor-new-offering.component.html',
  styleUrls: ['./professor-new-offering.component.css'],
})
export class ProfessorNewOfferingComponent {
  current_step: number = 1;
  current_inside_step: number = 5;

  course: CourseModel = new CourseModel();

  modalCancelOpened = false;

  backInsideStep(): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.current_inside_step--;
  }

  nextInsideStep(): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.current_inside_step++;
  }

  nextStep(): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.current_step++;
    this.current_inside_step = 0;
  }

  backStep(inside_step: number): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.current_step--;
    this.current_inside_step = inside_step;
  }

  openCancelModal(): void {
    this.modalCancelOpened = true;
  }
}
