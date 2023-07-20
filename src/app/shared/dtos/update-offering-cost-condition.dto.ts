type IStepFourFormThree = {
  tipo: string;
  fonte: string;
  taxa_inscricao: string;
};

type IStepFourFormFour = {
  curso_gratuito: boolean;
  valor_a_vista: string;
  valor_a_vista_vencimento: string;
  parcelas_boleto: Array<{
    nmr_parcelas: string;
    valor: string;
    data_vencimento: string;
  }>;
  parcelas_cartao_credito: string;
  porcentagem_desconto_estudantes: string;
  opcao_desconto: Array<{ para: string; porcentagem_desconto: string }>;
  convenio_numero_processo: string;
  convenio_empresa: string;
  convenio_cnpj: string;
  convenio_tipo: string;
  convenio_responsavel: string;
  convenio_responsavel_cargo: string;
  convenio_sem_valor_parcela: boolean;
  convenio_numero_parcelas: string;
  recurso_valor: string;
  recurso_empresa: string;
  empresa_nome: string;
  empresa_endereco: string;
  empresa_bairro: string;
  empresa_cidade: string;
  empresa_cep: string;
  empresa_cnpj: string;
  empresa_ins_estadual: string;
  empresa_nome_contato: string;
  empresa_telefone: string;
  empresa_fax: string;
  empresa_email: string;
};

export class UpdateOfferingCostConditionDTO {
  forma_pagamento: {
    tipo: string;
    fonte: string;
    taxa_inscricao?: number;
  };
  curso_gratuito: boolean;
  valor_a_vista?: number;
  valor_a_vista_vencimento?: string;
  parcelas_boleto?: Array<{
    nmr_parcelas: number;
    valor: number;
    data_vencimento: string;
  }>;
  parcelas_cartao_credito?: number;
  porcentagem_desconto_estudantes?: number;
  opcao_desconto?: Array<{ para: string; porcentagem_desconto: number }>;
  convenio?: {
    numero_processo?: string;
    empresa?: string;
    cnpj?: string;
    tipo?: string;
    responsavel?: string;
    responsavel_cargo?: string;
    sem_valor_parcela?: boolean;
    numero_parcelas?: number;
  };
  recurso?: {
    valor?: number;
    empresa?: string;
  };
  empresa?: {
    nome?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    cep?: string;
    cnpj?: string;
    ins_estadual?: string;
    nome_contato?: string;
    telefone?: string;
    fax?: string;
    email?: string;
  };

  constructor({
    stepFourFormThreeValues,
    stepFourFormFourValues,
  }: {
    stepFourFormThreeValues: IStepFourFormThree;
    stepFourFormFourValues: IStepFourFormFour;
  }) {
    this.forma_pagamento = {
      tipo: stepFourFormThreeValues.tipo,
      fonte: stepFourFormThreeValues.fonte,
      taxa_inscricao: stepFourFormThreeValues.taxa_inscricao
        ? Number(
            stepFourFormThreeValues.taxa_inscricao
              .toString()
              .replaceAll(',', '')
          )
        : undefined,
    };
    this.curso_gratuito = stepFourFormFourValues.curso_gratuito;

    if (!stepFourFormFourValues.curso_gratuito) {
      this.valor_a_vista = Number(
        stepFourFormFourValues.valor_a_vista.toString().replaceAll(',', '')
      );
      this.valor_a_vista_vencimento = new Date(
        stepFourFormFourValues.valor_a_vista_vencimento
      ).toISOString();
      this.parcelas_boleto = stepFourFormFourValues.parcelas_boleto.map(
        (parcela_boleto) => {
          return {
            nmr_parcelas: Number(parcela_boleto.nmr_parcelas),
            valor: Number(parcela_boleto.valor.toString().replaceAll(',', '')),
            data_vencimento: new Date(
              parcela_boleto.data_vencimento
            ).toISOString(),
          };
        }
      );
      this.parcelas_cartao_credito =
        Number(stepFourFormFourValues.parcelas_cartao_credito) || undefined;
      this.porcentagem_desconto_estudantes =
        Number(stepFourFormFourValues.porcentagem_desconto_estudantes) ||
        undefined;
      this.opcao_desconto = stepFourFormFourValues.opcao_desconto.map(
        (opcao) => {
          return {
            para: opcao.para,
            porcentagem_desconto: Number(opcao.porcentagem_desconto),
          };
        }
      );
      this.convenio = new Convenio({
        numero_processo:
          stepFourFormFourValues.convenio_numero_processo || undefined,
        empresa: stepFourFormFourValues.convenio_empresa || undefined,
        cnpj: stepFourFormFourValues.convenio_cnpj || undefined,
        tipo: stepFourFormFourValues.convenio_tipo || undefined,
        responsavel: stepFourFormFourValues.convenio_responsavel || undefined,
        responsavel_cargo:
          stepFourFormFourValues.convenio_responsavel_cargo || undefined,
        sem_valor_parcela:
          stepFourFormFourValues.convenio_sem_valor_parcela || undefined,
        numero_parcelas:
          Number(stepFourFormFourValues.convenio_numero_parcelas) || undefined,
      });
      this.recurso = new Recurso({
        valor: stepFourFormFourValues.recurso_valor
          ? Number(
              stepFourFormFourValues.recurso_valor
                .toString()
                .replaceAll(',', '')
            )
          : undefined,
        empresa: stepFourFormFourValues.recurso_empresa || undefined,
      });
      this.empresa = new Empresa({
        nome: stepFourFormFourValues.empresa_nome || undefined,
        endereco: stepFourFormFourValues.empresa_endereco || undefined,
        bairro: stepFourFormFourValues.empresa_bairro || undefined,
        cidade: stepFourFormFourValues.empresa_cidade || undefined,
        cep: stepFourFormFourValues.empresa_cep || undefined,
        cnpj: stepFourFormFourValues.empresa_cnpj || undefined,
        ins_estadual: stepFourFormFourValues.empresa_ins_estadual || undefined,
        nome_contato: stepFourFormFourValues.empresa_nome_contato || undefined,
        telefone: stepFourFormFourValues.empresa_telefone || undefined,
        fax: stepFourFormFourValues.empresa_fax || undefined,
        email: stepFourFormFourValues.empresa_email || undefined,
      });
    }
  }
}

class Convenio {
  constructor(convenioData: {
    numero_processo?: string;
    empresa?: string;
    cnpj?: string;
    tipo?: string;
    responsavel?: string;
    responsavel_cargo?: string;
    sem_valor_parcela?: boolean;
    numero_parcelas?: number;
  }) {
    Object.assign(this, convenioData);
  }
}

class Recurso {
  constructor(recursoData: { valor?: number; empresa?: string }) {
    Object.assign(this, recursoData);
  }
}

class Empresa {
  constructor(empresaData: {
    nome?: string;
    endereco?: string;
    bairro?: string;
    cidade?: string;
    cep?: string;
    cnpj?: string;
    ins_estadual?: string;
    nome_contato?: string;
    telefone?: string;
    fax?: string;
    email?: string;
  }) {
    Object.assign(this, empresaData);
  }
}
