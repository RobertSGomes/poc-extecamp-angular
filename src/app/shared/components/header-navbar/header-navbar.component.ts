import { Component, Input, OnInit } from '@angular/core';

interface IProps {
  name: string;
  description: string;
}

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

  ngOnInit() {
    this.props.name = `Olá, ${this.props.name}`;
  }
}
