type IStepThreeFormOne = {
  divulgar_extecamp: boolean;
  explicacao: string;
  host: string;
  pagina_facebook: string;
};

type IStepThreeFormTwo = {
  local: string;
  telefone_secretaria_pais: string;
  telefone_secretaria: string;
  telefone_informacoes_pais: string;
  telefone_informacoes: string;
  data_abertura: string;
  data_encerramento: string;
  modelo: 'Basico' | 'Completo';
};

type IStepThreeFormThree = {
  local: string;
  uf: string;
  cidade: string;
  dias_semana_horarios: string;
  data_inicio: string;
  data_encerramento: string;
  min_vagas: string;
  max_vagas: string;
};

type IStepThreeFormFour = {
  tem_criterios: boolean;
};

export class CreateOfferingDTO {
  divulgar_extecamp: boolean;
  explicacao?: string;
  host?: string;
  pagina_facebook?: string;
  inscricao: {
    local: string;
    telefone_secretaria: string;
    telefone_informacoes?: string;
    data_abertura: string;
    data_encerramento: string;
    modelo: 'Basico' | 'Completo';
  };
  local: string;
  uf: string;
  cidade: string;
  dias_semana_horarios?: string;
  data_inicio?: string;
  data_encerramento?: string;
  min_vagas: number;
  max_vagas: number;
  tem_criterios: boolean;

  constructor({
    stepThreeFormOneValues,
    stepThreeFormTwoValues,
    stepThreeFormThreeValues,
    stepThreeFormFourValues,
  }: {
    stepThreeFormOneValues: IStepThreeFormOne;
    stepThreeFormTwoValues: IStepThreeFormTwo;
    stepThreeFormThreeValues: IStepThreeFormThree;
    stepThreeFormFourValues: IStepThreeFormFour;
  }) {
    this.divulgar_extecamp = stepThreeFormOneValues.divulgar_extecamp;
    this.explicacao = stepThreeFormOneValues.explicacao || undefined;
    this.host = stepThreeFormOneValues.host || undefined;
    this.pagina_facebook = stepThreeFormOneValues.pagina_facebook || undefined;
    this.inscricao = {
      local: stepThreeFormTwoValues.local,
      telefone_secretaria: stepThreeFormTwoValues.telefone_secretaria,
      telefone_informacoes:
        stepThreeFormTwoValues.telefone_informacoes || undefined,
      data_abertura: new Date(
        stepThreeFormTwoValues.data_abertura
      ).toISOString(),
      data_encerramento: new Date(
        stepThreeFormTwoValues.data_encerramento
      ).toISOString(),
      modelo: stepThreeFormTwoValues.modelo,
    };
    this.local = stepThreeFormThreeValues.local;
    this.uf = stepThreeFormThreeValues.uf;
    this.cidade = stepThreeFormThreeValues.cidade;
    this.dias_semana_horarios =
      stepThreeFormThreeValues.dias_semana_horarios || undefined;
    this.data_inicio = stepThreeFormThreeValues.data_inicio
      ? new Date(stepThreeFormThreeValues.data_inicio).toISOString()
      : undefined;
    this.data_encerramento = stepThreeFormThreeValues.data_encerramento
      ? new Date(stepThreeFormThreeValues.data_encerramento).toISOString()
      : undefined;
    this.min_vagas = Number(stepThreeFormThreeValues.min_vagas);
    this.max_vagas = Number(stepThreeFormThreeValues.max_vagas);
    this.tem_criterios = stepThreeFormFourValues.tem_criterios;
  }
}
