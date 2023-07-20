export class UpdateProfessorDTO {
  nome?: string;
  email?: string;
  telefone?: string;
  matricula?: string;
  instituicao?: string;
  unidade?: string;
  departamento?: string;
  titulacao?: string;
  situacao?: string;

  constructor(professorData: {
    nome?: string;
    email?: string;
    telefone?: string;
    matricula?: string;
    instituicao?: string;
    unidade?: string;
    departamento?: string;
    titulacao?: string;
    situacao?: string;
  }) {
    this.nome = professorData.nome || undefined;
    this.email = professorData.email || undefined;
    this.telefone = professorData.telefone || undefined;
    this.matricula = professorData.matricula || undefined;
    this.instituicao = professorData.instituicao || undefined;
    this.unidade = professorData.unidade || undefined;
    this.departamento = professorData.departamento || undefined;
    this.titulacao = professorData.titulacao || undefined;
    this.situacao = professorData.situacao || undefined;
  }
}
