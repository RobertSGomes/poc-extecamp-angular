import { SubscribeCourseDTO } from './../../../../shared/dtos/subscribe-course.dto';
import { CourseService } from 'src/app/shared/services/course.service';
import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { getUserId } from '../../../../../app/shared/utils/user-id.util';
import { StudentService } from '../../student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseModel } from 'src/app/shared/models/course.model';
import { formatDate } from 'src/app/shared/utils/format-date.util';

@Component({
  selector: 'student-course-registration',
  templateUrl: './student-course-registration.component.html',
  styleUrls: ['./student-course-registration.component.css'],
})
export class StudentCourseRegistrationComponent implements OnInit {
  currentStep: number = 0;

  student!: StudentModel;
  form?: FormGroup;

  course?: CourseModel;

  signature = false;
  documentosUpload = false;
  cpfUpload = false;
  declaracaoUpload = false;

  constructor(
    private readonly studentService: StudentService,
    private readonly courseService: CourseService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  get courseId() {
    return this.activatedRoute.snapshot.paramMap.get('course_id') as string;
  }

  async ngOnInit(): Promise<void> {
    this.studentService.getOne(getUserId()).subscribe({
      next: (data) => {
        this.student = data;
        this.createForm(data);
      },
      error: () => {
        this.router.navigate(['']);
      },
    });

    this.loadCourse();
  }

  loadCourse() {
    this.courseService.getOne(this.courseId).subscribe({
      next: (response) => {
        this.course = response;
      },
      error: () => {
        this.router.navigate(['/student', 'courses']);
      },
    });
  }

  createForm(student: StudentModel) {
    this.form = this.formBuilder.group({
      step1: this.formBuilder.group({
        nome: [student.nome ?? '', [Validators.required]],
        email: [student.email ?? '', [Validators.required, Validators.email]],
        telefone: [student.telefone ?? '', [Validators.required]],
        documento_identificacao_tipo: [
          student.documento_identificacao?.tipo ?? '',
          [Validators.required],
        ],
        documento_identificacao_numero: [
          student.documento_identificacao?.numero ?? '',
          [Validators.required],
        ],
        documento_identificacao_orgao_emissor: [
          student.documento_identificacao?.orgao_emissor ?? '',
          [Validators.required],
        ],
        documento_identificacao_estado_emissor: [
          student.documento_identificacao?.uf_emissao ?? '',
          [Validators.required],
        ],
        cpf: [student.cpf ?? '', [Validators.required]],
        data_nascimento: [
          student.data_nascimento
            ? student.data_nascimento.substring(0, 10)
            : '',
          [Validators.required],
        ],
        naturalidade_pais: [
          student.naturalidade?.pais ?? '',
          [Validators.required],
        ],
        naturalidade_estado: [
          student.naturalidade?.estado ?? '',
          [Validators.required],
        ],
        naturalidade_cidade: [
          student.naturalidade?.cidade ?? '',
          [Validators.required],
        ],
        genero: [student.genero ?? '', [Validators.required]],
        estado_civil: [student.estado_civil, [Validators.required]],
        possui_deficiencia: [
          student.possui_deficiencia ?? false,
          [Validators.required],
        ],
        deficiencia: [student.tipo_deficiencia ?? ''],
      }),
      step2: this.formBuilder.group({
        cep: [student.endereco?.cep ?? '', [Validators.required]],
        logradouro: [student.endereco?.logradouro ?? '', [Validators.required]],
        numero: [student.endereco?.numero ?? '', [Validators.required]],
        bairro: [student.endereco?.bairro ?? '', [Validators.required]],
        complemento: [student.endereco?.complemento ?? ''],
        estado: [student.endereco?.estado ?? '', [Validators.required]],
        cidade: [student.endereco?.cidade ?? '', [Validators.required]],
        pais: [student.endereco?.pais_residencia ?? '', [Validators.required]],
      }),
      step3: this.formBuilder.group({
        termo_compromisso_assinado: [false],
      }),
      step4: this.formBuilder.group({
        documentos_upload: [false],
        cpf_upload: [false],
        declaracao_upload: [false],
      }),
    });
  }

  get stepOneForm() {
    return this.form?.get('step1') as FormGroup;
  }

  get stepTwoForm() {
    return this.form?.get('step2') as FormGroup;
  }

  get stepThreeForm() {
    return this.form?.get('step3') as FormGroup;
  }

  get stepFourForm() {
    return this.form?.get('step4') as FormGroup;
  }

  formatDate = formatDate;

  nextStep(): void {
    document.querySelector('#form-student')!.scrollTo(0, 0);
    this.currentStep++;
  }

  backStep(): void {
    document.querySelector('#form-student')!.scrollTo(0, 0);
    this.currentStep--;
  }

  handleSubscribeToCourse() {
    const subscribeCourseDTO = new SubscribeCourseDTO({
      stepOneValues: this.stepOneForm.value,
      stepTwoValues: this.stepTwoForm.value,
      stepThreeValues: this.stepThreeForm.value,
      stepFourValues: this.stepFourForm.value,
    });

    this.courseService
      .subscribeToCourse(this.courseId, subscribeCourseDTO)
      .subscribe({
        next: () => {
          this.router.navigate(['/student']);
        },
        error: ({ error }) => {
          alert(error.error);
        },
      });
  }
}
