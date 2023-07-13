import { Component, OnInit } from '@angular/core';
import {
  removeProfessorAccessToken,
  removeStudentAccessToken,
} from 'src/app/shared/utils/access-token.util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    removeProfessorAccessToken();
    removeStudentAccessToken();
  }
}
