import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { createMask } from '@ngneat/input-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';
import { ProfessorService } from 'src/app/features/professor/professor.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { AssignUnattachedDTO } from 'src/app/shared/dtos/assign-unattached.dto';
import { CourseService } from 'src/app/shared/services/course.service';

@Component({
  selector: 'app-step-two-form-four',
  templateUrl: './step-two-form-four.component.html',
  styleUrls: ['./step-two-form-four.component.css'],
})
export class StepTwoFormFourComponent {
  rgInputMask = createMask({
    mask: '99.999.999-9',
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

  modalFormGroup!: FormGroup;

  focusSearchInput: boolean = false;
  professors: ProfessorModel[] = [];

  courseProfessors: Array<{
    id: string;
    matricula: string;
    nome: string;
    documento_identificacao: {
      tipo: string;
      nmr_documento: string;
    };
    pais_origem: string;
    instituicao: string;
    titulacao: string;
    funcao: string;
    carga_horaria: string;
  }> = [];

  hasRecentAdded = false;
  openNewProfessorModal = false;

  countries: any[] = [];

  @Output() backInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() nextInsideStep: EventEmitter<void> = new EventEmitter<void>();
  @Output() openCancelModal: EventEmitter<void> = new EventEmitter<void>();

  @Input() courseId!: string;

  constructor(
    private readonly professorService: ProfessorService,
    private readonly courseService: CourseService,
    private readonly locationService: LocationService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.professorService.getAll().subscribe({
      next: (response) => {
        this.professors = response.result;
      },
    });

    this.locationService.getCountries().subscribe({
      next: (response) => {
        this.countries = response;
      },
      error: () => {
        this.countries = [];
      },
    });

    this.courseService.getOne(this.courseId).subscribe({
      next: (response) => {
        this.courseProfessors = response.docentes_sem_vinculo;
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
      docente_documento_tipo: ['', Validators.required],
      docente_documento_numero: ['', Validators.required],
      docente_pais_origem: ['', Validators.required],
      docente_instituicao: ['', Validators.required],
      docente_titulacao: ['', Validators.required],
      docente_funcao: ['', Validators.required],
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
    this.modalFormGroup.get('docente')?.setValue(professor.nome ?? '');
    this.modalFormGroup.get('docente_nome')?.setValue(professor.nome ?? '');
    this.modalFormGroup
      .get('docente_matricula')
      ?.setValue(professor.matricula ?? '');
    this.modalFormGroup
      .get('docente_instituicao')
      ?.setValue(professor.instituicao ?? '');
    this.modalFormGroup
      .get('docente_titulacao')
      ?.setValue(professor.titulacao ?? '');

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
      docente_documento_tipo: ['', Validators.required],
      docente_documento_numero: ['', Validators.required],
      docente_pais_origem: ['', Validators.required],
      docente_instituicao: ['', Validators.required],
      docente_titulacao: ['', Validators.required],
      docente_funcao: ['', Validators.required],
      docente_carga_horaria_horas: ['', Validators.required],
      docente_carga_horaria_minutos: ['', Validators.required],
    });

    this.unfocusInputs();

    this.openNewProfessorModal = false;
  }

  handleAssignUnattached() {
    const assignUnattachedDTO = new AssignUnattachedDTO(
      this.modalFormGroup.value
    );

    return this.courseService
      .assignUnattached(this.courseId!, assignUnattachedDTO)
      .subscribe({
        next: (response) => {
          this.hasRecentAdded = true;
          this.handleCloseModal();

          this.courseProfessors = response;
        },
        error: ({ error }) => {
          alert(error.error);
        },
      });
  }

  handleUnassignUnattached(professorId: string) {
    this.courseService
      .unassignUnattached(this.courseId, professorId)
      .subscribe({
        next: (response) => {
          this.courseProfessors = response;
        },
        error: ({ error }) => {
          alert(error.error);
        },
      });
  }
}
