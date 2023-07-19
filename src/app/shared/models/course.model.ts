export interface CourseModel {
  id: string;
  curso_status: string;
  sigla: string;
  nome: string;
  tipo: string;
  fluxo_continuo: boolean;
  disciplina_eletiva: boolean;
  forma_realizacao: string;
  plataforma: string;
  mensagem: string;
  descricao: string;
  unidade: string;
  departamento: string;
  palavras_chave: string[];
  area_geral: string;
  areas_tematicas: string[];
  carga_horaria_presencial_pratica: string;
  carga_horaria_presencial_teorica: string;
  carga_horaria_ead_pratica: string;
  carga_horaria_ead_teorica: string;
  ementa: string;
  bibliografia: string;
  procedimentos: string;
  objetivo: string;
  publico_alvo: string;
  frequencia_minima: number;
  nota_minima: number;
  grau_escolaridade: string;
  divulgacao_corporativa: boolean;
  diretor: any;
  coordenador: any;
  docente_responsavel: any;
  docentes_unicamp: any[];
  docentes_vinculo: any[];
  docentes_sem_vinculo: any[];
  palestrantes: any[];
  alunos: {
    id: string;
    termo_compromisso_assinado: boolean;
    documentos_upload: boolean;
    cpf_upload: boolean;
    declaracao_upload: boolean;
  }[];
  oferecimento?: OfferingModel | null;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface OfferingModel {
  id: string;
  curso_id: string;
  assinatura_status: string;
  divulgar_extecamp: boolean;
  explicacao: string;
  host: string;
  pagina_facebook: string;
  local: string;
  uf: string;
  cidade: string;
  dias_semana_horarios: string;
  data_inicio: string;
  data_encerramento: string;
  min_vagas: number;
  max_vagas: number;
  tem_criterios: boolean;
  parametros?: string[];
  documentos_extras?: string[];
  curso_parceria?: string[];
  created_at: string;
  updated_at: string;
  inscricao?: SubscriptionModel | null;
  custos_oferecimento?: OfferingCostModel | null;
}

export interface SubscriptionModel {
  id: string;
  oferecimento_id: string;
  local: string;
  telefone_secretaria: string;
  telefone_informacoes: any;
  data_abertura: string;
  data_encerramento: string;
  modelo: string;
  created_at: string;
  updated_at: string;
}

export interface OfferingCostModel {
  id: string;
  oferecimento_id: string;
  assinatura_status: string;
  fluxo_continuo: boolean;
  professores_hora_aula: number;
  professores_outras_atividades: number;
  material_consumo: number;
  material_permanente: number;
  servico_terceiros: number;
  outros_custos: number;
  aproveitamento_recursos: number;
  total: number;
  created_at: string;
  updated_at: string;
  taxas_custos_oferecimento?: OfferingCostTaxModel | null;
  condicoes_custos_oferecimento?: OfferingCostConditionModel | null;
}

export interface OfferingCostTaxModel {
  id: string;
  custos_oferecimento_id: string;
  fixas: number;
  aiu_unidade_porcentagem: number;
  aiu_unidade_valor: number;
  fundo_extencao_unidade: string | null;
  fundo_extencao_porcentagem: number;
  fundo_extencao_valor: number;
  total: number;
  subsidios: number;
  custo_total: number;
  custo_aluno_min_vagas: number;
  custo_aluno_valor: number;
  created_at: string;
  updated_at: string;
}

export interface OfferingCostConditionModel {
  id: string;
  custos_oferecimento_id: string;
  forma_pagamento: { tipo: string; fonte: string; taxa_inscricao: number };
  curso_gratuito: boolean;
  valor_a_vista: number;
  valor_a_vista_vencimento: string;
  parcelas_boleto: Array<{
    valor: number;
    nmr_parcelas: number;
    data_vencimento: string;
  }>;
  parcelas_cartao_credito: number;
  porcentagem_desconto_estudantes: number;
  opcao_desconto: Array<{ para: string; porcentagem_desconto: number }>;
  convenio: {
    numero_processo?: string;
    empresa?: string;
    cnpj?: string;
    tipo?: string;
    responsavel?: string;
    responsavel_cargo?: string;
    sem_valor_parcela?: boolean;
    numero_parcelas?: number;
  };
  recurso: { valor?: number; empresa?: string };
  empresa: {
    nome?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    cep?: string;
    cnpj?: string;
    ins_estadual?: string;
    nome_contato?: string;
    telefone?: string;
    fax?: string;
    email?: string;
  };
  created_at: string;
  updated_at: string;
}
