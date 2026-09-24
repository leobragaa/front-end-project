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

export async function cadastrarUsuario(
  nome: string,
  cfn: string,
  email: string,
  senha: string,
  telefone: string,
  datanascimento: Date,
  tipousuario: string,
): Promise<UsuarioCadastro> {
  console.log(email, senha);
  const resposta = await api.post("/cadastro", {
    nome,
    cfn,
    email,
    senha,
    telefone,
    datanascimento,
    tipousuario,
  });

  console.log("Cadastro Concluido:", resposta.data);

  return resposta.data;
}
