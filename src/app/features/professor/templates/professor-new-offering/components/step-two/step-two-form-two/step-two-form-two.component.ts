import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';
import { ProfessorService } from 'src/app/features/professor/professor.service';
import { createMask } from '@ngneat/input-mask';

@Component({
  selector: 'app-step-two-form-two',
  templateUrl: './step-two-form-two.component.html',
  styleUrls: ['./step-two-form-two.component.css'],
})
export class StepTwoFormTwoComponent implements OnInit {
  hourInputMask = createMask({
    alias: 'numeric',
    digits: 0,
    placeholder: '0',
    max: 24,
    min: 0,
  });
  minuteInputMask = createMask({
    alias: 'numeric',
    digits: 0,
    placeholder: '0',
    max: 60,
    min: 0,
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

  professors: ProfessorModel[] = [];

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
        this.professors = response.result;
      },
    });

    this.modalFormGroup = this.formBuilder.group({
      docente_id: ['', Validators.required],
      docente: [''],
      docente_nome: ['', Validators.required],
      docente_matricula: ['', Validators.required],
      docente_titulacao: ['', Validators.required],
      docente_situacao: ['', Validators.required],
      docente_unidade: ['', Validators.required],
      docente_departamento: ['', Validators.required],
      docente_carga_horaria_horas: ['', Validators.required],
      docente_carga_horaria_minutos: ['', Validators.required],
    });
  }

  getFilteredProfessors(formControlName: string): ProfessorModel[] {
    if (this.modalFormGroup.get(formControlName)?.value) {
      return this.professors.filter(
        (professor) =>
          professor.nome.includes(
            this.modalFormGroup.get(formControlName)?.value
          ) ||
          professor.matricula.includes(
            this.modalFormGroup.get(formControlName)?.value
          )
      );
    } else {
      return this.professors;
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
      docente_unidade: ['', Validators.required],
      docente_departamento: ['', Validators.required],
      docente_carga_horaria_horas: ['', Validators.required],
      docente_carga_horaria_minutos: ['', Validators.required],
    });

    this.unfocusInputs();

    this.openNewProfessorModal = false;
  }

  handleNewProfessor(form: FormGroup) {
    const formValues = form.value;

    console.log(formValues);

    // this.professors.push()
  }
}
