import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';
import { ProfessorService } from 'src/app/features/professor/professor.service';
import { createMask } from '@ngneat/input-mask';
import { CourseService } from 'src/app/shared/services/course.service';
import { AssignUnicampDTO } from 'src/app/shared/dtos/assign-unicamp.dto';

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

  courseProfessors: Array<ProfessorModel & { carga_horaria: string }> = [];

  hasRecentAdded = false;
  openNewProfessorModal = false;

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

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
        this.loadCourseProfessors(response.docentes_unicamp);
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
      docente_unidade: ['', Validators.required],
      docente_departamento: ['', Validators.required],
      docente_carga_horaria_horas: ['', Validators.required],
      docente_carga_horaria_minutos: ['', Validators.required],
    });
  }

  loadCourseProfessors(
    assignedProfessors: Array<{ id: string; carga_horaria: string }>
  ) {
    for (let assignedProfessor of assignedProfessors) {
      this.professorService.getOne(assignedProfessor.id).subscribe({
        next: (response) => {
          this.courseProfessors = [];
          this.courseProfessors.push({
            ...response,
            carga_horaria: assignedProfessor.carga_horaria,
          });
        },
        error: () => {
          this.courseProfessors = [];
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

  handleAssignUnicamp() {
    const assignUnicampDTO = new AssignUnicampDTO(this.modalFormGroup.value);

    return this.courseService
      .assignUnicamp(this.courseId!, assignUnicampDTO)
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

  handleUnassignUnicamp(professorId: string) {
    this.courseService.unassignUnicamp(this.courseId, professorId).subscribe({
      next: (response) => {
        this.loadCourseProfessors(response);
      },
      error: ({ error }) => {
        alert(error.error);
      },
    });
  }
}
