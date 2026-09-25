import api from "./api";

interface UsuarioCadastro {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  tipousuario: string;
}

export async function cadastroUsuario(
  usuario: UsuarioCadastro,
): Promise<UsuarioCadastro> {
  console.log("dentro do envio", usuario);
  const resposta = await api.post("/usuario", {
    ...usuario,
    tipousuario: "teste",
  });

  console.log("Cadastro Concluido:", resposta.data);

  return resposta.data;
}
