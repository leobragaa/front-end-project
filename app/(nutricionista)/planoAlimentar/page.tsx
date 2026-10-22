"use client";
import { registerAlimento } from "@/actions/alimento";
import { registerItemRefeicao } from "@/actions/itemrefeicao";
import { registerPlanoAlimentar } from "@/actions/planoalimentar";
import { registerRefeicao } from "@/actions/refeicao";
import { Button, Card, Field, HStack, Input, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import { FaRegSave } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { LuUserSearch } from "react-icons/lu";
import { TiPlus } from "react-icons/ti";

export default function CadastroPlanoAlimeentar() {
  return (
    <Formik
      initialValues={{
        data_plano: new Date(""),
        paciente_id: 0,
        refeicao: [
          {
            planoalimentar_id: 0,
            refeicao_nome: "",
            ordem_refeicao: 0,
            horario_refeicao: new Date(""),
            itemrefeicao: [
              {
                quantidade_item: 0,
                unidade_item: "g",
                alimento_id: 0,
                refeicao_id: 0,
                alimento: {
                  alimento_nome: "",
                  descricao_alimento: "",
                  calorias_alimento: 0,
                  proteina_alimento: 0,
                  carboidrato_alimento: 0,
                },
              },
            ],
          },
        ],
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const planoAlimentar = await registerPlanoAlimentar({
            data_plano: values.data_plano,
            paciente_id: values.paciente_id,
          });

          for (const refeicaoForm of values.refeicao) {
            const refeicao = await registerRefeicao({
              refeicao_nome: refeicaoForm.refeicao_nome,
              ordem_refeicao: refeicaoForm.ordem_refeicao,
              horario_refeicao: refeicaoForm.horario_refeicao,
              planoalimentar_id: planoAlimentar.id,
            });

            for (const alimentosForm of refeicaoForm.itemrefeicao) {
              const alimento = await registerAlimento({
                alimento_nome: alimentosForm.alimento.alimento_nome,
                descricao_alimento: alimentosForm.alimento.descricao_alimento,
                calorias_alimento: alimentosForm.alimento.calorias_alimento,
                proteina_alimento: alimentosForm.alimento.proteina_alimento,
                carboidrato_alimento:
                  alimentosForm.alimento.carboidrato_alimento,
              });

              await registerItemRefeicao({
                refeicao_id: refeicao.id,
                alimento_id: alimento.id,
                quantidade_item: alimentosForm.quantidade_item,
                unidade_item: alimentosForm.unidade_item,
              });
            }
          }
          console.log("Plano Alimentar finalizado e cadastrado !");
        } catch (error) {
          console.log("Erro ao Cadastrar Plano Alimentar Alimento", error);
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Card.Root border={"1px solid"} margin={"5"}>
            <Card.Header>
              <Card.Title> Cadastro Plano Alimentar</Card.Title>
            </Card.Header>
            <Card.Body>
              <Field.Root>
                <Text></Text>
                <Field.Label>
                  <LuUserSearch />
                  Paciente
                </Field.Label>
                <Input
                  placeholder="Selecione o Paciente"
                  name="paciente_id"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field.Root>
            </Card.Body>
            <Card.Body>
              <Text> Refeição</Text>
              <HStack gap={"6"} marginTop={"5"}>
                <Field.Root>
                  <Field.Label>Momento da Refeição</Field.Label>
                  <Input
                    placeholder="Exemplo: Café da Manhã"
                    type="Text"
                    name="refeicao_nome"
                    value={""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Horario da Refeição</Field.Label>
                  <Input
                    placeholder="06:00"
                    type="Text"
                    name="horario_refeicao"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Field.Root>
              </HStack>
            </Card.Body>

            <Card.Body gap={"4"}>
              <Text> Alimentos </Text>
              <Field.Root>
                <Field.Label>Informe o Alimento:</Field.Label>
                <Input placeholder="Exemplo: Maçã" name="alimento_nome" />
              </Field.Root>

              <HStack>
                <Field.Root>
                  <Field.Label>Quantidade do Alimento:</Field.Label>
                  <Input placeholder="Exemplo: 2" type="number" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Quantidade a Unitaria:</Field.Label>
                  <Input
                    placeholder={"Exemplo: unidade, colher, g, ml"}
                    type={"text"}
                    name="unidade_item"
                  />
                </Field.Root>
              </HStack>
              <HStack>
                <Field.Root>
                  <Field.Label>Quantidade Calóricas:</Field.Label>
                  <Input
                    placeholder="Exemplo: 2"
                    type="number"
                    name={"calorias_alimento"}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Quantidade Proteica:</Field.Label>
                  <Input placeholder={"kcal"} type="number" />
                </Field.Root>
              </HStack>
              <Field.Root>
                <Field.Label>Descrição de Consumo:</Field.Label>
                <Input
                  placeholder="Informe a descrição de consumo do alimento"
                  name={"descricao_alimento"}
                  type="text"
                />
              </Field.Root>
              <Button width={"%50"} variant={"solid"}>
                <TiPlus />
                Adicionar Alimentos
              </Button>
            </Card.Body>

            <Card.Footer>
              <Field.Root alignItems={"flex-start"}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  backgroundColor={"green.400"}
                >
                  <FaRegSave />
                  Salvar Plano Alimentar
                </Button>
              </Field.Root>
              <Field.Root alignItems={"flex-end"}>
                <Button type="reset" backgroundColor={"red.400"}>
                  <IoCloseOutline />
                  Cancelar
                </Button>
              </Field.Root>
            </Card.Footer>
          </Card.Root>
        </form>
      )}
    </Formik>
  );
}
