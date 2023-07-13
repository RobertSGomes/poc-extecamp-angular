import { Component, Input } from '@angular/core';

interface IProps {
  steps: Array<{
    title: string;
    step_index: number;
    amount_insideSteps: number;
  }>;
}

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css'],
})
export class StepsComponent {
  @Input()
  props: IProps = {
    steps: [],
  };

  @Input()
  currentStep = 0;

  @Input()
  currentInsideStep = 0;
}
