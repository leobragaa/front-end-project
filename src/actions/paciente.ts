import api from "./api";
import { Usuario } from "./cadastro";

export interface CadastroPaciente {
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
}
export interface Paciente {
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
  usuario_id: Usuario;
  nutricionista_id?: string;
}

export async function pacienteCadastro(
  paciente: CadastroPaciente,
): Promise<Paciente> {
  console.log("dentro do envio", paciente);
  const resposta = await api.post("/PACIENTE", {
    ...paciente,
    tipousuario: "paciente",
    nutricionista_id: "",
  });

  console.log("Cadastro de Paciente Concluido:", resposta.data);
  console.log(JSON.parse(localStorage.getItem("usuario") || "{}"));
  return resposta.data;
}
export async function getPaciente(
  id_nutricionista: number,
): Promise<Paciente[]> {
  const resposta = await api.get("/PACIENTE/nutricionista", {
    params: { id_nutricionista },
  });
  return resposta.data;
}
