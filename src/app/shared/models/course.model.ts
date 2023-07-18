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
  alunos: any[];
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
  parametros: any[];
  documentos_extras: any[];
  curso_parceria: any[];
  created_at: string;
  updated_at: string;
  inscricao?: InscricaoModel | null;
  custos_oferecimento?: CustosOferecimentoModel | null;
}

export interface InscricaoModel {
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

export interface CustosOferecimentoModel {
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
  taxas_custos_oferecimento?: TaxasCustosOferecimentos | null;
  condicoes_custos_oferecimento?: any | null;
}

export interface TaxasCustosOferecimentos {
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
