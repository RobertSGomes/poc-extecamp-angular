import { ActivatedRoute } from '@angular/router';
import { UpdateCourseDTO } from './../../../../shared/dtos/update-course.dto';
import { CreateOfferingCostDTO } from './../../../../shared/dtos/create-offering-cost.dto';
import { CreateOfferingDTO } from './../../../../shared/dtos/create-offering.dto';
import { CourseService } from './../../../../shared/services/course.service';
import { CreateCourseDTO } from './../../../../shared/dtos/create-course.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorService } from '../../professor.service';
import { ProfessorModel } from '../../models/professor.model';
import { getUserId } from 'src/app/shared/utils/user-id.util';
import { AssignCoordinationDTO } from 'src/app/shared/dtos/assign-coordination.dto';
import { CreateOfferingCostTaxDTO } from 'src/app/shared/dtos/create-offering-cost-tax.dto';
import { CreateOfferingCostConditionDTO } from 'src/app/shared/dtos/create-offering-cost-condition.dto';
import { CourseModel } from 'src/app/shared/models/course.model';
import { UpdateOfferingDTO } from 'src/app/shared/dtos/update-offering.dto';
import { UpdateOfferingCostDTO } from 'src/app/shared/dtos/update-offering-cost.dto';
import { UpdateOfferingCostTaxDTO } from 'src/app/shared/dtos/update-offering-cost-tax.dto';
import { UpdateOfferingCostConditionDTO } from 'src/app/shared/dtos/update-offering-cost-condition.dto';
import { UpdateProfessorDTO } from 'src/app/shared/dtos/update-professor.dto';

@Component({
  selector: 'professor-new-offering',
  templateUrl: './professor-new-offering.component.html',
  styleUrls: ['./professor-new-offering.component.css'],
})
export class ProfessorNewOfferingComponent implements OnInit {
  professor?: ProfessorModel;
  professorId?: string;
  courseId?: string;
  course?: CourseModel;

  currentStep: number = 0;
  currentInsideStep: number = 0;
  modalCancelOpened = false;

  form?: FormGroup;

