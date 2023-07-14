import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'professor-new-offering',
  templateUrl: './professor-new-offering.component.html',
  styleUrls: ['./professor-new-offering.component.css'],
})
export class ProfessorNewOfferingComponent implements OnInit {
  currentStep: number = 0;
  currentInsideStep: number = 0;
  modalCancelOpened = false;

  stepOneFormOne!: FormGroup;
  stepOneFormTwo!: FormGroup;
  stepOneFormThree!: FormGroup;
  stepOneFormFour!: FormGroup;
  stepOneFormFive!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.stepOneFormOne = this.formBuilder.group({
      sigla_tipo: ['', [Validators.required]],
      sigla_numero: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      fluxo_continuo: [false, [Validators.required]],
      disciplina_eletiva: [false, [Validators.required]],
      forma_realizacao: ['', [Validators.required]],
      plataforma: ['', [Validators.required]],
      mensagem: [''],
      descricao: [
        '',
        [Validators.required, Validators.minLength, Validators.maxLength],
      ],
      unidade: ['', [Validators.required]],
      departamento: ['', [Validators.required]],
    });

    this.stepOneFormTwo = this.formBuilder.group({
      palavras_chave: this.formBuilder.array([
        this.formBuilder.group({
          palavra_chave: ['', Validators.required],
        }),
        this.formBuilder.group({
          palavra_chave: [''],
        }),
        this.formBuilder.group({
          palavra_chave: [''],
        }),
        this.formBuilder.group({
          palavra_chave: [''],
        }),
      ]),
      area_geral: ['', [Validators.required]],
      areas_tematicas: this.formBuilder.array([
        this.formBuilder.group({
          area_tematica: ['', [Validators.required]],
        }),
        this.formBuilder.group({
          area_tematica: [''],
        }),
      ]),
    });

    this.stepOneFormThree = this.formBuilder.group({
      carga_horaria_presencial_pratica: [''],
      carga_horaria_presencial_teorica: [''],
      carga_horaria_ead_pratica: [''],
      carga_horaria_ead_teorica: [''],
    });

    this.stepOneFormFour = this.formBuilder.group({
      ementa: ['', [Validators.maxLength]],
      bibliografia: [
        '',
        [Validators.required, Validators.minLength, Validators.maxLength],
      ],
      procedimentos: [
        '',
        [Validators.required, Validators.minLength, Validators.maxLength],
      ],
      objetivo: [
        '',
        [Validators.required, Validators.minLength, Validators.maxLength],
      ],
      publico_alvo: [
        '',
        [Validators.required, Validators.minLength, Validators.maxLength],
      ],
    });

    this.stepOneFormFive = this.formBuilder.group({
      frequencia_minima: ['', [Validators.required]],
      nota_minima: ['', [Validators.required]],
      grau_escolaridade: ['', [Validators.required]],
      divulgacao_corporativa: [false],
    });
  }

  backInsideStep(): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.currentInsideStep--;
  }

  nextInsideStep(): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.currentInsideStep++;
  }

  nextStep(): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.currentStep++;
    this.currentInsideStep = 0;
  }

  backStep(insideStep: number): void {
    document.querySelector('#form-section')!.scrollTo(0, 0);
    this.currentStep--;
    this.currentInsideStep = insideStep;
  }

  openCancelModal(): void {
    this.modalCancelOpened = true;
  }

  handleSubmit(): void {
    console.log('Criarei o curso');
  }
}
