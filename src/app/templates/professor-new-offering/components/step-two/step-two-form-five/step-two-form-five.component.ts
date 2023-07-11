import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { CourseModel } from '../../../models/course.model';
import { Professor } from '../../../types/professor.type';

@Component({
  selector: 'app-step-two-form-five',
  templateUrl: './step-two-form-five.component.html',
  styleUrls: ['./step-two-form-five.component.css'],
})
export class StepTwoFormFiveComponent {
  history_steps: HistoryStep[] = [
    {
      title: 'Coordenação do curso',
      step_index: 0,
    },
    {
      title: 'Professores docentes da Unicamp',
      step_index: 1,
    },
    {
      title: 'Professores com vínculo',
      step_index: 2,
    },
    {
      title: 'Professores sem vínculo',
      step_index: 3,
    },
    {
      title: 'Palestrantes',
      step_index: 4,
    },
    {
      title: 'Validação da carga horaria',
      step_index: 5,
    },
  ];

  professors: Professor[] = [
    // {
    //   matricula: '12345678',
    //   docente: 'Maria da Silva',
    //   instituicao: 'UNICAMP',
    //   unidade: 'IQ',
    //   departamento: 'DEPARTAMENTO DE FISICO-QUIMICA',
    //   titulacao: 'Bacharel',
    //   carga_horas: '2',
    //   carga_minutos: '00',
    //   vinculo: 'Não',
    // },
  ];

  hasRecentAdded = false;
  openNewProfessorModal = false;

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() course!: CourseModel;
}
