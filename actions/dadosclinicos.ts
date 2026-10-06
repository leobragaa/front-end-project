import api from "./api";

interface DadosClinicos {
  peso: number;
  altura: number;
  objetivopessoal: string;
  atvFisica: string;
  hidratacao: string;
  dataregistro: string;
  alergia: string;
  //   paciente_id: number;
}

export async function dadosClinicosCadastro(
  dadosClinicos: DadosClinicos,
): Promise<DadosClinicos> {
  console.log("dentro do envio", dadosClinicos);
  const resposta = await api.post("/paciente", {
    ...dadosClinicos,
  });

  console.log("Cadastro de Dados Clinicos Concluido:", resposta.data);

  return resposta.data;
}

export async function getDadosClinicos(
  id: number,
): Promise<Array<DadosClinicos | undefined>> {
  const resposta = await api.get(`dadosclinicos`, {
    params: { id },
  });

  return resposta.data;
}
