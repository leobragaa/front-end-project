import api from "./api";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  tipousuario: string;
}

export async function cadastroUsuario(usuario: Usuario): Promise<Usuario> {
  console.log("dentro do envio", usuario);
  const resposta = await api.post("/usuario", {
    ...usuario,
    tipousuario: "nutricionista",
  });

  console.log("Cadastro Concluido:", resposta.data);

  return resposta.data;
}

export async function getUsuario(id: number): Promise<Usuario> {
  console.log("ID enviado para buscar usuário:", id);
  const resposta = await api.get(`/usuario/${id}`);
  return resposta.data;
}
