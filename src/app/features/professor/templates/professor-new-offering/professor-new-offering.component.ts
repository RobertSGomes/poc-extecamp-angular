import { Component } from '@angular/core';

@Component({
  selector: 'professor-new-offering',
  templateUrl: './professor-new-offering.component.html',
  styleUrls: ['./professor-new-offering.component.css'],
})
export class ProfessorNewOfferingComponent {
  currentStep: number = 0;
  currentInsideStep: number = 0;
  modalCancelOpened = false;

  backInsideStep(): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.currentInsideStep--;
  }

  nextInsideStep(): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.currentInsideStep++;
  }

  nextStep(): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.currentStep++;
    this.currentInsideStep = 0;
  }

  backStep(insideStep: number): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.currentStep--;
    this.currentInsideStep = insideStep;
  }

  openCancelModal(): void {
    this.modalCancelOpened = true;
  }

  handleSubmit(): void {
    console.log('Criarei o curso');
  }
}
