import api from "./api";

export interface ItemRefeicao {
  alimento_id: number;
  refeicao_id: number;
  unidade_item: string;
  quantidade_item: number;
}

export async function registerItemRefeicao(
  item_refeicao: ItemRefeicao,
): Promise<ItemRefeicao> {
  console.log("Dentro do registro de Item da Refeicao");

  const resposta = await api.post("/itemrefeicao", { ...item_refeicao });

  return resposta.data;
}
