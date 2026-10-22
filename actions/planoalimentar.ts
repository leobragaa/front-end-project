import api from "axios";
import { Refeicao } from "./refeicao";

export interface CriarPlanoAlimentar {
  paciente_id: number;
  data_plano: Date;
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

  const resposta = await api.post("/planoalimentar", { ...planoalimentar });

  return resposta.data;
}
