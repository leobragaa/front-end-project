import api from "./api";

export interface CriarAlimento {
  alimento_nome: string;
  descricao_alimento: string;
  calorias_alimento: number;
  proteina_alimento: number;
  carboidrato_alimento: number;
}
export interface Alimento {
  id: number;
  alimento_nome: string;
  descricao_alimento: string;
  calorias_alimento: number;
  proteina_alimento: number;
  carboidrato_alimento: number;
}

export async function registerAlimento(
  alimento: CriarAlimento,
): Promise<Alimento> {
  console.log("Dentro do Registro de Alimento");

  const resposta = await api.post("/alimento", { ...alimento });

  return resposta.data;
}
