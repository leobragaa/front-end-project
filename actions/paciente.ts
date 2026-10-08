import api from "./api";

interface PacienteCadastro {
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

export async function pacienteCadastro(
  paciente: PacienteCadastro,
): Promise<PacienteCadastro> {
  console.log("dentro do envio", paciente);
  const resposta = await api.post("/paciente", {
    ...paciente,
    tipousuario: "paciente",
  });

  console.log("Cadastro de Paciente Concluido:", resposta.data);

  return resposta.data;
}
