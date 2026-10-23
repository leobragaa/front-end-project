import api from "./api";

export interface CriarRefeicao {
  refeicao_nome: string;
  horario_refeicao: string;
  ordem_refeicao: number;
  plano_alimentar_id: number;
}
export interface Refeicao {
  id: number;
  refeicao_nome: string;
  horario_refeicao: Date;
  ordem_refeicao: number;
  plano_alimentar_id: number;
}

export async function registerRefeicao(
  refeicao: CriarRefeicao,
): Promise<Refeicao> {
  console.log("Dentro do Registro de Refeicao");

  const resposta = await api.post("/refeicao", {
    ...refeicao,
    tipousuario: "paciente",
  });

  return resposta.data;
}
