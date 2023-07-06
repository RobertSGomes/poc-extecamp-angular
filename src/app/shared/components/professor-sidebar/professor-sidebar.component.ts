import { Component } from '@angular/core';

@Component({
  selector: 'app-professor-sidebar',
  templateUrl: './professor-sidebar.component.html',
  styleUrls: ['./professor-sidebar.component.css'],
})
export class ProfessorSidebarComponent {
  sidebar: 'home' | 'oferecimento' = 'home';
}
