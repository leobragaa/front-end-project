"use client";
import { registerAlimento } from "@/actions/alimento";
import { registerItemRefeicao } from "@/actions/itemrefeicao";
import { registerPlanoAlimentar } from "@/actions/planoalimentar";
import { registerRefeicao } from "@/actions/refeicao";
import { Button, Card, Field, HStack, Input } from "@chakra-ui/react";
import { Formik } from "formik";

export default function CadastroPlanoAlimeentar() {
  return (
    <Formik
      initialValues={{
        paciente_id: "",
        refeicao: [
          {
            refeicao_nome: "",
            horario_refeicao: "",
            itemrefeicao: [
              {
                quantidade: "",
                unidade: "g",
                alimento_id: {
                  alimento_nome: "",
                  descricao_alimento: "",
                  calorias_alimento: parseFloat(""),
                  proteina_alimento: parseFloat(""),
                  carboidrato_alimento: parseFloat(""),
                },
              },
            ],
          },
        ],
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const planoAlimentar = await registerPlanoAlimentar(values);
          console.log("Dentro do form de Plano Alimentar", planoAlimentar);
        } catch (error) {
          console.log("Erro ao Cadastrar Plano Alimentar", error);
        }
        try {
          const refeicao = await registerRefeicao(values);
          console.log("Dentro do form de Plano Alimentar Refeicao", refeicao);
        } catch (error) {
          console.log("Erro ao Cadastrar Plano Alimentar refeicao", error);
        }
        try {
          const itemRefeicao = await registerItemRefeicao(values);

          console.log(
            "Dentro do form de Plano Alimentar item refeicao",
            itemRefeicao,
          );
        } catch (error) {
          console.log("Erro ao Cadastrar Plano Alimentar item refeicao", error);
        }
        try {
          const alimento = await registerAlimento(values);
          console.log("Dentro do form de Plano Alimentar Alimento", alimento);
        } catch (error) {
          console.log("Erro ao Cadastrar Plano Alimentar Alimento", error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Card.Root>
            <Card.Header>
              <Card.Title> Plano Alimentar</Card.Title>
            </Card.Header>
            <Card.Body>
              <HStack>
                <Field.Root>
                  <Field.Label>Peso</Field.Label>
                  <Input
                    placeholder="80.0 kg"
                    type="number"
                    // value={values.peso}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Altura</Field.Label>
                  <Input
                    placeholder="1.68 m"
                    type="number"
                    // value={values.altura}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
              </HStack>
              <Field.Root>
                <Field.Label>Alergia</Field.Label>
                <Input
                  placeholder="Informe as alergias do Paciente"
                  type="Text"
                  // value={values.alergia}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Hidratação</Field.Label>
                <Input
                  placeholder="Informe as alergias do Paciente"
                  type="Text"
                  // value={values.hidratacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>
              <Card.Footer>
                <Button
                  justifyContent={"flex-end"}
                  type="submit"
                  disabled={isSubmitting}
                >
                  CADASTRAR PLANO ALIMENTAR
                </Button>
              </Card.Footer>
            </Card.Body>
          </Card.Root>
        </form>
      )}
    </Formik>
  );
}