  constructor(
    private readonly professorService: ProfessorService,
    private readonly courseService: CourseService,
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  get stepOneFormOne() {
    return this.form?.get('stepOne')?.get('formOne') as FormGroup;
  }

  get stepOneFormTwo() {
    return this.form?.get('stepOne')?.get('formTwo') as FormGroup;
  }

  get stepOneFormThree() {
    return this.form?.get('stepOne')?.get('formThree') as FormGroup;
  }

  get stepOneFormFour() {
    return this.form?.get('stepOne')?.get('formFour') as FormGroup;
  }

  get stepOneFormFive() {
    return this.form?.get('stepOne')?.get('formFive') as FormGroup;
  }

  get stepTwoFormOne() {
    return this.form?.get('stepTwo')?.get('formOne') as FormGroup;
  }

  get stepThreeFormOne() {
    return this.form?.get('stepThree')?.get('formOne') as FormGroup;
  }

  get stepThreeFormTwo() {
    return this.form?.get('stepThree')?.get('formTwo') as FormGroup;
  }

  get stepThreeFormThree() {
    return this.form?.get('stepThree')?.get('formThree') as FormGroup;
  }

  get stepThreeFormFour() {
    return this.form?.get('stepThree')?.get('formFour') as FormGroup;
  }

  get stepFourFormOne() {
    return this.form?.get('stepFour')?.get('formOne') as FormGroup;
  }

  get stepFourFormTwo() {
    return this.form?.get('stepFour')?.get('formTwo') as FormGroup;
  }

  get stepFourFormThree() {
    return this.form?.get('stepFour')?.get('formThree') as FormGroup;
  }

  get stepFourFormFour() {
    return this.form?.get('stepFour')?.get('formFour') as FormGroup;
  }

  ngOnInit(): void {
    this.professorId = getUserId() as string;
    this.courseId =
      this.activatedRoute.snapshot.paramMap.get('course_id') ?? undefined;

    this.getProfessor();
    this.loadCourse();
  }

  loadCourse() {
    if (this.courseId) {
      this.courseService.getOne(this.courseId).subscribe({
        next: (response) => {
          this.course = response;
          this.loadForm(response);
        },
        error: () => {
          this.course = undefined;
          this.loadForm();
        },
      });
    } else {
      this.course = undefined;
      this.loadForm();
    }
  }

  loadForm(course?: CourseModel) {
    this.form = this.formBuilder.group({
      stepOne: this.formBuilder.group({
        formOne: this.formBuilder.group({
          sigla_tipo: [
            course && course.sigla ? course.sigla.split('-')[0] : '',
            [Validators.required],
          ],
          sigla_numero: [
            course && course.sigla ? course.sigla.split('-')[1] : '',
            [Validators.required],
          ],
          tipo: [(course && course.tipo) ?? '', [Validators.required]],
          nome: [(course && course.nome) ?? '', [Validators.required]],
          fluxo_continuo: [
            (course && course.fluxo_continuo) ?? false,
            [Validators.required],
          ],
          disciplina_eletiva: [
            (course && course.disciplina_eletiva) ?? false,
            [Validators.required],
          ],
          forma_realizacao: [
            (course && course.forma_realizacao) ?? '',
            [Validators.required],
          ],
          plataforma: [
            (course && course.plataforma) ?? '',
            [Validators.required],
          ],
          mensagem: [(course && course.mensagem) ?? ''],
          descricao: [
            (course && course.descricao) ?? '',
            [Validators.required, Validators.minLength, Validators.maxLength],
          ],
          unidade: [(course && course.unidade) ?? '', [Validators.required]],
          departamento: [
            (course && course.departamento) ?? '',
            [Validators.required],
          ],
        }),
        formTwo: this.formBuilder.group({
          palavras_chave: this.formBuilder.array([
            this.formBuilder.group({
              palavra_chave: [
                (course && course.palavras_chave[0]) ?? '',
                Validators.required,
              ],
            }),
            this.formBuilder.group({
              palavra_chave: [(course && course.palavras_chave[1]) ?? ''],
            }),
            this.formBuilder.group({
              palavra_chave: [(course && course.palavras_chave[2]) ?? ''],
            }),
            this.formBuilder.group({
              palavra_chave: [(course && course.palavras_chave[3]) ?? ''],
            }),
          ]),
          area_geral: [
            (course && course.area_geral) ?? '',
            [Validators.required],
          ],
          areas_tematicas: this.formBuilder.array([
            this.formBuilder.group({
              area_tematica: [
                (course && course.areas_tematicas[0]) ?? '',
                [Validators.required],
              ],
            }),
            this.formBuilder.group({
              area_tematica: [(course && course.areas_tematicas[1]) ?? ''],
            }),
          ]),
        }),
        formThree: this.formBuilder.group({
          carga_horaria_presencial_pratica: [
            (course && course.carga_horaria_presencial_pratica) ?? '',
          ],
          carga_horaria_presencial_teorica: [
            (course && course.carga_horaria_presencial_teorica) ?? '',
          ],
          carga_horaria_ead_pratica: [
            (course && course.carga_horaria_ead_pratica) ?? '',
          ],
          carga_horaria_ead_teorica: [
            (course && course.carga_horaria_ead_teorica) ?? '',
          ],
        }),
        formFour: this.formBuilder.group({
          ementa: [(course && course.ementa) ?? '', [Validators.maxLength]],
          bibliografia: [
            (course && course.bibliografia) ?? '',
            [Validators.required, Validators.minLength, Validators.maxLength],
          ],
          procedimentos: [
            (course && course.procedimentos) ?? '',
            [Validators.required, Validators.minLength, Validators.maxLength],
          ],
          objetivo: [
            (course && course.objetivo) ?? '',
            [Validators.required, Validators.minLength, Validators.maxLength],
          ],
          publico_alvo: [
            (course && course.publico_alvo) ?? '',
            [Validators.required, Validators.minLength, Validators.maxLength],
          ],
        }),
        formFive: this.formBuilder.group({
          frequencia_minima: [
            (course && course.frequencia_minima) ?? '',
            [Validators.required],
          ],
          nota_minima: [
            (course && course.nota_minima) ?? '',
            [Validators.required],
          ],
          grau_escolaridade: [
            (course && course.grau_escolaridade) ?? '',
            [Validators.required],
          ],
          divulgacao_corporativa: [
            (course && course.divulgacao_corporativa) ?? false,
          ],
        }),
      }),
      stepTwo: this.formBuilder.group({
        formOne: this.formBuilder.group({
          coordenador_id: [
            (course && course.coordenador) ?? '',
            [Validators.required],
          ],
          coordenador: [''],
          diretor_id: [(course && course.diretor) ?? '', [Validators.required]],
          diretor: [''],
          docente_responsavel_id: [
            (course && course.docente_responsavel?.id) ?? '',
            Validators.required,
          ],
          docente_responsavel: [''],
          docente_responsavel_email: ['', Validators.required],
          docente_responsavel_telefone: ['', Validators.required],
          docente_responsavel_instituicao: ['', Validators.required],
          docente_responsavel_titulacao: ['', Validators.required],
          docente_responsavel_carga_horaria_horas: [
            (course &&
              course.docente_responsavel?.carga_horaria.split('h')[0]) ??
              '',
            Validators.required,
          ],
          docente_responsavel_carga_horaria_minutos: [
            (course &&
              course.docente_responsavel?.carga_horaria
                .split('h')[1]
                .replace('min', '')) ??
              '',
            Validators.required,
          ],
        }),
      }),
      stepThree: this.formBuilder.group({
        formOne: this.formBuilder.group({
          divulgar_extecamp: [
            (course && course.oferecimento?.divulgar_extecamp) ?? false,
          ],
          explicacao: [
            (course && course.oferecimento?.explicacao) ?? '',
            Validators.maxLength,
          ],
          host: [(course && course.oferecimento?.host) ?? ''],
          pagina_facebook: [
            (course && course.oferecimento?.pagina_facebook) ?? '',
          ],
        }),
        formTwo: this.formBuilder.group({
          local: [
            (course && course.oferecimento?.inscricao?.local) ?? '',
            [Validators.required],
          ],
          telefone_secretaria_pais: ['+55 (XX) XXXX-XXXX'],
          telefone_secretaria: [
            (course && course.oferecimento?.inscricao?.telefone_secretaria) ??
              '',
            [Validators.required],
          ],
          telefone_informacoes_pais: ['+55 (XX) XXXX-XXXX'],
          telefone_informacoes: [
            (course && course.oferecimento?.inscricao?.telefone_informacoes) ??
              '',
          ],
          data_abertura: [
            (course && course.oferecimento?.inscricao?.data_abertura
              ? course.oferecimento?.inscricao?.data_abertura.substring(0, 10)
              : '') ?? '',
            [Validators.required],
          ],
          data_encerramento: [
            (course && course.oferecimento?.inscricao?.data_encerramento
              ? course.oferecimento?.inscricao?.data_encerramento.substring(
                  0,
                  10
                )
              : '') ?? '',
            [Validators.required],
          ],
          modelo: [
            (course && course.oferecimento?.inscricao?.modelo) ?? 'Basico',
          ],
        }),
        formThree: this.formBuilder.group({
          local: [
            (course && course.oferecimento?.local) ?? '',
            [Validators.required],
          ],
          uf: [
            (course && course.oferecimento?.uf) ?? '',
            [Validators.required],
          ],
          cidade: [
            (course && course.oferecimento?.cidade) ?? '',
            [Validators.required],
          ],
          dias_semana_horarios: [
            (course && course.oferecimento?.dias_semana_horarios) ?? '',
          ],
          data_inicio: [
            (course && course.oferecimento?.data_inicio
              ? course.oferecimento?.data_inicio.substring(0, 10)
              : '') ?? '',
          ],
          data_encerramento: [
            (course && course.oferecimento?.data_encerramento
              ? course.oferecimento?.data_encerramento.substring(0, 10)
              : '') ?? '',
          ],
          min_vagas: [
            (course && course.oferecimento?.min_vagas) ?? '',
            [Validators.required],
          ],
          max_vagas: [
            (course && course.oferecimento?.max_vagas) ?? '',
            [Validators.required],
          ],
        }),
        formFour: this.formBuilder.group({
          tem_criterios: [false],
        }),
      }),
      stepFour: this.formBuilder.group({
        formOne: this.formBuilder.group({
          fluxo_continuo: [
            (course &&
              course.oferecimento?.custos_oferecimento?.fluxo_continuo) ??
              false,
          ],
          professores_hora_aula: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.professores_hora_aula) ??
              '',
          ],
          professores_outras_atividades: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.professores_outras_atividades) ??
              '',
          ],
          material_consumo: [
            (course &&
              course.oferecimento?.custos_oferecimento?.material_consumo) ??
              '',
          ],
          material_permanente: [
            (course &&
              course.oferecimento?.custos_oferecimento?.material_permanente) ??
              '',
          ],
          servico_terceiros: [
            (course &&
              course.oferecimento?.custos_oferecimento?.servico_terceiros) ??
              '',
          ],
          outros_custos: [
            (course &&
              course.oferecimento?.custos_oferecimento?.outros_custos) ??
              '',
          ],
          aproveitamento_recursos: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.aproveitamento_recursos) ??
              '',
          ],
          total: [
            {
              value:
                (course && course.oferecimento?.custos_oferecimento?.total) ??
                '',
              disabled: true,
            },
          ],
        }),
        formTwo: this.formBuilder.group({
          fixas: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.fixas) ??
              '',
          ],
          aiu_unidade_porcentagem: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.aiu_unidade_porcentagem) ??
              '',
          ],
          aiu_unidade_valor: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.aiu_unidade_valor) ??
              '',
          ],
          fundo_extensao_porcentagem_away: [''],
          fundo_extensao_valor_away: [''],
          fundo_extensao_unidade: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.fundo_extensao_unidade) ??
              '',
          ],
          fundo_extensao_porcentagem: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.fundo_extensao_porcentagem) ??
              '',
          ],
          fundo_extensao_valor: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.fundo_extensao_valor) ??
              '',
          ],
          total: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.total) ??
              '',
          ],
          subsidios: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.subsidios) ??
              '',
          ],
          custo_total: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.custo_total) ??
              '',
          ],
          custo_aluno_min_vagas: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.custo_aluno_min_vagas) ??
              '',
          ],
          custo_aluno_valor: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.taxas_custos_oferecimento?.custo_aluno_valor) ??
              '',
          ],
        }),
        formThree: this.formBuilder.group({
          tipo: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.forma_pagamento?.tipo) ??
              '',
            [Validators.required],
          ],
          fonte: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.forma_pagamento?.fonte) ??
              '',
            [Validators.required],
          ],
          taxa_inscricao: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.forma_pagamento
                ?.taxa_inscricao) ??
              '',
          ],
        }),
        formFour: this.formBuilder.group({
          curso_gratuito: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.curso_gratuito) ??
              false,
          ],
          valor_a_vista: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.valor_a_vista) ??
              '',
            Validators.required,
          ],
          valor_a_vista_vencimento: [
            course &&
            course.oferecimento?.custos_oferecimento
              ?.condicoes_custos_oferecimento?.valor_a_vista_vencimento
              ? course.oferecimento?.custos_oferecimento?.condicoes_custos_oferecimento?.valor_a_vista_vencimento.substring(
                  0,
                  10
                )
              : '',
            Validators.required,
          ],
          parcelas_boleto: this.formBuilder.array(
            course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.parcelas_boleto
              ? course.oferecimento?.custos_oferecimento?.condicoes_custos_oferecimento?.parcelas_boleto.map(
                  (parcelaBoleto) => {
                    return this.formBuilder.group({
                      nmr_parcelas: [
                        parcelaBoleto.nmr_parcelas,
                        Validators.required,
                      ],
                      valor: [parcelaBoleto.valor, Validators.required],
                      data_vencimento: [
                        parcelaBoleto.data_vencimento.substring(0, 10),
                        [Validators.required],
                      ],
                    });
                  }
                )
              : []
          ),
          parcelas_cartao_credito: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.parcelas_cartao_credito) ??
              '',
          ],
          porcentagem_desconto_estudantes: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento
                ?.porcentagem_desconto_estudantes) ??
              '',
          ],
          opcao_desconto: this.formBuilder.array(
            course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.opcao_desconto
              ? course.oferecimento?.custos_oferecimento?.condicoes_custos_oferecimento?.opcao_desconto.map(
                  (opcao) => {
                    return this.formBuilder.group({
                      para: [opcao.para, Validators.required],
                      porcentagem_desconto: [
                        opcao.porcentagem_desconto,
                        Validators.required,
                      ],
                    });
                  }
                )
              : []
          ),
          convenio_numero_processo: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.convenio?.numero_processo) ??
              '',
          ],
          convenio_empresa: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.convenio?.empresa) ??
              '',
          ],
          convenio_cnpj: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.convenio?.cnpj) ??
              '',
          ],
          convenio_tipo: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.convenio?.tipo) ??
              '',
          ],
          convenio_responsavel: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.convenio?.responsavel) ??
              '',
          ],
          convenio_responsavel_cargo: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.convenio?.responsavel_cargo) ??
              '',
          ],
          convenio_sem_valor_parcela: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.convenio?.sem_valor_parcela) ??
              false,
          ],
          convenio_numero_parcelas: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.convenio?.numero_parcelas) ??
              '',
          ],
          recurso_valor: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.recurso?.valor) ??
              '',
          ],
          recurso_empresa: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.recurso?.empresa) ??
              '',
          ],
          empresa_nome: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.nome) ??
              '',
          ],
          empresa_endereco: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.endereco) ??
              '',
          ],
          empresa_bairro: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.bairro) ??
              '',
          ],
          empresa_cidade: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.cidade) ??
              '',
          ],
          empresa_cep: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.cep) ??
              '',
          ],
          empresa_cnpj: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.cnpj) ??
              '',
          ],
          empresa_ins_estadual: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.ins_estadual) ??
              '',
          ],
          empresa_nome_contato: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.nome_contato) ??
              '',
          ],
          empresa_telefone: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.telefone) ??
              '',
          ],
          empresa_fax: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.fax) ??
              '',
          ],
          empresa_email: [
            (course &&
              course.oferecimento?.custos_oferecimento
                ?.condicoes_custos_oferecimento?.empresa?.email) ??
              '',
            Validators.email,
          ],
        }),
      }),
    });
  }

  getProfessor(): void {
    this.professorService.getOne(this.professorId!).subscribe({
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

  handleCreateCourse(): void {
    if (this.courseId) {
      this.handleUpdateCourse();
    } else {
      const createCourseDTO = new CreateCourseDTO({
        stepOneFormOneValues: this.stepOneFormOne.value,
        stepOneFormTwoValues: this.stepOneFormTwo.value,
        stepOneFormThreeValues: this.stepOneFormThree.value,
        stepOneFormFourValues: this.stepOneFormFour.value,
        stepOneFormFiveValues: this.stepOneFormFive.value,
      });

      this.courseService.createCourse(createCourseDTO).subscribe({
        next: (response) => {
          this.courseId = response.id;

          this.nextStep();
        },
        error: () => {
          alert(
            'Não foi possível prosseguir, preencha todos os campos obrigatórios e tente novamente.'
          );
        },
      });
    }
  }

  handleUpdateCourse() {
    const updateCourseDTO = new UpdateCourseDTO({
      stepOneFormOneValues: this.stepOneFormOne.value,
      stepOneFormTwoValues: this.stepOneFormTwo.value,
      stepOneFormThreeValues: this.stepOneFormThree.value,
      stepOneFormFourValues: this.stepOneFormFour.value,
      stepOneFormFiveValues: this.stepOneFormFive.value,
    });

    this.courseService.updateCourse(this.courseId!, updateCourseDTO).subscribe({
      next: () => {
        this.nextStep();
      },
      error: () => {
        alert(
          'Não foi possível prosseguir, preencha todos os campos obrigatórios e tente novamente.'
        );
      },
    });
  }

  handleAssignCoordination() {
    const assignCoordinationDTO = new AssignCoordinationDTO(
      this.stepTwoFormOne.value
    );

    this.courseService
      .assignCoordination(this.courseId!, assignCoordinationDTO)
      .subscribe({
        next: () => {
          this.nextInsideStep();
        },
        error: () => {
          alert(
            'Não foi possível prosseguir, preencha todos os campos obrigatórios e tente novamente.'
          );
        },
      });
  }

  handleCreateOffering() {
    if (this.course?.oferecimento) {
      this.handleUpdateOffering();
    } else {
      const createOfferingDTO = new CreateOfferingDTO({
        stepThreeFormOneValues: this.stepThreeFormOne.value,
        stepThreeFormTwoValues: this.stepThreeFormTwo.value,
        stepThreeFormThreeValues: this.stepThreeFormThree.value,
        stepThreeFormFourValues: this.stepThreeFormFour.value,
      });

      this.courseService
        .createOffering(this.courseId!, createOfferingDTO)
        .subscribe({
          next: () => {
            this.nextStep();
          },
          error: ({ error }) => {
            alert(error.error);
          },
        });
    }
  }

  handleUpdateOffering() {
    const updateOfferingDTO = new UpdateOfferingDTO({
      stepThreeFormOneValues: this.stepThreeFormOne.value,
      stepThreeFormTwoValues: this.stepThreeFormTwo.value,
      stepThreeFormThreeValues: this.stepThreeFormThree.value,
      stepThreeFormFourValues: this.stepThreeFormFour.value,
      stepFiveFormOneValues: { assinatura_status: 'Pendente' },
    });

    this.courseService
      .updateOffering(this.courseId!, updateOfferingDTO)
      .subscribe({
        next: () => {
          this.nextStep();
        },
        error: ({ error }) => {
          alert(error.error);
        },
      });
  }

  handleCreateOfferingCost() {
    if (this.course?.oferecimento?.custos_oferecimento) {
      this.handleUpdateOfferingCost();
    } else {
      const createOfferingCostDTO = new CreateOfferingCostDTO({
        total: this.stepFourFormOne.controls['total']?.value,
        ...this.stepFourFormOne.value,
      });

      this.courseService
        .createOfferingCost(this.courseId!, createOfferingCostDTO)
        .subscribe({
          next: () => {
            this.nextInsideStep();
          },
          error: ({ error }) => {
            alert(error.error);
          },
        });
    }
  }

  handleUpdateOfferingCost() {
    console.log(this.stepFourFormOne);

    const updateOfferingCostDTO = new UpdateOfferingCostDTO({
      stepFourFormOneValues: {
        total: this.stepFourFormOne.controls['total']?.value,
        ...this.stepFourFormOne.value,
      },
      stepFiveFormOneValues: { assinatura_status: 'Pendente' },
    });

    this.courseService
      .updateOfferingCost(this.courseId!, updateOfferingCostDTO)
      .subscribe({
        next: () => {
          this.nextInsideStep();
        },
        error: ({ error }) => {
          alert(error.error);
        },
      });
  }

  handleCreateOfferingCostTax() {
    if (
      this.course?.oferecimento?.custos_oferecimento?.taxas_custos_oferecimento
    ) {
      this.handleUpdateOfferingCostTax();
    } else {
      const createOfferingCostTaxDTO = new CreateOfferingCostTaxDTO(
        this.stepFourFormTwo.value
      );

      this.courseService
        .createOfferingCostTax(this.courseId!, createOfferingCostTaxDTO)
        .subscribe({
          next: () => {
            this.nextInsideStep();
          },
          error: ({ error }) => {
            alert(error.error);
          },
        });
    }
  }

  handleUpdateOfferingCostTax() {
    const updateOfferingCostTaxDTO = new UpdateOfferingCostTaxDTO(
      this.stepFourFormTwo.value
    );

    this.courseService
      .updateOfferingCostTax(this.courseId!, updateOfferingCostTaxDTO)
      .subscribe({
        next: () => {
          this.nextInsideStep();
        },
        error: ({ error }) => {
          alert(error.error);
        },
      });
  }

  handleCreateOfferingCostCondition() {
    if (
      this.course?.oferecimento?.custos_oferecimento
        ?.condicoes_custos_oferecimento
    ) {
      this.handleUpdateOfferingCostCondition();
    } else {
      const createOfferingCostConditionDTO = new CreateOfferingCostConditionDTO(
        {
          stepFourFormThreeValues: this.stepFourFormThree.value,
          stepFourFormFourValues: this.stepFourFormFour.value,
        }
      );

      this.courseService
        .createOfferingCostCondition(
          this.courseId!,
          createOfferingCostConditionDTO
        )
        .subscribe({
          next: () => {
            this.nextStep();
          },
          error: ({ error }) => {
            alert(error.error);
          },
        });
    }
  }

  handleUpdateOfferingCostCondition() {
    const updateOfferingCostConditionDTO = new UpdateOfferingCostConditionDTO({
      stepFourFormThreeValues: this.stepFourFormThree.value,
      stepFourFormFourValues: this.stepFourFormFour.value,
    });

    this.courseService
      .updateOfferingCostCondition(
        this.courseId!,
        updateOfferingCostConditionDTO
      )
      .subscribe({
        next: () => {
          this.nextStep();
        },
        error: ({ error }) => {
          alert(error.error);
        },
      });
  }

  handleUpdateProfessor({
    professorId,
    professorData,
  }: {
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
  }) {
    const updateProfessorDTO = new UpdateProfessorDTO(professorData);

    this.professorService.update(professorId, updateProfessorDTO).subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
