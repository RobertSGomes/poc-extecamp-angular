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

type IStepFiveFormOne = {
  assinatura_status: 'Pendente' | 'Assinado';
};

export class UpdateOfferingCostDTO {
  assinatura_status?: 'Pendente' | 'Assinado';
  fluxo_continuo?: boolean;
  professores_hora_aula?: number;
  professores_outras_atividades?: number;
  material_consumo?: number;
  material_permanente?: number;
  servico_terceiros?: number;
  outros_custos?: number;
  aproveitamento_recursos?: number;
  total?: number;

  constructor({
    stepFourFormOneValues,
    stepFiveFormOneValues,
  }: {
    stepFourFormOneValues?: IStepFourFormOne;
    stepFiveFormOneValues?: IStepFiveFormOne;
  }) {
    if (stepFourFormOneValues) {
      this.fluxo_continuo = stepFourFormOneValues.fluxo_continuo;
      this.professores_hora_aula =
        Number(stepFourFormOneValues.professores_hora_aula) || undefined;
      this.professores_outras_atividades =
        Number(stepFourFormOneValues.professores_outras_atividades) ||
        undefined;
      this.material_consumo =
        Number(stepFourFormOneValues.material_consumo) || undefined;
      this.material_permanente =
        Number(stepFourFormOneValues.material_permanente) || undefined;
      this.servico_terceiros =
        Number(stepFourFormOneValues.servico_terceiros) || undefined;
      this.outros_custos =
        Number(stepFourFormOneValues.outros_custos) || undefined;
      this.aproveitamento_recursos =
        Number(stepFourFormOneValues.aproveitamento_recursos) || undefined;
      this.total = Number(stepFourFormOneValues.total) || undefined;
    }

    if (stepFiveFormOneValues) {
      this.assinatura_status = stepFiveFormOneValues.assinatura_status;
    }
  }
}
