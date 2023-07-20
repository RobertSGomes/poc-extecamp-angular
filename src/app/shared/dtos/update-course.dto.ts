type IStepOneFormOne = {
  sigla_tipo: string;
  sigla_numero: string;
  tipo: string;
  nome: string;
  fluxo_continuo: boolean;
  disciplina_eletiva: boolean;
  forma_realizacao: string;
  plataforma: string;
  mensagem: string;
  descricao: string;
  unidade: string;
  departamento: string;
};

type IStepOneFormTwo = {
  palavras_chave: Array<{ palavra_chave: string }>;
  area_geral: string;
  areas_tematicas: Array<{ area_tematica: string }>;
};

type IStepOneFormThree = {
  carga_horaria_presencial_pratica: string;
  carga_horaria_presencial_teorica: string;
  carga_horaria_ead_pratica: string;
  carga_horaria_ead_teorica: string;
};

type IStepOneFormFour = {
  ementa: string;
  bibliografia: string;
  procedimentos: string;
  objetivo: string;
  publico_alvo: string;
};

type IStepOneFormFive = {
  frequencia_minima: string;
  nota_minima: string;
  grau_escolaridade: string;
  divulgacao_corporativa: boolean;
};

export class UpdateCourseDTO {
  curso_status?: 'Incompleta' | 'Pendente' | 'Andamento';
  sigla?: string;
  nome?: string;
  tipo?: string;
  fluxo_continuo?: boolean;
  disciplina_eletiva?: boolean;
  forma_realizacao?: string;
  plataforma?: string;
  mensagem?: string;
  descricao?: string;
  unidade?: string;
  departamento?: string;
  palavras_chave?: string[];
  area_geral?: string;
  areas_tematicas?: string[];
  carga_horaria_presencial_pratica?: string;
  carga_horaria_presencial_teorica?: string;
  carga_horaria_ead_pratica?: string;
  carga_horaria_ead_teorica?: string;
  ementa?: string;
  bibliografia?: string;
  procedimentos?: string;
  objetivo?: string;
  publico_alvo?: string;
  frequencia_minima?: number;
  nota_minima?: number;
  grau_escolaridade?: string;
  divulgacao_corporativa?: boolean;

  constructor({
    stepOneFormOneValues,
    stepOneFormTwoValues,
    stepOneFormThreeValues,
    stepOneFormFourValues,
    stepOneFormFiveValues,
    curso_status,
  }: {
    stepOneFormOneValues?: IStepOneFormOne;
    stepOneFormTwoValues?: IStepOneFormTwo;
    stepOneFormThreeValues?: IStepOneFormThree;
    stepOneFormFourValues?: IStepOneFormFour;
    stepOneFormFiveValues?: IStepOneFormFive;
    curso_status?: 'Incompleta' | 'Pendente' | 'Andamento';
  }) {
    if (stepOneFormOneValues) {
      this.sigla = `${stepOneFormOneValues.sigla_tipo}-${stepOneFormOneValues.sigla_numero}`;
      this.nome = stepOneFormOneValues.nome;
      this.tipo = stepOneFormOneValues.tipo;
      this.fluxo_continuo = stepOneFormOneValues.fluxo_continuo;
      this.disciplina_eletiva = stepOneFormOneValues.disciplina_eletiva;
      this.forma_realizacao = stepOneFormOneValues.forma_realizacao;
      this.plataforma = stepOneFormOneValues.plataforma;
      this.mensagem = stepOneFormOneValues.mensagem || undefined;
      this.descricao = stepOneFormOneValues.descricao;
      this.unidade = stepOneFormOneValues.unidade;
      this.departamento = stepOneFormOneValues.departamento;
    }

    if (stepOneFormTwoValues) {
      this.palavras_chave = stepOneFormTwoValues.palavras_chave
        .filter((item) => item.palavra_chave !== '')
        .map((item) => item.palavra_chave);
      this.area_geral = stepOneFormTwoValues.area_geral;
      this.areas_tematicas = stepOneFormTwoValues.areas_tematicas
        .filter((item) => item.area_tematica !== '')
        .map((item) => item.area_tematica);
    }

    if (stepOneFormThreeValues) {
      this.carga_horaria_presencial_pratica =
        stepOneFormThreeValues.carga_horaria_presencial_pratica || undefined;
      this.carga_horaria_presencial_teorica =
        stepOneFormThreeValues.carga_horaria_presencial_teorica || undefined;
      this.carga_horaria_ead_pratica =
        stepOneFormThreeValues.carga_horaria_ead_pratica || undefined;
      this.carga_horaria_ead_teorica =
        stepOneFormThreeValues.carga_horaria_ead_teorica || undefined;
    }

    if (stepOneFormFourValues) {
      this.ementa = stepOneFormFourValues.ementa || undefined;
      this.bibliografia = stepOneFormFourValues.bibliografia;
      this.procedimentos = stepOneFormFourValues.procedimentos;
      this.objetivo = stepOneFormFourValues.objetivo;
      this.publico_alvo = stepOneFormFourValues.publico_alvo;
    }

    if (stepOneFormFiveValues) {
      this.frequencia_minima = Number(stepOneFormFiveValues.frequencia_minima);
      this.nota_minima = Number(stepOneFormFiveValues.nota_minima);
      this.grau_escolaridade = stepOneFormFiveValues.grau_escolaridade;
      this.divulgacao_corporativa =
        stepOneFormFiveValues.divulgacao_corporativa;
    }

    this.curso_status = curso_status || undefined;
  }
}
