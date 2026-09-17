import api from "./api";

interface UsuarioInterface {
  id: number;
  nome: string;
  cfn: string;
  email: string;
}

export async function realizarLogin(
  email: string,
  senha: string,
): Promise<UsuarioInterface> {
  console.log(email, senha);
  const resposta = await api.post("/auth/login", { email, senha });

  console.log("Login realizado:", resposta.data);

  return resposta.data;
}
