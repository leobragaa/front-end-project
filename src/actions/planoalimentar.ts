import api from "../config/api";
import { Refeicao } from "./refeicao";

export interface CriarPlanoAlimentar {
  paciente_id: string;
  data_plano: string;
  refeicao?: Refeicao[];
}
export interface PlanoAlimentar {
  id: string;
  paciente_id: string;
  data_plano: Date;
  refeicao?: Refeicao[];
}

export async function registerPlanoAlimentar(
  planoalimentar: CriarPlanoAlimentar,
): Promise<PlanoAlimentar> {
  console.log("Dentro do Plano Alimentar");

  const resposta = await api.post("/PLANOALIMENTAR", {
    ...planoalimentar,
  });

  return resposta.data;
}
