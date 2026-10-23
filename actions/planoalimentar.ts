import api from "./api";
import { Refeicao } from "./refeicao";

export interface CriarPlanoAlimentar {
  paciente_id: number;
  data_plano: string;
  refeicao?: Refeicao[];
}
export interface PlanoAlimentar {
  id: number;
  paciente_id: number;
  data_plano: Date;
  refeicao?: Refeicao[];
}

export async function registerPlanoAlimentar(
  planoalimentar: CriarPlanoAlimentar,
): Promise<PlanoAlimentar> {
  console.log("Dentro do Plano Alimentar");

  const resposta = await api.post("/plano-alimentar", {
    ...planoalimentar,
  });

  return resposta.data;
}
