import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'professor-new-offering',
  templateUrl: './professor-new-offering.component.html',
  styleUrls: ['./professor-new-offering.component.css'],
})
export class ProfessorNewOfferingComponent implements OnInit {
  currentStep: number = 2;
  currentInsideStep: number = 3;
  modalCancelOpened = false;

  stepOneFormOne!: FormGroup;
  stepOneFormTwo!: FormGroup;
  stepOneFormThree!: FormGroup;
  stepOneFormFour!: FormGroup;
  stepOneFormFive!: FormGroup;

  // TODO: STEP TWO

  stepThreeFormOne!: FormGroup;
  stepThreeFormTwo!: FormGroup;
  stepThreeFormThree!: FormGroup;
  stepThreeFormFour!: FormGroup;

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

    this.stepThreeFormOne = this.formBuilder.group({
      divulgar_extecamp: [false],
      explicacao: ['', Validators.maxLength],
      host: [''],
      pagina_facebook: [''],
    });

    this.stepThreeFormTwo = this.formBuilder.group({
      local: ['', [Validators.required]],
      telefone_secretaria_pais: ['+55 (XX) XXXX-XXXX'],
      telefone_secretaria: ['', [Validators.required]],
      telefone_informacoes_pais: ['+55 (XX) XXXX-XXXX'],
      telefone_informacoes: [''],
      data_abertura: ['', [Validators.required]],
      data_encerramento: ['', [Validators.required]],
      modelo: ['Basico'],
    });

    this.stepThreeFormThree = this.formBuilder.group({
      local: ['', [Validators.required]],
      uf: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      dias_semana_horarios: [''],
      data_inicio: [''],
      data_encerramento: [''],
      min_vagas: ['', [Validators.required]],
      max_vagas: ['', [Validators.required]],
    });

    this.stepThreeFormFour = this.formBuilder.group({
      tem_criterios: [false],
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
