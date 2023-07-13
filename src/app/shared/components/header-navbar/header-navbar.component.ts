import { Component, Input, OnInit } from '@angular/core';

type HeaederRoutes = Array<string>;

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css'],
})
export class HeaderNavbarComponent implements OnInit {
  @Input() name: string | undefined = '';
  @Input() routes: HeaederRoutes = [];
  @Input() description: string = '';

  ngOnInit(): void {
    this.name = `Olá, ${this.name}`;
  }
}
