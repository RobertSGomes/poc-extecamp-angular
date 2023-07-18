type IStepFourFormOne = {
  fluxo_continuo: boolean;
  professores_hora_aula: string;
  professores_outras_atividades: string;
  material_consumo: string;
  material_permanente: string;
  servico_terceiros: string;
  outros_custos: string;
  aproveitamento_recursos: string;
  total: string;
};

export class CreateOfferingCostDTO {
  fluxo_continuo: boolean;
  professores_hora_aula?: number;
  professores_outras_atividades?: number;
  material_consumo?: number;
  material_permanente?: number;
  servico_terceiros?: number;
  outros_custos?: number;
  aproveitamento_recursos?: number;
  total?: number;

  constructor(stepFourFormOneValues: IStepFourFormOne) {
    this.fluxo_continuo = stepFourFormOneValues.fluxo_continuo;
  }
}
