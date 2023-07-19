import { Component, OnInit } from '@angular/core';
import { getUserId } from 'src/app/shared/utils/user-id.util';
import { ProfessorModel } from '../../models/professor.model';
import { ProfessorService } from '../../professor.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseModel } from 'src/app/shared/models/course.model';

@Component({
  selector: 'professsor-offering',
  templateUrl: './professor-offering.component.html',
  styleUrls: ['./professor-offering.component.css'],
})
export class ProfessorOfferingComponent implements OnInit {
  professorId: string | null = getUserId();
  professor?: ProfessorModel;

  courses: Array<CourseModel> = [];

  constructor(
    private readonly courseService: CourseService,
    private readonly professorService: ProfessorService
  ) {}

  ngOnInit() {
    this.getProfessor();
    this.loadAllCourses();
  }

  loadAllCourses() {
    this.courseService.getAll().subscribe({
      next: (response) => {
        this.loadProfessorCourses(response.result);
      },
    });
  }

  getProfessor(): void {
    this.professorService.getOne(this.professorId).subscribe({
      next: (response) => {
        this.professor = response;
      },
    });
  }

  loadProfessorCourses(allCourses: CourseModel[]) {
    this.courses = allCourses.filter(
      (course) => course.created_by === this.professorId
    );
  }

  formatIndex(index: number) {
    var formattedIndex = String(index + 1);
    var zerosToAdd = 3 - formattedIndex.length;

    for (var i = 0; i < zerosToAdd; i++) {
      formattedIndex = '0' + formattedIndex;
    }

    return formattedIndex;
  }
}
