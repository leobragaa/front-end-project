import api from "axios";

export interface Refeicao {
  refeicao_nome: string;
  horario_refeicao: Date;
  ordem_refeicao: number;
}

export async function registerRefeicao(refeicao: Refeicao): Promise<Refeicao> {
  console.log("Dentro do Registro de Refeicao");

  const resposta = await api.post("/refeicao", {
    ...refeicao,
    tipousuario: "paciente",
  });

  return resposta.data;
}
