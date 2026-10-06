import api from "./api";

interface Paciente {
  nome: string;
  email: string;
  senha: string;
  sexo: string;
  telefone: string;
  datanascimento: string;
  cpf: string;
  cidade: string;
  estado: string;
  endereco: string;
  cep: string;
  tipousuario: string;
  //   usuario_id: number;
}

export async function pacienteCadastro(paciente: Paciente): Promise<Paciente> {
  console.log("dentro do envio", paciente);
  const resposta = await api.post("/paciente", {
    ...paciente,
    tipousuario: "Paciente",
  });

  console.log("Cadastro de Paciente Concluido:", resposta.data);

  return resposta.data;
}
export async function getPaciente(
  id: number,
): Promise<Array<Paciente | undefined>> {
  const resposta = await api.get(`paciente`, {
    params: { id },
  });

  return resposta.data;
}
