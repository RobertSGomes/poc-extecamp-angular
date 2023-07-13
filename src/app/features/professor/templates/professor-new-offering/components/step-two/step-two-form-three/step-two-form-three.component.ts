import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { Professor } from '../../../types/professor.type';

@Component({
  selector: 'app-step-two-form-three',
  templateUrl: './step-two-form-three.component.html',
  styleUrls: ['./step-two-form-three.component.css'],
})
export class StepTwoFormThreeComponent {
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
    // },
  ];

  hasRecentAdded = false;
  openNewProfessorModal = false;

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();
}
