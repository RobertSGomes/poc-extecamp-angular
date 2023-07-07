import { Component, Input } from '@angular/core';

interface IProps {
  steps: Array<{
    title: string;
    step_index: number;
    amount_inside_steps: number;
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
  currentStep = 1;

  @Input()
  currentInsideStep = 1;
}
