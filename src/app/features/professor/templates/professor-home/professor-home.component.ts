import { Component } from '@angular/core';
import { ProfessorService } from '../../professor.service';
import { ProfessorModel } from '../../models/professor.model';

@Component({
  selector: 'professor-home',
  templateUrl: './professor-home.component.html',
  styleUrls: ['./professor-home.component.css'],
})
export class ProfessorHomeComponent {
  professor!: ProfessorModel;

  constructor(private readonly professorService: ProfessorService) {}

  ngOnInit() {
    const id = this.professorService.getProfessorId();
    this.getProfessor(id);
  }

  getProfessor(professor_id: string) {
    const response = this.professorService.getOne(professor_id);

    response.subscribe((response) => {
      this.professor = response;
    });
  }
}
