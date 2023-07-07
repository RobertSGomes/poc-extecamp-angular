import { Component, Input } from '@angular/core';

interface IProps {
  steps: Array<{
    title: string;
    step_index: number;
  }>;
}

@Component({
  selector: 'app-history-line',
  templateUrl: './history-line.component.html',
  styleUrls: ['./history-line.component.css'],
})
export class HistoryLineComponent {
  @Input()
  props: IProps = {
    steps: [],
  };

  @Input()
  currentStep = 0;
}
