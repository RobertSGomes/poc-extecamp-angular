import { Component, Input } from '@angular/core';

type Steps = Array<{
  title: string;
  stepIndex: number;
  amountInsideSteps: number;
}>;

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css'],
})
export class StepsComponent {
  @Input() currentStep = 0;
  @Input() currentInsideStep = 0;
  @Input() steps: Steps = [];
}
