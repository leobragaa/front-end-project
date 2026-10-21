import api from "axios";

export interface Alimento {
  alimento_nome: string;
  descricao_alimento: string;
  calorias_alimento: number;
  proteina_alimento: number;
  carboidrato_alimento: number;
}

export async function registerAlimento(alimento: Alimento): Promise<Alimento> {
  console.log("Dentro do Registro de Alimento");

  const resposta = await api.post("/alimento", { ...alimento });

  return resposta.data;
}
