import api from "./api";

interface Usuario {
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
    tipousuario: "Nutricionista",
  });

  console.log("Cadastro Concluido:", resposta.data);

  return resposta.data;
}

export async function getUsuario(
  email: string,
  nome: string,
  telefone: string,
): Promise<Array<Usuario | undefined>> {
  const resposta = await api.get(`usuario`, {
    params: {
      email,
      nome,
      telefone,
    },
  });

  return resposta.data;
}
