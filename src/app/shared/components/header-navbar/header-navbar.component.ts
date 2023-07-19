import { Component, Input } from '@angular/core';

type HeaederRoutes = Array<string | undefined>;

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css'],
})
export class HeaderNavbarComponent {
  @Input() name: string | undefined = '';
  @Input() routes: HeaederRoutes = [];
  @Input() description: string = '';
}
