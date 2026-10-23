import api from "axios";

export interface CriarRefeicao {
  refeicao_nome: string;
  horario_refeicao: Date;
  ordem_refeicao: number;
  planoalimentar_id: number;
}
export interface Refeicao {
  id: number;
  refeicao_nome: string;
  horario_refeicao: Date;
  ordem_refeicao: number;
  planoalimentar_id: number;
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
