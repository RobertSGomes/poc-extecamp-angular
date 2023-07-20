type IStepFourFormTwo = {
  fixas: string;
  aiu_unidade_porcentagem: string;
  aiu_unidade_valor: string;
  fundo_extensao_porcentagem_away: string;
  fundo_extensao_valor_away: string;
  fundo_extensao_unidade: string;
  fundo_extensao_porcentagem: string;
  fundo_extensao_valor: string;
  total: string;
  subsidios: string;
  custo_total: string;
  custo_aluno_min_vagas: string;
  custo_aluno_valor: string;
};

export class UpdateOfferingCostTaxDTO {
  fixas?: number;
  aiu_unidade_porcentagem?: number;
  aiu_unidade_valor?: number;
  fundo_extensao_unidade?: string;
  fundo_extensao_porcentagem?: number;
  fundo_extensao_valor?: number;
  total?: number;
  subsidios?: number;
  custo_total?: number;
  custo_aluno_min_vagas?: number;
  custo_aluno_valor?: number;

  constructor(stepFourFormTwo: IStepFourFormTwo) {
    this.fixas = stepFourFormTwo.fixas
      ? Number(stepFourFormTwo.fixas.toString().replaceAll(',', ''))
      : undefined;
    this.aiu_unidade_porcentagem =
      Number(stepFourFormTwo.aiu_unidade_porcentagem) || undefined;
    this.aiu_unidade_valor = stepFourFormTwo.aiu_unidade_valor
      ? Number(stepFourFormTwo.aiu_unidade_valor.toString().replaceAll(',', ''))
      : undefined;
    this.fundo_extensao_unidade =
      stepFourFormTwo.fundo_extensao_unidade || undefined;
    this.fundo_extensao_porcentagem =
      Number(stepFourFormTwo.fundo_extensao_porcentagem) || undefined;
    this.fundo_extensao_valor = stepFourFormTwo.fundo_extensao_valor
      ? Number(
          stepFourFormTwo.fundo_extensao_valor.toString().replaceAll(',', '')
        )
      : undefined;
    this.total = stepFourFormTwo.total
      ? Number(stepFourFormTwo.total.toString().replaceAll(',', ''))
      : undefined;
    this.subsidios = stepFourFormTwo.subsidios
      ? Number(stepFourFormTwo.subsidios.toString().replaceAll(',', ''))
      : undefined;
    this.custo_total = stepFourFormTwo.custo_total
      ? Number(stepFourFormTwo.custo_total.toString().replaceAll(',', ''))
      : undefined;
    this.custo_aluno_min_vagas = stepFourFormTwo.custo_aluno_min_vagas
      ? Number(
          stepFourFormTwo.custo_aluno_min_vagas.toString().replaceAll(',', '')
        )
      : undefined;
    this.custo_aluno_valor = stepFourFormTwo.custo_aluno_valor
      ? Number(stepFourFormTwo.custo_aluno_valor.toString().replaceAll(',', ''))
      : undefined;
  }
}
