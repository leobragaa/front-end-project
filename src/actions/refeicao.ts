import api from "../config/api";

export interface CriarRefeicao {
  refeicao_nome: string;
  horario_refeicao: string;
  ordem_refeicao: number;
  plano_alimentar_id: string;
}
export interface Refeicao {
  id: string;
  refeicao_nome: string;
  horario_refeicao: Date;
  ordem_refeicao: number;
  plano_alimentar_id: string;
}

export async function registerRefeicao(
  refeicao: CriarRefeicao,
): Promise<Refeicao> {
  console.log("Dentro do Registro de Refeicao");

  const resposta = await api.post("/REFEICAO", {
    ...refeicao,
    tipousuario: "paciente",
  });

  return resposta.data;
}
