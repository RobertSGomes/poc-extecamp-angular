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

export class CreateOfferingCostTaxDTO {
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
    console.log(stepFourFormTwo.fixas);

    this.fixas = Number(stepFourFormTwo.fixas) || undefined;
    this.aiu_unidade_porcentagem =
      Number(stepFourFormTwo.aiu_unidade_porcentagem) || undefined;
    this.aiu_unidade_valor =
      Number(stepFourFormTwo.aiu_unidade_valor) || undefined;
    this.fundo_extensao_unidade =
      stepFourFormTwo.fundo_extensao_unidade || undefined;
    this.fundo_extensao_porcentagem =
      Number(stepFourFormTwo.fundo_extensao_porcentagem) || undefined;
    this.fundo_extensao_valor =
      Number(stepFourFormTwo.fundo_extensao_valor) || undefined;
    this.total = Number(stepFourFormTwo.total) || undefined;
    this.subsidios = Number(stepFourFormTwo.subsidios) || undefined;
    this.custo_total = Number(stepFourFormTwo.custo_total) || undefined;
    this.custo_aluno_min_vagas =
      Number(stepFourFormTwo.custo_aluno_min_vagas) || undefined;
    this.custo_aluno_valor =
      Number(stepFourFormTwo.custo_aluno_valor) || undefined;
  }
}
