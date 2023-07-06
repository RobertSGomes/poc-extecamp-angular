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
  @Input()
  navItens: NavItem[] = [];
  currentUrl: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
  }
}
