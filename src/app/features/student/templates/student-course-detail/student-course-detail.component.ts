import { ProfessorService } from './../../../professor/professor.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseModel } from 'src/app/shared/models/course.model';
import { formatDate } from 'src/app/shared/utils/format-date.util';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';
import { getUserId } from 'src/app/shared/utils/user-id.util';

@Component({
  selector: 'student-course-detail',
  templateUrl: './student-course-detail.component.html',
  styleUrls: ['./student-course-detail.component.css'],
})
export class StudentCourseDetailComponent implements OnInit {
  studentId: string | null = getUserId();
  course?: CourseModel;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly professorService: ProfessorService,
    private readonly courseService: CourseService
  ) {}

  get courseId() {
    return this.activatedRoute.snapshot.paramMap.get('course_id') as string;
  }

  ngOnInit() {
    this.loadCourse();
  }

  loadCourse() {
    this.courseService.getOne(this.courseId).subscribe({
      next: (response) => {
        console.log(response);

        this.course = response;
      },
      error: () => {
        this.router.navigate(['/student', 'courses']);
      },
    });
  }

  isAlreadySubscribed() {
    return !this.course!.alunos.find((aluno) => aluno.id === this.studentId);
  }

  formatDate = formatDate;

  formatDateDDMMAA(date: string | undefined) {
    if (!date) return '';

    console.log(date);

    const year = new Date(date).getUTCFullYear();
    const month = new Date(date).getUTCMonth() + 1;
    const day = new Date(date).getUTCDate();

    return `${day < 10 ? `0${day}` : day}/${
      month < 10 ? `0${month}` : month
    }/${year}`;
  }

  getPresencialHours() {
    if (
      !this.course?.carga_horaria_presencial_pratica &&
      !this.course?.carga_horaria_presencial_teorica
    ) {
      return 'Sem horas presenciais';
    } else if (!this.course?.carga_horaria_presencial_teorica) {
      return `${this.course?.carga_horaria_presencial_pratica.replace(
        /^0+/,
        ''
      )} práticas presenciais`;
    } else if (!this.course?.carga_horaria_presencial_pratica) {
      return `${this.course?.carga_horaria_presencial_teorica.replace(
        /^0+/,
        ''
      )} teóricas presenciais`;
    } else {
      return `${this.course?.carga_horaria_presencial_pratica.replace(
        /^0+/,
        ''
      )} práticas presenciais e ${this.course?.carga_horaria_ead_teorica.replace(
        /^0+/,
        ''
      )} teóricas presenciais`;
    }
  }

  getEadHours() {
    if (
      !this.course?.carga_horaria_ead_pratica &&
      !this.course?.carga_horaria_ead_teorica
    ) {
      return 'Sem horas a distância';
    } else if (!this.course?.carga_horaria_ead_teorica) {
      return `${this.course?.carga_horaria_ead_pratica.replace(
        /^0+/,
        ''
      )} práticas a distância`;
    } else if (!this.course?.carga_horaria_ead_pratica) {
      return `${this.course?.carga_horaria_ead_teorica.replace(
        /^0+/,
        ''
      )} teóricas a distância`;
    } else {
      return `${this.course?.carga_horaria_ead_pratica.replace(
        /^0+/,
        ''
      )} práticas a distância e ${this.course?.carga_horaria_ead_teorica.replace(
        /^0+/,
        ''
      )} teóricas a distância`;
    }
  }

  getCargaHoraria() {
    const presencialPratica = this.course?.carga_horaria_presencial_pratica
      ? Number(this.course?.carga_horaria_presencial_pratica.replace('h', ''))
      : 0;

    const presencialTeorica = this.course?.carga_horaria_presencial_teorica
      ? Number(this.course?.carga_horaria_presencial_teorica.replace('h', ''))
      : 0;

    const eadPratica = this.course?.carga_horaria_ead_pratica
      ? Number(this.course?.carga_horaria_ead_pratica.replace('h', ''))
      : 0;

    const eadTeorica = this.course?.carga_horaria_ead_teorica
      ? Number(this.course?.carga_horaria_ead_teorica.replace('h', ''))
      : 0;

    return presencialPratica + presencialTeorica + eadPratica + eadTeorica;
  }

  getWeekAmountByHours() {
    return Math.ceil(this.getCargaHoraria() / 168);
  }

  formatHTML(text: string | undefined) {
    if (!text) return '';

    return text.replaceAll('\n', '<br />');
  }

  getProfessorName(professorId: string | null) {
    if (!professorId) return '';

    let professorName = '';

    this.professorService.getOne(professorId).subscribe({
      next: (response) => {
        console.log(response);

        professorName = response.nome;
      },
      error: ({ error }) => {
        console.log('Professor não encontrado');
      },
    });

    return professorName;
  }
}
