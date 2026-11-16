import { Alimento } from "./alimento";
import api from "./api";

export interface CriarItemRefeicao {
  id?: string;
  alimento_id: string;
  refeicao_id: string;
  unidade_item: string;
  quantidade_item: number;
}
export interface ItemRefeicao {
  id?: string;
  alimento_id: Alimento;
  refeicao_id: string;
  unidade_item: string;
  quantidade_item: number;
}

export async function registerItemRefeicao(
  item_refeicao: CriarItemRefeicao,
): Promise<ItemRefeicao> {
  console.log("Dentro do registro de Item da Refeicao");

  const resposta = await api.post("/ITEMREFEICAO", { ...item_refeicao });

  return resposta.data;
}
export async function atualizarItemRefeicao(
  id: string,
  dados: {
    quantidade_item?: number;
    unidade_item?: string;
  },
): Promise<ItemRefeicao> {
  const resposta = await api.patch(`/ITEMREFEICAO/${id}`, dados);
  return resposta.data;
}

export async function excluirItemRefeicao(id: string) {
  const resposta = await api.delete(`/ITEMREFEICAO/${id}`);
  return resposta.data;
}