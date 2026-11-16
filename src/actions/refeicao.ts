import api from "./api";
import { ItemRefeicao } from "./itemrefeicao";

export interface CriarRefeicao {
  refeicao_nome: string;
  horario_refeicao: string;
  ordem_refeicao: number;
  plano_alimentar_id: string;
}
export interface Refeicao {
  id: string;
  refeicao_nome: string;
  horario_refeicao: string;
  ordem_refeicao: number;
  plano_alimentar_id: string;
  itemrefeicao: ItemRefeicao[];
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

export async function atualizarRefeicao(
  id: string,
  dados: {
    refeicao_nome?: string;
    horario_refeicao?: string;
    ordem_refeicao?: number;
  },
): Promise<Refeicao> {
  const resposta = await api.patch(`/REFEICAO/${id}`, dados);
  return resposta.data;
}

export async function excluirRefeicao(id: string) {
  const resposta = await api.delete(`/REFEICAO/${id}`);
  return resposta.data;
}