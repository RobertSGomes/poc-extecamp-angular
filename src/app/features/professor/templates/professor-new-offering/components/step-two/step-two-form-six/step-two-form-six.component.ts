import { ProfessorService } from 'src/app/features/professor/professor.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { createMask } from '@ngneat/input-mask';
import { CourseModel } from 'src/app/shared/models/course.model';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';

@Component({
  selector: 'app-step-two-form-six',
  templateUrl: './step-two-form-six.component.html',
  styleUrls: ['./step-two-form-six.component.css'],
})
export class StepTwoFormSixComponent implements OnInit {
  hourInputMask = createMask({
    alias: 'numeric',
    digits: 0,
    rightAlign: false,
  });

  historySteps: HistoryStep[] = [
    {
      title: 'Coordenação do curso',
      stepIndex: 0,
    },
    {
      title: 'Professores docentes da Unicamp',
      stepIndex: 1,
    },
    {
      title: 'Professores com vínculo',
      stepIndex: 2,
    },
    {
      title: 'Professores sem vínculo',
      stepIndex: 3,
    },
    {
      title: 'Palestrantes',
      stepIndex: 4,
    },
    {
      title: 'Validação da carga horaria',
      stepIndex: 5,
    },
  ];

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() courseId!: string;

  course?: CourseModel;
  professors: ProfessorModel[] = [];

  notificationShow = true;

  constructor(
    private readonly ProfessorService: ProfessorService,
    private readonly courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseService.getOne(this.courseId).subscribe({
      next: (response) => {
        this.course = response;
      },
    });

    this.ProfessorService.getAll().subscribe({
      next: (response) => {
        this.professors = response.result;
      },
    });
  }

  getProfessorName(professorId?: string) {
    if (!professorId) return '';

    return this.professors.find((professor) => professor.id === professorId)
      ?.nome;
  }

  getHour(cargaHoraria?: string) {
    if (!cargaHoraria) return '';

    return Number(cargaHoraria.split('h')[0]);
  }

  getMinutes(cargaHoraria?: string) {
    if (!cargaHoraria) return '';

    return Number(cargaHoraria.split('h')[1].replace('min', ''));
  }

  getCargaHorariaTotal() {
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

  getTotal() {
    const horasProfessorResponsavel =
      (this.course?.docente_responsavel.carga_horaria
        ? Number(this.getHour(this.course?.docente_responsavel.carga_horaria))
        : 0) *
        60 +
      (this.course?.docente_responsavel.carga_horaria
        ? Number(
            this.getMinutes(this.course?.docente_responsavel.carga_horaria)
          )
        : 0);

    const horasProfessoresUnicamp = this.course?.docentes_unicamp.reduce(
      (totalHoras, objeto) =>
        totalHoras +
        (objeto.carga_horaria
          ? Number(this.getHour(objeto.carga_horaria))
          : 0) *
          60 +
        (objeto.carga_horaria
          ? Number(this.getMinutes(objeto.carga_horaria))
          : 0),
      0
    );

    const horasProfessoresVinculo = this.course?.docentes_vinculo.reduce(
      (totalHoras, objeto) =>
        totalHoras +
        (objeto.carga_horaria
          ? Number(this.getHour(objeto.carga_horaria))
          : 0) *
          60 +
        (objeto.carga_horaria
          ? Number(this.getMinutes(objeto.carga_horaria))
          : 0),
      0
    );

    const horasProfessoresSemVinculo = this.course?.docentes_sem_vinculo.reduce(
      (totalHoras, objeto) =>
        totalHoras +
        (objeto.carga_horaria
          ? Number(this.getHour(objeto.carga_horaria))
          : 0) *
          60 +
        (objeto.carga_horaria
          ? Number(this.getMinutes(objeto.carga_horaria))
          : 0),
      0
    );

    const horasPalestrantes = this.course?.palestrantes.reduce(
      (totalHoras, objeto) =>
        totalHoras +
        (objeto.carga_horaria
          ? Number(this.getHour(objeto.carga_horaria))
          : 0) *
          60 +
        (objeto.carga_horaria
          ? Number(this.getMinutes(objeto.carga_horaria))
          : 0),
      0
    );

    return (
      horasProfessorResponsavel +
      horasProfessoresUnicamp +
      horasProfessoresVinculo +
      horasProfessoresSemVinculo +
      horasPalestrantes
    );
  }

  getTotalHour() {
    return Math.floor(this.getTotal() / 60);
  }

  getTotalMinutes() {
    return this.getTotal() % 60;
  }

  isNotValid() {
    const cargaHorariaTotal = isNaN(
      this.getTotalHour() * 60 + this.getTotalMinutes()
    )
      ? 0
      : this.getTotalHour() * 60 + this.getTotalMinutes();
    const cargaHorariaCurso = this.getCargaHorariaTotal() * 60;

    return cargaHorariaCurso > cargaHorariaTotal;
  }
}
