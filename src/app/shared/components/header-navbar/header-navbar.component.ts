import { Component, Input, OnInit } from '@angular/core';

interface IProps {
  name: string;
  description: string;
}

type HeaederRoutes = Array<string>;

@Component({
  selector: 'app-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.css'],
})
export class HeaderNavbarComponent implements OnInit {
  @Input()
  props: IProps = {
    name: '',
    description: '',
  };

  @Input()
  routes: HeaederRoutes = [];

  ngOnInit(): void {
    this.props.name = `Olá, ${this.props.name}`;
  }
}
