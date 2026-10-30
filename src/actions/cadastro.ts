import api from "../config/api";

export interface Usuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  tipousuario: string;
}

export async function cadastroUsuario(usuario: Usuario): Promise<Usuario> {
  console.log("dentro do envio", usuario);
  const resposta = await api.post("/USUARIO", {
    ...usuario,
    tipousuario: "nutricionista",
  });

  console.log("Cadastro Concluido:", resposta.data);

  return resposta.data;
}

export async function getUsuario(id: string): Promise<Usuario> {
  console.log("ID enviado para buscar usuário:", id);
  const resposta = await api.get("/USUARIO", {
    params: {
      id,
    },
  });
  return resposta.data;
}
