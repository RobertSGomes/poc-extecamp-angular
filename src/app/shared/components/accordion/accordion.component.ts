import { Component, ContentChildren, Input, QueryList } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
})
export class AccordionComponent {
  isOpened: boolean = false;

  @Input() title: string = '';
  @Input() content: string = '';
  @Input() isBlocked: boolean = false;
  @Input() noBorder: boolean = false;
}
