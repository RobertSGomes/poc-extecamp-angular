import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  sidebar: String = '/professor/home';

  constructor(private router: Router) {}

  ngOnInit() {
    this.sidebar = this.router.url;
  }
}
