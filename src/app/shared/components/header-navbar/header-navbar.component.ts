import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css'],
})
export class HeaderNavbarComponent implements OnInit {
  @Input()
  name: string = 'Guest';

  @Input()
  description: string = '';

  ngOnInit() {
    this.name = `Olá, ${this.name}`;
  }
}
