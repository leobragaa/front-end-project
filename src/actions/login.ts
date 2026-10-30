import api from "../config/api";

interface UsuarioInterface {
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
  try {
    const resposta = await api.post("/auth/login", {
      email,
      senha,
      tipousuario,
    });
    console.log("Login realizado:", resposta.data);
    return resposta.data;
  } catch (erro: any) {
    console.error("DETALHES:", erro.response?.data ?? erro.message);
    throw erro;
  }
}
