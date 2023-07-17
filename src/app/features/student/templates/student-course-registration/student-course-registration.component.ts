import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { getUserId } from '../../../../../app/shared/utils/user-id.util';
import { StudentService } from '../../student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'student-course-registration',
  templateUrl: './student-course-registration.component.html',
  styleUrls: ['./student-course-registration.component.css'],
})
export class StudentCourseRegistrationComponent implements OnInit {
  currentStep: number = 0;

  student!: StudentModel;
  form!: FormGroup;

  constructor(
    private readonly studentService: StudentService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.studentService.getOne(getUserId()).subscribe(
      (data) => {
        this.student = data;
        this.createForm(data);
      },
      () => {
        this.router.navigate(['']);
      }
    );
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
    });
  }

  get stepOneForm() {
    return this.form.get('step1') as FormGroup;
  }

  get stepTwoForm() {
    return this.form.get('step2') as FormGroup;
  }

  nextStep(): void {
    document.querySelector('#form-student')!.scrollTo(0, 0);
    this.currentStep++;
  }

  backStep(): void {
    document.querySelector('#form-student')!.scrollTo(0, 0);
    this.currentStep--;
  }
}
