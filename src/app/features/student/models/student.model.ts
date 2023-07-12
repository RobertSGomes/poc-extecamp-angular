export interface StudentModel {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  matricula: string;
  senha: string;
  documento_identificacao: DocumentoIdentificacao;
  cpf: string;
  data_nascimento: string;
  endereco: Endereco;
  naturalidade: Naturalidade;
  genero: string;
  estado_civil: string;
  possui_deficiencia: boolean;
  tipo_deficiencia: any;
  created_at: string;
  updated_at: string;
}

export interface DocumentoIdentificacao {
  tipo: string;
  numero: string;
  uf_emissao: string;
  orgao_emissor: string;
}

export interface Endereco {
  cep: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  logradouro: string;
  complemento: string;
  pais_residencia: string;
}

export interface Naturalidade {
  pais: string;
  cidade: string;
  estado: string;
}
