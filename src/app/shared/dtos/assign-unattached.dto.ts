type IStepTwoFormFour = {
  docente_id: string;
  docente: string;
  docente_nome: string;
  docente_matricula: string;
  docente_documento_tipo: string;
  docente_documento_numero: string;
  docente_pais_origem: string;
  docente_instituicao: string;
  docente_titulacao: string;
  docente_funcao: string;
  docente_carga_horaria_horas: string;
  docente_carga_horaria_minutos: string;
};

export class AssignUnattachedDTO {
  id: string;
  matricula: string;
  nome: string;
  documento_identificacao: {
    tipo: string;
    nmr_documento: string;
  };
  pais_origem: string;
  instituicao: string;
  titulacao: string;
  funcao: string;
  carga_horaria: string;

  constructor(stepTwoFormFour: IStepTwoFormFour) {
    this.id = stepTwoFormFour.docente_id;
    this.matricula = stepTwoFormFour.docente_matricula;
    this.nome = stepTwoFormFour.docente_nome;
    this.documento_identificacao = {
      tipo: stepTwoFormFour.docente_documento_tipo,
      nmr_documento: stepTwoFormFour.docente_documento_numero,
    };
    this.pais_origem = stepTwoFormFour.docente_pais_origem;
    this.instituicao = stepTwoFormFour.docente_instituicao;
    this.titulacao = stepTwoFormFour.docente_titulacao;
    this.funcao = stepTwoFormFour.docente_funcao;
    this.carga_horaria = `${stepTwoFormFour.docente_carga_horaria_horas}h${stepTwoFormFour.docente_carga_horaria_minutos}`;
  }
}
