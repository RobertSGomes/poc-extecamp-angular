import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../../professor.service';
import { ProfessorModel } from '../../models/professor.model';
import { getUserId } from 'src/app/shared/utils/user-id.util';

@Component({
  selector: 'professor-home',
  templateUrl: './professor-home.component.html',
  styleUrls: ['./professor-home.component.css'],
})
export class ProfessorHomeComponent implements OnInit {
  professorId: string | null = getUserId();
  professor?: ProfessorModel;

  constructor(private readonly professorService: ProfessorService) {}

  ngOnInit() {
    this.getProfessor();
  }

  getProfessor(): void {
    this.professor = this.professorService.getOne(this.professorId);
  }
}
