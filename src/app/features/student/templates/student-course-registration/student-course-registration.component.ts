import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../models/student.model';
import { getUserId } from '../../../../../app/shared/utils/user-id.util';
import { StudentService } from '../../student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'student-course-registration',
  templateUrl: './student-course-registration.component.html',
  styleUrls: ['./student-course-registration.component.css'],
})
export class StudentCourseRegistrationComponent implements OnInit {
  currentStep: number = 0;

  studentId?: string | null;
  student?: StudentModel;

  stepOneForm!: FormGroup;
  stepTwoForm!: FormGroup;

  constructor(
    private readonly studentService: StudentService,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit(): Promise<void> {
    this.loadForms();

    const student = this.studentService.getOne(getUserId());

    this.student = student;
    this.fillInputs();
  }

  loadForms() {
    this.stepOneForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      documento_identificacao_tipo: ['', [Validators.required]],
      documento_identificacao_numero: ['', [Validators.required]],
      documento_identificacao_orgao_emissor: ['', [Validators.required]],
      documento_identificacao_estado_emissor: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      data_nascimento: ['', [Validators.required]],
      naturalidade_pais: ['', [Validators.required]],
      naturalidade_estado: ['', [Validators.required]],
      naturalidade_cidade: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      possui_deficiencia: [false, [Validators.required]],
      deficiencia: [''],
    });

    this.stepTwoForm = this.formBuilder.group({
      cep: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      complemento: [''],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      pais: ['', [Validators.required]],
    });
  }

  fillInputs() {
    // Fill stepOneFormInputs
    this.setInputValue(this.stepOneForm, 'nome', this.student?.nome);
    this.setInputValue(this.stepOneForm, 'email', this.student?.email);
    this.setInputValue(this.stepOneForm, 'telefone', this.student?.telefone);
    this.setInputValue(
      this.stepOneForm,
      'documento_identificacao_tipo',
      this.student?.documento_identificacao.tipo
    );
    this.setInputValue(
      this.stepOneForm,
      'documento_identificacao_numero',
      this.student?.documento_identificacao.numero
    );
    this.setInputValue(
      this.stepOneForm,
      'documento_identificacao_orgao_emissor',
      this.student?.documento_identificacao.orgao_emissor
    );
    this.setInputValue(
      this.stepOneForm,
      'documento_identificacao_estado_emissor',
      this.student?.documento_identificacao.uf_emissao
    );
    this.setInputValue(this.stepOneForm, 'cpf', this.student?.cpf);
    this.setInputValue(
      this.stepOneForm,
      'data_nascimento',
      this.student?.data_nascimento.substring(0, 10)
    );
    this.setInputValue(
      this.stepOneForm,
      'naturalidade_pais',
      this.student?.naturalidade.pais
    );
    this.setInputValue(
      this.stepOneForm,
      'naturalidade_estado',
      this.student?.naturalidade.estado
    );
    this.setInputValue(
      this.stepOneForm,
      'naturalidade_cidade',
      this.student?.naturalidade.cidade
    );
    this.setInputValue(this.stepOneForm, 'genero', this.student?.genero);
    this.setInputValue(
      this.stepOneForm,
      'estado_civil',
      this.student?.estado_civil
    );
    this.setInputValue(
      this.stepOneForm,
      'possui_deficiencia',
      this.student?.possui_deficiencia
    );
    this.setInputValue(
      this.stepOneForm,
      'deficiencia',
      this.student?.tipo_deficiencia
    );

    // Fill stepTwoFormInputs
    this.setInputValue(this.stepTwoForm, 'cep', this.student?.endereco.cep);
    this.setInputValue(
      this.stepTwoForm,
      'logradouro',
      this.student?.endereco.logradouro
    );
    this.setInputValue(
      this.stepTwoForm,
      'numero',
      this.student?.endereco.numero
    );
    this.setInputValue(
      this.stepTwoForm,
      'bairro',
      this.student?.endereco.bairro
    );
    this.setInputValue(
      this.stepTwoForm,
      'complemento',
      this.student?.endereco.complemento
    );
    this.setInputValue(
      this.stepTwoForm,
      'estado',
      this.student?.endereco.estado
    );
    this.setInputValue(
      this.stepTwoForm,
      'cidade',
      this.student?.endereco.cidade
    );
    this.setInputValue(
      this.stepTwoForm,
      'pais',
      this.student?.endereco.pais_residencia
    );
  }

  setInputValue(form: FormGroup<any>, input: string, value: any) {
    if (value) {
      form.get(input)?.setValue(value);
    }
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
