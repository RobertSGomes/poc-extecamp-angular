import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { Professor } from '../../../types/professor.type';
import { createMask } from '@ngneat/input-mask';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from 'src/app/features/professor/professor.service';

@Component({
  selector: 'app-step-two-form-three',
  templateUrl: './step-two-form-three.component.html',
  styleUrls: ['./step-two-form-three.component.css'],
})
export class StepTwoFormThreeComponent {
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

  hasRecentAdded = false;
  openNewProfessorModal = false;

  modalFormGroup!: FormGroup;

  professors: Professor[] = [];

  professorsModel: ProfessorModel[] = [];

  focusSearchInput: boolean = false;

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly professorService: ProfessorService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.professorService.getAll().subscribe({
      next: (response) => {
        this.professorsModel = response.result;
      },
    });

    this.modalFormGroup = this.formBuilder.group({
      docente_id: ['', Validators.required],
      docente: [''],
      docente_nome: ['', Validators.required],
      docente_matricula: ['', Validators.required],
      docente_titulacao: ['', Validators.required],
      docente_situacao: ['', Validators.required],
      docente_instituicao: ['', Validators.required],
      docente_unidade: ['', Validators.required],
      docente_departamento: ['', Validators.required],
      docente_funcao: ['', Validators.required],
      docente_carga_horaria_horas: ['', Validators.required],
      docente_carga_horaria_minutos: ['', Validators.required],
    });
  }

  getFilteredProfessors(formControlName: string): ProfessorModel[] {
    if (this.modalFormGroup.get(formControlName)?.value) {
      return this.professorsModel.filter(
        (professor) =>
          professor.nome.includes(
            this.modalFormGroup.get(formControlName)?.value
          ) ||
          professor.matricula.includes(
            this.modalFormGroup.get(formControlName)?.value
          )
      );
    } else {
      return this.professorsModel;
    }
  }

  handleSelectProfessor(professor: ProfessorModel) {
    this.modalFormGroup.get('docente_id')?.setValue(professor.id);
    this.modalFormGroup.get('docente')?.setValue(professor.nome);
    this.modalFormGroup.get('docente_nome')?.setValue(professor.nome ?? '');
    this.modalFormGroup
      .get('docente_matricula')
      ?.setValue(professor.matricula ?? '');
    this.modalFormGroup
      .get('docente_titulacao')
      ?.setValue(professor.titulacao ?? '');
    this.modalFormGroup
      .get('docente_situacao')
      ?.setValue(professor.situacao ?? '');
    this.modalFormGroup
      .get('docente_instituicao')
      ?.setValue(professor.instituicao ?? '');
    this.modalFormGroup
      .get('docente_unidade')
      ?.setValue(professor.unidade ?? '');
    this.modalFormGroup
      .get('docente_departamento')
      ?.setValue(professor.departamento ?? '');

    this.unfocusInputs();
  }

  unfocusInputs(): void {
    this.focusSearchInput = false;
  }

  handleCloseModal() {
    this.modalFormGroup = this.formBuilder.group({
      docente_id: ['', Validators.required],
      docente: [''],
      docente_nome: ['', Validators.required],
      docente_matricula: ['', Validators.required],
      docente_titulacao: ['', Validators.required],
      docente_situacao: ['', Validators.required],
      docente_instituicao: ['', Validators.required],
      docente_unidade: ['', Validators.required],
      docente_departamento: ['', Validators.required],
      docente_funcao: ['', Validators.required],
      docente_carga_horaria_horas: ['', Validators.required],
      docente_carga_horaria_minutos: ['', Validators.required],
    });

    this.unfocusInputs();

    this.openNewProfessorModal = false;
  }

  handleNewProfessor(form: FormGroup) {
    const formValues: Professor = form.value;

    this.professors.push(formValues);
    this.hasRecentAdded = true;

    this.handleCloseModal();
  }
}
