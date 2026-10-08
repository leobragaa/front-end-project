import api from "./api";

interface UsuarioInterface {
  id: number;
  nome: string;
  email: string;
  tipousuario: string;
}

export async function realizarLogin(
  email: string,
  senha: string,
  tipousuario: string,
): Promise<UsuarioInterface> {
  console.log(email, senha, tipousuario);
  const resposta = await api.post("/auth/login", { email, senha, tipousuario });

  console.log("Login realizado:", resposta.data);

  return resposta.data;
}
