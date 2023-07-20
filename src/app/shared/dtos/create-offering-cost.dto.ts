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
    this.professores_hora_aula = stepFourFormOneValues.professores_hora_aula
      ? Number(
          stepFourFormOneValues.professores_hora_aula
            .toString()
            .replaceAll(',', '')
        )
      : undefined;
    this.professores_outras_atividades =
      stepFourFormOneValues.professores_outras_atividades
        ? Number(
            stepFourFormOneValues.professores_outras_atividades
              .toString()
              .replaceAll(',', '')
          )
        : undefined;
    this.material_consumo = stepFourFormOneValues.material_consumo
      ? Number(
          stepFourFormOneValues.material_consumo.toString().replaceAll(',', '')
        )
      : undefined;
    this.material_permanente = stepFourFormOneValues.material_permanente
      ? Number(
          stepFourFormOneValues.material_permanente
            .toString()
            .replaceAll(',', '')
        )
      : undefined;
    this.servico_terceiros = stepFourFormOneValues.servico_terceiros
      ? Number(
          stepFourFormOneValues.servico_terceiros.toString().replaceAll(',', '')
        )
      : undefined;
    this.outros_custos = stepFourFormOneValues.outros_custos
      ? Number(
          stepFourFormOneValues.outros_custos.toString().replaceAll(',', '')
        )
      : undefined;
    this.aproveitamento_recursos = stepFourFormOneValues.aproveitamento_recursos
      ? Number(
          stepFourFormOneValues.aproveitamento_recursos
            .toString()
            .replaceAll(',', '')
        )
      : undefined;
    this.total = stepFourFormOneValues.total
      ? Number(stepFourFormOneValues.total.toString().replaceAll(',', ''))
      : undefined;
  }
}
