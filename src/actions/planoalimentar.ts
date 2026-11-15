import api from "./api";
import { Refeicao } from "./refeicao";

export interface CriarPlanoAlimentar {
  paciente_id: string;
  nutricionista_id: string;
  data_plano: string;
  refeicao?: Refeicao[];
}
export interface PlanoAlimentar {
  id: string;
  data_plano: string;
  nutricionista_id: string;
  paciente_id: {
    id: string;
    datanascimento: string;
    sexo: string;

    usuario_id: {
      nome: string;
      email: string;
      telefone: string;
    };
  };

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

export async function getPlanosAlimentar(
  id_nutricionista: string,
): Promise<PlanoAlimentar[]> {
  const resposta = await api.get("/PLANOALIMENTAR/nutricionista", {
    params: {
      id_nutricionista,
    },
  });

  return resposta.data;
}
