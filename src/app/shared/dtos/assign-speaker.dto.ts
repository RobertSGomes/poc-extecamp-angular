type IStepTwoFormFive = {
  docente_id: string;
  docente: string;
  docente_nome: string;
  docente_matricula: string;
  docente_instituicao: string;
  docente_titulacao: string;
  docente_vinculo: string;
  docente_nome_palestra: string;
  docente_valor_palestra: string;
  docente_carga_horaria_horas: string;
  docente_carga_horaria_minutos: string;
};

export class AssignSpeakerDTO {
  id: string;
  nome: string;
  matricula: string;
  instituicao?: string;
  titulacao?: string;
  tipo_vinculo: string;
  nome_palestra: string;
  valor: number;
  carga_horaria: string;

  constructor(stepTwoFormFive: IStepTwoFormFive) {
    this.id = stepTwoFormFive.docente_id;
    this.nome = stepTwoFormFive.docente_nome;
    this.matricula = stepTwoFormFive.docente_matricula;
    this.instituicao = stepTwoFormFive.docente_instituicao || undefined;
    this.titulacao = stepTwoFormFive.docente_titulacao || undefined;
    this.tipo_vinculo = stepTwoFormFive.docente_vinculo;
    this.nome_palestra = stepTwoFormFive.docente_nome_palestra;
    this.valor = Number(
      stepTwoFormFive.docente_valor_palestra.toString().replaceAll(',', '')
    );
    this.carga_horaria = `${stepTwoFormFive.docente_carga_horaria_horas}h${stepTwoFormFive.docente_carga_horaria_minutos}min`;
  }
}
