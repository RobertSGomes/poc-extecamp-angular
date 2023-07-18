type IStepTwoFormOne = {
  coordenador_id: string;
  coordenador: string;
  diretor_id: string;
  diretor: string;
  docente_responsavel_id: string;
  docente_responsavel: string;
  docente_responsavel_email: string;
  docente_responsavel_telefone: string;
  docente_responsavel_instituicao: string;
  docente_responsavel_titulacao: string;
  docente_responsavel_carga_horaria_horas: string;
  docente_responsavel_carga_horaria_minutos: string;
};

export class AssignCoordinationDTO {
  diretor: string;
  coordenador: string;
  docente_responsavel: {
    id: string;
    carga_horaria: string;
  };

  constructor(stepTwoFormOneValues: IStepTwoFormOne) {
    this.diretor = stepTwoFormOneValues.diretor_id;
    this.coordenador = stepTwoFormOneValues.coordenador_id;
    this.docente_responsavel = {
      id: stepTwoFormOneValues.docente_responsavel_id,
      carga_horaria: `${stepTwoFormOneValues.docente_responsavel_carga_horaria_horas}h${stepTwoFormOneValues.docente_responsavel_carga_horaria_minutos}min`,
    };
  }
}
