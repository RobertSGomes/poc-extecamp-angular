import { Component, OnInit } from '@angular/core';
import { getUserId } from 'src/app/shared/utils/user-id.util';
import { ProfessorModel } from '../../models/professor.model';
import { ProfessorService } from '../../professor.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { CourseModel } from 'src/app/shared/models/course.model';
import { Router } from '@angular/router';
import { UpdateCourseDTO } from 'src/app/shared/dtos/update-course.dto';

@Component({
  selector: 'professsor-offering',
  templateUrl: './professor-offering.component.html',
  styleUrls: ['./professor-offering.component.css'],
})
export class ProfessorOfferingComponent implements OnInit {
  professorId?: string;
  professor?: ProfessorModel;

  courses: Array<CourseModel> = [];

  openedDropdownOptions = '';

  constructor(
    private readonly courseService: CourseService,
    private readonly professorService: ProfessorService,
    private readonly router: Router
  ) {}

  get incompleteCourses() {
    return this.courses.filter(
      (course) => course.curso_status === 'Incompleta'
    );
  }

  get pendingCourses() {
    return this.courses.filter((course) => course.curso_status === 'Pendente');
  }

  get completedCourses() {
    return this.courses.filter((course) => course.curso_status === 'Andamento');
  }

  ngOnInit() {
    this.professorId = getUserId() as string;
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
    this.professorService.getOne(this.professorId!).subscribe({
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

  handleSwitchDropdownOptionsState(courseId: string) {
    this.openedDropdownOptions =
      this.openedDropdownOptions === courseId ? '' : courseId;
  }

  handleEditCourse(courseId: string) {
    this.router.navigate(['/professor', 'offerings', 'new', courseId]);
  }

  handleAproveCourse(courseId: string) {
    const updateCourseDTO = new UpdateCourseDTO({ curso_status: 'Andamento' });

    this.courseService.updateCourse(courseId, updateCourseDTO).subscribe({
      next: () => {
        alert('Simulação de aprovação de curso executada com sucesso');
        this.openedDropdownOptions = '';
        this.loadAllCourses();
      },
    });
  }

  handleDeleteCourse(courseId: string) {
    this.courseService.deleteCourse(courseId).subscribe({
      next: () => {
        alert('Curso removido com sucesso');
        this.loadAllCourses();
      },
    });
  }
}
