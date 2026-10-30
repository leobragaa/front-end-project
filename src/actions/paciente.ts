import api from "../config/api";

interface Paciente {
  id?: string;
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
  nutricionista_id?: string;
}

export async function pacienteCadastro(paciente: Paciente): Promise<Paciente> {
  console.log("dentro do envio", paciente);
  const resposta = await api.post("/PACIENTE", {
    ...paciente,
    tipousuario: "paciente",
  });

  console.log("Cadastro de Paciente Concluido:", resposta.data);

  return resposta.data;
}
export async function getPaciente(
  id_nutricionista: string,
): Promise<Paciente[]> {
  const resposta = await api.get("/PACIENTE/nutricionista", {
    params: { id_nutricionista },
  });

  return resposta.data;
}
