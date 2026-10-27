import api from "./api";

interface Paciente {
  id: number;
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
}

export async function pacienteCadastro(paciente: Paciente): Promise<Paciente> {
  console.log("dentro do envio", paciente);
  const resposta = await api.post("/paciente", {
    ...paciente,
    tipousuario: "paciente",
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
