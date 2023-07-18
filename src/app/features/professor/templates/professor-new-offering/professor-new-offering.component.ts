import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from '../../professor.service';
import { ProfessorModel } from '../../models/professor.model';
import { getUserId } from 'src/app/shared/utils/user-id.util';

@Component({
  selector: 'professor-new-offering',
  templateUrl: './professor-new-offering.component.html',
  styleUrls: ['./professor-new-offering.component.css'],
})
export class ProfessorNewOfferingComponent implements OnInit {
  professor?: ProfessorModel;
  professorId: string | null = getUserId();

  currentStep: number = 1;
  currentInsideStep: number = 4;
  modalCancelOpened = false;

  stepOneFormOne!: FormGroup;
  stepOneFormTwo!: FormGroup;
  stepOneFormThree!: FormGroup;
  stepOneFormFour!: FormGroup;
  stepOneFormFive!: FormGroup;

  stepTwoFormOne!: FormGroup;

  stepThreeFormOne!: FormGroup;
  stepThreeFormTwo!: FormGroup;
  stepThreeFormThree!: FormGroup;
  stepThreeFormFour!: FormGroup;

  stepFourFormOne!: FormGroup;
  stepFourFormTwo!: FormGroup;
  stepFourFormThree!: FormGroup;
  stepFourFormFour!: FormGroup;

  constructor(
    private readonly professorService: ProfessorService,
    private readonly formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProfessor();

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

    this.stepTwoFormOne = this.formBuilder.group({
      coordenador_id: ['', [Validators.required]],
      coordenador: [''],
      diretor_id: ['', [Validators.required]],
      diretor: [''],
      docente_responsavel_id: ['', Validators.required],
      docente_responsavel: [''],
      docente_responsavel_email: ['', Validators.required],
      docente_responsavel_telefone: ['', Validators.required],
      docente_responsavel_instituicao: ['', Validators.required],
      docente_responsavel_titulacao: ['', Validators.required],
      docente_responsavel_carga_horaria_horas: ['', Validators.required],
      docente_responsavel_carga_horaria_minutos: ['', Validators.required],
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

    this.stepFourFormOne = this.formBuilder.group({
      fluxo_continuo: [false],
      professores_hora_aula: [''],
      professores_outras_atividades: [''],
      material_consumo: [''],
      material_permanente: [''],
      servico_terceiros: [''],
      outros_custos: [''],
      aproveitamento_recursos: [''],
      total: [''],
    });

    this.stepFourFormTwo = this.formBuilder.group({
      fixas: [''],
      aiu_unidade_porcentagem: [''],
      aiu_unidade_valor: [''],
      fundo_extensao_porcentagem_away: [''],
      fundo_extensao_valor_away: [''],
      fundo_extensao_unidade: [''],
      fundo_extensao_porcentagem: [''],
      fundo_extensao_valor: [''],
      total: [''],
      subsidios: [''],
      custo_total: [''],
      custo_aluno_min_vagas: [''],
      custo_aluno_valor: [''],
    });

    this.stepFourFormThree = this.formBuilder.group({
      tipo: ['', [Validators.required]],
      fonte: ['', [Validators.required]],
      taxa_inscricao: [''],
    });

    this.stepFourFormFour = this.formBuilder.group({
      curso_gratuito: [false],
      valor_a_vista: [''],
      valor_a_vista_vencimento: [''],
      parcelas_boleto: this.formBuilder.array([]),
      parcelas_cartao_credito: [''],
      porcentagem_desconto_estudantes: [''],
      opcao_desconto: this.formBuilder.array([]),
      convenio_numero_processo: [''],
      convenio_empresa: [''],
      convenio_cnpj: [''],
      convenio_tipo: [''],
      convenio_responsavel: [''],
      convenio_responsavel_cargo: [''],
      convenio_sem_valor_parcela: [false],
      convenio_numero_parcelas: [''],
      recurso_valor: [''],
      recurso_empresa: [''],
      empresa_nome: [''],
      empresa_endereco: [''],
      empresa_bairro: [''],
      empresa_cidade: [''],
      empresa_cep: [''],
      empresa_cnpj: [''],
      empresa_ins_estadual: [''],
      empresa_nome_contato: [''],
      empresa_telefone: [''],
      empresa_fax: [''],
      empresa_email: ['', Validators.email],
    });
  }

  getProfessor(): void {
    this.professorService.getOne(this.professorId).subscribe({
      next: (response) => {
        this.professor = response;
      },
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
