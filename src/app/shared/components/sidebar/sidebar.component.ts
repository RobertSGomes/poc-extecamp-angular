import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

type NavItem = {
  title: string;
  routerLink: string;
};

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentUrl: string = '';

  @Input() name: string = '';
  @Input() email: string = '';
  @Input() navItens: NavItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
  }
}
