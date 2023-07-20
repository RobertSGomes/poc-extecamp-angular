import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { createMask } from '@ngneat/input-mask';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from 'src/app/features/professor/professor.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { AssignAttachedDTO } from 'src/app/shared/dtos/assign-attached.dto';

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

  modalFormGroup!: FormGroup;

  focusSearchInput: boolean = false;
  professors: ProfessorModel[] = [];

  courseProfessors: Array<
    ProfessorModel & { funcao: string; carga_horaria: string }
  > = [];

  hasRecentAdded = false;
  openNewProfessorModal = false;

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();
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

  @Input() courseId!: string;

  constructor(
    private readonly professorService: ProfessorService,
    private readonly courseService: CourseService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.professorService.getAll().subscribe({
      next: (response) => {
        this.professors = response.result;
      },
    });

    this.courseService.getOne(this.courseId).subscribe({
      next: (response) => {
        this.loadCourseProfessors(response.docentes_vinculo);
      },
      error: ({ error }) => {
        alert(error.error);
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

  loadCourseProfessors(
    assignedProfessors: Array<{
      id: string;
      funcao: string;
      carga_horaria: string;
    }>
  ) {
    this.courseProfessors = [];

    for (let assignedProfessor of assignedProfessors) {
      this.professorService.getOne(assignedProfessor.id).subscribe({
        next: (response) => {
          this.courseProfessors.push({
            ...response,
            funcao: assignedProfessor.funcao,
            carga_horaria: assignedProfessor.carga_horaria,
          });
        },
      });
    }
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

  handleAssignAttached() {
    const assignAttachedDTO = new AssignAttachedDTO(this.modalFormGroup.value);

    return this.courseService
      .assignAttached(this.courseId!, assignAttachedDTO)
      .subscribe({
        next: (response) => {
          this.hasRecentAdded = true;
          this.handleCloseModal();

          this.loadCourseProfessors(response);
        },
        error: ({ error }) => {
          alert(error.error);
        },
      });
  }

  handleUnassignAttached(professorId: string) {
    this.courseService.unassignAttached(this.courseId, professorId).subscribe({
      next: (response) => {
        this.loadCourseProfessors(response);
      },
      error: ({ error }) => {
        alert(error.error);
      },
    });
  }

  handleSubmitModal() {
    this.handleUpdateProfessor.emit({
      professorId: this.modalFormGroup.get('docente_id')!.value,
      professorData: {
        nome: this.modalFormGroup.get('docente_nome')?.value,
        titulacao: this.modalFormGroup.get('docente_titulacao')?.value,
        situacao: this.modalFormGroup.get('docente_situacao')?.value,
        instituicao: this.modalFormGroup.get('docente_instituicao')?.value,
        unidade: this.modalFormGroup.get('docente_unidade')?.value,
        departamento: this.modalFormGroup.get('docente_departamento')?.value,
      },
    });
    this.handleAssignAttached();
  }
}
