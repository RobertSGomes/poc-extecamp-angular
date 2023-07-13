import { Component, OnInit } from '@angular/core';
import { removeAccessToken } from 'src/app/shared/utils/access-token.util';
import { removeUserId } from 'src/app/shared/utils/user-id.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    removeAccessToken();
    removeUserId();
  }
}
