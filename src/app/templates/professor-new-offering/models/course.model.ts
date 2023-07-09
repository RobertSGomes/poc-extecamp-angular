export class CourseModel {
  sigla: string = '';
  nome: string = '';
  tipo: string = '';
  fluxo_continuo: boolean = false;
  disciplina_eletiva: boolean = false;
  forma_realizacao: string = '';
  plataforma: string = '';
  mensagem?: string;
  descricao: string = '';
  unidade: string = '';
  departamento: string = '';
  palavras_chave: string[] = ['', '', '', ''];
  area_geral: string = '';
  areas_tematicas: string[] = ['', ''];
  carga_horaria_presencial_pratica?: string;
  carga_horaria_presencial_teorica?: string;
  carga_horaria_ead_pratica?: string;
  carga_horaria_ead_teorica?: string;
  ementa?: string;
  bibliografia: string = '';
  procedimentos: string = '';
  objetivo: string = '';
  publico_alvo: string = '';
  frequencia_minima: number = 0;
  nota_minima: number = 0;
  grau_escolaridade: string = '';
  divulgacao_corporativa: boolean = false;
}
