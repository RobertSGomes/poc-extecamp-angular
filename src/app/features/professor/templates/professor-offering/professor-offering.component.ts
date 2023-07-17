import { Component, OnInit } from '@angular/core';
import { getUserId } from 'src/app/shared/utils/user-id.util';
import { ProfessorModel } from '../../models/professor.model';
import { ProfessorService } from '../../professor.service';

@Component({
  selector: 'professsor-offering',
  templateUrl: './professor-offering.component.html',
  styleUrls: ['./professor-offering.component.css'],
})
export class ProfessorOfferingComponent implements OnInit {
  professorId: string | null = getUserId();
  professor?: ProfessorModel;

  constructor(private readonly professorService: ProfessorService) {}

  ngOnInit() {
    this.getProfessor();
  }

  getProfessor(): void {
    this.professorService.getOne(this.professorId).subscribe((response) => {
      this.professor = response;
    });
  }
}
