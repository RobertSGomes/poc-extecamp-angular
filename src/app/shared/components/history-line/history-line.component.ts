import { Component, Input } from '@angular/core';
import { HistoryStep } from 'src/app/features/professor/templates/professor-new-offering/types/history.type';

@Component({
  selector: 'app-history-line',
  templateUrl: './history-line.component.html',
  styleUrls: ['./history-line.component.css'],
})
export class HistoryLineComponent {
  @Input() steps: HistoryStep[] = [];
  @Input() currentStep = 0;
}
