import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sidebar: String = '/professor/home';

  constructor(private router: Router) {
    this.sidebar = this.router.url;
  }
}
