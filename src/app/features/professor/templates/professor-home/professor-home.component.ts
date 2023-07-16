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
  professor?: ProfessorModel;
  private professorId: string | null = getUserId();

  constructor(private readonly professorService: ProfessorService) {}

  ngOnInit(): void {
    this.getProfessor();
  }

  async getProfessor(): Promise<void> {
    this.professor = await this.professorService.getOne(this.professorId);
  }
}
