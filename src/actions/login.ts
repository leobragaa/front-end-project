"use client";
import api from "./api";

export interface UsuarioInterface {
  id: string;
  nome: string;
  email: string;
  tipousuario: string;
}

interface LoginResponse {
  access_token: string;
  usuario: UsuarioInterface;
}

export async function realizarLogin(
  email: string,
  senha: string,
  tipousuario: string,
): Promise<LoginResponse> {
  console.log(email, senha, tipousuario);
  const resposta = await api.post("/auth/login", { email, senha, tipousuario });

  console.log("Login realizado:", resposta.data);

  localStorage.setItem("access_token", resposta.data.access_token);

  localStorage.setItem("usuario", JSON.stringify(resposta.data.usuario));

  return resposta.data;
}
