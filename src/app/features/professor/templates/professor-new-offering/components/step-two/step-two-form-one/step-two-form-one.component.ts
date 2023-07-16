import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { ProfessorService } from 'src/app/features/professor/professor.service';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';
import { Professor } from '../../../types/professor.type';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-two-form-one',
  templateUrl: './step-two-form-one.component.html',
  styleUrls: ['./step-two-form-one.component.css'],
})
export class StepTwoFormOneComponent implements OnInit {
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

  professors: ProfessorModel[] = [];
  filteredProfessorsOne: ProfessorModel[] = [];

  focusInputOne: boolean = false;
  focusInputTwo: boolean = false;
  focusInputThree: boolean = false;

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() stepTwoFormOne!: FormGroup;

  constructor(private readonly professorService: ProfessorService) {}

  async ngOnInit() {
    this.professors = this.professorService.getAll();
  }

  getFilteredProfessors(formControlName: string): ProfessorModel[] {
    if (this.stepTwoFormOne.get(formControlName)?.value) {
      return this.professors.filter((professor) =>
        professor.nome.includes(this.stepTwoFormOne.get(formControlName)?.value)
      );
    } else {
      return this.professors;
    }
  }

  handleSelectProfessor(professor: ProfessorModel, formControlName: string) {
    this.stepTwoFormOne.get(formControlName)?.setValue(professor.nome);

    if (formControlName === 'docente_responsavel') {
      this.stepTwoFormOne
        .get('docente_responsavel_email')
        ?.setValue(professor.email ?? '');
      this.stepTwoFormOne
        .get('docente_responsavel_telefone')
        ?.setValue(professor.telefone ?? '');
      this.stepTwoFormOne
        .get('docente_responsavel_instituicao')
        ?.setValue(professor.instituicao ?? '');
      this.stepTwoFormOne
        .get('docente_responsavel_titulacao')
        ?.setValue(professor.titulacao ?? '');
    }

    this.unfocusInputs();
  }

  unfocusInputs(): void {
    this.focusInputOne = false;
    this.focusInputTwo = false;
    this.focusInputThree = false;
  }
}
