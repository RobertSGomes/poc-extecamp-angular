import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HistoryStep } from '../../../types/history.type';
import { createMask } from '@ngneat/input-mask';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorModel } from 'src/app/features/professor/models/professor.model';
import { ProfessorService } from 'src/app/features/professor/professor.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { AssignSpeakerDTO } from 'src/app/shared/dtos/assign-speaker.dto';

@Component({
  selector: 'app-step-two-form-five',
  templateUrl: './step-two-form-five.component.html',
  styleUrls: ['./step-two-form-five.component.css'],
})
export class StepTwoFormFiveComponent {
  currencyInputMask = createMask({
    alias: 'numeric',
    groupSeparator: ',',
    digits: 2,
    digitsOptional: false,
    placeholder: '0',
    rightAlign: false,
  });
  hourInputMask = createMask({
    alias: 'numeric',
    digits: 0,
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

  courseSpeakers: Array<{
    id: string;
    nome: string;
    matricula: string;
    instituicao?: string;
    titulacao?: string;
    tipo_vinculo: string;
    nome_palestra: string;
    valor: string;
    carga_horaria: string;
  }> = [];

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
        this.courseSpeakers = response.palestrantes;
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
      docente_instituicao: [''],
      docente_titulacao: [''],
      docente_vinculo: ['', Validators.required],
      docente_nome_palestra: ['', Validators.required],
      docente_valor_palestra: ['', Validators.required],
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
      ?.setValue(professor.instituicao ?? 'Não informado');
    this.modalFormGroup
      .get('docente_titulacao')
      ?.setValue(professor.titulacao ?? 'Não informado');

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
      docente_instituicao: [''],
      docente_titulacao: [''],
      docente_vinculo: ['', Validators.required],
      docente_nome_palestra: ['', Validators.required],
      docente_valor_palestra: ['', Validators.required],
      docente_carga_horaria_horas: ['', Validators.required],
      docente_carga_horaria_minutos: ['', Validators.required],
    });

    this.unfocusInputs();

    this.openNewProfessorModal = false;
  }

  handleAssignSpeaker() {
    const assignSpeakerDTO = new AssignSpeakerDTO(this.modalFormGroup.value);

    return this.courseService
      .assignSpeaker(this.courseId!, assignSpeakerDTO)
      .subscribe({
        next: (response) => {
          this.hasRecentAdded = true;
          this.handleCloseModal();

          this.courseSpeakers = response;
        },
        error: ({ error }) => {
          alert(error.error);
        },
      });
  }

  handleUnassignSpeaker(professorId: string) {
    this.courseService.unassignSpeaker(this.courseId, professorId).subscribe({
      next: (response) => {
        this.courseSpeakers = response;
      },
      error: ({ error }) => {
        alert(error.error);
      },
    });
  }
}
