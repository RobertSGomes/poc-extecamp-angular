type IStepTwoFormTwo = {
  docente: string;
  docente_carga_horaria_horas: string;
  docente_carga_horaria_minutos: string;
  docente_departamento: string;
  docente_id: string;
  docente_matricula: string;
  docente_nome: string;
  docente_situacao: string;
  docente_titulacao: string;
  docente_unidade: string;
};

export class AssignUnicampDTO {
  id: string;
  carga_horaria: string;

  constructor(stepTwoFormTwoValues: IStepTwoFormTwo) {
    this.id = stepTwoFormTwoValues.docente_id;
    this.carga_horaria = `${stepTwoFormTwoValues.docente_carga_horaria_horas}h${stepTwoFormTwoValues.docente_carga_horaria_minutos}min`;
  }
}
