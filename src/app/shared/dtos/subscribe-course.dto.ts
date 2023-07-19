type IStepOne = {
  nome: string;
  email: string;
  telefone: string;
  documento_identificacao_tipo: string;
  documento_identificacao_numero: string;
  documento_identificacao_orgao_emissor: string;
  documento_identificacao_estado_emissor: string;
  cpf: string;
  data_nascimento: string;
  naturalidade_pais: string;
  naturalidade_estado: string;
  naturalidade_cidade: string;
  genero: string;
  estado_civil: string;
  possui_deficiencia: boolean;
  deficiencia: string;
};

type IStepTwo = {
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  complemento: string;
  estado: string;
  cidade: string;
  pais: string;
};

type IStepThree = {
  termo_compromisso_assinado: boolean;
};

type IStepFour = {
  documentos_upload: boolean;
  cpf_upload: boolean;
  declaracao_upload: boolean;
};

export class SubscribeCourseDTO {
  termo_compromisso_assinado: boolean;
  documentos_upload: boolean;
  cpf_upload: boolean;
  declaracao_upload: boolean;

  nome?: string;
  email?: string;
  telefone?: string;
  documento_identificacao?: {
    tipo?: string;
    numero?: string;
    orgao_emissor?: string;
    uf_emissao?: string;
  };
  cpf?: string;
  data_nascimento?: string;
  endereco?: {
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    complemento?: string;
    estado?: string;
    cidade?: string;
    pais_residencia?: string;
  };
  naturalidade?: {
    pais?: string;
    estado?: string;
    cidade?: string;
  };
  genero?: string;
  estado_civil?: string;
  possui_deficiencia?: boolean;
  tipo_deficiencia?: string;

  constructor({
    stepOneValues,
    stepTwoValues,
    stepThreeValues,
    stepFourValues,
  }: {
    stepOneValues: IStepOne;
    stepTwoValues: IStepTwo;
    stepThreeValues: IStepThree;
    stepFourValues: IStepFour;
  }) {
    const documentoIdentificacao = new DocumentoIdentificacao({
      tipo: stepOneValues.documento_identificacao_tipo || undefined,
      numero: stepOneValues.documento_identificacao_numero || undefined,
      orgao_emissor:
        stepOneValues.documento_identificacao_orgao_emissor || undefined,
      uf_emissao:
        stepOneValues.documento_identificacao_estado_emissor || undefined,
    });
    const endereco = new Endereco({
      cep: stepTwoValues.cep || undefined,
      logradouro: stepTwoValues.logradouro || undefined,
      numero: stepTwoValues.numero || undefined,
      bairro: stepTwoValues.bairro || undefined,
      complemento: stepTwoValues.complemento || undefined,
      estado: stepTwoValues.estado || undefined,
      cidade: stepTwoValues.cidade || undefined,
      pais_residencia: stepTwoValues.pais || undefined,
    });
    const naturalidade = new Naturalidade({
      pais: stepOneValues.naturalidade_pais || undefined,
      estado: stepOneValues.naturalidade_estado || undefined,
      cidade: stepOneValues.naturalidade_cidade || undefined,
    });

    this.nome = stepOneValues.nome || undefined;
    this.email = stepOneValues.email || undefined;
    this.telefone = stepOneValues.telefone || undefined;
    this.documento_identificacao =
      Object.keys(documentoIdentificacao).length > 0
        ? documentoIdentificacao
        : undefined;
    this.cpf = stepOneValues.cpf || undefined;
    this.data_nascimento = stepOneValues.data_nascimento
      ? new Date(stepOneValues.data_nascimento).toISOString()
      : undefined;
    this.endereco = Object.keys(endereco).length > 0 ? endereco : undefined;
    this.naturalidade =
      Object.keys(naturalidade).length > 0 ? naturalidade : undefined;
    this.genero = stepOneValues.genero || undefined;
    this.estado_civil = stepOneValues.estado_civil || undefined;
    this.possui_deficiencia = stepOneValues.possui_deficiencia || undefined;
    this.tipo_deficiencia = stepOneValues.deficiencia || undefined;
    this.termo_compromisso_assinado =
      stepThreeValues.termo_compromisso_assinado;
    this.documentos_upload = stepFourValues.documentos_upload;
    this.cpf_upload = stepFourValues.cpf_upload;
    this.declaracao_upload = stepFourValues.declaracao_upload;
  }
}

class DocumentoIdentificacao {
  constructor(documentoIdentificacaoData: {
    tipo?: string;
    numero?: string;
    orgao_emissor?: string;
    uf_emissao?: string;
  }) {
    Object.assign(this, documentoIdentificacaoData);
  }
}

class Endereco {
  constructor(enderecoData: {
    cep?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    complemento?: string;
    estado?: string;
    cidade?: string;
    pais_residencia?: string;
  }) {
    Object.assign(this, enderecoData);
  }
}

class Naturalidade {
  constructor(naturalidadeData: {
    pais?: string;
    estado?: string;
    cidade?: string;
  }) {
    Object.assign(this, naturalidadeData);
  }
}
