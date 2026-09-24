import api from "./api";

interface UsuarioCadastro {
  id: number;
  nome: string;
  cfn: string;
  email: string;
  senha: string;
  telefone: string;
  datanascimento: Date;
  tipousuario: string;
}

export async function cadastroUsuario(
  nome: string,
  email: string,
  senha: string,
  telefone: string,
  tipousuario: string,
): Promise<UsuarioCadastro> {
  console.log(email, senha);
  const resposta = await api.post("/auth/creatingUsuario", {
    nome,
    email,
    senha,
    telefone,
    tipousuario,
  });

  console.log("Cadastro Concluido:", resposta.data);

  return resposta.data;
}
