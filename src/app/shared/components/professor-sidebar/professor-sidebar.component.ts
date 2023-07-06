import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-sidebar',
  templateUrl: './professor-sidebar.component.html',
  styleUrls: ['./professor-sidebar.component.css'],
})
export class ProfessorSidebarComponent {
  sidebar: String = '/professor/home';

  constructor(private router: Router) {
    this.sidebar = this.router.url;
  }
}
