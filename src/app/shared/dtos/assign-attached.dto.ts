type IStepTwoFormThree = {
  docente_id: string;
  docente: string;
  docente_nome: string;
  docente_matricula: string;
  docente_titulacao: string;
  docente_situacao: string;
  docente_instituicao: string;
  docente_unidade: string;
  docente_departamento: string;
  docente_funcao: string;
  docente_carga_horaria_horas: string;
  docente_carga_horaria_minutos: string;
};

export class AssignAttachedDTO {
  id: string;
  funcao: string;
  carga_horaria: string;

  constructor(stepTwoFormThreeValues: IStepTwoFormThree) {
    this.id = stepTwoFormThreeValues.docente_id;
    this.funcao = stepTwoFormThreeValues.docente_funcao;
    this.carga_horaria = `${stepTwoFormThreeValues.docente_carga_horaria_horas}h${stepTwoFormThreeValues.docente_carga_horaria_minutos}min`;
  }
}
