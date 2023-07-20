import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { ProfessorService } from 'src/app/features/professor/professor.service';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';
import { FormGroup } from '@angular/forms';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-step-two-form-one',
  templateUrl: './step-two-form-one.component.html',
  styleUrls: ['./step-two-form-one.component.css'],
})
export class StepTwoFormOneComponent implements OnInit {
  phoneInputMask = createMask({
    mask: '+55 (99) 9 9999-9999',
    rightAlign: false,
  });
  hourInputMask = createMask({
    alias: 'numeric',
    digits: 0,
    placeholder: '0',
    max: 23,
    min: 0,
    rightAlign: false,
  });
  minuteInputMask = createMask({
    alias: 'numeric',
    digits: 0,
    placeholder: '0',
    max: 59,
    min: 0,
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

  professors: ProfessorModel[] = [];

  focusInputOne: boolean = false;
  focusInputTwo: boolean = false;
  focusInputThree: boolean = false;

  @Output() backStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() handleAssignCoordination: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() handleUpdateProfessor: EventEmitter<{
    professorId: string;
    professorData: {
      nome?: string;
      email?: string;
      telefone?: string;
      matricula?: string;
      instituicao?: string;
      unidade?: string;
      departamento?: string;
      titulacao?: string;
      situacao?: string;
    };
  }> = new EventEmitter<{
    professorId: string;
    professorData: {
      nome?: string;
      email?: string;
      telefone?: string;
      matricula?: string;
      instituicao?: string;
      unidade?: string;
      departamento?: string;
      titulacao?: string;
      situacao?: string;
    };
  }>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() stepTwoFormOne!: FormGroup;

  constructor(private readonly professorService: ProfessorService) {}

  async ngOnInit() {
    this.professorService.getAll().subscribe({
      next: (response) => {
        this.professors = response.result;
        this.handleLoadInputs();
      },
    });
  }

  handleLoadInputs() {
    if (this.stepTwoFormOne.get('coordenador_id')?.value) {
      this.stepTwoFormOne
        .get('coordenador')
        ?.setValue(
          this.professors.find(
            (professor) =>
              professor.id === this.stepTwoFormOne.get('coordenador_id')?.value
          )?.nome ?? ''
        );
    }

    if (this.stepTwoFormOne.get('diretor_id')?.value) {
      this.stepTwoFormOne
        .get('diretor')
        ?.setValue(
          this.professors.find(
            (professor) =>
              professor.id === this.stepTwoFormOne.get('diretor_id')?.value
          )?.nome ?? ''
        );
    }

    if (this.stepTwoFormOne.get('docente_responsavel_id')?.value) {
      const professor = this.professors.find(
        (professor) =>
          professor.id ===
          this.stepTwoFormOne.get('docente_responsavel_id')?.value
      ) as ProfessorModel;

      this.handleSelectProfessor(
        professor,
        'docente_responsavel',
        'docente_responsavel_id'
      );
    }
  }

  getFilteredProfessors(formControlName: string): ProfessorModel[] {
    if (this.stepTwoFormOne.get(formControlName)?.value) {
      return this.professors.filter(
        (professor) =>
          professor.nome.includes(
            this.stepTwoFormOne.get(formControlName)?.value
          ) ||
          professor.matricula.includes(
            this.stepTwoFormOne.get(formControlName)?.value
          )
      );
    } else {
      return this.professors;
    }
  }

  handleSelectProfessor(
    professor: ProfessorModel,
    formControlName: string,
    formControlIdName?: string
  ) {
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

    if (formControlIdName) {
      this.stepTwoFormOne.get(formControlIdName)?.setValue(professor.id);
    }

    this.unfocusInputs();
  }

  unfocusInputs(): void {
    this.focusInputOne = false;
    this.focusInputTwo = false;
    this.focusInputThree = false;
  }

  handleSubmit() {
    this.handleUpdateProfessor.emit({
      professorId: this.stepTwoFormOne.get('docente_responsavel_id')!.value,
      professorData: {
        nome:
          this.stepTwoFormOne.get('docente_responsavel')?.value ?? undefined,
        email:
          this.stepTwoFormOne.get('docente_responsavel_email')?.value ??
          undefined,
        telefone:
          this.stepTwoFormOne.get('docente_responsavel_telefone')?.value ??
          undefined,
        instituicao:
          this.stepTwoFormOne.get('docente_responsavel_instituicao')?.value ??
          undefined,
        titulacao:
          this.stepTwoFormOne.get('docente_responsavel_titulacao')?.value ??
          undefined,
      },
    });
    this.handleAssignCoordination.emit();
  }
}
