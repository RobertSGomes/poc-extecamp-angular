import { Component, Input } from '@angular/core';
import { HistoryStep } from 'src/app/templates/professor-new-offering/types/history.type';

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
  steps: HistoryStep[] = [];

  @Input()
  currentStep = 0;
}
