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
  nutricionista_id?: string;
}

export async function pacienteCadastro(paciente: Paciente): Promise<Paciente> {
  console.log("dentro do envio", paciente);
  const resposta = await api.post("/PACIENTE", {
    ...paciente,
    tipousuario: "paciente",
    nutricionista_id: "189bf503-2b82-4f61-946a-930c34a8dfb5",
  });

  console.log("Cadastro de Paciente Concluido:", resposta.data);

  return resposta.data;
}
// export async function getPaciente(
//   id_nutricionista: number,
// ): Promise<Paciente[]> {
//   const resposta = await api.get("/paciente/nutricionista", {
//     params: { id_nutricionista },
//   });

//   return resposta.data;
// }
