import api from "../config/api";

export interface ItemRefeicao {
  alimento_id: string;
  refeicao_id: string;
  unidade_item: string;
  quantidade_item: number;
}

export async function registerItemRefeicao(
  item_refeicao: ItemRefeicao,
): Promise<ItemRefeicao> {
  console.log("Dentro do registro de Item da Refeicao");

  const resposta = await api.post("/ITEMREFEICAO", { ...item_refeicao });

  return resposta.data;
}
